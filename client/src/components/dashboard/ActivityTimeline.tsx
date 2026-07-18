import { useIncidents } from "../../context/IncidentContext";

import {
  Brain,
  Flame,
  Ambulance,
  Shield,
  Route,
} from "lucide-react";

const icons = {
  critical: Flame,
  ai: Brain,
  dispatch: Ambulance,
  medical: Shield,
  traffic: Route,
};

const colors = {
  critical: "bg-red-500",
  ai: "bg-blue-500",
  dispatch: "bg-green-500",
  medical: "bg-emerald-500",
  traffic: "bg-yellow-500",
};

function ActivityTimeline() {
  const { activities } = useIncidents();

  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-3.5">
      <h2 className="mb-3 text-[18px] font-bold text-white">
        Live Activity Timeline
      </h2>

      {activities.length === 0 ? (
        <div className="flex h-32 items-center justify-center rounded-lg border border-dashed border-white/10">
          <p className="text-sm text-slate-500">
            No activity yet. Report an incident to begin.
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {activities.map((item) => {
            const Icon = icons[item.type];
            const color = colors[item.type];

            return (
              <div
                key={item.id}
                className="flex items-start gap-2.5"
              >
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${color}`}
                >
                  <Icon
                    size={13}
                    className="text-white"
                  />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="truncate text-[14px] font-semibold text-white">
                      {item.title}
                    </h3>

                    <span className="shrink-0 text-[11px] text-slate-500">
                      {item.time}
                    </span>
                  </div>

                  <p className="mt-0.5 line-clamp-2 text-[12px] leading-4 text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ActivityTimeline;