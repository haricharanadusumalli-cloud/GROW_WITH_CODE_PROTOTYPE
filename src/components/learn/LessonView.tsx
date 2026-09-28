import React, { useState } from 'react';
import {
  ChevronLeft,
  CheckCircle2,
  ArrowRight,
  BookOpen,
  Code2,
  AlertOctagon,
  Lightbulb,
  Terminal,
  Play,
  Share2,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { CodeBlock } from '../common/CodeBlock';
import { Card } from '../common/Card';
import { PYTHON_LOOPS_LESSON, PYTHON_LOOPS_PROBLEMS } from '../../data/mockData';

interface LessonViewProps {
  lessonId: string;
}

export const LessonView: React.FC<LessonViewProps> = ({ lessonId }) => {
  const {
    navigateTo,
    markLessonComplete,
    isLessonCompleted,
    completedProblemIds,
  } = useApp();

  const lesson = PYTHON_LOOPS_LESSON;
  const isCompleted = isLessonCompleted(lesson.id);

  const [activeSection, setActiveSection] = useState('overview');

  const navSections = [
    { id: 'overview', title: 'Overview & Objectives' },
    { id: 'definition', title: 'Definition & Core Purpose' },
    { id: 'why-exist', title: 'Why Loops Exist' },
    { id: 'when-to-use', title: 'When To Use' },
    { id: 'syntax', title: 'Syntax & Mechanics' },
    { id: 'code-examples', title: 'Code Examples & Line Breakdown' },
    { id: 'real-world', title: 'Real-World Production Case' },
    { id: 'mistakes', title: 'Common Mistakes' },
    { id: 'edge-cases', title: 'Edge Cases & Quick Tips' },
    { id: 'practice', title: '5 Practice Problems' },
  ];

  const scrollTo = (id: string) => {
    setActiveSection(id);
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigateTo({ type: 'topic', topicId: 'topic-py-loops' })}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer mb-2"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Back to Topic: Loops & Iteration</span>
          </button>
          <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
            <span>Python Track</span>
            <span>·</span>
            <span>Module 2: Control Flow</span>
            <span>·</span>
            <span>{lesson.readTime}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mt-1">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant={isCompleted ? 'secondary' : 'primary'}
            size="md"
            onClick={() => markLessonComplete(lesson.id)}
            icon={<CheckCircle2 className="w-4 h-4" />}
          >
            {isCompleted ? 'Completed ✓ (+20 XP)' : 'Mark Lesson Complete'}
          </Button>
          <Button
            variant="outline"
            size="md"
            onClick={() => navigateTo({ type: 'problem', problemId: 'prob-loop-3' })}
            icon={<Terminal className="w-4 h-4" />}
          >
            Go to Practice
          </Button>
        </div>
      </div>

      {/* 2-Column: Left Table of Contents, Right Main Lesson Content */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Sticky Lesson Navigation */}
        <div className="lg:col-span-3 sticky top-20 hidden lg:block bg-slate-900/70 border border-slate-800 rounded-xl p-4 space-y-2 text-xs">
          <div className="font-mono text-slate-400 uppercase tracking-wider text-[11px] mb-2 px-2">
            Table of Contents
          </div>
          <nav className="space-y-1">
            {navSections.map((s) => (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer truncate ${
                  activeSection === s.id
                    ? 'bg-slate-800 text-emerald-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                }`}
              >
                {s.title}
              </button>
            ))}
          </nav>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-[11px] font-mono text-slate-400">
            <div className="flex justify-between">
              <span>Status</span>
              <span className={isCompleted ? 'text-emerald-400' : 'text-amber-400'}>
                {isCompleted ? 'Completed' : 'Reading'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Practice Unlocked</span>
              <span className="text-slate-200">3 of 5 Problems</span>
            </div>
          </div>
        </div>

        {/* Right Side: Rich Lesson Body */}
        <div className="lg:col-span-9 space-y-10 text-slate-200 leading-relaxed text-sm sm:text-base">
          {/* Section: Overview */}
          <section id="overview" className="space-y-4 scroll-mt-24">
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-emerald-400" />
                <span>Overview</span>
              </h2>
              <p className="text-sm text-slate-300">{lesson.overview}</p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
              <h3 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
                Learning Objectives
              </h3>
              <ul className="space-y-1.5 text-xs sm:text-sm">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 font-mono">0{i + 1}.</span>
                    <span className="text-slate-300">{obj}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Section: Definition */}
          <section id="definition" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white">Definition</h2>
            <blockquote className="p-4 rounded-xl bg-slate-900 border-l-4 border-emerald-500 text-slate-200 text-sm">
              {lesson.definition}
            </blockquote>
          </section>

          {/* Section: Why Does This Concept Exist? */}
          <section id="why-exist" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white">Why Does This Concept Exist?</h2>
            <p className="text-slate-300 text-sm">{lesson.whyItExists}</p>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-sm text-slate-300">
              <strong className="text-white block mb-1">Why It Matters For Engineering:</strong>
              {lesson.whyImportant}
            </div>
          </section>

          {/* Section: When Should You Use It? */}
          <section id="when-to-use" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white">When Should You Use It?</h2>
            <p className="text-slate-300 text-sm">{lesson.whenToUse}</p>
          </section>

          {/* Section: Syntax */}
          <section id="syntax" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white">Syntax & Mechanics</h2>
            <p className="text-sm text-slate-400">
              Fundamental structures of for-loops with range, sequence traversal, and while-loops:
            </p>
            <CodeBlock code={lesson.syntax} language="python" title="Python Iteration Syntax" />

            <div className="space-y-2 pt-2">
              <h3 className="text-sm font-semibold text-slate-200">Detailed Mechanics</h3>
              {lesson.detailedExplanation.map((expl, i) => (
                <p key={i} className="text-sm text-slate-300">
                  {expl}
                </p>
              ))}
            </div>
          </section>

          {/* Section: Code Examples & Line-by-Line Breakdown */}
          <section id="code-examples" className="space-y-6 scroll-mt-24">
            <h2 className="text-xl font-bold text-white">Code Examples & Line-by-Line Breakdown</h2>
            {lesson.codeExamples.map((ex, i) => (
              <div key={i} className="space-y-3 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-emerald-400" />
                  <span>Example {i + 1}: {ex.title}</span>
                </h3>
                <CodeBlock code={ex.code} language={ex.language} title={ex.title} />

                <div className="pt-2">
                  <div className="text-xs font-mono uppercase text-slate-400 mb-2">
                    Line-by-Line Explanation
                  </div>
                  <div className="space-y-1.5 text-xs font-mono">
                    {ex.lineByLine.map((lbl, idx) => (
                      <div
                        key={idx}
                        className="flex flex-col sm:flex-row sm:items-center justify-between p-2 rounded bg-slate-950/80 border border-slate-850 gap-1 sm:gap-4"
                      >
                        <span className="text-emerald-400 font-semibold shrink-0">Line {lbl.line}:</span>
                        <span className="text-slate-300 flex-1">{lbl.text}</span>
                        <code className="text-slate-400 bg-slate-900 px-1 py-0.5 rounded text-[11px] truncate">
                          {lbl.code}
                        </code>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </section>

          {/* Section: Real-World Example */}
          <section id="real-world" className="space-y-3 scroll-mt-24">
            <h2 className="text-xl font-bold text-white">Real-World Production Case</h2>
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-3 text-sm">
              <p className="text-slate-300">
                <strong className="text-white">Scenario:</strong> {lesson.realWorldExample.context}
              </p>
              <CodeBlock
                code={lesson.realWorldExample.code}
                language="python"
                title="Production Pagination Pattern"
              />
              <p className="text-slate-400 text-xs">{lesson.realWorldExample.explanation}</p>
            </div>
          </section>

          {/* Section: Common Mistakes */}
          <section id="mistakes" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <AlertOctagon className="w-5 h-5 text-amber-400" />
              <span>Common Mistakes in Technical Interviews</span>
            </h2>

            <div className="space-y-3">
              {lesson.commonMistakes.map((mistake, i) => (
                <div key={i} className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
                  <div className="text-sm font-semibold text-rose-300">
                    ✕ Mistake: {mistake.mistake}
                  </div>
                  <div className="text-xs text-slate-400">
                    <strong className="text-slate-300">Why it causes bugs:</strong> {mistake.whyWrong}
                  </div>
                  <div className="text-xs text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 p-2.5 rounded-lg">
                    <strong className="text-white">Correct Approach:</strong> {mistake.correctWay}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section: Edge Cases & Quick Tips */}
          <section id="edge-cases" className="space-y-4 scroll-mt-24">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" />
              <span>Edge Cases & Quick Tips</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="text-xs font-mono uppercase text-slate-400">Edge Cases</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {lesson.edgeCases.map((ec, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-amber-400">•</span>
                      <span>{ec}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                <h3 className="text-xs font-mono uppercase text-slate-400">Quick Tips</h3>
                <ul className="space-y-2 text-xs text-slate-300">
                  {lesson.quickTips.map((qt, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-emerald-400">•</span>
                      <span>{qt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Section: Practice Link & Completion */}
          <section id="practice" className="pt-8 border-t border-slate-800 space-y-6 scroll-mt-24">
            <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/30 border border-emerald-500/40 space-y-4">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Next Step in the Loop
                </span>
                <h2 className="text-xl font-bold text-white mt-1">
                  Ready to Practice Problem 3: Mirrored Triangle?
                </h2>
                <p className="text-xs sm:text-sm text-slate-300 mt-1">
                  You have studied the theory. Apply your loop skills now with live code execution and automated test evaluation.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => navigateTo({ type: 'problem', problemId: 'prob-loop-3' })}
                  icon={<Terminal className="w-5 h-5" />}
                >
                  Continue to Problem 3
                </Button>
                {!isCompleted && (
                  <Button
                    variant="secondary"
                    size="lg"
                    onClick={() => markLessonComplete(lesson.id)}
                    icon={<CheckCircle2 className="w-5 h-5 text-emerald-400" />}
                  >
                    Mark Lesson Complete (+20 XP)
                  </Button>
                )}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
