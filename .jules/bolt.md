## 2024-03-14 - Prevent re-renders on textarea input
**Learning:** Using controlled input for a textarea in a large component causes full component re-renders on every keystroke, which can be a performance bottleneck in React.
**Action:** Use an uncontrolled component with a ref for the main input field to prevent re-renders on every keystroke, fetching the value via the ref when submitting.
