import { Send } from "lucide-react";
import {
  CircularProgressbar,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import toast from "react-hot-toast";

import { Incident, useIncidents } from "../../context/IncidentContext";
import { useDispatchSimulation } from "../../context/DispatchSimulationContext";
import { useWorkspace } from "../../context/WorkspaceContext";

type Props = {
  incident: Incident;
};

function AIPanel({ incident }: Props) {
  const { updateIncidentStatus } = useIncidents();
  const { simulation, startSimulation } = useDispatchSimulation();
  const { pushNotification } = useWorkspace();

  const resolved = incident.status === "Resolved";
  const alreadyDispatched =
    incident.status !== "Pending" && !resolved;
  const busy = simulation.running || alreadyDispatched || resolved;

  const severityStyle =
    incident.severity === "Critical"
      ? "bg-red-500/20 text-red-300 border border-red-500/20"
      : incident.severity === "High"
      ? "bg-amber-500/20 text-amber-300 border border-amber-500/20"
      : "bg-blue-500/20 text-blue-300 border border-blue-500/20";

  const resourceStyle = (resource: string) => {
    if (resource.toLowerCase().includes("fire"))
      return "bg-red-500/20 text-red-300 border border-red-500/20";

    if (resource.toLowerCase().includes("ambulance"))
      return "bg-green-500/20 text-green-300 border border-green-500/20";

    if (resource.toLowerCase().includes("police"))
      return "bg-blue-500/20 text-blue-300 border border-blue-500/20";

    return "bg-slate-700 text-white";
  };

  const handleDispatch = () => {
    if (busy) return;

    updateIncidentStatus(incident.id, "Dispatched");
    startSimulation();

    pushNotification(
      "AI Dispatch Confirmed",
      `${incident.title} · ${incident.resources.join(", ")}`,
      "dispatch"
    );

    toast.success("Recommended resources dispatched");
  };

  const buttonLabel = resolved
    ? "Incident Resolved"
    : simulation.running
    ? "Dispatch In Progress..."
    : alreadyDispatched
    ? "Resources Already Dispatched"
    : "Dispatch Recommended Resources";

  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-4">
      <div className="grid grid-cols-[1fr_135px] gap-5">
        <div>
          <h2 className="mb-3 text-[18px] font-bold text-white">
            AI Decision Center
          </h2>

          <div className="space-y-2.5">
            <InfoRow
              label="Severity"
              value={
                <span
                  className={`rounded-md px-2 py-0.5 text-[11px] font-semibold ${severityStyle}`}
                >
                  {incident.severity}
                </span>
              }
            />

            <InfoRow
              label="Priority Score"
              value={
                <span className="text-[14px] font-semibold text-white">
                  {incident.priority} / 100
                </span>
              }
            />

            <InfoRow
              label="Confidence"
              value={
                <span className="rounded bg-green-500/20 px-2 py-0.5 text-[12px] font-semibold text-green-400">
                  {incident.confidence}%
                </span>
              }
            />

            <div>
              <p className="mb-2 text-[13px] text-slate-400">
                Recommended Resources
              </p>

              <div className="flex flex-wrap gap-1.5">
                {incident.resources.map((resource: string) => (
                  <span
                    key={resource}
                    className={`rounded-md px-2 py-1 text-[11px] font-medium ${resourceStyle(resource)}`}
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-1 text-[13px] text-slate-400">
                AI Reasoning
              </p>

              <p className="line-clamp-3 text-[12px] leading-5 text-slate-300">
                {incident.reason}
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <div className="h-28 w-28">
            <CircularProgressbar
              value={incident.priority}
              text={`${incident.priority}`}
              styles={buildStyles({
                pathColor: "#ff5d5d",
                trailColor: "#2a3447",
                textColor: "#ffffff",
                strokeLinecap: "round",
                textSize: "28px",
              })}
            />
          </div>

          <p className="mt-1 text-[12px] text-slate-400">/100</p>

          <p className="text-center text-[11px] text-slate-500">
            Critical Score
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={handleDispatch}
        disabled={busy}
        className={`mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-lg text-[13px] font-semibold text-white transition-all duration-300 ${
          busy
            ? "cursor-not-allowed bg-emerald-700"
            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400"
        }`}
      >
        <Send size={14} />
        {buttonLabel}
      </button>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[13px] text-slate-400">{label}</span>
      {value}
    </div>
  );
}

export default AIPanel;
