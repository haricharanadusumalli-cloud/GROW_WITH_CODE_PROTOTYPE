import React from 'react';
import { Navbar } from './Navbar';
import { Sidebar } from './Sidebar';
import { useApp } from '../../context/AppContext';

interface ShellProps {
  children: React.ReactNode;
  onOpenAuth?: (mode: 'login' | 'signup') => void;
}

export const Shell: React.FC<ShellProps> = ({ children, onOpenAuth }) => {
  const { isAuthenticated, currentView } = useApp();

  const isFullBleedView =
    currentView.type === 'landing' ||
    currentView.type === 'onboarding' ||
    currentView.type === 'certificate' ||
    currentView.type === 'verify-certificate';

  if (!isAuthenticated || isFullBleedView) {
    return (
      <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
        <Navbar onOpenAuth={onOpenAuth} />
        <main className="flex-1 flex flex-col">{children}</main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-emerald-500/20 selection:text-emerald-300">
      <Navbar onOpenAuth={onOpenAuth} />
      <div className="flex-1 flex">
        <Sidebar />
        <main className="flex-1 min-w-0 bg-slate-950 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};
