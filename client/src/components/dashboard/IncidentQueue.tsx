import { Incident } from "../../context/IncidentContext";

type Props = {
  incidents: Incident[];
  selectedId: string;
  onSelect: (incident: Incident) => void;
};

const severityStyles: Record<string, string> = {
  Critical: "bg-red-500/15 text-red-400",
  High: "bg-orange-500/15 text-orange-400",
  Medium: "bg-yellow-500/15 text-yellow-400",
  Low: "bg-green-500/15 text-green-400",
};

const statusStyles = {
  Pending: "bg-yellow-500/20 text-yellow-300",

  Dispatched:
    "bg-blue-500/20 text-blue-300",

  "En Route":
    "bg-purple-500/20 text-purple-300",

  "On Scene":
    "bg-orange-500/20 text-orange-300",

  Resolved:
    "bg-green-500/20 text-green-300",
};

function IncidentQueue({
  incidents,
  selectedId,
  onSelect,
}: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-3.5">
      <h2 className="mb-3 text-[18px] font-bold text-white">
        Live Incident Queue
      </h2>

      <div className="space-y-2">
        {incidents.map((incident) => (
          <button
            key={incident.id}
            onClick={() => onSelect(incident)}
            className={`w-full rounded-lg border px-3.5 py-3 text-left transition-all duration-300 ${
              selectedId === incident.id
                ? "border-blue-500 bg-blue-500/10"
                : "border-white/10 hover:border-blue-500/40"
            }`}
          >
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-[15px] font-semibold text-white">
                  {incident.title}
                </h3>

                <p className="mt-1 text-[13px] text-slate-400">
                  📍 {incident.location}
                </p>
              </div>

              <span className="text-[12px] text-slate-500">
                {incident.time}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between">
              <span
                className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                  severityStyles[incident.severity]
                }`}
              >
                {incident.severity}
              </span>

              <span
                className={`rounded-full px-2 py-1 text-[11px] font-medium ${
                  statusStyles[incident.status]
                }`}
              >
                {incident.status}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

export default IncidentQueue;