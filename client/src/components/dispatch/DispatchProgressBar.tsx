type Props = {
  progress: number;
};

export default function DispatchProgressBar({
  progress,
}: Props) {
  return (
    <div className="mt-2">
      <div className="h-2 overflow-hidden rounded-full bg-slate-700">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all duration-1000"
          style={{
            width: `${progress}%`,
          }}
        />
      </div>

      <p className="mt-1 text-right text-xs text-slate-400">
        {Math.round(progress)}%
      </p>
    </div>
  );
}