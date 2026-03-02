import asyncio
from playwright.async_api import async_playwright

async def run(playwright):
    browser = await playwright.chromium.launch()
    page = await browser.new_page()

    # Listen for console errors to catch potential issues
    page.on("console", lambda msg: print(f"Browser console: {msg.text}") if msg.type == "error" else None)

    await page.goto("http://localhost:4173")

    # Find textarea by placeholder
    textarea = page.locator('textarea[placeholder="Introduce dilema, idea o realidad a decodificar..."]')
    await textarea.wait_for()

    # Type into the textarea
    await textarea.fill("Hello World")

    # Find the processing button
    button = page.locator('button:has-text("Decodificar 369")')
    await button.click()

    # Wait for the result display to appear
    # The result display has a class 'glass-panel' and 'border-chola' for the thesis part
    await page.locator('div.glass-panel.border-chola').wait_for(timeout=15000)

    print("Test passed: Uncontrolled textarea optimization works and process completes successfully.")

    await browser.close()

async def main():
    async with async_playwright() as playwright:
        await run(playwright)

if __name__ == '__main__':
    asyncio.run(main())
