import React from 'react';
import {
  CheckCircle2,
  Lock,
  ArrowRight,
  Clock,
  BookOpen,
  Award,
  Terminal,
  ShieldCheck,
  ChevronLeft,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { COURSES, PYTHON_TOPICS, PYTHON_MODULES } from '../../data/mockData';
import { TopicStatus } from '../../types';

interface CourseViewProps {
  courseId: string;
}

export const CourseView: React.FC<CourseViewProps> = ({ courseId }) => {
  const { navigateTo, user } = useApp();

  const course = COURSES.find((c) => c.id === courseId) || COURSES[0];
  const completedTopicsCount = user.completedTopicIds.length;
  const totalTopics = PYTHON_TOPICS.length;
  const progressPercent = Math.round((completedTopicsCount / totalTopics) * 100);

  // Status mapper
  const getTopicStatus = (topicId: string, order: number): TopicStatus => {
    if (user.completedTopicIds.includes(topicId)) return 'completed';
    if (topicId === 'topic-py-loops') return 'current';
    if (order === 6 && user.completedTopicIds.includes('topic-py-loops')) return 'available';
    return 'locked';
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto animate-in fade-in duration-200">
      {/* Back breadcrumb */}
      <div>
        <button
          onClick={() => navigateTo({ type: 'learn-catalog' })}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to All Courses</span>
        </button>
      </div>

      {/* Course Header */}
      <div className="space-y-3 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
          <span>Official Track</span>
          <span>·</span>
          <span>Beginner → Advanced</span>
          <span>·</span>
          <span>50 Problems Total</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          {course.title}
        </h1>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          {course.tagline}
        </p>

        {/* Course Metrics Overview Banner */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4">
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-[11px] font-mono text-slate-400">Course Progress</span>
            <div className="text-lg font-bold font-mono text-emerald-400 mt-0.5">
              {progressPercent}%
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-[11px] font-mono text-slate-400">Completed Topics</span>
            <div className="text-lg font-bold font-mono text-white mt-0.5">
              {completedTopicsCount} / {totalTopics}
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-[11px] font-mono text-slate-400">Current Topic</span>
            <div className="text-sm font-semibold text-amber-300 mt-1 truncate">
              Loops & Iteration
            </div>
          </div>
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg">
            <span className="text-[11px] font-mono text-slate-400">Estimated Remaining</span>
            <div className="text-lg font-bold font-mono text-slate-200 mt-0.5">~22 Hours</div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="pt-2">
          <Progress value={progressPercent} size="md" color="emerald" showLabel />
        </div>
      </div>

      {/* Vertical Course Roadmap */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Course Roadmap</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Sequential timeline from syntax fundamentals to interview algorithmic patterns.
            </p>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={() => navigateTo({ type: 'topic', topicId: 'topic-py-loops' })}
            icon={<ArrowRight className="w-4 h-4" />}
            iconPosition="right"
          >
            Resume Current Topic
          </Button>
        </div>

        {/* Timeline node list */}
        <div className="relative border-l-2 border-slate-800 ml-4 sm:ml-6 space-y-6 py-2">
          {PYTHON_TOPICS.map((topic) => {
            const status = getTopicStatus(topic.id, topic.order);
            const isCompleted = status === 'completed';
            const isCurrent = status === 'current';
            const isAvailable = status === 'available';
            const isLocked = status === 'locked';

            return (
              <div key={topic.id} className="relative pl-6 sm:pl-8 group">
                {/* Node icon */}
                <div
                  className={`absolute -left-[17px] top-3.5 w-8 h-8 rounded-full flex items-center justify-center transition-colors ${
                    isCompleted
                      ? 'bg-emerald-950 border-2 border-emerald-500 text-emerald-400'
                      : isCurrent
                      ? 'bg-amber-950 border-2 border-amber-400 text-amber-300 shadow-lg shadow-amber-950/60 animate-pulse'
                      : isAvailable
                      ? 'bg-slate-900 border-2 border-slate-500 text-slate-300'
                      : 'bg-slate-950 border-2 border-slate-800 text-slate-600'
                  }`}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-4 h-4" />
                  ) : isLocked ? (
                    <Lock className="w-3.5 h-3.5" />
                  ) : (
                    <span className="font-mono text-xs font-bold">{topic.order}</span>
                  )}
                </div>

                {/* Topic Card */}
                <div
                  onClick={() => {
                    if (!isLocked) {
                      navigateTo({ type: 'topic', topicId: topic.id });
                    }
                  }}
                  className={`p-4 sm:p-5 rounded-xl border transition-all ${
                    isCurrent
                      ? 'bg-slate-900/90 border-amber-500/40 ring-1 ring-amber-500/20 shadow-md cursor-pointer'
                      : isCompleted
                      ? 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 cursor-pointer'
                      : isAvailable
                      ? 'bg-slate-900/40 border-slate-800 hover:border-slate-700 cursor-pointer'
                      : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-slate-400">Topic {topic.order}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-xs font-mono text-slate-400">{topic.difficulty}</span>
                      {isCurrent && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                          CURRENT TOPIC
                        </span>
                      )}
                      {isCompleted && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                          COMPLETED
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {topic.estimatedMinutes} mins
                      </span>
                      <span>·</span>
                      <span>5 Problems</span>
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-300 mt-1 leading-relaxed line-clamp-2">
                    {topic.overview}
                  </p>

                  <div className="mt-3 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs">
                    <div className="text-[11px] text-slate-400">
                      Objectives: {topic.learningObjectives.slice(0, 2).join(' · ')}
                    </div>
                    <div>
                      {!isLocked ? (
                        <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                          <span>{isCompleted ? 'Review Topic' : 'Open Topic'}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-500 font-mono">
                          <Lock className="w-3 h-3" />
                          <span>Locked</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Milestone Node: Course Final Assessment */}
          <div className="relative pl-6 sm:pl-8">
            <div className="absolute -left-[17px] top-3.5 w-8 h-8 rounded-full bg-slate-900 border-2 border-emerald-500 text-emerald-400 flex items-center justify-center">
              <Award className="w-4 h-4" />
            </div>

            <div className="p-5 rounded-xl border border-emerald-500/30 bg-gradient-to-r from-emerald-950/30 to-slate-900 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">
                  Course Certification Assessment
                </span>
                <span className="text-xs font-mono text-slate-400">30 Questions · Passing: 70%</span>
              </div>
              <h3 className="text-lg font-bold text-white">
                Python Comprehensive Certification Benchmark
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed">
                Demonstrate complete language mastery. Pass with 70% or higher to earn your verified
                Certificate of Completion and unlock advanced Code Arena tiers.
              </p>
              <div className="pt-2">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() =>
                    navigateTo({ type: 'assessment', assessmentId: 'assess-course-python' })
                  }
                  icon={<Award className="w-4 h-4" />}
                >
                  Take 30-Question Assessment
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
