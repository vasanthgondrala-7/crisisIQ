import { Brain, LoaderCircle } from "lucide-react";

export default function AIAnalysisLoader() {
  return (
    <div className="flex flex-col items-center justify-center py-16">

      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-blue-600/20">
        <Brain className="text-blue-400" size={40} />
      </div>

      <LoaderCircle
        size={42}
        className="mb-6 animate-spin text-blue-500"
      />

      <h2 className="text-2xl font-bold text-white">
        AI is analyzing the incident
      </h2>

      <p className="mt-3 max-w-md text-center text-slate-400">
        Evaluating severity, calculating priority score, identifying required
        resources, and preparing recommendations...
      </p>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-slate-800">

        <div className="h-full w-full animate-pulse rounded-full bg-blue-500" />

      </div>

      <p className="mt-4 text-sm text-slate-500">
        This usually takes 2–3 seconds
      </p>

    </div>
  );
}