import { useState } from 'react';

type AgingBuckets = {
  recent: number;
  watch: number;
  risk: number;
};

type QueueSnapshot = {
  name: string;
  total: number;
  aging: AgingBuckets;
};

type DashboardSnapshot = {
  incomingToday: number;
  completedToday: number;
  averageTat: number;
  queues: QueueSnapshot[];
};

const baseSnapshot: DashboardSnapshot = {
  incomingToday: 138,
  completedToday: 121,
  averageTat: 3.9,
  queues: [
    {
      name: 'Intake',
      total: 46,
      aging: { recent: 29, watch: 12, risk: 5 },
    },
    {
      name: 'Open Assessment',
      total: 38,
      aging: { recent: 20, watch: 13, risk: 5 },
    },
    {
      name: 'Pharmacist Consultation',
      total: 21,
      aging: { recent: 10, watch: 7, risk: 4 },
    },
    {
      name: 'Under Investigation',
      total: 18,
      aging: { recent: 8, watch: 6, risk: 4 },
    },
    {
      name: 'Completed',
      total: 54,
      aging: { recent: 38, watch: 13, risk: 3 },
    },
  ],
};

const jitter = (value: number, range: number) =>
  Math.max(0, Math.round(value + (Math.random() - 0.5) * range));

const scaleAging = (aging: AgingBuckets, total: number): AgingBuckets => {
  const bucketTotal = aging.recent + aging.watch + aging.risk;
  if (bucketTotal === 0) {
    return { recent: total, watch: 0, risk: 0 };
  }
  const recent = Math.max(0, Math.round((aging.recent / bucketTotal) * total));
  const watch = Math.max(0, Math.round((aging.watch / bucketTotal) * total));
  const risk = Math.max(0, total - recent - watch);
  return { recent, watch, risk };
};

const createSnapshot = (): DashboardSnapshot => {
  const queues = baseSnapshot.queues.map((queue) => {
    const total = jitter(queue.total, 10);
    return {
      ...queue,
      total,
      aging: scaleAging(queue.aging, total),
    };
  });

  return {
    incomingToday: jitter(baseSnapshot.incomingToday, 16),
    completedToday: jitter(baseSnapshot.completedToday, 14),
    averageTat: Number((baseSnapshot.averageTat + (Math.random() - 0.5) * 0.7).toFixed(1)),
    queues,
  };
};

const formatTime = (date: Date) =>
  new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);

export function Dashboard() {
  const [snapshot, setSnapshot] = useState<DashboardSnapshot>(() => createSnapshot());
  const [lastUpdated, setLastUpdated] = useState<Date>(() => new Date());

  const totalInQueues = snapshot.queues.reduce((sum, queue) => sum + queue.total, 0);
  const slaTarget = 5;
  const slaStatus = snapshot.averageTat <= slaTarget ? 'Within SLA' : 'At Risk';
  const slaAccent = snapshot.averageTat <= slaTarget ? 'ui-badge-success' : 'ui-badge-warning';

  const handleRefresh = () => {
    setSnapshot(createSnapshot());
    setLastUpdated(new Date());
  };

  return (
    <div className="flex h-full flex-col gap-6 overflow-auto bg-slate-50 px-6 py-6">
      <header className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold text-slate-900">
              Prior Authorization Operations Dashboard
            </h1>
          </div>
          <div className="flex flex-col items-end gap-3">
            <div className="text-right text-xs uppercase tracking-[0.2em] text-slate-400">
              Last updated
            </div>
            <div className="text-base font-semibold text-slate-800">{formatTime(lastUpdated)}</div>
            <button
              type="button"
              onClick={handleRefresh}
              className="inline-flex items-center gap-2 rounded-full bg-[#00373a] px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-[#004a4e]"
            >
              <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12a9 9 0 1 1-2.64-6.36" />
                <polyline points="21 3 21 9 15 9" />
              </svg>
              Refresh Snapshot
            </button>
          </div>
        </div>
      </header>

      <section className="grid gap-4 md:grid-cols-4">
        {[
          {
            label: 'Submissions Received Today',
            value: snapshot.incomingToday,
          },
          {
            label: 'Submissions Completed Today',
            value: snapshot.completedToday,
          },
          {
            label: 'Active Submissions',
            value: totalInQueues,
          },
          {
            label: 'Average Turnaround Time',
            value: `${snapshot.averageTat.toFixed(1)} days`,
          },
        ].map((card) => (
          <div
            key={card.label}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white px-5 py-4 shadow-sm"
          >
            <div className="space-y-2">
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{card.label}</p>
              <h2 className="text-3xl font-semibold text-slate-900">{card.value}</h2>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm text-slate-600">
              {card.label === 'Average Turnaround Time' ? (
                <span
                  className={`rounded-full border px-3 py-1 text-xs font-semibold ${slaAccent}`}
                >
                  {slaStatus} · {slaTarget} day SLA
                </span>
              ) : null}
            </div>
          </div>
        ))}
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white px-6 py-5 shadow-sm">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Queue Distribution</h3>
            </div>
          </div>

          <div className="space-y-4">
            {snapshot.queues.map((queue) => {
              const percent = totalInQueues ? Math.round((queue.total / totalInQueues) * 100) : 0;
              return (
                <div
                  key={queue.name}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{queue.name}</p>
                      <p className="text-xs text-slate-500">{percent}% of total</p>
                    </div>
                    <div className="text-lg font-semibold text-slate-900">{queue.total}</div>
                  </div>
                  <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-500"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold">
                    <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-800">
                      0-2 days · {queue.aging.recent}
                    </span>
                    <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-800">
                      3-4 days · {queue.aging.watch}
                    </span>
                    <span className="rounded-full border border-rose-200 bg-rose-50 px-3 py-1 text-rose-700">
                      5+ days · {queue.aging.risk}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
