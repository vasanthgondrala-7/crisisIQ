import {
  AlertTriangle,
  TrendingUp,
  Wind,
  CloudRain,
} from "lucide-react";

type Props = {
  severity: string;
  priority: number;
  confidence: number;
};

export default function PredictionCard({
  severity,
  priority,
  confidence,
}: Props) {
  const risk =
    severity === "Critical"
      ? "Fire may spread to nearby structures within 12 minutes."
      : severity === "High"
      ? "Situation likely to escalate without intervention."
      : "Situation is stable with low escalation risk.";

  const traffic =
    priority >= 8
      ? "Heavy traffic congestion expected."
      : "Traffic flow remains manageable.";

  const weather =
    severity === "Critical"
      ? "Strong winds may increase fire intensity."
      : "Weather impact is minimal.";

  return (
    <div className="rounded-xl bg-[#0F172A] p-5">

      <div className="mb-4 flex items-center gap-2">

        <TrendingUp
          size={20}
          className="text-red-400"
        />

        <h3 className="font-semibold text-white">
          AI Prediction
        </h3>

      </div>

      <PredictionRow
        icon={<AlertTriangle size={18} />}
        title="Escalation"
        value={risk}
      />

      <PredictionRow
        icon={<Wind size={18} />}
        title="Traffic"
        value={traffic}
      />

      <PredictionRow
        icon={<CloudRain size={18} />}
        title="Weather"
        value={weather}
      />

      <div className="mt-5 rounded-lg bg-slate-800 p-3">

        <p className="text-xs text-slate-400">
          AI Confidence
        </p>

        <h2 className="mt-1 text-2xl font-bold text-emerald-400">
          {confidence}%
        </h2>

      </div>

    </div>
  );
}

function PredictionRow({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="mb-4 flex gap-3">

      <div className="mt-1 text-blue-400">
        {icon}
      </div>

      <div>

        <p className="text-sm font-semibold text-white">
          {title}
        </p>

        <p className="text-xs leading-5 text-slate-400">
          {value}
        </p>

      </div>

    </div>
  );
}