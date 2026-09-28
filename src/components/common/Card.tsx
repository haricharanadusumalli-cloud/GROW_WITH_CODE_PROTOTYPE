import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'interactive' | 'sunken' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  ...props
}) => {
  const baseClasses = 'border rounded-xl transition-all duration-200';

  const variantClasses = {
    default: 'bg-slate-900/90 border-slate-800 text-slate-100',
    interactive:
      'bg-slate-900/90 hover:bg-slate-850 border-slate-800 hover:border-slate-700 text-slate-100 cursor-pointer shadow-sm hover:shadow-md',
    sunken: 'bg-slate-950/70 border-slate-850 text-slate-200',
    elevated:
      'bg-slate-900 border-slate-750 shadow-lg shadow-black/40 text-slate-100',
  };

  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3 sm:p-4',
    md: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
