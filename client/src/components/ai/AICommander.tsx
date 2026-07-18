import {
  Brain,
  ShieldAlert,
  Activity,
  Users,
  IndianRupee,
  Radar,
} from "lucide-react";

import { useIncidents } from "../../context/IncidentContext";

import RiskScore from "./RiskScore";
import PredictionCard from "./PredictionCard";
import ActionCard from "./ActionCard";

export default function AICommander() {
  const { selectedIncident } = useIncidents();

  const riskScore = Math.min(
    100,
    selectedIncident.priority * 10 +
      Math.round(selectedIncident.confidence / 4)
  );

  const estimatedDamage =
    selectedIncident.severity === "Critical"
      ? "₹14.8 Million"
      : selectedIncident.severity === "High"
      ? "₹6.3 Million"
      : "₹1.2 Million";

  const affectedRadius =
    selectedIncident.severity === "Critical"
      ? "850 m"
      : selectedIncident.severity === "High"
      ? "500 m"
      : "150 m";

  const livesAtRisk =
    selectedIncident.severity === "Critical"
      ? 42
      : selectedIncident.severity === "High"
      ? 18
      : 5;

  return (
    <div className="space-y-5 rounded-xl border border-white/10 bg-[#111B2E] p-5">

      <div className="flex items-center gap-3">

        <Brain
          size={28}
          className="text-cyan-400"
        />

        <div>

          <h2 className="text-xl font-bold text-white">
            AI Commander
          </h2>

          <p className="text-sm text-slate-400">
            Autonomous Decision Support System
          </p>

        </div>

      </div>

      <RiskScore score={riskScore} />

      <PredictionCard
        severity={selectedIncident.severity}
        priority={selectedIncident.priority}
        confidence={selectedIncident.confidence}
      />

      <ActionCard
        severity={selectedIncident.severity}
        priority={selectedIncident.priority}
        type={selectedIncident.type}
      />

      <div className="grid grid-cols-2 gap-4">

        <MetricCard
          icon={
            <IndianRupee
              className="text-red-400"
              size={18}
            />
          }
          title="Estimated Damage"
          value={estimatedDamage}
        />

        <MetricCard
          icon={
            <Users
              className="text-yellow-400"
              size={18}
            />
          }
          title="Lives At Risk"
          value={`${livesAtRisk}`}
        />

        <MetricCard
          icon={
            <Radar
              className="text-blue-400"
              size={18}
            />
          }
          title="Affected Radius"
          value={affectedRadius}
        />

        <MetricCard
          icon={
            <ShieldAlert
              className="text-green-400"
              size={18}
            />
          }
          title="Threat Level"
          value={selectedIncident.severity}
        />

      </div>

      <div className="rounded-xl bg-[#0F172A] p-4">

        <div className="mb-2 flex items-center gap-2">

          <Activity
            size={18}
            className="text-emerald-400"
          />

          <h3 className="font-semibold text-white">
            AI Confidence
          </h3>

        </div>

        <div className="h-3 overflow-hidden rounded-full bg-slate-700">

          <div
            className="h-full rounded-full bg-emerald-500 transition-all duration-700"
            style={{
              width: `${selectedIncident.confidence}%`,
            }}
          />

        </div>

        <p className="mt-2 text-right text-sm font-semibold text-emerald-400">
          {selectedIncident.confidence}%
        </p>

      </div>

    </div>
  );
}

function MetricCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="rounded-lg bg-[#0F172A] p-4">

      <div className="mb-2 flex items-center gap-2">

        {icon}

        <span className="text-xs text-slate-400">
          {title}
        </span>

      </div>

      <h3 className="text-lg font-bold text-white">
        {value}
      </h3>

    </div>
  );
}