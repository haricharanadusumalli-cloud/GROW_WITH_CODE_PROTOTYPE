import React from 'react';
import {
  Compass,
  BookOpen,
  TerminalSquare,
  Briefcase,
  Award,
  User,
  ArrowRight,
  Flame,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Progress } from '../common/Progress';

export const Sidebar: React.FC = () => {
  const { user, currentView, navigateTo } = useApp();

  const primaryItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: Compass,
      view: { type: 'dashboard' as const },
      isActive: currentView.type === 'dashboard',
    },
    {
      id: 'learn',
      label: 'Learn Library',
      icon: BookOpen,
      view: { type: 'learn-catalog' as const },
      isActive:
        currentView.type === 'learn-catalog' ||
        currentView.type === 'course' ||
        currentView.type === 'topic' ||
        currentView.type === 'lesson' ||
        currentView.type === 'problem' ||
        currentView.type === 'assessment' ||
        currentView.type === 'course-completed',
    },
    {
      id: 'arena',
      label: 'Code Arena',
      icon: TerminalSquare,
      view: { type: 'arena' as const },
      isActive: currentView.type === 'arena' || currentView.type === 'arena-challenge',
      highlightBadge: 'Daily',
    },
    {
      id: 'interview',
      label: 'Interviews',
      icon: Briefcase,
      view: { type: 'interview-setup' as const },
      isActive:
        currentView.type === 'interview-setup' ||
        currentView.type === 'interview-sim' ||
        currentView.type === 'interview-report',
    },
  ];

  const secondaryItems = [
    {
      id: 'certificates',
      label: 'Certificates',
      icon: Award,
      view: {
        type: 'certificate' as const,
        certificateId: user.certificates[0]?.id || 'cert-py-001',
      },
      isActive: currentView.type === 'certificate' || currentView.type === 'verify-certificate',
      count: user.certificates.length,
    },
    {
      id: 'profile',
      label: 'Profile & Progress',
      icon: User,
      view: { type: 'profile' as const },
      isActive: currentView.type === 'profile',
    },
  ];

  return (
    <aside aria-label="Sidebar Navigation" className="hidden lg:flex flex-col w-64 border-r border-slate-800 bg-slate-950 shrink-0 min-h-[calc(100vh-4rem)] p-4 select-none">
      {/* Primary Navigation */}
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400">
          Navigation
        </div>
        {primaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.view)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                item.isActive
                  ? 'bg-slate-900 text-emerald-400 border border-slate-800 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${item.isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.highlightBadge && (
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  {item.highlightBadge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <div className="my-4 border-t border-slate-900" />

      {/* Secondary Navigation */}
      <div className="space-y-1">
        <div className="px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider text-slate-400">
          Career & Record
        </div>
        {secondaryItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => navigateTo(item.view)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                item.isActive
                  ? 'bg-slate-900 text-emerald-400 border border-slate-800 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon className={`w-4 h-4 ${item.isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.count !== undefined && item.count > 0 && (
                <span className="text-[10px] font-mono text-slate-400 bg-slate-850 px-1.5 py-0.5 rounded">
                  {item.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Course In-Progress Card */}
      <div className="mt-auto pt-4">
        <div className="p-3.5 rounded-xl border border-slate-800/80 bg-slate-900/60 text-slate-200">
          <div className="flex items-center justify-between text-xs mb-1.5">
            <span className="font-semibold text-slate-200">Python Track</span>
            <span className="font-mono text-emerald-400 text-[11px]">4 / 10 Topics</span>
          </div>
          <Progress value={40} size="sm" color="emerald" className="mb-2" />
          <div className="text-[11px] text-slate-400 truncate mb-3">
            Current: <span className="text-slate-300">Loops & Iteration</span>
          </div>
          <button
            onClick={() => navigateTo({ type: 'topic', topicId: 'topic-py-loops' })}
            className="w-full flex items-center justify-center gap-1.5 py-1.5 px-2 bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-medium transition-colors cursor-pointer"
          >
            <span>Resume Track</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Motivation footnote */}
        <div className="flex items-center gap-2 px-2 py-3 text-[11px] text-slate-400 font-mono">
          <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>7-day streak · Keep coding!</span>
        </div>
      </div>
    </aside>
  );
};
