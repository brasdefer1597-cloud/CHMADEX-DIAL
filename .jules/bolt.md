## 2024-03-07 - Uncontrolled Textarea for High-Frequency Inputs
**Learning:** Using controlled inputs (`useState`) for main text areas in complex components causes expensive full-app re-renders on every keystroke. This is especially problematic in extension popups where rendering performance is constrained.
**Action:** Always prefer uncontrolled inputs (`useRef`) for textareas where the value is only needed on submission, preventing unnecessary re-renders.
