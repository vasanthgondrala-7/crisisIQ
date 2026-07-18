import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  Ambulance,
  Flame,
  MapPin,
  RotateCcw,
  Shield,
} from "lucide-react";

import {
  AMBULANCES,
  FIRE_STATIONS,
  HOSPITALS,
  POLICE_STATIONS,
} from "../data/emergencyResources";
import { useDispatchSimulation } from "../context/DispatchSimulationContext";
import { useIncidents } from "../context/IncidentContext";
import { useWorkspace } from "../context/WorkspaceContext";

type FleetUnit = {
  id: string;
  name: string;
  kind: "Fire" | "Medical" | "Police";
  station: string;
  status: "Available" | "Deployed" | "Returning";
};

const baseFleet: FleetUnit[] = [
  {
    id: "engine-04",
    name: "Engine-04",
    kind: "Fire",
    station: "Fire Station Alpha",
    status: "Available",
  },
  {
    id: "engine-12",
    name: "Fire Engine 12",
    kind: "Fire",
    station: "Hyderabad Fire Station",
    status: "Available",
  },
  {
    id: "ambulance-01",
    name: "Ambulance-01",
    kind: "Medical",
    station: "Metropolitan General Hospital",
    status: "Available",
  },
  {
    id: "ambulance-a21",
    name: "Ambulance A-21",
    kind: "Medical",
    station: "Apollo Hospital",
    status: "Available",
  },
  {
    id: "cruiser-12",
    name: "Cruiser-12",
    kind: "Police",
    station: "Central Police Precinct",
    status: "Available",
  },
  {
    id: "police-p4",
    name: "Police Unit P4",
    kind: "Police",
    station: "Banjara Hills Police Station",
    status: "Available",
  },
];

export default function ResourcesPage() {
  const { simulation, stopSimulation } = useDispatchSimulation();
  const { selectedIncident, updateIncidentStatus } = useIncidents();
  const { pushNotification } = useWorkspace();
  const [manualOverrides, setManualOverrides] = useState<
    Record<string, FleetUnit["status"]>
  >({});

  const fleet = useMemo(() => {
    return baseFleet.map((unit) => {
      if (manualOverrides[unit.id]) {
        return { ...unit, status: manualOverrides[unit.id] };
      }

      if (simulation.running) {
        return { ...unit, status: "Deployed" as const };
      }

      if (simulation.completed) {
        return { ...unit, status: "Available" as const };
      }

      return unit;
    });
  }, [manualOverrides, simulation.completed, simulation.running]);

  const counts = {
    available: fleet.filter((unit) => unit.status === "Available").length,
    deployed: fleet.filter((unit) => unit.status === "Deployed").length,
    returning: fleet.filter((unit) => unit.status === "Returning").length,
  };

  const recallAll = () => {
    stopSimulation();
    setManualOverrides(
      Object.fromEntries(
        baseFleet.map((unit) => [unit.id, "Available" as const])
      )
    );

    if (selectedIncident.status !== "Resolved") {
      updateIncidentStatus(selectedIncident.id, "Resolved");
    }

    pushNotification(
      "Units Recalled",
      "All deployed units returning to home stations",
      "dispatch"
    );
    toast.success("All units recalled to stations");
  };

  const toggleUnit = (unit: FleetUnit) => {
    const next =
      unit.status === "Available"
        ? "Deployed"
        : unit.status === "Deployed"
        ? "Returning"
        : "Available";

    setManualOverrides((prev) => ({ ...prev, [unit.id]: next }));
    toast.success(`${unit.name} marked ${next}`);
  };

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[25px] font-bold tracking-tight text-white">
            Resources
          </h1>
          <p className="mt-1 text-[15px] text-slate-400">
            Stations, fleet readiness, and live deployment controls
          </p>
        </div>

        <button
          type="button"
          onClick={recallAll}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
        >
          <RotateCcw size={16} />
          Recall All Units
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Metric label="Available" value={counts.available} tone="text-emerald-400" />
        <Metric label="Deployed" value={counts.deployed} tone="text-orange-400" />
        <Metric label="Returning" value={counts.returning} tone="text-sky-400" />
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Operational Hubs
          </h2>

          <div className="space-y-3">
            {FIRE_STATIONS.map((station) => (
              <HubRow
                key={`fire-${station.id}`}
                icon={<Flame className="text-orange-400" size={16} />}
                name={station.name}
                coords={station.position}
              />
            ))}
            {HOSPITALS.map((hospital) => (
              <HubRow
                key={`hospital-${hospital.id}`}
                icon={<Ambulance className="text-emerald-400" size={16} />}
                name={hospital.name}
                coords={hospital.position}
              />
            ))}
            {POLICE_STATIONS.map((station) => (
              <HubRow
                key={`police-${station.id}`}
                icon={<Shield className="text-violet-400" size={16} />}
                name={station.name}
                coords={station.position}
              />
            ))}
            {AMBULANCES.map((unit) => (
              <HubRow
                key={`amb-${unit.id}`}
                icon={<MapPin className="text-blue-400" size={16} />}
                name={unit.name}
                coords={unit.position}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">Fleet Board</h2>

          <div className="space-y-3">
            {fleet.map((unit) => (
              <div
                key={unit.id}
                className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3"
              >
                <div>
                  <p className="font-semibold text-white">{unit.name}</p>
                  <p className="mt-1 text-xs text-slate-400">
                    {unit.kind} · {unit.station}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      unit.status === "Available"
                        ? "bg-emerald-500/15 text-emerald-300"
                        : unit.status === "Deployed"
                        ? "bg-orange-500/15 text-orange-300"
                        : "bg-sky-500/15 text-sky-300"
                    }`}
                  >
                    {unit.status}
                  </span>

                  <button
                    type="button"
                    onClick={() => toggleUnit(unit)}
                    className="rounded-lg bg-blue-600 px-3 py-2 text-xs font-semibold text-white transition hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({
  label,
  value,
  tone,
}: {
  label: string;
  value: number;
  tone: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className={`mt-2 text-3xl font-bold ${tone}`}>{value}</p>
    </div>
  );
}

function HubRow({
  icon,
  name,
  coords,
}: {
  icon: React.ReactNode;
  name: string;
  coords: [number, number];
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3">
      <div className="flex items-center gap-3">
        {icon}
        <div>
          <p className="text-sm font-semibold text-white">{name}</p>
          <p className="text-xs text-slate-400">
            {coords[0].toFixed(3)}, {coords[1].toFixed(3)}
          </p>
        </div>
      </div>
    </div>
  );
}
