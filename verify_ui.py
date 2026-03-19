import asyncio
from playwright.async_api import async_playwright

async def run():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()

        # Open the Vite preview server
        await page.goto("http://localhost:3000")

        # Wait for app to render
        await page.wait_for_selector("textarea")

        # Type into the textarea (our uncontrolled input)
        await page.fill("textarea", "Este es un texto de prueba para la decodificación.")

        # Click the "Decodificar" button
        await page.click("text=Decodificar")

        # Wait for the decoding process (or at least for the loading state to change, wait a couple of seconds to see the change)
        await asyncio.sleep(2)

        # Save a screenshot
        await page.screenshot(path="/home/jules/verification/verification.png", full_page=True)

        await browser.close()

if __name__ == "__main__":
    asyncio.run(run())
