Home-only PDF Left Layout Plan

Goal

- For the Home tab only, display the PDF document viewer on the left and the data fields on the right.
- Keep all other nav items and the Dashboard behavior unchanged.

Scope

- Touch only layout composition in src/App.tsx; reuse existing panels and tab content.
- No changes to the contents of Home tabs (Assessment, Attachments, etc.).

Plan

1. Add a Home-only layout branch in src/App.tsx
   - Detect activeNav === 'home'.
   - Render a two-pane layout with DocumentViewerPanel on the left and ContentPanel on the right.
   - Keep TabSidebar above both panes, matching the current non-dashboard structure.

2. Set explicit pane sizing for Home
   - Use flex with basis or width utilities (e.g., left 45%, right 55%).
   - Ensure both panes have min-w-0 and min-h-0 to prevent overflow issues.

3. Preserve existing layouts for non-Home routes
   - Dashboard stays as-is.
   - Other non-dashboard nav items retain the current arrangement.

4. Responsive handling
   - Stack panes on small screens (viewer first, data second).
   - Keep each pane scrollable and usable on narrow widths.

Validation Checklist

- Home shows PDF on the left, fields on the right.
- Tab switching still updates the right-side content.
- PDF controls work (zoom/rotate/select).
- Dashboard and other nav items are unchanged.

Files

- src/App.tsx
