import React from 'react';
import {
  Briefcase,
  ChevronLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Award,
  Clock,
  Terminal,
  Zap,
  RefreshCw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { InterviewReportData } from '../../types';
import { INITIAL_INTERVIEW_REPORT } from '../../data/mockData';

interface InterviewReportViewProps {
  reportId: string;
}

export const InterviewReportView: React.FC<InterviewReportViewProps> = ({ reportId }) => {
  const { navigateTo, user } = useApp();

  const report: InterviewReportData =
    user.interviewHistory.find((r) => r.id === reportId) ||
    user.interviewHistory[0] ||
    INITIAL_INTERVIEW_REPORT;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Top Breadcrumb */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() => navigateTo({ type: 'interview-setup' })}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Interviews</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Report ID: {report.id} · {report.date}
        </span>
      </div>

      {/* Header Banner with Overall Score */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-sky-950/40 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs font-mono text-sky-400">
            <Briefcase className="w-4 h-4" />
            <span>DIAGNOSTIC TECHNICAL REPORT</span>
            <span>·</span>
            <span>{report.language.toUpperCase()}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Technical Interview Report
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed">
            Verdict:{' '}
            <strong className="text-white font-semibold">{report.readinessVerdict}</strong>
          </p>
        </div>

        <div className="flex items-center gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 shrink-0">
          <div className="text-right">
            <span className="text-[11px] font-mono text-slate-500 block">OVERALL ACCURACY</span>
            <span className="text-3xl font-black font-mono text-emerald-400">
              {report.overallScore}%
            </span>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center font-bold text-lg font-mono">
            {report.overallScore >= 75 ? 'A' : 'B'}
          </div>
        </div>
      </div>

      {/* Section 1: Breakdown by Area (DSA, Language, Coding) */}
      <section aria-label="Section breakdown" className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Component Breakdown
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card padding="md" className="bg-slate-900 border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Data Structures & Algo</span>
              <span className="text-emerald-400 font-bold">{report.breakdown.dsa}%</span>
            </div>
            <Progress value={report.breakdown.dsa} size="sm" color="emerald" />
            <div className="text-[11px] text-slate-500 font-mono">Arrays, Trees, Big-O</div>
          </Card>

          <Card padding="md" className="bg-slate-900 border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Core Programming Language</span>
              <span className="text-sky-400 font-bold">{report.breakdown.language}%</span>
            </div>
            <Progress value={report.breakdown.language} size="sm" color="sky" />
            <div className="text-[11px] text-slate-500 font-mono">Memory, Scope, Runtime</div>
          </Card>

          <Card padding="md" className="bg-slate-900 border-slate-800 space-y-2">
            <div className="flex justify-between items-center text-xs font-mono">
              <span className="text-slate-400">Live Coding Implementation</span>
              <span className="text-amber-400 font-bold">{report.breakdown.coding}%</span>
            </div>
            <Progress value={report.breakdown.coding} size="sm" color="amber" />
            <div className="text-[11px] text-slate-500 font-mono">Clean code, testcases passed</div>
          </Card>
        </div>
      </section>

      {/* Section 2: Topic Diagnostic Breakdown */}
      <section aria-label="Topic diagnostic breakdown" className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Topic Breakdown
        </h2>

        <Card padding="none" className="bg-slate-900 divide-y divide-slate-800">
          {report.topicBreakdown.map((t, i) => {
            const isStrong = t.status === 'Strong';
            const isGood = t.status === 'Good';
            const isWeak = t.status === 'Needs Practice';

            return (
              <div
                key={i}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`w-6 h-6 rounded-md flex items-center justify-center font-bold text-xs ${
                      isStrong
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                        : isGood
                        ? 'bg-sky-950 text-sky-400 border border-sky-500/40'
                        : 'bg-amber-950 text-amber-400 border border-amber-500/40'
                    }`}
                  >
                    {isStrong ? '✓' : isGood ? '○' : '△'}
                  </span>
                  <div>
                    <span className="text-sm font-semibold text-white">{t.topic}</span>
                    <div className="text-[11px] text-slate-400 font-mono">
                      {isStrong
                        ? 'Consistently optimal in edge cases'
                        : isGood
                        ? 'Minor optimization room'
                        : 'Identified gap in algorithmic complexity'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono">
                  <span
                    className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                      isStrong
                        ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30'
                        : isGood
                        ? 'bg-sky-950 text-sky-300 border border-sky-500/30'
                        : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                    }`}
                  >
                    {t.status}
                  </span>
                  <span className="text-slate-400 font-bold">{t.score}%</span>
                </div>
              </div>
            );
          })}
        </Card>
      </section>

      {/* Section 3: Performance Metrics Details */}
      <section aria-label="Performance metrics" className="space-y-3">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
          Session Metrics
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center font-mono text-xs">
          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px]">Attempted</span>
            <div className="font-bold text-white text-base mt-0.5">
              {report.metrics.questionsAttempted} Questions
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px]">Correct Answers</span>
            <div className="font-bold text-emerald-400 text-base mt-0.5">
              {report.metrics.correctAnswers} Correct
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px]">Time Used</span>
            <div className="font-bold text-slate-200 text-base mt-0.5">
              {Math.floor(report.metrics.timeUsedSeconds / 60)} mins
            </div>
          </div>

          <div className="p-3 bg-slate-900 rounded-lg border border-slate-800">
            <span className="text-slate-500 text-[10px]">Avg Time / Question</span>
            <div className="font-bold text-slate-200 text-base mt-0.5">
              {report.metrics.averageTimePerQuestionSeconds}s
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Actionable Recommendations -> BACK TO LEARNING FEEDBACK LOOP! */}
      <section aria-label="Actionable recommendations" className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              The Product Feedback Loop
            </h2>
            <h3 className="text-xl font-bold text-white tracking-tight">
              Actionable Recommendations
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Target your weak spots immediately to prepare for the next round.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {report.recommendations.map((rec, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 space-y-3 flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded">
                  Priority Action
                </span>
                <h4 className="text-sm font-bold text-white mt-2">{rec.title}</h4>
                <p className="text-xs text-slate-400 mt-1">
                  Reinforce the algorithmic theory and solve 3 targeted problems.
                </p>
              </div>

              <div>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full text-emerald-400 hover:text-emerald-300"
                  onClick={() => {
                    if (rec.targetRoute === 'topic') {
                      navigateTo({ type: 'topic', topicId: rec.topicId || 'topic-py-loops' });
                    } else if (rec.targetRoute === 'arena') {
                      navigateTo({ type: 'arena' });
                    } else if (rec.targetRoute === 'problem') {
                      navigateTo({ type: 'problem', problemId: rec.topicId || 'prob-loop-4' });
                    } else {
                      navigateTo({ type: 'learn-catalog' });
                    }
                  }}
                  icon={<ArrowRight className="w-3.5 h-3.5" />}
                  iconPosition="right"
                >
                  {rec.actionText}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* Primary CTA: Continue Learning */}
        <div className="pt-4 flex justify-center">
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigateTo({ type: 'dashboard' })}
            icon={<ArrowRight className="w-5 h-5" />}
            iconPosition="right"
            className="px-8"
          >
            Continue Learning Trajectory
          </Button>
        </div>
      </section>
    </div>
  );
};
