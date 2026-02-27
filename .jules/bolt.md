## 2024-05-22 - Code Splitting for Non-Critical Components
**Learning:** React Code Splitting via `React.lazy` and `Suspense` effectively reduces the initial JavaScript bundle size, which is critical for extension popup performance where startup time matters. By lazy loading `ResultDisplay`, we defer loading its logic and styles until a result is actually generated.
**Action:** Identify other heavy, non-critical components (like settings modals or complex visualization tools) and apply lazy loading to further optimize startup time.
