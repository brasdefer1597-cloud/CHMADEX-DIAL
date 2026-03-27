## 2024-10-24 - [Optimize Input Re-renders]
**Learning:** Re-renders triggered by a controlled `<textarea>` input caused unnecessary updates across the entire `App` component and its complex SVG children in the `lucide-react` icons.
**Action:** Used an uncontrolled `useRef` for input components heavily typed into, retrieving its `.value` only when needed (e.g. submit actions). This prevents excessive reconciliation cycles for generic text input fields.
