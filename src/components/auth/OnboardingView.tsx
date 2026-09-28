import React, { useState } from 'react';
import {
  CheckCircle2,
  ArrowRight,
  Code2,
  Database,
  Coffee,
  Cpu,
  Layout,
  Palette,
  Target,
  Sparkles,
  BookOpen,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

export const OnboardingView: React.FC = () => {
  const { user, finishOnboarding } = useApp();

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedGoal, setSelectedGoal] = useState<string>('Prepare for Placements');
  const [selectedExperience, setSelectedExperience] = useState<string>(
    'Some Programming Experience'
  );
  const [selectedCourse, setSelectedCourse] = useState<string>('course-python');

  const goals = [
    { id: 'Learn Programming', label: 'Learn Programming', desc: 'Build rock-solid computational thinking from zero.' },
    { id: 'Prepare for Internship', label: 'Prepare for Internship', desc: 'Target tech company summer & winter internships.' },
    { id: 'Prepare for Placements', label: 'Prepare for Placements', desc: 'Crack campus recruitment and technical assessments.' },
    { id: 'Improve Coding', label: 'Improve Coding', desc: 'Level up clean code architecture, problem-solving, and speed.' },
    { id: 'Prepare for Technical Interviews', label: 'Prepare for Technical Interviews', desc: 'Master DSA, system design basics, and live interview coding.' },
  ];

  const experiences = [
    {
      id: 'Beginner',
      label: 'Beginner',
      desc: 'New to programming or haven’t written code before.',
    },
    {
      id: 'Some Programming Experience',
      label: 'Some Programming Experience',
      desc: 'Know basic loops, variables, and logic in at least one language.',
    },
    {
      id: 'Intermediate',
      label: 'Intermediate',
      desc: 'Comfortable with OOP, data structures, and ready for interview rigor.',
    },
  ];

  const courses = [
    { id: 'course-python', label: 'Python', icon: Code2, desc: 'Interview-grade Python & data structures' },
    { id: 'course-sql', label: 'SQL', icon: Database, desc: 'Relational querying & database architecture' },
    { id: 'course-java', label: 'Java', icon: Coffee, desc: 'Enterprise OOP, collections & DSA' },
    { id: 'course-c', label: 'C', icon: Cpu, desc: 'Pointers, low-level memory & systems' },
    { id: 'course-html', label: 'HTML', icon: Layout, desc: 'Semantic web & accessible markup' },
    { id: 'course-css', label: 'CSS', icon: Palette, desc: 'Modern responsive systems & CSS Grid' },
  ];

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-10 px-4">
      <div className="max-w-2xl w-full">
        {/* Progress indicator */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  s === step
                    ? 'w-10 bg-emerald-500'
                    : s < step
                    ? 'w-6 bg-emerald-700'
                    : 'w-6 bg-slate-800'
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-mono text-slate-400">Step {step} of 4</span>
        </div>

        {/* Step 1: Goal */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Question 01
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                What is your primary goal right now?
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                We configure your daily recommendation feed based on your destination.
              </p>
            </div>

            <div className="space-y-2.5">
              {goals.map((g) => {
                const isSelected = selectedGoal === g.id;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => setSelectedGoal(g.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500/80 shadow-xs'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h2 className="text-sm font-semibold text-slate-200">{g.label}</h2>
                      <p className="text-xs text-slate-400 mt-0.5">{g.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                onClick={() => setStep(2)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Continue to Experience
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Experience */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Question 02
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                What is your current programming experience?
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                This helps us calibrate starting difficulty and problem recommendations.
              </p>
            </div>

            <div className="space-y-3">
              {experiences.map((exp) => {
                const isSelected = selectedExperience === exp.id;
                return (
                  <button
                    key={exp.id}
                    type="button"
                    onClick={() => setSelectedExperience(exp.id)}
                    className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500/80 shadow-xs'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <h2 className="text-sm font-semibold text-slate-200">{exp.label}</h2>
                      <p className="text-xs text-slate-400 mt-0.5">{exp.desc}</p>
                    </div>
                    {isSelected && <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(1)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(3)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Choose Starting Course
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Preferred Course */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Question 03
              </span>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                Select your starting course
              </h1>
              <p className="text-sm text-slate-400 mt-2">
                You can switch between any of these at any time. Everything is 100% free.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {courses.map((c) => {
                const isSelected = selectedCourse === c.id;
                const Icon = c.icon;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCourse(c.id)}
                    className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-slate-900 border-emerald-500/80 shadow-xs ring-1 ring-emerald-500/30'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                    }`}
                  >
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <h2 className="text-sm font-semibold text-slate-200">{c.label}</h2>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
                      </div>
                      <p className="text-xs text-slate-400 mt-0.5">{c.desc}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between pt-4">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={() => setStep(4)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Generate Learning Path
              </Button>
            </div>
          </div>
        )}

        {/* Step 4: Confirmation screen */}
        {step === 4 && (
          <div className="space-y-6 text-center animate-in fade-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                Your learning path is ready.
              </h1>
              <p className="text-sm text-slate-300 max-w-md mx-auto mt-2">
                We set up your custom trajectory for <span className="text-emerald-400 font-semibold">{selectedGoal}</span>, starting with <span className="text-emerald-400 font-semibold">Python</span>.
              </p>
            </div>

            <Card className="max-w-md mx-auto text-left space-y-3 bg-slate-900/80 border-slate-800 p-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">Target Track</span>
                <span className="font-semibold text-slate-200">Python Fundamentals → DSA</span>
              </div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                <span className="text-slate-400">Pacing</span>
                <span className="font-semibold text-slate-200">5 Problems / Topic + Milestone Arena</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Next Action</span>
                <span className="font-semibold text-emerald-400">Python Loops & Iteration</span>
              </div>
            </Card>

            <p className="text-xs text-slate-400">
              Courses remain your primary structure — no rigid career silos or locked paths.
            </p>

            <div className="pt-2">
              <Button
                variant="primary"
                size="lg"
                onClick={() => finishOnboarding(selectedGoal, selectedExperience, selectedCourse)}
                icon={<ArrowRight className="w-5 h-5" />}
                iconPosition="right"
                className="w-full sm:w-auto min-w-[240px]"
              >
                Go to Dashboard
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
