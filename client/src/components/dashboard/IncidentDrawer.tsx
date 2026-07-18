import { X, MapPin, ShieldAlert } from "lucide-react";
import { Incident } from "../../context/IncidentContext";

type Props = {
  incident: Incident | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function IncidentDrawer({
  incident,
  isOpen,
  onClose,
}: Props) {
  if (!isOpen || !incident) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-[420px] border-l border-white/10 bg-[#111B2E] shadow-2xl">
      <div className="flex items-center justify-between border-b border-white/10 p-5">
        <h2 className="text-xl font-bold text-white">
          Incident Details
        </h2>

        <button
          onClick={onClose}
          className="rounded-lg p-2 hover:bg-white/5"
        >
          <X className="text-slate-400" size={20} />
        </button>
      </div>

      <div className="space-y-5 p-5">
        <div>
          <span className="rounded-full bg-red-500/20 px-3 py-1 text-xs font-semibold text-red-400">
            {incident.severity}
          </span>

          <h3 className="mt-3 text-xl font-bold text-white">
            {incident.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-slate-400">
            <MapPin size={16} />
            {incident.location}
          </div>
        </div>

        <div className="rounded-xl bg-[#0F172A] p-4">
          <p className="text-sm text-slate-400">
            Priority Score
          </p>

          <p className="mt-1 text-3xl font-bold text-white">
            {incident.priority}
          </p>

          <p className="mt-3 text-sm text-slate-400">
            Confidence
          </p>

          <p className="text-lg font-semibold text-green-400">
            {incident.confidence}%
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-white">
            AI Reasoning
          </h4>

          <p className="text-sm leading-6 text-slate-300">
            {incident.reason}
          </p>
        </div>

        <div>
          <h4 className="mb-2 font-semibold text-white">
            Recommended Resources
          </h4>

          <div className="flex flex-wrap gap-2">
            {incident.resources.map((resource) => (
              <span
                key={resource}
                className="rounded-md bg-blue-600/20 px-3 py-2 text-sm text-blue-300"
              >
                {resource}
              </span>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 pt-3">
          <button className="rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700">
            Assign Team
          </button>

          <button className="rounded-lg border border-white/10 py-3 font-semibold text-white hover:bg-white/5">
            <div className="flex items-center justify-center gap-2">
              <ShieldAlert size={16} />
              View on Map
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}