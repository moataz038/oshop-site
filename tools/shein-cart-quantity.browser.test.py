#!/usr/bin/env python3
"""Browser QA for local-only SHEIN quantity review; all cart data is synthetic."""
import asyncio
import json
import socket
import subprocess
import time
from pathlib import Path
from urllib.request import urlopen

from playwright.async_api import async_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
STATIC = ROOT / "vercel-output/static"


def unused_port():
    with socket.socket() as sock:
        sock.bind(("127.0.0.1", 0))
        return sock.getsockname()[1]


def sample_result(missing_price=False):
    if missing_price:
        items = [
            {"id": "test-missing", "title": "اختبار سعر غير متاح", "qty": 2, "unitUsd": None,
             "priceKnown": False, "totalUsd": None, "totalLyd": None, "available": True,
             "sku": "T-1", "color": None, "size": None, "options": None},
            {"id": "test-unavailable", "title": "غير متاح", "qty": 1, "unitUsd": 3,
             "priceKnown": True, "totalUsd": 3, "totalLyd": 24, "available": False,
             "sku": "T-2", "color": None, "size": None, "options": None},
        ]
        return {"source": "omkar", "live": True, "exchangeRate": 8, "shippingLyd": 0,
                "serviceFeeLyd": 0, "subtotalLyd": None, "totalBeforeRoundingLyd": None,
                "totalLyd": None, "items": items, "customerSummary": "لا إجمالي"}
    items = [
        {"id": "test-available", "title": "اختبار قميص", "qty": 2, "unitUsd": 10,
         "priceKnown": True, "totalUsd": 20, "totalLyd": 160, "available": True,
         "sku": "T-1", "color": "أسود", "size": "M", "options": None},
        {"id": "test-unavailable", "title": "اختبار مستبعد", "qty": 3, "unitUsd": None,
         "priceKnown": False, "totalUsd": None, "totalLyd": None, "available": False,
         "sku": "T-2", "color": None, "size": None, "options": None},
    ]
    return {"source": "omkar", "live": True, "exchangeRate": 8, "shippingLyd": 0,
            "serviceFeeLyd": 0, "subtotalLyd": 160, "totalBeforeRoundingLyd": 160,
            "totalLyd": 160, "items": items, "customerSummary": "تقرير اختباري"}


async def run_viewport(width, height, base_url):
    api_calls = 0
    page_errors = []
    requested_urls = []

    async def mock_chat(route):
        nonlocal api_calls
        body = sample_result(missing_price=api_calls > 0)
        api_calls += 1
        event = {"t": "done", "reply": "STALE_RESULT_TEXT_SHOULD_NOT_APPEAR", "cards": [{"type": "shein_cart", "result": body}]}
        await route.fulfill(status=200, content_type="application/x-ndjson; charset=utf-8",
                            body=json.dumps(event, ensure_ascii=False) + "\n")

    async with async_playwright() as p:
        browser = await p.chromium.launch(executable_path="/usr/bin/chromium", headless=True,
                                          args=["--no-sandbox", "--disable-dev-shm-usage"])
        context = await browser.new_context(viewport={"width": width, "height": height}, is_mobile=width < 500,
                                           device_scale_factor=1)
        page = await context.new_page()
        page.on("pageerror", lambda error: page_errors.append(str(error)))
        page.on("request", lambda request: requested_urls.append(request.url))
        await page.route("**/api/chat", mock_chat)
        await page.goto(base_url, wait_until="networkidle")
        start = page.get_by_test_id("button-get-started")
        if await start.count():
            await start.click()
        composer = page.get_by_role("textbox", name="رسالتك")
        await expect(composer).to_be_visible(timeout=10000)

        await composer.fill("افحص سلة تجريبية")
        await composer.press("Enter")
        cards = page.get_by_test_id("shein-cart-quantity-card")
        await expect(cards.nth(0)).to_be_visible(timeout=10000)
        first = cards.nth(0)
        unavailable_input = first.get_by_test_id("shein-quantity-input-1")
        assert not await unavailable_input.is_disabled(), "every listed item should allow local quantity review"
        await unavailable_input.fill("4")
        await expect(first.get_by_test_id("shein-local-summary")).to_contain_text("غير المتاح: 4")
        await expect(first.get_by_test_id("shein-local-summary")).to_contain_text("الإجمالي المطلوب وفق قاعدة KB الحالية: 160")
        input0 = first.get_by_test_id("shein-quantity-input-0")
        await input0.fill("3")
        await expect(first.get_by_test_id("shein-local-summary")).to_contain_text("240")
        await expect(first.get_by_test_id("shein-local-summary")).to_contain_text("الكمية: 3")
        await expect(page.get_by_text("STALE_RESULT_TEXT_SHOULD_NOT_APPEAR")).to_have_count(0)
        await input0.fill("0")
        await expect(first.get_by_test_id("shein-local-summary")).to_contain_text("الإجمالي المطلوب وفق قاعدة KB الحالية: 0")
        await first.get_by_test_id("shein-quantity-reset").click()
        await expect(first.get_by_test_id("shein-local-summary")).to_contain_text("الإجمالي المطلوب وفق قاعدة KB الحالية: 160")

        await composer.fill("افحص نتيجة أخرى بسعر ناقص")
        await composer.press("Enter")
        second = cards.nth(1)
        await expect(second).to_be_visible(timeout=10000)
        await expect(second.get_by_test_id("shein-quantity-input-0")).to_be_disabled()
        await expect(second.get_by_test_id("shein-quantity-status")).to_contain_text("لا يوجد سعر موثوق")
        await expect(second.get_by_test_id("shein-local-summary")).to_contain_text("تعذر إعادة حساب الإجمالي")
        assert "الإجمالي قبل التقريب:" not in await second.get_by_test_id("shein-local-summary").inner_text()
        assert api_calls == 2, "editing/resetting quantities must not send extra requests"
        shein_requests = [url for url in requested_urls if "shein.com" in url.lower() or "omkar.cloud" in url.lower()]
        assert not shein_requests, f"local quantity review must not contact SHEIN or the cart reader: {shein_requests}"

        layout = await page.evaluate("({width: innerWidth, scrollWidth: document.documentElement.scrollWidth})")
        assert layout["scrollWidth"] <= layout["width"], f"horizontal overflow at {width}px: {layout}"
        assert not page_errors, f"browser errors at {width}px: {page_errors}"
        await browser.close()
        return {"viewport": f"{width}x{height}", "chat_api_calls": api_calls,
                "horizontal_overflow": False, "shein_network_requests": len(shein_requests), "page_errors": page_errors,
                "quantity_edit_and_reset": "passed", "missing_price_lockout": "passed"}


async def main():
    port = unused_port()
    server = subprocess.Popen(["python3", "-m", "http.server", str(port), "--bind", "127.0.0.1", "--directory", STATIC],
                              stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    base_url = f"http://127.0.0.1:{port}/"
    try:
        for _ in range(50):
            try:
                with urlopen(base_url, timeout=1):
                    break
            except Exception:
                time.sleep(0.1)
        results = []
        for width, height in ((390, 844), (1440, 900)):
            results.append(await run_viewport(width, height, base_url))
        print(json.dumps({"results": results}, ensure_ascii=False, indent=2))
    finally:
        server.terminate()
        server.wait(timeout=5)


if __name__ == "__main__":
    asyncio.run(main())
