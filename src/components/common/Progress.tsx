import React from 'react';

interface ProgressProps {
  value: number; // 0 to 100
  size?: 'sm' | 'md' | 'lg';
  showLabel?: boolean;
  color?: 'emerald' | 'sky' | 'amber' | 'purple';
  className?: string;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  size = 'md',
  showLabel = false,
  color = 'emerald',
  className = '',
}) => {
  const clampedValue = Math.min(100, Math.max(0, value));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2',
    lg: 'h-3',
  }[size];

  const barColor = {
    emerald: 'bg-emerald-500',
    sky: 'bg-sky-500',
    amber: 'bg-amber-500',
    purple: 'bg-purple-500',
  }[color];

  return (
    <div className={`w-full ${className}`}>
      <div className={`w-full bg-slate-800 rounded-full overflow-hidden ${heightClasses}`}>
        <div
          className={`${heightClasses} ${barColor} rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${clampedValue}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-xs text-slate-400 mt-1 font-mono">
          <span>Progress</span>
          <span>{clampedValue}%</span>
        </div>
      )}
    </div>
  );
};
