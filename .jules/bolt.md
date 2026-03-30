## 2026-03-30 - Uncontrolled Inputs for Real-time Text
**Learning:** Using controlled React state (useState) for a large textarea triggering complex processing causes excessive full-app re-renders, hurting typing performance.
**Action:** Use uncontrolled inputs (useRef) to read values only on explicit submission, bypassing the render cycle for every keystroke.
