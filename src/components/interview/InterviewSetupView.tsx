import React, { useState } from 'react';
import {
  Briefcase,
  Clock,
  Code2,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileText,
  AlertTriangle,
  History,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Language, InterviewConfig } from '../../types';

export const InterviewSetupView: React.FC = () => {
  const { navigateTo, user } = useApp();

  const [language, setLanguage] = useState<Language>('python');
  const [duration, setDuration] = useState<number>(45);
  const [difficultyLevel, setDifficultyLevel] = useState<'Junior' | 'Mid' | 'Placement'>('Placement');

  const languages = [
    { id: 'python' as Language, name: 'Python', desc: 'Syntax, dunder methods, GIL, DSA implementations' },
    { id: 'java' as Language, name: 'Java', desc: 'OOP, JVM memory, collections framework, DSA' },
    { id: 'c' as Language, name: 'C', desc: 'Pointers, memory management, algorithmic complexity' },
  ];

  const durations = [
    { mins: 30, label: '30 Minutes', desc: 'Quick diagnostic: 12 theory + 1 coding challenge' },
    { mins: 45, label: '45 Minutes', desc: 'Standard tech round: 18 theory + 1 coding challenge (Recommended)' },
    { mins: 60, label: '60 Minutes', desc: 'Full-length placement round: 24 theory + 2 coding challenges' },
  ];

  const handleStart = () => {
    const config: InterviewConfig = {
      language,
      durationMinutes: duration,
      difficultyLevel,
    };
    navigateTo({ type: 'interview-sim', config });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
          <Briefcase className="w-4 h-4" />
          <span>PLACEMENT & TECH SCREENING SIMULATION</span>
          <span>·</span>
          <span>TIMED BENCHMARK</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Technical Interview Simulation
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Simulate a real company interview round. You will face core language concepts, DSA analysis,
          and a timed coding challenge, followed by an actionable diagnostic readiness report.
        </p>
      </div>

      {/* Setup Form: Step 1, 2, 3 */}
      <div className="space-y-6">
        {/* Step 1: Language */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
            <span>Step 01</span>
            <span>·</span>
            <span>Select Interview Language</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {languages.map((l) => {
              const isSelected = language === l.id;
              return (
                <button
                  key={l.id}
                  onClick={() => setLanguage(l.id)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-bold text-white">{l.name}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{l.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Duration */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400">
            <span>Step 02</span>
            <span>·</span>
            <span>Select Duration</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {durations.map((d) => {
              const isSelected = duration === d.mins;
              return (
                <button
                  key={d.mins}
                  onClick={() => setDuration(d.mins)}
                  className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-900 border-emerald-500 shadow-md ring-1 ring-emerald-500/30'
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-base font-bold text-white">{d.label}</span>
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                  </div>
                  <p className="text-xs text-slate-400">{d.desc}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 3: Start Interview Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 rounded-xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800">
          <div>
            <h3 className="text-base font-bold text-white">Ready for your simulation?</h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target: {language.toUpperCase()} · {duration} Minutes · Realistic countdown and scoring.
            </p>
          </div>

          <Button
            variant="primary"
            size="lg"
            onClick={handleStart}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="w-full sm:w-auto"
          >
            Start Interview Now
          </Button>
        </div>
      </div>

      {/* Previous Interview Reports History */}
      {user.interviewHistory.length > 0 && (
        <section aria-label="Previous interview history" className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <History className="w-4 h-4 text-slate-400" />
              <span>Previous Interview Diagnostics</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">
              {user.interviewHistory.length} Recorded
            </span>
          </div>

          <div className="space-y-3">
            {user.interviewHistory.map((rpt) => (
              <div
                key={rpt.id}
                onClick={() => navigateTo({ type: 'interview-report', reportId: rpt.id })}
                className="p-4 rounded-xl border border-slate-800 bg-slate-900/60 hover:bg-slate-850 hover:border-slate-700 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-950/60 border border-sky-500/40 text-sky-400 flex items-center justify-center font-bold text-xs font-mono">
                    {rpt.overallScore}%
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {rpt.language} Technical Round ({rpt.durationMinutes} mins)
                    </div>
                    <div className="text-xs text-slate-400">{rpt.readinessVerdict}</div>
                  </div>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                  <span>{rpt.date}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <span>View Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
