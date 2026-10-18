import sys,asyncio
from playwright.async_api import async_playwright
async def main():
    async with async_playwright() as p:
        b=await p.chromium.launch(executable_path="/home/user/.cache/ms-playwright/chromium-1217/chrome-linux64/chrome",args=["--use-gl=angle","--use-angle=swiftshader","--enable-unsafe-swiftshader","--ignore-gpu-blocklist"])
        pg=await b.new_page(viewport={'width':430,'height':900},device_scale_factor=2)
        logs=[]
        pg.on('console',lambda m: logs.append(m.text))
        pg.on('pageerror',lambda e: logs.append('ERR '+str(e)))
        await pg.goto('http://localhost:8765/',wait_until='networkidle')
        await pg.wait_for_timeout(5000)
        await pg.screenshot(path='/tmp/s1.png')
        print('\n'.join(logs[:20]))
        await b.close()
asyncio.run(main())
