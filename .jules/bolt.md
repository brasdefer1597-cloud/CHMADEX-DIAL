## 2026-02-24 - Controlled Input Re-renders
**Learning:** In React applications with a single root component (`App.tsx`) managing all state, controlled inputs (like textareas) trigger re-renders of the entire tree on every keystroke. Even with `React.memo`, prop comparison overhead accumulates, especially with complex children.
**Action:** Isolate high-frequency state updates (typing) into leaf components (`InputSection`) and only pass the final value up on submit, preventing unnecessary re-renders of static UI parts.
