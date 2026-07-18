import {
  Shield,
  Hospital,
  Flame,
  Bell,
  MapPinned,
  Siren,
} from "lucide-react";
import toast from "react-hot-toast";

import { useIncidents } from "../../context/IncidentContext";
import { useWorkspace } from "../../context/WorkspaceContext";
import { useDispatchSimulation } from "../../context/DispatchSimulationContext";

type Props = {
  severity: string;
  priority: number;
  type: string;
};

type Action = {
  icon: React.ReactNode;
  title: string;
  level: "Critical" | "High" | "Normal";
};

export default function ActionCard({
  severity,
  priority,
  type,
}: Props) {
  const { addActivity, selectedIncident, updateIncidentStatus } =
    useIncidents();
  const { pushNotification } = useWorkspace();
  const { simulation, startSimulation } = useDispatchSimulation();

  const actions: Action[] = [];

  if (type === "Fire") {
    actions.push({
      icon: <Flame size={18} className="text-orange-400" />,
      title: "Dispatch nearest Fire Brigade",
      level: "Critical",
    });

    actions.push({
      icon: <Hospital size={18} className="text-green-400" />,
      title: "Alert nearby Hospitals",
      level: "High",
    });

    actions.push({
      icon: <Shield size={18} className="text-blue-400" />,
      title: "Deploy Police for crowd control",
      level: "High",
    });
  }

  if (type === "Medical") {
    actions.push({
      icon: <Hospital size={18} className="text-green-400" />,
      title: "Dispatch Advanced Life Support Ambulance",
      level: "Critical",
    });

    actions.push({
      icon: <Bell size={18} className="text-yellow-400" />,
      title: "Notify Emergency Department",
      level: "High",
    });
  }

  if (type === "Traffic") {
    actions.push({
      icon: <Shield size={18} className="text-blue-400" />,
      title: "Redirect Traffic",
      level: "High",
    });

    actions.push({
      icon: <MapPinned size={18} className="text-purple-400" />,
      title: "Close Affected Road",
      level: "Normal",
    });
  }

  if (type === "Flood" || type === "Earthquake" || type === "Disaster") {
    actions.push({
      icon: <Siren size={18} className="text-red-400" />,
      title: "Activate multi-agency response",
      level: "Critical",
    });

    actions.push({
      icon: <Bell size={18} className="text-yellow-400" />,
      title: "Issue public safety advisory",
      level: "High",
    });
  }

  if (priority >= 8) {
    actions.push({
      icon: <Siren size={18} className="text-red-400" />,
      title: "Broadcast Public Emergency Alert",
      level: "Critical",
    });
  }

  if (severity === "Critical") {
    actions.push({
      icon: <Bell size={18} className="text-red-400" />,
      title: "Request Additional Backup Units",
      level: "Critical",
    });
  }

  if (actions.length === 0) {
    actions.push({
      icon: <Shield size={18} className="text-blue-400" />,
      title: "Monitor and stage standby units",
      level: "Normal",
    });
  }

  const runAction = (action: Action) => {
    const isDispatchAction = action.title.toLowerCase().includes("dispatch");

    if (
      isDispatchAction &&
      selectedIncident.status === "Pending" &&
      !simulation.running
    ) {
      updateIncidentStatus(selectedIncident.id, "Dispatched");
      startSimulation();
    }

    addActivity("AI Action Applied", action.title, "ai");
    pushNotification("AI Action", action.title, "ai");
    toast.success(action.title);
  };

  return (
    <div className="rounded-xl bg-[#0F172A] p-5">
      <h3 className="mb-4 text-lg font-semibold text-white">
        AI Recommended Actions
      </h3>

      <div className="space-y-3">
        {actions.map((action, index) => (
          <ActionItem
            key={`${action.title}-${index}`}
            {...action}
            onExecute={() => runAction(action)}
          />
        ))}
      </div>
    </div>
  );
}

function ActionItem({
  icon,
  title,
  level,
  onExecute,
}: Action & { onExecute: () => void }) {
  const badge =
    level === "Critical"
      ? "bg-red-500/20 text-red-300"
      : level === "High"
      ? "bg-yellow-500/20 text-yellow-300"
      : "bg-green-500/20 text-green-300";

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-white/5 bg-slate-800 p-3">
      <div className="flex min-w-0 items-center gap-3">
        {icon}
        <span className="truncate text-sm text-white">{title}</span>
      </div>

      <div className="flex shrink-0 items-center gap-2">
        <span
          className={`rounded-full px-2 py-1 text-xs font-semibold ${badge}`}
        >
          {level}
        </span>
        <button
          type="button"
          onClick={onExecute}
          className="rounded-md bg-blue-600 px-2.5 py-1 text-xs font-semibold text-white transition hover:bg-blue-700"
        >
          Run
        </button>
      </div>
    </div>
  );
}
