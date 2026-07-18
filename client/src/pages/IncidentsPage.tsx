import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Filter, MapPinned, Siren } from "lucide-react";
import toast from "react-hot-toast";

import {
  Incident,
  IncidentStatus,
  useIncidents,
} from "../context/IncidentContext";
import { useWorkspace } from "../context/WorkspaceContext";
import { useDispatchSimulation } from "../context/DispatchSimulationContext";
import EmergencyMap from "../components/map/EmergencyMap";

const severityStyles: Record<string, string> = {
  Critical: "bg-red-500/15 text-red-400",
  High: "bg-orange-500/15 text-orange-400",
  Medium: "bg-yellow-500/15 text-yellow-400",
  Low: "bg-green-500/15 text-green-400",
};

const statusStyles: Record<IncidentStatus, string> = {
  Pending: "bg-yellow-500/20 text-yellow-300",
  Dispatched: "bg-blue-500/20 text-blue-300",
  "En Route": "bg-purple-500/20 text-purple-300",
  "On Scene": "bg-orange-500/20 text-orange-300",
  Resolved: "bg-green-500/20 text-green-300",
};

const filters = ["All", "Pending", "Dispatched", "En Route", "On Scene", "Resolved"] as const;

export default function IncidentsPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { searchQuery, setSearchQuery, pushNotification } = useWorkspace();
  const {
    incidents,
    selectedIncident,
    selectIncident,
    updateIncidentStatus,
  } = useIncidents();
  const { startSimulation, stopSimulation, simulation } =
    useDispatchSimulation();

  const [statusFilter, setStatusFilter] =
    useState<(typeof filters)[number]>("All");

  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null) setSearchQuery(q);
  }, [searchParams, setSearchQuery]);

  const filtered = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    return incidents.filter((incident) => {
      const matchesStatus =
        statusFilter === "All" || incident.status === statusFilter;

      const matchesQuery =
        !query ||
        incident.title.toLowerCase().includes(query) ||
        incident.location.toLowerCase().includes(query) ||
        incident.type.toLowerCase().includes(query) ||
        incident.severity.toLowerCase().includes(query);

      return matchesStatus && matchesQuery;
    });
  }, [incidents, searchQuery, statusFilter]);

  const advanceStatus = (incident: Incident) => {
    const flow: IncidentStatus[] = [
      "Pending",
      "Dispatched",
      "En Route",
      "On Scene",
      "Resolved",
    ];

    const index = flow.indexOf(incident.status);
    if (index < 0 || index >= flow.length - 1) return;

    const next = flow[index + 1];
    selectIncident(incident);
    updateIncidentStatus(incident.id, next);

    if (next === "Dispatched" && !simulation.running) {
      startSimulation();
    }

    if (next === "Resolved") {
      stopSimulation();
      pushNotification(
        "Incident Resolved",
        `${incident.title} closed and units released`,
        "dispatch"
      );
    }

    toast.success(`${incident.title} → ${next}`);
  };

  const openOnMap = (incident: Incident) => {
    selectIncident(incident);
    navigate("/");
  };

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[25px] font-bold tracking-tight text-white">
            Live Incidents
          </h1>
          <p className="mt-1 text-[15px] text-slate-400">
            Filter, advance lifecycle status, and jump to map dispatch
          </p>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111B2E] px-4 py-3 text-sm text-slate-300">
          {filtered.length} shown · {incidents.length} total
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Filter size={16} className="text-slate-500" />
        {filters.map((filter) => (
          <button
            key={filter}
            type="button"
            onClick={() => setStatusFilter(filter)}
            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
              statusFilter === filter
                ? "bg-blue-600 text-white"
                : "border border-white/10 text-slate-400 hover:bg-white/5 hover:text-white"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="rounded-xl border border-white/10 bg-[#111B2E] p-10 text-center text-slate-400">
              No incidents match this filter
            </div>
          ) : (
            filtered.map((incident) => (
              <div
                key={incident.id}
                className={`rounded-xl border p-4 transition ${
                  selectedIncident.id === incident.id
                    ? "border-blue-500 bg-blue-500/10"
                    : "border-white/10 bg-[#111B2E]"
                }`}
              >
                <button
                  type="button"
                  onClick={() => selectIncident(incident)}
                  className="w-full text-left"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {incident.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        {incident.location} · {incident.type}
                      </p>
                    </div>
                    <span className="text-xs text-slate-500">
                      {incident.time}
                    </span>
                  </div>

                  <p className="mt-3 text-sm text-slate-300">
                    {incident.description}
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        severityStyles[incident.severity]
                      }`}
                    >
                      {incident.severity}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        statusStyles[incident.status]
                      }`}
                    >
                      {incident.status}
                    </span>
                    <span className="rounded-full bg-white/5 px-2.5 py-1 text-xs text-slate-300">
                      Priority {incident.priority}
                    </span>
                  </div>
                </button>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => openOnMap(incident)}
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    <MapPinned size={14} />
                    Open on Map
                  </button>

                  {incident.status !== "Resolved" && (
                    <button
                      type="button"
                      onClick={() => advanceStatus(incident)}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white transition hover:bg-white/5"
                    >
                      <Siren size={14} />
                      Advance Status
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="space-y-4">
          <EmergencyMap />
          <div className="rounded-xl border border-white/10 bg-[#111B2E] p-4">
            <h3 className="text-lg font-semibold text-white">
              Selected Incident
            </h3>
            <p className="mt-2 text-sm text-slate-300">
              {selectedIncident.title}
            </p>
            <p className="mt-1 text-sm text-slate-400">
              {selectedIncident.reason}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {selectedIncident.resources.map((resource) => (
                <span
                  key={resource}
                  className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300"
                >
                  {resource}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
