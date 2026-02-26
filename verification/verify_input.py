import time
from playwright.sync_api import sync_playwright

def run(playwright):
    print("Launching browser...")
    browser = playwright.chromium.launch(headless=True)
    page = browser.new_page()
    print("Navigating to app...")
    try:
        page.goto("http://localhost:3000", timeout=10000)
    except Exception as e:
        print(f"Error navigating: {e}")
        time.sleep(2)
        page.goto("http://localhost:3000")

    # Wait for the app to load
    print("Waiting for header...")
    page.wait_for_selector("text=Chalamandra", timeout=5000)

    # Check if textarea is visible
    textarea = page.locator("textarea")
    textarea.wait_for()
    print("Textarea found.")

    # Type into textarea
    test_input = "The nature of reality is purely digital."
    textarea.fill(test_input)

    # Verify input value
    val = textarea.input_value()
    print(f"Textarea value: {val}")
    if val != test_input:
        print("ERROR: Textarea value mismatch!")
        exit(1)
    print("Input state verified.")

    # Click the process button
    button = page.locator("button:has-text('Decodificar 369')")
    button.click()
    print("Button clicked.")

    # Wait for status update
    print("Waiting for status message...")
    try:
        page.wait_for_selector("text=Iniciando Kernels...", timeout=5000)
        print("Process started and status updated.")
    except Exception as e:
        print(f"Timeout waiting for status message: {e}")
        # Take screenshot anyway to debug
        page.screenshot(path="verification/error_screenshot.png")
        raise e

    # Take screenshot
    page.screenshot(path="verification/verification.png")
    print("Screenshot saved to verification/verification.png")

    browser.close()

with sync_playwright() as playwright:
    run(playwright)
