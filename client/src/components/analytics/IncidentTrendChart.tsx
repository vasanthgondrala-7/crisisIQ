import {
  LineChart,
  Line,
  XAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", incidents: 4 },
  { day: "Tue", incidents: 7 },
  { day: "Wed", incidents: 5 },
  { day: "Thu", incidents: 9 },
  { day: "Fri", incidents: 6 },
  { day: "Sat", incidents: 11 },
  { day: "Sun", incidents: 8 },
];

export default function IncidentTrendChart() {
  return (
    <div className="rounded-xl bg-[#0F172A] p-5">

      <h3 className="mb-5 text-lg font-semibold text-white">
        Weekly Incident Trend
      </h3>

      <ResponsiveContainer
        width="100%"
        height={260}
      >
        <LineChart data={data}>
          <XAxis dataKey="day" />

          <Tooltip />

          <Line
            dataKey="incidents"
            stroke="#3B82F6"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>

    </div>
  );
}