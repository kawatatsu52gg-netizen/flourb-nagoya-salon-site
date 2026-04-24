interface ProgressBarProps {
  current: number;
  total: number;
}

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = Math.max(0, Math.min(100, (current / total) * 100));

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs tracking-[0.2em] text-rose-700">
        <span>AI DIAGNOSIS</span>
        <span>
          {current}/{total}
        </span>
      </div>
      <div className="h-1.5 w-full overflow-hidden rounded-full bg-rose-100">
        <div
          className="h-full rounded-full bg-rose-700 transition-all duration-300 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
