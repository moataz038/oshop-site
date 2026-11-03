#!/usr/bin/env python3
"""Install privacy-safe diagnostic logging for failed SHEIN reader calls."""
from pathlib import Path
import subprocess

ROOT = Path(__file__).resolve().parents[1]
API = ROOT / "vercel-output/functions/api.func/index.cjs"
HELPER = ROOT / "tools/shein-reader-safe-log.cjs"
MARK = "/* KB_SHEIN_READER_SAFE_LOG_V1 */"
CALL = "__KBSheinReaderSafeLog({response:resp,error:lastErr,hasData:Boolean(data),providerError:Boolean(data?.error)})"
FAILURE_ANCHOR = 'if(!resp?.ok||!data||data.error)return{error:data?.message||data?.error?.message||`تعذر قراءة سلة SHEIN (${resp?.status||lastErr?.message||"خطأ اتصال"}).`};'
FAILURE_REPLACEMENT = 'if(!resp?.ok||!data||data.error){' + CALL + ';return{error:data?.message||data?.error?.message||`تعذر قراءة سلة SHEIN (${resp?.status||lastErr?.message||"خطأ اتصال"}).`};}'
HELPER_ANCHOR = "function iCe(){"
EXPORT_LINE = "module.exports = createSheinReaderSafeLogger;"


def fail(message):
    raise SystemExit(message)


def replace_once(text, old, new, label):
    count = text.count(old)
    if count != 1:
        fail(f"expected exactly one {label} anchor, got {count}")
    return text.replace(old, new, 1)


def inline_helper():
    helper = HELPER.read_text()
    if helper.count(EXPORT_LINE) != 1:
        fail("safe logger export anchor changed")
    return helper.replace(
        EXPORT_LINE,
        "var __KBSheinReaderSafeLog = createSheinReaderSafeLogger();",
        1,
    ).rstrip()


def patch_api(text, helper):
    marker_count = text.count(MARK)
    if marker_count not in (0, 1):
        fail(f"invalid safe-logging marker count: {marker_count}")

    if marker_count == 0:
        text = replace_once(
            text,
            HELPER_ANCHOR,
            "\n" + MARK + "\n" + helper + "\n" + HELPER_ANCHOR,
            "pre-routing logger helper injection",
        )

    call_count = text.count(CALL)
    if call_count == 0:
        text = replace_once(text, FAILURE_ANCHOR, FAILURE_REPLACEMENT, "reader failure log call")
    elif call_count != 1:
        fail(f"invalid safe-logging call count: {call_count}")

    start = text.index(MARK) + len(MARK)
    end = text.find(HELPER_ANCHOR, start)
    if end < 0:
        fail("cannot locate the provider setup after the safe logger")
    helper_section = text[start:end]
    required = (
        "function createSheinReaderSafeLogger",
        "SAFE_TRANSPORT_CODES",
        '"[shein-reader]"',
        'JSON.stringify({ category, status, code })',
    )
    if not all(token in helper_section for token in required):
        fail("safe logger helper is incomplete")
    forbidden = ("message", "url", "items", "API-Key", "process.env", "secret")
    if any(token.lower() in helper_section.lower() for token in forbidden):
        fail("safe logger helper contains a field that must not be logged")
    if text.count(CALL) != 1:
        fail("safe logger call is missing or duplicated")
    if FAILURE_ANCHOR in text:
        fail("reader failure path was not instrumented")
    return text


def main():
    api_text = API.read_text()
    next_api = patch_api(api_text, inline_helper())
    if next_api != api_text:
        API.write_text(next_api)
    subprocess.run(["node", "--check", str(API)], check=True)
    print("SHEIN reader safe error logging applied")


if __name__ == "__main__":
    main()
