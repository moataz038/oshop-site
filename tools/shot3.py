import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/home/user/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg=await b.new_page(viewport={'width':430,'height':900},device_scale_factor=3)
        await pg.goto('http://localhost:8765/',wait_until='networkidle'); await pg.wait_for_timeout(4000)
        await pg.add_style_tag(content='*{background:transparent!important;box-shadow:none!important} *:not(canvas):not(:has(canvas)){visibility:hidden} canvas{visibility:visible}')
        await pg.wait_for_timeout(500)
        cv=await pg.query_selector('canvas')
        await cv.screenshot(path='/tmp/canvas.png',omit_background=True)
        await b.close()
asyncio.run(main())
