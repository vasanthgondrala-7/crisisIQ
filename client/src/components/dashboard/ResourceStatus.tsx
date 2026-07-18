import {
  Ambulance,
  Flame,
  Shield,
  Truck,
} from "lucide-react";

import { useIncidents } from "../../context/IncidentContext";

const resources = [
  {
    name: "Fire Engines",
    available: 12,
    icon: Flame,
    color: "text-red-400",
  },
  {
    name: "Ambulances",
    available: 8,
    icon: Ambulance,
    color: "text-green-400",
  },
  {
    name: "Police Units",
    available: 17,
    icon: Shield,
    color: "text-blue-400",
  },
  {
    name: "Supply Vehicles",
    available: 5,
    icon: Truck,
    color: "text-yellow-400",
  },
];

const statusStyles: Record<string, string> = {
  Pending: "bg-yellow-500/20 text-yellow-300",

  Dispatched: "bg-blue-500/20 text-blue-300",

  "En Route": "bg-purple-500/20 text-purple-300",

  "On Scene": "bg-orange-500/20 text-orange-300",

  Resolved: "bg-green-500/20 text-green-300",
};

function ResourceStatus() {
  const { selectedIncident } = useIncidents();

  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-3.5">
      <h2 className="mb-3 text-[18px] font-bold text-white">
        Resource Status
      </h2>

      <div className="space-y-2">
        {resources.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.name}
              className="flex items-center justify-between rounded-lg border border-white/10 px-3.5 py-2.5 transition-all duration-300 hover:border-blue-500/40"
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={item.color}
                  size={16}
                  strokeWidth={2.3}
                />

                <span className="text-[14px] font-medium text-white">
                  {item.name}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex h-7 min-w-[34px] items-center justify-center rounded-full bg-white/5 px-2">
                  <span className="text-[15px] font-bold text-white">
                    {item.available}
                  </span>
                </div>

                <span
                  className={`rounded-full px-2 py-1 text-xs font-medium ${
                    statusStyles[selectedIncident.status]
                  }`}
                >
                  {selectedIncident.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ResourceStatus;