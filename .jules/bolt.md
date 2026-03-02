## 2024-05-18 - Uncontrolled Textarea for Performance
**Learning:** Using an uncontrolled `<textarea>` with a `useRef` to track the value prevents full application re-renders on every single keystroke. In a complex application like Chalamandra, tying the input directly to `useState` caused noticeable input lag because the entire `App` component and its children re-rendered on each `onChange` event.
**Action:** Always consider using uncontrolled components with `useRef` for high-frequency text inputs, especially at the top level of the component tree, to maintain optimal typing performance.
