import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import IncidentTrendChart from "../components/analytics/IncidentTrendChart";
import ResponseTimeCard from "../components/analytics/ResponseTimeCard";
import { useIncidents } from "../context/IncidentContext";
import { calculateDashboardStats } from "../utils/dashboardAnalytics";

const ranges = ["24h", "7d", "30d"] as const;

export default function AnalyticsPage() {
  const { incidents } = useIncidents();
  const [range, setRange] = useState<(typeof ranges)[number]>("7d");
  const stats = calculateDashboardStats(incidents);

  const byType = useMemo(() => {
    const counts: Record<string, number> = {};
    incidents.forEach((incident) => {
      counts[incident.type] = (counts[incident.type] || 0) + 1;
    });

    return Object.entries(counts).map(([type, count]) => ({
      type,
      count,
    }));
  }, [incidents]);

  const bySeverity = useMemo(() => {
    const order = ["Critical", "High", "Medium", "Low"];
    return order.map((severity) => ({
      severity,
      count: incidents.filter((incident) => incident.severity === severity)
        .length,
    }));
  }, [incidents]);

  const resolvedRate = useMemo(() => {
    if (incidents.length === 0) return 0;
    const resolved = incidents.filter(
      (incident) => incident.status === "Resolved"
    ).length;
    return Math.round((resolved / incidents.length) * 100);
  }, [incidents]);

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[25px] font-bold tracking-tight text-white">
            Analytics
          </h1>
          <p className="mt-1 text-[15px] text-slate-400">
            Operational performance across incident load and response speed
          </p>
        </div>

        <div className="flex gap-2">
          {ranges.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`rounded-lg px-3 py-2 text-sm font-semibold transition ${
                range === item
                  ? "bg-blue-600 text-white"
                  : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric title="Active Critical" value={String(stats.critical)} />
        <Metric title="High Priority" value={String(stats.high)} />
        <Metric title="Resources Engaged" value={String(stats.activeResources)} />
        <Metric title="Resolution Rate" value={`${resolvedRate}%`} />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <IncidentTrendChart />
        <ResponseTimeCard />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <ChartCard title={`Incidents by Type (${range})`}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byType}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="type" stroke="#94a3b8" />
              <YAxis allowDecimals={false} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="count" fill="#3B82F6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard title={`Severity Distribution (${range})`}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={bySeverity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="severity" stroke="#94a3b8" />
              <YAxis allowDecimals={false} stroke="#94a3b8" />
              <Tooltip />
              <Bar dataKey="count" fill="#F97316" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    </section>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-4">
      <p className="text-sm text-slate-400">{title}</p>
      <p className="mt-2 text-3xl font-bold text-white">{value}</p>
    </div>
  );
}

function ChartCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">{title}</h3>
      {children}
    </div>
  );
}
