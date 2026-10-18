import asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/home/user/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg=await b.new_page(viewport={'width':430,'height':900},device_scale_factor=2)
        logs=[]; pg.on('pageerror',lambda e: logs.append('ERR '+str(e)))
        await pg.goto('http://localhost:8765/',wait_until='networkidle'); await pg.wait_for_timeout(4000)
        cv=await pg.query_selector('canvas')
        await cv.screenshot(path='/tmp/canvas.png',omit_background=True)
        await pg.click('[data-testid=button-get-started]'); await pg.wait_for_timeout(2500)
        await pg.screenshot(path='/tmp/h1.png')
        print(await pg.evaluate('location.href'))
        await pg.goto('http://localhost:8765/#/settings',wait_until='networkidle'); await pg.wait_for_timeout(2000)
        await pg.screenshot(path='/tmp/h2.png',full_page=True)
        print(await pg.evaluate('location.href'))
        print(logs)
        await b.close()
asyncio.run(main())
