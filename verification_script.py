from playwright.sync_api import sync_playwright

def verify_app():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()

        # Navigate to the app
        page.goto("http://localhost:3000")

        # Wait for the app to load (Header should be visible)
        page.wait_for_selector("text=Chalamandra")

        # Find the textarea
        textarea = page.locator("textarea")

        # Type into the textarea
        test_text = "To be or not to be, that is the question."
        textarea.fill(test_text)

        # Verify the text is in the textarea
        input_value = textarea.input_value()
        assert input_value == test_text, f"Expected {test_text}, but got {input_value}"

        # Find the Decode button
        decode_button = page.locator("button:has-text('Decodificar 369')")

        # Click the button
        decode_button.click()

        # Wait for processing status (since we don't have API keys, it might error or show loading)
        # The app shows status messages.
        # "Iniciando Kernels..." should appear.
        try:
            page.wait_for_selector("text=Iniciando Kernels...", timeout=5000)
            print("Status message appearing correctly.")
        except:
            print("Status message not found or too fast.")

        # Take a screenshot
        page.screenshot(path="verification_screenshot.png")

        browser.close()

if __name__ == "__main__":
    verify_app()
