import {
  AlertTriangle,
  Star,
  Boxes,
  BarChart3
} from "lucide-react";

type Props = {
  title: string;
  value: string | number;
  change: string;
};

const config = {
  "Critical Incidents": {
    icon: AlertTriangle,
    iconBg: "bg-red-500/15",
    iconColor: "text-red-400",
    changeColor: "text-red-400"
  },

  "High Priority": {
    icon: Star,
    iconBg: "bg-amber-500/15",
    iconColor: "text-amber-400",
    changeColor: "text-amber-400"
  },

  "Resources Active": {
    icon: Boxes,
    iconBg: "bg-green-500/15",
    iconColor: "text-green-400",
    changeColor: "text-green-400"
  },

  "Avg Response Time": {
    icon: BarChart3,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    changeColor: "text-blue-400"
  },

  "Avg Response": {
    icon: BarChart3,
    iconBg: "bg-blue-500/15",
    iconColor: "text-blue-400",
    changeColor: "text-blue-400"
  }
} as const;

function StatCard({
  title,
  value,
  change
}: Props) {

  const item =
    config[title as keyof typeof config];

  const Icon = item.icon;

  return (
    <div
      className="
        h-[96px]
        rounded-xl
        border
        border-white/10
        bg-[#111B2E]
        px-4
        py-3
        transition-all
        duration-300
        hover:border-blue-500/40
      "
    >

      <div className="flex h-full items-center gap-3">

        <div
          className={`
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            ${item.iconBg}
          `}
        >

          <Icon
            size={20}
            strokeWidth={2.3}
            className={item.iconColor}
          />

        </div>

        <div className="flex flex-col justify-center">

          <p className="text-[12px] font-medium text-slate-400">
            {title}
          </p>

          <h2 className="mt-0.5 text-[20px] font-bold leading-none text-white">
            {value}
          </h2>

          <span
            className={`mt-1 text-[12px] font-medium ${item.changeColor}`}
          >
            ↗ {change}
          </span>

        </div>

      </div>

    </div>
  );
}

export default StatCard;