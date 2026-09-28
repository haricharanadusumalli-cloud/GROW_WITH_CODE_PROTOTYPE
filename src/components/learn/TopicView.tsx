import React, { useState } from 'react';
import {
  ChevronLeft,
  Play,
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  BookOpen,
  Terminal,
  Volume2,
  Maximize2,
  FileCode,
  Sparkles,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { PYTHON_TOPICS, PYTHON_LOOPS_PROBLEMS, PYTHON_LOOPS_LESSON } from '../../data/mockData';

interface TopicViewProps {
  topicId: string;
}

export const TopicView: React.FC<TopicViewProps> = ({ topicId }) => {
  const {
    navigateTo,
    unlockedProblemIds,
    completedProblemIds,
    isLessonCompleted,
  } = useApp();

  const [isPlayingVideo, setIsPlayingVideo] = useState(false);

  const topic = PYTHON_TOPICS.find((t) => t.id === topicId) || PYTHON_TOPICS[4]; // Default Loops
  const problems = PYTHON_LOOPS_PROBLEMS;
  const lesson = PYTHON_LOOPS_LESSON;
  const isLessonDone = isLessonCompleted(lesson.id);

  const solvedProblemsCount = problems.filter((p) => completedProblemIds.includes(p.id)).length;
  const topicProgressPercent = Math.round((solvedProblemsCount / problems.length) * 100);

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Breadcrumb */}
      <div>
        <button
          onClick={() => navigateTo({ type: 'course', courseId: 'course-python' })}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Python Roadmap</span>
        </button>
      </div>

      {/* Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-slate-400">
          <span className="text-emerald-400 font-semibold">Topic {topic.order}</span>
          <span>·</span>
          <span>{topic.difficulty} Difficulty</span>
          <span>·</span>
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" /> ~{topic.estimatedMinutes} mins total
          </span>
          <span>·</span>
          <span>Prerequisites: {topic.prerequisites.join(', ')}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {topic.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
          {topic.overview}
        </p>

        {/* Topic stats & lesson CTA */}
        <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span>Practice Progress: {solvedProblemsCount} of 5 Solved</span>
              <span>·</span>
              <span className="text-emerald-400">{topicProgressPercent}% Completed</span>
            </div>
            <div className="w-48 sm:w-64">
              <Progress value={topicProgressPercent} size="sm" color="emerald" />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => navigateTo({ type: 'assessment', assessmentId: 'assess-py-loops' })}
            >
              Topic Assessment
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigateTo({ type: 'lesson', lessonId: lesson.id })}
              icon={<BookOpen className="w-4 h-4" />}
            >
              {isLessonDone ? 'Review Lesson' : 'Start Lesson'}
            </Button>
          </div>
        </div>
      </div>

      {/* Learning Objectives Grid */}
      <section aria-label="Learning objectives">
        <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-3">
          What You'll Learn
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {topic.learningObjectives.map((obj, i) => (
            <div
              key={i}
              className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-900/50 border border-slate-850 text-xs text-slate-300"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{obj}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Realistic Video Player Placeholder */}
      <section aria-label="Video lesson">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
            Video Overview ({topic.videoPreviewDuration})
          </h2>
          <span className="text-[11px] font-mono text-slate-500">HD 1080p · Interactive Chapters</span>
        </div>

        <div className="relative aspect-video max-h-[420px] w-full rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex flex-col justify-between p-4 shadow-xl">
          {/* Top video bar */}
          <div className="flex items-center justify-between z-10 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
              <span className="text-slate-200 font-medium">Mastering Python Loops & Iteration Mechanics</span>
            </div>
            <span>{topic.videoPreviewDuration}</span>
          </div>

          {/* Center Play Button Overlay */}
          <div className="flex flex-col items-center justify-center space-y-3 z-10 my-auto">
            <button
              onClick={() => setIsPlayingVideo(!isPlayingVideo)}
              className="w-16 h-16 rounded-full bg-emerald-600/90 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-950/60 transition-transform hover:scale-105 cursor-pointer"
              aria-label={isPlayingVideo ? 'Pause video' : 'Play video overview'}
            >
              <Play className="w-7 h-7 fill-white ml-1" />
            </button>
            <p className="text-xs text-slate-400 font-mono">
              {isPlayingVideo ? 'Playing preview stream (Simulated)' : 'Click to stream lesson breakdown'}
            </p>
          </div>

          {/* Bottom Video Controls Bar */}
          <div className="z-10 bg-slate-900/90 backdrop-blur-sm border border-slate-800 rounded-lg p-2.5 flex items-center justify-between text-xs text-slate-300 font-mono">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsPlayingVideo(!isPlayingVideo)}
                className="text-white hover:text-emerald-400"
              >
                <Play className="w-4 h-4 fill-white" />
              </button>
              <div className="flex items-center gap-2 text-[11px] text-slate-400">
                <span className="text-slate-200">03:14</span> / <span>{topic.videoPreviewDuration}</span>
              </div>
            </div>

            {/* Simulated scrubber */}
            <div className="flex-1 mx-4 h-1.5 bg-slate-800 rounded-full overflow-hidden cursor-pointer">
              <div className="h-full bg-emerald-500 w-[24%]" />
            </div>

            <div className="flex items-center gap-3 text-slate-400">
              <Volume2 className="w-4 h-4 hover:text-slate-200 cursor-pointer" />
              <span className="text-[11px] hover:text-slate-200 cursor-pointer">1.0x</span>
              <Maximize2 className="w-3.5 h-3.5 hover:text-slate-200 cursor-pointer" />
            </div>
          </div>
        </div>
      </section>

      {/* Lesson Content Preview */}
      <section aria-label="Lesson content breakdown" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-slate-400">
              Lesson Content
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Read comprehensive explanations before attempting problems.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTo({ type: 'lesson', lessonId: lesson.id })}
          >
            Open Full Lesson ({lesson.readTime})
          </Button>
        </div>

        <Card padding="md" className="bg-slate-900/60 border-slate-800 space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold text-slate-200">Concept Definition</h3>
            <p className="text-xs text-slate-300 leading-relaxed">{lesson.definition}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-800/80">
            <div>
              <div className="text-xs font-semibold text-slate-200 mb-1">Why Loops Exist</div>
              <p className="text-xs text-slate-400 leading-relaxed">{lesson.whyItExists}</p>
            </div>
            <div>
              <div className="text-xs font-semibold text-slate-200 mb-1">When Should You Use It</div>
              <p className="text-xs text-slate-400 leading-relaxed">{lesson.whenToUse}</p>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigateTo({ type: 'lesson', lessonId: lesson.id })}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Start Lesson
            </Button>
          </div>
        </Card>
      </section>

      {/* Exactly Five Coding Problems with Sequential Unlocking */}
      <section aria-label="Deliberate practice problems" className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Deliberate Practice
            </h2>
            <h3 className="text-xl font-bold text-white tracking-tight">
              5 Progressive Coding Problems
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Sequential unlocking: Accept Problem N to unlock Problem N+1.
            </p>
          </div>

          <div className="text-xs font-mono text-slate-400">
            {solvedProblemsCount} / 5 Solved
          </div>
        </div>

        <div className="space-y-3">
          {problems.map((problem) => {
            const isCompleted = completedProblemIds.includes(problem.id);
            const isUnlocked = unlockedProblemIds.includes(problem.id) || isCompleted;
            const isCurrentPriority = isUnlocked && !isCompleted;

            return (
              <div
                key={problem.id}
                onClick={() => {
                  if (isUnlocked) {
                    navigateTo({ type: 'problem', problemId: problem.id });
                  }
                }}
                className={`p-4 sm:p-5 rounded-xl border transition-all ${
                  isCurrentPriority
                    ? 'bg-slate-900 border-emerald-500/60 ring-1 ring-emerald-500/30 shadow-md cursor-pointer'
                    : isCompleted
                    ? 'bg-slate-900/70 border-slate-800 hover:border-slate-700 cursor-pointer'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg flex items-center justify-center font-mono text-xs font-bold shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : isCurrentPriority
                          ? 'bg-amber-950 text-amber-300 border border-amber-500/40 animate-pulse'
                          : 'bg-slate-800 text-slate-500 border border-slate-700/50'
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : isUnlocked ? (
                        <span>0{problem.order}</span>
                      ) : (
                        <Lock className="w-4 h-4" />
                      )}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">
                          Problem 0{problem.order}
                        </span>
                        <span aria-hidden="true" className="text-slate-600">·</span>
                        <span
                          className={`text-xs font-mono ${
                            problem.difficulty === 'Easy'
                              ? 'text-emerald-400'
                              : problem.difficulty === 'Medium'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {problem.difficulty}
                        </span>
                        {isCompleted && (
                          <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-1.5 py-0.2 rounded">
                            ✓ Accepted
                          </span>
                        )}
                        {isCurrentPriority && (
                          <span className="text-[10px] font-mono text-amber-300 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded">
                            → Current Action
                          </span>
                        )}
                        {!isUnlocked && (
                          <span className="text-[10px] font-mono text-slate-500 bg-slate-900 border border-slate-800 px-1.5 py-0.2 rounded">
                            🔒 Locked
                          </span>
                        )}
                      </div>

                      <h4 className="text-base font-bold text-white mt-0.5 hover:text-emerald-300 transition-colors">
                        {problem.title}
                      </h4>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-slate-400">
                    <span>Est: {problem.timeEstimate}</span>
                    <span>·</span>
                    <span>Acceptance: {problem.acceptanceRate}</span>
                    {isUnlocked ? (
                      <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold ml-2">
                        <span>{isCompleted ? 'Solve Again' : 'Solve'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-slate-600 ml-2">Complete P{problem.order - 1} first</span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
