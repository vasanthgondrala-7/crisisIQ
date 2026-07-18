import toast from "react-hot-toast";
import { BrainCircuit, CheckCircle2, Play } from "lucide-react";

import AICommander from "../components/ai/AICommander";
import { useIncidents } from "../context/IncidentContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { useDispatchSimulation } from "../context/DispatchSimulationContext";

export default function AIDecisionsPage() {
  const {
    incidents,
    selectedIncident,
    selectIncident,
    updateIncidentStatus,
    addActivity,
  } = useIncidents();
  const { pushNotification } = useWorkspace();
  const { startSimulation, simulation } = useDispatchSimulation();

  const ranked = [...incidents].sort(
    (a, b) => b.priority - a.priority || b.confidence - a.confidence
  );

  const executeDecision = () => {
    if (selectedIncident.status === "Resolved") {
      toast.error("Resolved incidents cannot be re-dispatched");
      return;
    }

    if (selectedIncident.status === "Pending") {
      updateIncidentStatus(selectedIncident.id, "Dispatched");
      if (!simulation.running) startSimulation();
    }

    addActivity(
      "AI Decision Executed",
      `Applied triage plan for ${selectedIncident.title}`,
      "ai"
    );

    pushNotification(
      "AI Decision Applied",
      `${selectedIncident.title} resources confirmed by AI Commander`,
      "ai"
    );

    toast.success("AI decision executed");
  };

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[25px] font-bold tracking-tight text-white">
            AI Decisions
          </h1>
          <p className="mt-1 text-[15px] text-slate-400">
            Review triage rankings and execute recommended response plans
          </p>
        </div>

        <button
          type="button"
          onClick={executeDecision}
          className="inline-flex items-center gap-2 rounded-xl bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          <Play size={16} />
          Execute Selected Plan
        </button>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="space-y-3">
          {ranked.map((incident, index) => (
            <button
              key={incident.id}
              type="button"
              onClick={() => selectIncident(incident)}
              className={`w-full rounded-xl border p-4 text-left transition ${
                selectedIncident.id === incident.id
                  ? "border-cyan-500 bg-cyan-500/10"
                  : "border-white/10 bg-[#111B2E] hover:border-cyan-500/40"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-sm font-bold text-cyan-300">
                    #{index + 1}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-white">
                      {incident.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      {incident.location} · {incident.type}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    P{incident.priority}
                  </p>
                  <p className="text-xs text-slate-400">
                    {incident.confidence}% conf
                  </p>
                </div>
              </div>

              <p className="mt-3 text-sm text-slate-300">{incident.reason}</p>

              <div className="mt-3 flex flex-wrap gap-2">
                {incident.resources.map((resource) => (
                  <span
                    key={resource}
                    className="rounded-full bg-white/5 px-2.5 py-1 text-[11px] text-slate-300"
                  >
                    {resource}
                  </span>
                ))}
              </div>
            </button>
          ))}
        </div>

        <div className="space-y-4">
          <AICommander />

          <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
            <div className="mb-4 flex items-center gap-2">
              <BrainCircuit className="text-cyan-400" size={20} />
              <h3 className="text-lg font-semibold text-white">
                Decision Log
              </h3>
            </div>

            <div className="space-y-3">
              {ranked.slice(0, 4).map((incident) => (
                <div
                  key={`log-${incident.id}`}
                  className="flex items-start gap-3 rounded-lg bg-[#0F172A] p-3"
                >
                  <CheckCircle2 className="mt-0.5 text-emerald-400" size={16} />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Triaged {incident.title}
                    </p>
                    <p className="mt-1 text-xs text-slate-400">
                      Severity {incident.severity} · recommended{" "}
                      {incident.resources.join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
