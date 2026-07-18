import {
  Clock,
  TrendingDown,
} from "lucide-react";

export default function ResponseTimeCard() {
  return (
    <div className="rounded-xl bg-[#0F172A] p-5">

      <div className="flex items-center gap-3">

        <Clock className="text-cyan-400"/>

        <h3 className="text-white font-semibold">
          Average Response Time
        </h3>

      </div>

      <h1 className="mt-5 text-5xl font-bold text-white">
        6.4
      </h1>

      <p className="text-slate-400">
        minutes
      </p>

      <div className="mt-5 flex items-center gap-2 text-emerald-400">

        <TrendingDown size={18}/>

        14% Faster than last week

      </div>

    </div>
  );
}