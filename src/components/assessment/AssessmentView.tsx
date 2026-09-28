import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  Award,
  HelpCircle,
  Send,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { CodeBlock } from '../common/CodeBlock';
import {
  PYTHON_TOPIC_ASSESSMENT,
  PYTHON_COURSE_ASSESSMENT,
} from '../../data/mockData';
import { Assessment, Question } from '../../types';

interface AssessmentViewProps {
  assessmentId: string;
}

export const AssessmentView: React.FC<AssessmentViewProps> = ({ assessmentId }) => {
  const { navigateTo, completeAssessment } = useApp();

  const isCourseAssessment = assessmentId === 'assess-course-python';
  const assessment: Assessment = isCourseAssessment
    ? PYTHON_COURSE_ASSESSMENT
    : PYTHON_TOPIC_ASSESSMENT;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    assessment.timeLimitMinutes * 60
  );
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [scoreResult, setScoreResult] = useState<{
    scorePercent: number;
    correctCount: number;
    passed: boolean;
  } | null>(null);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const currentQ: Question = assessment.questions[currentIndex];
  const totalQuestions = assessment.questions.length;
  const answeredCount = Object.keys(selectedAnswers).length;
  const progressPercent = Math.round((answeredCount / totalQuestions) * 100);

  const handleSelectOption = (optionIndex: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    let correct = 0;
    assessment.questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        correct++;
      }
    });

    const percent = Math.round((correct / totalQuestions) * 100);
    const { passed, newCert } = completeAssessment(assessment.id, percent);

    setIsSubmitted(true);
    setScoreResult({
      scorePercent: percent,
      correctCount: correct,
      passed,
    });

    if (isCourseAssessment && passed) {
      setTimeout(() => {
        navigateTo({
          type: 'course-completed',
          courseId: 'course-python',
          score: percent,
        });
      }, 1500);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Top Header & Breadcrumb */}
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <div>
          <button
            onClick={() => navigateTo({ type: 'course', courseId: 'course-python' })}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer mb-1"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Assessment</span>
          </button>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              {assessment.title}
            </h1>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
              Passing: {assessment.passingScorePercent}%
            </span>
          </div>
        </div>

        {/* Non-stressful timer */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-200">
          <Clock className="w-4 h-4 text-emerald-400" />
          <span>Time Remaining:</span>
          <span className="font-semibold text-white">{formatTimer(secondsRemaining)}</span>
        </div>
      </div>

      {/* Progress & Question Tracker Bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-xs font-mono text-slate-400">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>
            Answered: {answeredCount} / {totalQuestions} ({progressPercent}%)
          </span>
        </div>
        <Progress value={progressPercent} size="sm" color="emerald" />

        {/* Quick jump question numbers */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-2">
          {assessment.questions.map((q, i) => {
            const isAnswered = selectedAnswers[q.id] !== undefined;
            const isCurrent = i === currentIndex;
            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(i)}
                className={`w-7 h-7 rounded text-xs font-mono font-medium transition-colors shrink-0 cursor-pointer ${
                  isCurrent
                    ? 'bg-emerald-600 text-white font-bold ring-2 ring-emerald-400/50'
                    : isAnswered
                    ? 'bg-slate-800 text-emerald-400 border border-slate-700'
                    : 'bg-slate-950 text-slate-500 border border-slate-850 hover:bg-slate-900'
                }`}
              >
                {i + 1}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Question Card */}
      <Card padding="lg" className="bg-slate-900/90 border-slate-800 space-y-6">
        <div>
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 mb-2">
            <span className="uppercase text-emerald-400 tracking-wider">
              {currentQ.type.toUpperCase()} · Tag: {currentQ.topicTag}
            </span>
            <span>Question {currentIndex + 1}</span>
          </div>

          <h2 className="text-base sm:text-lg font-semibold text-white leading-relaxed">
            {currentQ.questionText}
          </h2>
        </div>

        {/* Code Snippet if question has one */}
        {currentQ.codeSnippet && (
          <CodeBlock
            code={currentQ.codeSnippet}
            language="python"
            title="Snippet to Analyze"
            showLineNumbers={false}
          />
        )}

        {/* Answer Options */}
        <div className="space-y-3">
          {currentQ.options.map((opt, optIdx) => {
            const isSelected = selectedAnswers[currentQ.id] === optIdx;
            const isCorrect = currentQ.correctIndex === optIdx;

            let borderClass = 'border-slate-800 hover:border-slate-700 bg-slate-950/70';
            if (isSelected) {
              borderClass = 'border-emerald-500 bg-emerald-950/30 text-emerald-200';
            }
            if (isSubmitted) {
              if (isCorrect) {
                borderClass = 'border-emerald-500 bg-emerald-950/50 text-emerald-300 font-bold';
              } else if (isSelected && !isCorrect) {
                borderClass = 'border-rose-500 bg-rose-950/40 text-rose-300 line-through';
              }
            }

            return (
              <button
                key={optIdx}
                type="button"
                onClick={() => handleSelectOption(optIdx)}
                className={`w-full text-left p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${borderClass}`}
              >
                <div className="flex items-center gap-3">
                  <span className="w-6 h-6 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono flex items-center justify-center text-slate-400 shrink-0">
                    {String.fromCharCode(65 + optIdx)}
                  </span>
                  <span className="text-xs sm:text-sm">{opt}</span>
                </div>
                {isSelected && !isSubmitted && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Post-submission explanation */}
        {isSubmitted && (
          <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 space-y-1">
            <span className="font-semibold text-emerald-400 block font-mono">Explanation:</span>
            <p>{currentQ.explanation}</p>
          </div>
        )}

        {/* Navigation & Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t border-slate-800">
          <Button
            variant="ghost"
            size="md"
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => prev - 1)}
            icon={<ArrowLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <div className="flex items-center gap-3">
            {currentIndex < totalQuestions - 1 ? (
              <Button
                variant="secondary"
                size="md"
                onClick={() => setCurrentIndex((prev) => prev + 1)}
                icon={<ArrowRight className="w-4 h-4" />}
                iconPosition="right"
              >
                Next Question
              </Button>
            ) : (
              !isSubmitted && (
                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSubmit}
                  icon={<Send className="w-4 h-4" />}
                  iconPosition="right"
                >
                  Submit Assessment
                </Button>
              )
            )}
          </div>
        </div>
      </Card>

      {/* Submission Result Summary Card */}
      {isSubmitted && scoreResult && (
        <Card padding="lg" className="bg-slate-900 border-emerald-500/40 text-center space-y-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center mx-auto border ${
              scoreResult.passed
                ? 'bg-emerald-950 border-emerald-500/50 text-emerald-400'
                : 'bg-rose-950 border-rose-500/50 text-rose-400'
            }`}
          >
            <Award className="w-7 h-7" />
          </div>

          <div>
            <h3 className="text-2xl font-bold text-white">
              {scoreResult.passed ? 'Assessment Passed! 🎉' : 'Assessment Attempt Recorded'}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Score: {scoreResult.scorePercent}% ({scoreResult.correctCount} / {totalQuestions}{' '}
              correct)
            </p>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            {isCourseAssessment && scoreResult.passed && (
              <Button
                variant="primary"
                onClick={() =>
                  navigateTo({
                    type: 'course-completed',
                    courseId: 'course-python',
                    score: scoreResult.scorePercent,
                  })
                }
              >
                View Course Completion & Certificate
              </Button>
            )}
            <Button
              variant="secondary"
              onClick={() => navigateTo({ type: 'course', courseId: 'course-python' })}
            >
              Return to Roadmap
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
};
