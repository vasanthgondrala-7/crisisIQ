import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  TriangleAlert,
  BrainCircuit,
  BarChart3,
  Ambulance,
  Settings,
  Activity,
  ShieldCheck,
} from "lucide-react";

const navigation = [
  {
    title: "Overview",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    title: "Live Incidents",
    icon: TriangleAlert,
    path: "/incidents",
  },
  {
    title: "AI Decisions",
    icon: BrainCircuit,
    path: "/ai-decisions",
  },
  {
    title: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
  {
    title: "Resources",
    icon: Ambulance,
    path: "/resources",
  },
  {
    title: "Settings",
    icon: Settings,
    path: "/settings",
  },
];

export default function Sidebar() {
  return (
    <aside className="flex w-[280px] flex-col border-r border-white/10 bg-gradient-to-b from-[#0b1423] to-[#09111d]">
      <div className="px-7 pb-7 pt-8">
        <NavLink to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600/15">
            <ShieldCheck size={28} className="text-blue-500" />
          </div>

          <div>
            <h1 className="text-[22px] font-bold text-white">
              Crisis<span className="text-blue-500">IQ</span>
            </h1>

            <p className="mt-1 text-xs text-slate-400">
              Emergency Command Platform
            </p>
          </div>
        </NavLink>
      </div>

      <nav className="flex-1 px-4">
        <div className="space-y-1">
          {navigation.map(({ title, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === "/"}
              className={({ isActive }) =>
                `group flex h-12 w-full items-center gap-4 rounded-xl px-4 transition-all duration-300 ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`
              }
            >
              <Icon size={19} strokeWidth={2.1} />
              <span className="text-[15px] font-semibold">{title}</span>
            </NavLink>
          ))}
        </div>
      </nav>

      <div className="border-t border-white/10 p-5">
        <p className="mb-5 text-xs font-bold tracking-[0.18em] text-slate-500">
          SYSTEM HEALTH
        </p>

        <div className="space-y-4">
          <Status label="AI Engine" value="Healthy" />
          <Status label="Database" value="Healthy" />
          <Status label="API Server" value="Healthy" />
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-[#111c2d] p-4">
          <div className="flex items-center gap-3">
            <Activity size={18} className="text-green-400" />
            <div>
              <p className="text-sm font-semibold text-white">Version</p>
              <p className="text-xs text-slate-400">CrisisIQ v1.0</p>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

type StatusProps = {
  label: string;
  value: string;
};

function Status({ label, value }: StatusProps) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-slate-400">{label}</span>

      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
        <span className="text-xs text-green-400">{value}</span>
      </div>
    </div>
  );
}
