from playwright.sync_api import sync_playwright

def verify_app_load():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            print("Navigating to app...")
            page.goto("http://localhost:4173/")

            print("Waiting for main content to load...")
            # Wait for the main input area to be visible, indicating the app has loaded
            page.wait_for_selector("textarea")

            print("Taking screenshot of initial load...")
            page.screenshot(path="verification_initial_load.png")

            # Type something into the textarea to simulate user interaction
            print("Typing into textarea...")
            page.fill("textarea", "This is a test input for verification.")

            print("Taking screenshot after input...")
            page.screenshot(path="verification_input.png")

            print("Verification script completed successfully.")
        except Exception as e:
            print(f"Error during verification: {e}")
        finally:
            browser.close()

if __name__ == "__main__":
    verify_app_load()
