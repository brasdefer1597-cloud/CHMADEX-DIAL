## 2024-05-24 - [Avoid Unnecessary Re-Renders on Input Changes]
**Learning:** In React architectures where the main input is located at the top-level App component, using a controlled textarea (e.g., `useState`) causes a full-app re-render on every keystroke. This architectural bottleneck blocks the UI thread during rapid typing and degrades perceived performance.
**Action:** Default to uncontrolled inputs (e.g., `useRef`) for root-level main textareas when rapid, isolated updates are required, deferring state reading to execution time instead of managing it sequentially.
