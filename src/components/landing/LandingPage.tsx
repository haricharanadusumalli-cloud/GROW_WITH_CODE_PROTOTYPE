import React from 'react';
import {
  Code2,
  Database,
  Coffee,
  Cpu,
  Layout,
  Palette,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Zap,
  Briefcase,
  Flame,
  Award,
  BookOpen,
  ShieldCheck,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';
import { COURSES } from '../../data/mockData';

interface LandingPageProps {
  onOpenAuth: (mode: 'login' | 'signup') => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onOpenAuth }) => {
  const { navigateTo, isAuthenticated } = useApp();

  const courseIcons: Record<string, React.ReactNode> = {
    'course-python': <Code2 className="w-5 h-5 text-emerald-400" />,
    'course-sql': <Database className="w-5 h-5 text-sky-400" />,
    'course-java': <Coffee className="w-5 h-5 text-amber-400" />,
    'course-c': <Cpu className="w-5 h-5 text-purple-400" />,
    'course-html': <Layout className="w-5 h-5 text-orange-400" />,
    'course-css': <Palette className="w-5 h-5 text-blue-400" />,
  };

  const steps = [
    { num: '01', title: 'Learn', desc: 'Concept breakdowns, line-by-line syntax, and edge cases without boilerplate.' },
    { num: '02', title: 'Practice', desc: '5 progressive coding problems per topic with automated test verification.' },
    { num: '03', title: 'Assess', desc: 'Targeted topic checks and 30-question course certification benchmarks.' },
    { num: '04', title: 'Improve', desc: 'Target algorithmic weak spots revealed by precision diagnostics.' },
    { num: '05', title: 'Code Arena', desc: 'Compete in daily challenges, gain XP, build streaks, and level up.' },
    { num: '06', title: 'Interview', desc: 'Timed simulated technical interviews with diagnostic readiness reports.' },
  ];

  const features = [
    {
      title: 'Structured Learning',
      desc: 'No random tutorial hopping. Curated module timelines guide you topic by topic.',
      icon: BookOpen,
    },
    {
      title: 'Real Coding Practice',
      desc: 'In-browser IDE with multiple language runtimes, test assertions, and metrics.',
      icon: Terminal,
    },
    {
      title: 'Progressive Unlocking',
      desc: 'Problems unlock sequentially from Easy to Hard to prevent skipping fundamentals.',
      icon: TrendingUp,
    },
    {
      title: 'Course Assessments',
      desc: 'Rigorous 30-question milestone evaluations requiring 70% passing grade.',
      icon: ShieldCheck,
    },
    {
      title: 'Verified Certificates',
      desc: 'Showcase verifiable proof of curriculum mastery for resumes and LinkedIn.',
      icon: Award,
    },
    {
      title: 'Gamified Code Arena',
      desc: 'Level 1 to 8 challenge ladder, daily problem streaks, and XP progression.',
      icon: Zap,
    },
    {
      title: 'Technical Interviews',
      desc: 'DSA, language theory, and live coding under realistic countdown constraints.',
      icon: Briefcase,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 sm:pt-24 sm:pb-28 overflow-hidden border-b border-slate-900 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900/40">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Unboxed kicker tag */}
          <div className="inline-flex items-center gap-2 text-xs font-mono text-emerald-400 mb-6">
            <span>Free & Structured Developer Platform</span>
            <span aria-hidden="true">·</span>
            <span>Zero Fluff</span>
            <span aria-hidden="true">·</span>
            <span>Always Free</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] mb-6">
            Learn. Practice.{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-sky-400">
              Become Interview Ready.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-300 max-w-3xl mx-auto font-normal leading-relaxed mb-10">
            A structured platform to learn programming, practice real coding problems, assess your
            skills, and prepare for technical interviews.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              onClick={() => {
                if (isAuthenticated) {
                  navigateTo({ type: 'dashboard' });
                } else {
                  onOpenAuth('signup');
                }
              }}
            >
              Start Learning
            </Button>
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              onClick={() => {
                const el = document.getElementById('courses-section');
                el?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Explore Courses
            </Button>
          </div>

          {/* Core question callout */}
          <div className="mt-12 pt-8 border-t border-slate-800/60 max-w-xl mx-auto text-xs text-slate-400 font-mono flex items-center justify-center gap-2">
            <span className="text-slate-500">Core promise:</span>
            <span className="text-slate-200">"What should I do right now?" answered at every step.</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 border-b border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              The Product Loop
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">How It Works</h2>
            <p className="text-sm text-slate-400 mt-2">
              A continuous, feedback-driven cycle engineered to convert conceptual knowledge into
              interview execution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {steps.map((st, idx) => (
              <div
                key={st.title}
                className="relative p-6 rounded-xl border border-slate-800/80 bg-slate-900/60 hover:bg-slate-900 transition-colors"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs text-emerald-400">{st.num}</span>
                  {idx < steps.length - 1 && (
                    <span className="text-slate-600 text-xs hidden lg:block font-mono">↓ Next Step</span>
                  )}
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{st.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{st.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses-section" className="py-20 border-b border-slate-900 bg-slate-950/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
                Structured Tracks
              </div>
              <h2 className="text-3xl font-bold text-white tracking-tight">Available Courses</h2>
              <p className="text-sm text-slate-400 mt-1">
                Zero scattered tutorials. Every course has a roadmap, progressive problems, and a 30-question final assessment.
              </p>
            </div>
            <div className="mt-4 sm:mt-0 text-xs font-mono text-slate-400">
              6 Comprehensive Tracks · 100% Free
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {COURSES.map((course) => {
              const isPython = course.slug === 'python';
              return (
                <Card
                  key={course.id}
                  variant="interactive"
                  className="flex flex-col justify-between"
                  onClick={() => {
                    if (isPython) {
                      navigateTo({ type: 'course', courseId: 'course-python' });
                    } else {
                      navigateTo({ type: 'learn-catalog' });
                    }
                  }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700/60 flex items-center justify-center">
                        {courseIcons[course.id]}
                      </div>
                      <span className="text-[11px] font-mono text-slate-400">
                        {course.difficulty}
                      </span>
                    </div>

                    <h3 className="text-lg font-bold text-white mb-1.5">{course.title}</h3>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">
                      {course.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono mb-3">
                      <span>{course.totalModules} Modules</span>
                      <span>·</span>
                      <span>{course.totalProblems} Problems</span>
                      <span>·</span>
                      <span>~{course.estimatedHours}h</span>
                    </div>

                    <div className="flex items-center justify-between">
                      {isPython && isAuthenticated ? (
                        <span className="text-xs font-mono text-emerald-400">
                          40% Complete (Topic 5)
                        </span>
                      ) : (
                        <span className="text-xs font-mono text-slate-500">Not started</span>
                      )}
                      <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-400 hover:text-emerald-300">
                        {isPython && isAuthenticated ? 'Continue' : 'Start Learning'}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Grow With Code */}
      <section className="py-20 border-b border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono uppercase tracking-wider text-emerald-400 mb-2">
              Engineered For Results
            </div>
            <h2 className="text-3xl font-bold text-white tracking-tight">
              Why Grow With Code
            </h2>
            <p className="text-sm text-slate-400 mt-2">
              Most platforms offer videos or disjointed question banks. Grow With Code unites curriculum, deliberate practice, arena challenges, and interview diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((feat) => {
              const Icon = feat.icon;
              return (
                <div
                  key={feat.title}
                  className="p-5 rounded-xl border border-slate-800/80 bg-slate-900/40"
                >
                  <div className="w-8 h-8 rounded-lg bg-emerald-950/60 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-3.5">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h3 className="text-sm font-semibold text-white mb-1.5">{feat.title}</h3>
                  <p className="text-xs text-slate-400 leading-relaxed">{feat.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Code Arena Preview */}
      <section className="py-20 border-b border-slate-900 bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5 space-y-5">
              <div className="text-xs font-mono uppercase tracking-wider text-amber-400">
                Code Arena Preview
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Practice. Compete with yourself. Level up.
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Step outside ordinary coursework. Code Arena serves progressive algorithmic challenges calibrated to your current mastery tier. Build daily coding streaks and earn verified XP.
              </p>
              <div className="space-y-2 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>8 Progressive Tiers: Level 1 (Warmup) to Level 8 (Hard)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Daily Challenge with live countdown & bonus XP</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>No childish badges — pure technical progression</span>
                </div>
              </div>

              <div>
                <Button
                  variant="primary"
                  onClick={() => navigateTo({ type: 'arena' })}
                  icon={<Zap className="w-4 h-4" />}
                >
                  Enter Code Arena
                </Button>
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Interactive looking Code Arena visual card */}
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-5 shadow-2xl">
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center font-bold">
                      7
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-white">Current Tier: Level 7</div>
                      <div className="text-[11px] font-mono text-slate-400">Advanced Algorithmic Patterns</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-amber-400 flex items-center gap-1">
                      <Flame className="w-4 h-4 fill-amber-400/20" /> 7d Streak
                    </span>
                    <span className="text-emerald-400">2,450 XP</span>
                  </div>
                </div>

                <div className="mt-4 p-4 rounded-lg bg-slate-950 border border-slate-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-emerald-400">Today's Daily Challenge</span>
                    <span className="text-xs font-mono text-slate-500">+150 XP · 25 mins</span>
                  </div>
                  <h4 className="text-sm font-semibold text-slate-100">
                    Maximum Subarray Kadane Variant
                  </h4>
                  <p className="text-xs text-slate-400 font-mono">
                    Find the contiguous subarray with the largest sum in O(N) time and O(1) space.
                  </p>
                  <div className="pt-2 flex justify-between items-center text-xs">
                    <span className="font-mono text-amber-400">Medium+</span>
                    <button
                      onClick={() => navigateTo({ type: 'arena-challenge', challengeId: 'arena-daily' })}
                      className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded font-medium text-xs transition-colors cursor-pointer"
                    >
                      Solve Challenge →
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interview Preview */}
      <section className="py-20 border-b border-slate-900 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 order-2 lg:order-1">
              <div className="rounded-xl border border-slate-800 bg-slate-900 p-6 shadow-2xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="font-mono text-slate-400">Diagnostic Technical Report #001</span>
                  <span className="font-mono text-emerald-400 font-semibold">Overall: 78% Passed</span>
                </div>

                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">DSA Logic</div>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">82%</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Language Core</div>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">76%</div>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
                    <div className="text-[11px] text-slate-400">Live Coding</div>
                    <div className="text-lg font-mono font-bold text-white mt-0.5">75%</div>
                  </div>
                </div>

                <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2">
                  <div className="text-xs font-semibold text-slate-300">Targeted Feedback Loop:</div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Arrays & Slicing</span>
                    <span className="text-emerald-400">✓ Strong (92%)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Hash Tables & Collisions</span>
                    <span className="text-amber-400">△ Needs Practice (62%)</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono">
                    <span className="text-slate-400">Binary Trees & DFS</span>
                    <span className="text-amber-400">△ Needs Practice (58%)</span>
                  </div>
                </div>

                <div className="text-xs font-mono text-emerald-400 flex items-center justify-between">
                  <span>Recommendation: Master Dictionaries & Sets</span>
                  <button
                    onClick={() => navigateTo({ type: 'topic', topicId: 'topic-py-loops' })}
                    className="text-white underline hover:text-emerald-300 cursor-pointer"
                  >
                    Direct to Lesson →
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 order-1 lg:order-2 space-y-5">
              <div className="text-xs font-mono uppercase tracking-wider text-sky-400">
                Interview Feedback Loop
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Technical Interview → Report → Weak Areas → Improve
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Take timed DSA and language simulations. Unlike generic scorecards, Grow With Code pinpoints your exact weak areas and routes you straight back into targeted lessons and practice problems.
              </p>

              <div>
                <Button
                  variant="primary"
                  onClick={() => navigateTo({ type: 'interview-setup' })}
                  icon={<Briefcase className="w-4 h-4" />}
                >
                  Start Simulation
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="py-24 bg-gradient-to-t from-slate-950 to-slate-900 border-t border-slate-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <h2 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">
            Start Learning for Free
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed">
            Everything is 100% free. No paywalls, no teaser tiers, no expired trials. Start building
            your developer portfolio today.
          </p>
          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                if (isAuthenticated) {
                  navigateTo({ type: 'dashboard' });
                } else {
                  onOpenAuth('signup');
                }
              }}
              icon={<ArrowRight className="w-5 h-5" />}
              iconPosition="right"
              className="px-8"
            >
              Start Learning for Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-200">Grow With Code</span>
            <span>·</span>
            <span>Learn. Practice. Become Interview Ready.</span>
          </div>
          <div className="font-mono text-[11px]">
            Free structured developer platform · Prototype v1
          </div>
        </div>
      </footer>
    </div>
  );
};
