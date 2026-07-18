import {
  Brain,
  Siren,
  Flame,
  Ambulance,
  Shield,
  CheckCircle,
} from "lucide-react";

import TimelineItem from "./TimelineItem";

import {
  useIncidents,
} from "../../context/IncidentContext";

export default function MissionTimeline() {
  const { activities } = useIncidents();

  const getIcon = (type: string) => {
    switch (type) {
      case "critical":
        return (
          <Siren
            size={18}
            className="text-red-400"
          />
        );

      case "ai":
        return (
          <Brain
            size={18}
            className="text-cyan-400"
          />
        );

      case "medical":
        return (
          <Ambulance
            size={18}
            className="text-green-400"
          />
        );

      case "traffic":
        return (
          <Shield
            size={18}
            className="text-blue-400"
          />
        );

      case "dispatch":
        return (
          <Flame
            size={18}
            className="text-orange-400"
          />
        );

      default:
        return (
          <CheckCircle
            size={18}
            className="text-emerald-400"
          />
        );
    }
  };

  return (
    <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
      <h2 className="mb-6 text-xl font-bold text-white">
        Mission Timeline
      </h2>

      <div>
        {activities.map((activity, index) => (
          <TimelineItem
            key={activity.id}
            icon={getIcon(activity.type)}
            title={activity.title}
            description={activity.description}
            time={activity.time}
            isLast={
              index === activities.length - 1
            }
          />
        ))}
      </div>
    </div>
  );
}