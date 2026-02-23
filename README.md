
# Prior Authorization Workflow Tool

This app is a Vite-powered React UI that models a prior authorization workflow, featuring guided assessment flows, document viewing, and supervisor-ready dashboard views optimized for fast iteration.

## Key architectural features
- Vite + React for fast local feedback and optimized production builds.
- Component-driven UI with Radix primitives for accessible, composable building blocks.
- Tailwind CSS v4 pipeline for utility-first styling and rapid visual iteration.
- Forms powered by React Hook Form for consistent state management and validation.
- PDF rendering via React PDF and pdfjs for document previews in the workflow.
- Data visualization via Recharts for dashboard-ready metrics and trends.
- Theme orchestration with next-themes to support system and user preferences.

## Dashboard view
The dashboard experience is implemented inside the existing application shell (header + navigation) and uses static demo data to simulate real-time updates. It includes:
- Daily incoming vs completed submission summaries.
- Queue distribution with aging buckets.
- Average TAT against the 5 business day SLA with a trend sparkline.
- Manual refresh control to simulate live updates.

## Running the code

Run `pnpm install` to install the dependencies.

Run `pnpm dev` to start the development server.
  
