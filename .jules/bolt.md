## 2024-03-04 - Uncontrolled Inputs for Root-Level State
**Learning:** In Chalamandra, placing high-frequency state like the main textarea's keystrokes at the root level (`App.tsx`) using `useState` triggers full component re-renders (including complex UI panels, layout rendering, etc.) on every keystroke, causing severe UI jank.
**Action:** When working with high-frequency user input in heavy component trees, use an uncontrolled approach (`useRef`) to decouple the DOM state from the React rendering cycle, querying the DOM value only when submitting or executing an action.
