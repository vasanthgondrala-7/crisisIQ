import toast from "react-hot-toast";
import { Save, RotateCcw } from "lucide-react";
import { useWorkspace } from "../context/WorkspaceContext";

export default function SettingsPage() {
  const { settings, updateSettings, pushNotification } = useWorkspace();

  const saveSettings = () => {
    pushNotification(
      "Settings Saved",
      "Operator preferences updated for this workstation",
      "system"
    );
    toast.success("Settings saved");
  };

  const resetSettings = () => {
    updateSettings({
      soundAlerts: true,
      autoDispatchSuggest: true,
      mapClustering: false,
      darkCommandTheme: true,
      refreshIntervalSec: 5,
      operatorCallsign: "Admin",
    });
    toast.success("Settings reset to defaults");
  };

  return (
    <section className="space-y-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-[25px] font-bold tracking-tight text-white">
            Settings
          </h1>
          <p className="mt-1 text-[15px] text-slate-400">
            Configure command-center preferences for this operator station
          </p>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={resetSettings}
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/5"
          >
            <RotateCcw size={16} />
            Reset
          </button>
          <button
            type="button"
            onClick={saveSettings}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            <Save size={16} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Operator Profile
          </h2>

          <label className="mb-2 block text-sm text-slate-400">
            Callsign
          </label>
          <input
            value={settings.operatorCallsign}
            onChange={(event) =>
              updateSettings({ operatorCallsign: event.target.value })
            }
            className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
          />

          <label className="mb-2 mt-5 block text-sm text-slate-400">
            Live refresh interval (seconds)
          </label>
          <input
            type="number"
            min={1}
            max={60}
            value={settings.refreshIntervalSec}
            onChange={(event) =>
              updateSettings({
                refreshIntervalSec: Number(event.target.value) || 5,
              })
            }
            className="w-full rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-white outline-none focus:border-blue-500"
          />
        </div>

        <div className="rounded-xl border border-white/10 bg-[#111B2E] p-5">
          <h2 className="mb-4 text-lg font-semibold text-white">
            System Toggles
          </h2>

          <div className="space-y-3">
            <ToggleRow
              label="Sound alerts"
              description="Play cue when critical incidents arrive"
              checked={settings.soundAlerts}
              onChange={(checked) => updateSettings({ soundAlerts: checked })}
            />
            <ToggleRow
              label="Auto dispatch suggestions"
              description="Show nearest-unit recommendations automatically"
              checked={settings.autoDispatchSuggest}
              onChange={(checked) =>
                updateSettings({ autoDispatchSuggest: checked })
              }
            />
            <ToggleRow
              label="Map clustering"
              description="Group nearby markers on dense city maps"
              checked={settings.mapClustering}
              onChange={(checked) => updateSettings({ mapClustering: checked })}
            />
            <ToggleRow
              label="Dark command theme"
              description="Keep high-contrast night operations palette"
              checked={settings.darkCommandTheme}
              onChange={(checked) =>
                updateSettings({ darkCommandTheme: checked })
              }
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="flex w-full items-center justify-between rounded-lg border border-white/10 bg-[#0F172A] px-4 py-3 text-left transition hover:border-blue-500/40"
    >
      <div>
        <p className="text-sm font-semibold text-white">{label}</p>
        <p className="mt-1 text-xs text-slate-400">{description}</p>
      </div>

      <span
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-blue-600" : "bg-slate-600"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </span>
    </button>
  );
}
