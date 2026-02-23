# Prior Authorization Workflow Tool Dashboard PRD

## Overview
The dashboard provides Prior Authorization Specialists with real-time visibility into daily submission volume, completion throughput, and queue distribution. The primary objective is to enable fast triage and workload management by showing at-a-glance operational status and turnaround performance.

## Problem Statement
Supervisors need an active monitoring view to oversee Prior Authorization Specialist workloads and queue health in real time. Without a unified dashboard, it is difficult to detect bottlenecks early, rebalance queues, and keep turnaround times within the 5 business day SLA.

## Goals
- Provide real-time visibility into daily incoming submissions and completions.
- Show current queue distribution to support triage and balancing.
- Track turnaround times as a primary KPI and surface SLA risk.
- Support quick identification of bottlenecks by queue and age.

## Non-Goals
- Full case management or adjudication workflow.
- Automated routing or rules engine.
- Historical analytics beyond what is needed for the day view.

## Primary Users
- Prior Authorization Specialists responsible for reviewing, routing, and completing submissions.

## Key Use Cases
- Understand daily workload at a glance (incoming vs completed).
- Identify which queue(s) are overloaded or behind.
- Monitor current turnaround time and whether it is trending outside acceptable thresholds.
- Decide which queue to prioritize next based on volume and aging.

## User Stories
- As a supervisor, I want to see total incoming and completed submissions for today so I can gauge daily throughput.
- As a supervisor, I want to see the number of submissions in each queue so I can rebalance work when a queue is overloaded.
- As a supervisor, I want to see current average turnaround time against the 5 business day SLA so I can intervene before breaches.
- As a supervisor, I want to spot queues with aging items so I can prioritize escalations.
- As a supervisor, I want to refresh the dashboard to validate the latest status during active monitoring.

## Success Metrics
- Specialists can determine workload status and next priority in under 30 seconds.
- Reduction in average turnaround time (TAT) for submissions.
- Fewer submissions breaching internal SLA thresholds.

## Core KPIs
- Turnaround Time (TAT): time from submission receipt to completion.
- Daily Incoming Submissions: count received today.
- Daily Completed Submissions: count completed today.
- Queue Distribution: count per queue, optionally with aging buckets.

## SLA
- Target TAT threshold: 5 business days.

## Functional Requirements (MVP)
- Real-time dashboard view using static demo data for now.
- Summary tiles for:
  - Incoming submissions today.
  - Completed submissions today.
  - Current average TAT (today) with 5 business day SLA indicator.
- Queue breakdown panel showing number of submissions per queue.
- Visual trend for TAT (today) using a small chart or sparkline.
- Manual refresh control (even if data is static) to simulate real-time updates.

## Functional Requirements (Later)
- Drill-down from queues to list view.
- Filters by payer, provider group, and priority.
- SLA thresholds with alerting when TAT exceeds limits.
- Export or snapshot capability for daily reporting.

## Data Requirements
- Use static mock data to simulate real-time updates.
- Data fields needed for MVP:
  - Submission ID
  - Received timestamp
  - Completed timestamp (if completed)
  - Queue name
  - Status (incoming, in-queue, completed)

## Queues
- Intake
- Open Assessment
- Pharmacist Consultation
- Under Investigation
- Completed

## UX Requirements
- Prioritize readability and immediate comprehension.
- Emphasize queue distribution and TAT using clear visual hierarchy.
- Provide a layout that supports quick scanning: summary metrics at top, queues in the middle, TAT trend below.
- Keep interactions minimal for MVP (view-only with optional refresh).

## Non-Functional Requirements
- Responsive layout for desktop and tablet.
- Fast load and render (<2 seconds on typical dev machine).
- Accessible color contrast for KPI indicators.

## Risks and Dependencies
- No live data sources; demo data must be curated to appear realistic.
- Real-time requirement requires eventual integration with event streams or polling.

## Open Questions
- Is there a need for role-based visibility or queue ownership?
