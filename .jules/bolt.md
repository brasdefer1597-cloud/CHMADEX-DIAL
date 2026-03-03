## 2024-10-30 - Controlled Inputs Trigger Full Re-renders
**Learning:** Using `useState` for a `<textarea>` in the main `App` component causes a full application re-render on every keystroke. Even if the state is synced to a ref (`inputRef.current = input`) to avoid dependency array updates in `useCallback`, the main render loop still runs unnecessarily.
**Action:** Instead, use an uncontrolled `<textarea>` with a direct DOM ref (`useRef<HTMLTextAreaElement>(null)`) to read the value only when the form is submitted or an action is triggered, completely avoiding keystroke re-renders.
