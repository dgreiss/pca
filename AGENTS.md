# Project Overview

This repository contains a Vite-powered React UI for a prior authorization workflow. It models intake and review flows, document viewing, and operational dashboard-style metrics. The app is component-driven, styled with Tailwind CSS v4, and uses Radix primitives for accessible UI building blocks.

# Key Conventions

- Language: TypeScript + React (function components, hooks).
- Styling: Tailwind CSS utility classes; keep styles local to components and avoid new global overrides unless necessary.
- Components: Prefer small, reusable components in `src/components`; keep view-level composition in `src/App.tsx`.
- State: Use local component state for UI-only behavior; avoid introducing global state unless required.
- UI consistency: Match existing typography, spacing, and the dark green navigation/header theme.
- Data: Demo data should be clearly labeled and kept inside feature components.

# Repository Structure

- `src/App.tsx` - application shell and view composition.
- `src/components` - reusable UI and feature components.
- `src/styles` - global styles and Tailwind theme tokens.
- `public` - static assets served by Vite.
- `index.html` - Vite HTML entry point.

# Development Server

Prerequisites:

- Node.js 20+
- pnpm 9+

Install dependencies:

```
pnpm install
```

Start the dev server:

```
pnpm dev
```

# Useful Commands

- `pnpm dev` - start the Vite development server
- `pnpm build` - production build
