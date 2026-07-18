import { ReactNode } from "react";

type Props = {
  icon: ReactNode;
  title: string;
  description: string;
  time: string;
  isLast?: boolean;
};

export default function TimelineItem({
  icon,
  title,
  description,
  time,
  isLast = false,
}: Props) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#1E293B]">
          {icon}
        </div>

        {!isLast && (
          <div className="mt-2 h-full w-px bg-slate-700" />
        )}
      </div>

      <div className="flex-1 pb-6">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-white">
            {title}
          </h3>

          <span className="text-xs text-slate-400">
            {time}
          </span>
        </div>

        <p className="mt-1 text-sm text-slate-400">
          {description}
        </p>
      </div>
    </div>
  );
}