import toast from "react-hot-toast";

import { useIncidents } from "../../context/IncidentContext";
import { useDispatchSimulation } from "../../context/DispatchSimulationContext";
import { useWorkspace } from "../../context/WorkspaceContext";

import DispatchVehicleCard from "../dispatch/DispatchVehicleCard";

type Resource = {
  name: string;
};

type Props = {
  recommendation: {
    fire: Resource;
    ambulance: Resource;
    police: Resource;
    eta: {
      fire: number;
      ambulance: number;
      police: number;
    };
  };
};

export default function DispatchRecommendation({
  recommendation,
}: Props) {
  const {
    selectedIncident,
    updateIncidentStatus,
  } = useIncidents();

  const {
    simulation,
    startSimulation,
    stopSimulation,
  } = useDispatchSimulation();

  const { pushNotification } = useWorkspace();

  const resolved = selectedIncident.status === "Resolved";
  const dispatched =
    selectedIncident.status !== "Pending" && !resolved;

  const handleDispatch = () => {
    if (simulation.running || resolved) return;

    updateIncidentStatus(
      selectedIncident.id,
      "Dispatched"
    );

    startSimulation();

    pushNotification(
      "Teams Dispatched",
      `${selectedIncident.title} units are en route`,
      "dispatch"
    );

    toast.success(
      "Emergency teams dispatched successfully!"
    );
  };

  const handleResolve = () => {
    updateIncidentStatus(selectedIncident.id, "Resolved");
    stopSimulation();

    pushNotification(
      "Incident Resolved",
      `${selectedIncident.title} closed · units returning to stations`,
      "dispatch"
    );

    toast.success("Incident resolved. Units returning home.");
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">

      <div className="mb-5">

        <h2 className="text-xl font-bold text-white">
          Smart Dispatch Center
        </h2>

        <p className="mt-1 text-sm text-slate-400">
          AI selected the nearest emergency units.
        </p>

      </div>

      {simulation.vehicles.length === 0 ? (

        <div className="space-y-3">

          <div className="rounded-lg bg-[#0F172A] p-4">

            <p className="font-semibold text-white">
              🚒 Fire Brigade
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {recommendation.fire.name}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              ETA : {recommendation.eta.fire} min
            </p>

          </div>

          <div className="rounded-lg bg-[#0F172A] p-4">

            <p className="font-semibold text-white">
              🚑 Ambulance
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {recommendation.ambulance.name}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              ETA : {recommendation.eta.ambulance} min
            </p>

          </div>

          <div className="rounded-lg bg-[#0F172A] p-4">

            <p className="font-semibold text-white">
              🚓 Police
            </p>

            <p className="mt-1 text-sm text-slate-400">
              {recommendation.police.name}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              ETA : {recommendation.eta.police} min
            </p>

          </div>

        </div>

      ) : (

        <div className="space-y-4">

          {simulation.vehicles.map((vehicle) => (

            <DispatchVehicleCard
              key={vehicle.id}
              vehicle={vehicle}
            />

          ))}

        </div>

      )}

      <button
        type="button"
        onClick={handleDispatch}
        disabled={simulation.running || dispatched || resolved}
        className={`mt-6 w-full rounded-lg py-3 font-semibold text-white transition-all duration-300 ${
          resolved
            ? "cursor-not-allowed bg-emerald-700"
            : simulation.running || dispatched
            ? "cursor-not-allowed bg-green-600"
            : "bg-blue-600 hover:bg-blue-700"
        }`}
      >
        {resolved
          ? "Incident Resolved"
          : simulation.running
          ? "Dispatch In Progress..."
          : dispatched
          ? "Teams Dispatched"
          : "Dispatch Teams"}
      </button>

      {!resolved && (
        <button
          type="button"
          onClick={handleResolve}
          className="mt-3 w-full rounded-lg border border-white/10 py-3 font-semibold text-white transition hover:bg-white/5"
        >
          Mark Resolved
        </button>
      )}

    </div>
  );
}