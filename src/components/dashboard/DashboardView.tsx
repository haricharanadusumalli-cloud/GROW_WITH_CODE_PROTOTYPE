import React from 'react';
import {
  ArrowRight,
  Flame,
  CheckCircle2,
  BookOpen,
  Terminal,
  Zap,
  Briefcase,
  AlertTriangle,
  Award,
  Sparkles,
  Clock,
  Play,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { Badge } from '../common/Badge';

export const DashboardView: React.FC = () => {
  const { user, navigateTo, unlockedProblemIds, completedProblemIds } = useApp();

  const nextUnsolvedProblemId = 'prob-loop-3';
  const isP3Completed = completedProblemIds.includes('prob-loop-3');

  const nextActions = [
    {
      id: 'lesson',
      title: 'Python Loops & Iteration',
      subtitle: 'Finish reading iteration mechanics & edge cases',
      type: 'Continue Lesson',
      icon: BookOpen,
      action: () => navigateTo({ type: 'lesson', lessonId: 'lesson-py-loops' }),
      status: 'In Progress',
    },
    {
      id: 'problem',
      title: 'Problem 3: Mirrored Triangle',
      subtitle: 'Pattern generator problem with right-aligned loops',
      type: 'Solve Problem',
      icon: Terminal,
      action: () => navigateTo({ type: 'problem', problemId: 'prob-loop-3' }),
      status: isP3Completed ? 'Accepted' : 'Next Priority',
    },
    {
      id: 'assessment',
      title: 'Loops Topic Assessment',
      subtitle: '5 targeted evaluation questions on loop invariants',
      type: 'Topic Assessment',
      icon: CheckCircle2,
      action: () => navigateTo({ type: 'assessment', assessmentId: 'assess-py-loops' }),
      status: 'Ready',
    },
    {
      id: 'arena',
      title: "Today's Arena Challenge",
      subtitle: 'Maximum Subarray Kadane Variant (+150 XP)',
      type: 'Code Arena',
      icon: Zap,
      action: () => navigateTo({ type: 'arena-challenge', challengeId: 'arena-daily' }),
      status: 'Daily Challenge',
    },
    {
      id: 'interview',
      title: 'Technical Interview Simulation',
      subtitle: 'Timed DSA + Python diagnostic benchmark',
      type: 'Mock Interview',
      icon: Briefcase,
      action: () => navigateTo({ type: 'interview-setup' }),
      status: 'Recommended',
    },
  ];

  const weakAreas = [
    {
      topic: 'Hash Maps & Collisions',
      metric: '62% Accuracy',
      severity: 'high',
      recText: 'Revise Dictionaries Module',
      action: () => navigateTo({ type: 'topic', topicId: 'topic-py-loops' }),
    },
    {
      topic: 'Binary Tree Traversals',
      metric: '58% Accuracy',
      severity: 'high',
      recText: 'Solve Tree Arena Problems',
      action: () => navigateTo({ type: 'arena' }),
    },
    {
      topic: 'Loop Invariants & Off-by-one',
      metric: '75% Accuracy',
      severity: 'medium',
      recText: 'Complete Loops Problem 4',
      action: () => navigateTo({ type: 'problem', problemId: 'prob-loop-4' }),
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Greeting & "What should I do right now?" Answer */}
      <div>
        <div className="text-xs font-mono text-emerald-400 mb-1">
          Target Goal: {user.primaryGoal || 'Prepare for Placements'}
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Good morning, {user.name.split(' ')[0]}.
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Here is your clear priority action right now to stay on schedule.
        </p>
      </div>

      {/* Primary Hero Action Card: "Continue Learning" */}
      <div className="rounded-2xl border border-emerald-500/40 bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 p-6 sm:p-7 relative overflow-hidden shadow-xl shadow-black/40">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>PRIMARY RECOMMENDATION</span>
              <span>·</span>
              <span>Topic 5 of 10</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-bold text-white">
              Python → Loops & Iteration → Problem 3
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Continue your trajectory in Python. You've completed 2/5 loop problems. Solve{' '}
              <strong className="text-white">Pattern Generator: Mirrored Triangle</strong> to unlock
              advanced iteration logic.
            </p>

            <div className="pt-2 flex items-center gap-4 text-xs font-mono text-slate-400">
              <span>Course Progress: 40%</span>
              <span>·</span>
              <span>Est. Remaining: 25 mins</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Button
              variant="secondary"
              size="md"
              onClick={() => navigateTo({ type: 'lesson', lessonId: 'lesson-py-loops' })}
              icon={<BookOpen className="w-4 h-4" />}
            >
              Review Lesson
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigateTo({ type: 'problem', problemId: 'prob-loop-3' })}
              icon={<Play className="w-4 h-4 fill-white" />}
              iconPosition="left"
            >
              Continue Practice
            </Button>
          </div>
        </div>
      </div>

      {/* Progress Metrics Overview */}
      <section aria-label="Progress metrics">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
            Your Progress
          </h2>
          <button
            onClick={() => navigateTo({ type: 'profile' })}
            className="text-xs text-emerald-400 hover:text-emerald-300 font-mono cursor-pointer"
          >
            Full Profile →
          </button>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-3.5">
          <Card padding="sm" className="bg-slate-900/90">
            <div className="text-[11px] text-slate-400 font-mono">Current Track</div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">Python</div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">40% Completed</div>
          </Card>

          <Card padding="sm" className="bg-slate-900/90">
            <div className="text-[11px] text-slate-400 font-mono">Topics Completed</div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">
              {user.completedTopicsCount} / 10
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">6 remaining</div>
          </Card>

          <Card padding="sm" className="bg-slate-900/90">
            <div className="text-[11px] text-slate-400 font-mono">Problems Solved</div>
            <div className="text-base sm:text-lg font-bold text-white mt-1">
              {user.solvedProblemsCount} Solved
            </div>
            <div className="text-[11px] text-emerald-400 font-mono mt-1">+2 this session</div>
          </Card>

          <Card padding="sm" className="bg-slate-900/90">
            <div className="text-[11px] text-slate-400 font-mono">Daily Streak</div>
            <div className="text-base sm:text-lg font-bold text-amber-400 flex items-center gap-1.5 mt-1">
              <Flame className="w-5 h-5 fill-amber-400/20" />
              <span>{user.streakDays} Days</span>
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">Active today</div>
          </Card>

          <Card padding="sm" className="bg-slate-900/90 col-span-2 lg:col-span-1">
            <div className="text-[11px] text-slate-400 font-mono">Arena Level</div>
            <div className="text-base sm:text-lg font-bold text-sky-400 mt-1">
              Level {user.arenaLevel}
            </div>
            <div className="text-[11px] text-slate-400 font-mono mt-1">
              {user.arenaXp.toLocaleString()} XP
            </div>
          </Card>
        </div>
      </section>

      {/* 2-Column Layout: Next Actions + Diagnostics (Weak Areas & Interview) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Next Priority Actions (7 Cols) */}
        <section aria-label="Next priority actions" className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
              Next Priority Actions
            </h2>
            <span className="text-xs text-slate-500 font-mono">Ordered by impact</span>
          </div>

          <div className="space-y-3">
            {nextActions.map((action, idx) => {
              const Icon = action.icon;
              return (
                <div
                  key={action.id}
                  onClick={action.action}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-800 bg-slate-900/70 hover:bg-slate-850 hover:border-slate-700 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:text-emerald-400 group-hover:border-emerald-500/40 transition-colors shrink-0">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                          {action.title}
                        </h3>
                        <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                          {action.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{action.subtitle}</p>
                    </div>
                  </div>

                  <ArrowRight className="w-4 h-4 text-slate-500 group-hover:text-emerald-400 group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              );
            })}
          </div>

          {/* Quick Course Assessment Trigger */}
          <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <div>
              <div className="text-xs font-semibold text-slate-200">
                Course Final Assessment Ready
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Take the 30-question Python comprehensive test (70% passing grade) to unlock your certificate.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigateTo({ type: 'assessment', assessmentId: 'assess-course-python' })}
            >
              Take Assessment
            </Button>
          </div>
        </section>

        {/* Right Column: Weak Areas & Latest Interview Report (5 Cols) */}
        <section aria-label="Weak areas and interview diagnostics" className="lg:col-span-5 space-y-6">
          {/* Weak Areas */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Diagnostic Weak Areas
              </h2>
              <span className="text-xs text-amber-400 font-mono">Feedback Loop</span>
            </div>

            <Card padding="none" className="bg-slate-900/80 divide-y divide-slate-800">
              {weakAreas.map((w, idx) => (
                <div
                  key={idx}
                  onClick={w.action}
                  className="p-3.5 hover:bg-slate-850/60 transition-colors cursor-pointer flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-slate-200">{w.topic}</span>
                      <span className="text-[10px] font-mono text-amber-400">{w.metric}</span>
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">{w.recText}</div>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-500" />
                </div>
              ))}
            </Card>
          </div>

          {/* Latest Interview Simulation */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Latest Interview Simulation
              </h2>
              <span className="text-xs text-slate-500 font-mono">Sep 24, 2026</span>
            </div>

            <Card padding="sm" className="bg-slate-900/80 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs text-slate-400 font-mono">Python 45-Min Simulation</span>
                  <div className="text-lg font-bold text-white mt-0.5">78% Overall Score</div>
                </div>
                <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-1 rounded">
                  Junior / Mid Ready
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono pt-1">
                <div className="p-2 bg-slate-950 rounded border border-slate-850">
                  <div className="text-[10px] text-slate-500">DSA</div>
                  <div className="font-semibold text-slate-200">82%</div>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-850">
                  <div className="text-[10px] text-slate-500">Core Lang</div>
                  <div className="font-semibold text-slate-200">76%</div>
                </div>
                <div className="p-2 bg-slate-950 rounded border border-slate-850">
                  <div className="text-[10px] text-slate-500">Coding</div>
                  <div className="font-semibold text-slate-200">75%</div>
                </div>
              </div>

              <button
                onClick={() => navigateTo({ type: 'interview-report', reportId: 'rpt-mock-001' })}
                className="w-full py-1.5 text-xs text-emerald-400 hover:text-emerald-300 font-medium text-center flex items-center justify-center gap-1 cursor-pointer"
              >
                <span>View Full Diagnostic Report</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </Card>
          </div>

          {/* Certificate Showcase */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400 font-mono">
                Earned Certificates
              </h2>
              <span className="text-xs font-mono text-emerald-400">
                {user.certificates.length} Verified
              </span>
            </div>

            {user.certificates.length > 0 ? (
              <Card
                variant="interactive"
                padding="sm"
                onClick={() =>
                  navigateTo({ type: 'certificate', certificateId: user.certificates[0].id })
                }
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-200">
                      {user.certificates[0].courseTitle}
                    </div>
                    <div className="text-[10px] font-mono text-slate-500">
                      ID: {user.certificates[0].certificateNumber} · Score: {user.certificates[0].score}%
                    </div>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-500" />
              </Card>
            ) : (
              <Card padding="sm" className="text-center text-xs text-slate-500">
                Complete Python 30-question assessment to earn your first certificate.
              </Card>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
