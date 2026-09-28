import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'neutral' | 'success' | 'warning' | 'info' | 'danger';
  dot?: boolean;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  dot = true,
  className = '',
}) => {
  const dotColor = {
    neutral: 'bg-slate-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    info: 'bg-sky-400',
    danger: 'bg-rose-400',
  }[variant];

  const textColor = {
    neutral: 'text-slate-400',
    success: 'text-emerald-400',
    warning: 'text-amber-400',
    info: 'text-sky-400',
    danger: 'text-rose-400',
  }[variant];

  return (
    <span className={`inline-flex items-center gap-1.5 text-xs font-mono font-medium ${textColor} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColor} shrink-0`} />}
      <span>{children}</span>
    </span>
  );
};
