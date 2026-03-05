
## 2024-05-19 - Uncontrolled Component Optimization
**Learning:** In a React application where an input's value is only needed on submission (like the main textarea in Chalamandra), using a controlled component (`useState` bound to `value` and `onChange`) causes unnecessary full-app re-renders on every single keystroke. This is especially impactful when the component tree contains complex SVGs or heavy children.
**Action:** Default to using uncontrolled components (`useRef` and `defaultValue`) for text inputs when intermediate state validation or derived state calculation isn't strictly required during typing, thereby saving countless render cycles.
