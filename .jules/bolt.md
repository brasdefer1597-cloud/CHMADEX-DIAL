## 2024-03-22 - [App Component Re-renders Fix]
**Learning:** Found that using a controlled `<textarea>` without memoization caused the entire `App` component and all its complex UI to re-render on every single keystroke.
**Action:** Replaced the controlled `input` state with an uncontrolled `<textarea>` using `useRef` to prevent unnecessary main thread blocking and re-renders while typing.
