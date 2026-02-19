## 2024-05-22 - [Controlled Inputs in Root Component]
**Learning:** Controlled inputs (`value` + `onChange`) in the root `App` component trigger a full re-render on every keystroke, which is costly even with memoized children.
**Action:** Use uncontrolled inputs (`ref`) for performance-sensitive inputs that don't need real-time validation, or isolate input state to a leaf component.
