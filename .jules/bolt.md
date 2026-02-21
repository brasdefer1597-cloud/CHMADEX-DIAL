## 2025-02-23 - [Input State Isolation]
**Learning:** Moving high-frequency input state from the root component to a dedicated child component prevents the entire application tree from re-rendering on every keystroke. This is especially critical when the root component manages other complex state or expensive sub-trees.
**Action:** Always verify if state needs to be lifted up or pushed down. If only the input component needs the live value for display, keep the state local and expose the value via ref or callback only when needed.
