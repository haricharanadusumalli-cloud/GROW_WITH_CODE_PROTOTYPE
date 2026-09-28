import React from 'react';
import { Award, Zap, ArrowRight, CheckCircle2, Trophy, Clock, Code2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface CourseCompletionViewProps {
  courseId: string;
  score: number;
}

export const CourseCompletionView: React.FC<CourseCompletionViewProps> = ({
  courseId,
  score,
}) => {
  const { navigateTo, user } = useApp();

  const certificate = user.certificates.find((c) => c.courseId === courseId) || user.certificates[0];

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 text-center space-y-8 animate-in fade-in zoom-in-95 duration-200">
      {/* Trophy Badge */}
      <div className="w-20 h-20 rounded-3xl bg-emerald-950 border-2 border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-2xl shadow-emerald-950/80">
        <Trophy className="w-10 h-10" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-mono uppercase tracking-widest text-emerald-400">
          Curriculum Milestone Achieved
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
          Python Programming Completed
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
          You have mastered Python from fundamentals to interview-ready algorithmic thinking. All 10
          topics, 50 coding problems, and the 30-question certification test are complete.
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto font-mono text-xs">
        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-[11px]">Assessment Score</div>
          <div className="text-xl font-bold text-emerald-400 mt-1">{score || 88}%</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Passing grade: 70%</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-[11px]">Topics Mastered</div>
          <div className="text-xl font-bold text-white mt-1">10 / 10</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">100% Complete</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-[11px]">Problems Solved</div>
          <div className="text-xl font-bold text-white mt-1">50 / 50</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">All Accepted</div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800">
          <div className="text-slate-400 text-[11px]">Learning Time</div>
          <div className="text-xl font-bold text-slate-200 mt-1">~36 Hours</div>
          <div className="text-[10px] text-slate-500 mt-0.5">Deep practice</div>
        </div>
      </div>

      {/* Achievement callout */}
      <Card className="max-w-2xl mx-auto bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border-emerald-500/30 p-5 text-left flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-mono text-amber-400 uppercase tracking-wider">
              Certificate Unlocked
            </div>
            <h3 className="text-sm sm:text-base font-bold text-white">
              Official Grow With Code Certificate of Completion
            </h3>
            <p className="text-xs text-slate-400">
              ID: {certificate?.certificateNumber || 'GWC-PY-2026-000123'} · Publicly Verifiable
            </p>
          </div>
        </div>
      </Card>

      {/* CTAs */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
        <Button
          variant="primary"
          size="lg"
          onClick={() =>
            navigateTo({
              type: 'certificate',
              certificateId: certificate?.id || 'cert-py-001',
            })
          }
          icon={<Award className="w-5 h-5" />}
          className="w-full sm:w-auto px-8"
        >
          View Certificate
        </Button>

        <Button
          variant="secondary"
          size="lg"
          onClick={() => navigateTo({ type: 'arena' })}
          icon={<Zap className="w-5 h-5 text-amber-400" />}
          className="w-full sm:w-auto px-8"
        >
          Enter Code Arena
        </Button>
      </div>
    </div>
  );
};
