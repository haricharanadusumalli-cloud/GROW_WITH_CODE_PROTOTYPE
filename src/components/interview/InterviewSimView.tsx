import React, { useState, useEffect } from 'react';
import {
  Clock,
  Briefcase,
  CheckCircle2,
  Code2,
  Send,
  AlertCircle,
  Play,
  RotateCcw,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { CodeBlock } from '../common/CodeBlock';
import { InterviewConfig } from '../../types';

interface InterviewSimViewProps {
  config: InterviewConfig;
}

export const InterviewSimView: React.FC<InterviewSimViewProps> = ({ config }) => {
  const { navigateTo, submitInterviewSimulation } = useApp();

  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    config.durationMinutes * 60
  );
  const [activeTab, setActiveTab] = useState<'theory' | 'dsa' | 'coding'>('theory');

  // Answers state
  const [theoryAnswers, setTheoryAnswers] = useState<Record<string, number>>({
    't-1': 0,
    't-2': 1,
    't-3': 0,
  });

  const [dsaAnswers, setDsaAnswers] = useState<Record<string, number>>({
    'd-1': 0,
    'd-2': 2,
  });

  const [codingCode, setCodingCode] = useState<string>(
    `def two_sum_optimal(nums: list[int], target: int) -> list[int]:
    # Write O(N) solution using Hash Map
    lookup = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in lookup:
            return [lookup[complement], i]
        lookup[num] = i
    return []
`
  );

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      const report = submitInterviewSimulation(config.language, config.durationMinutes, {
        correct: 14,
        incorrect: 3,
        skipped: 1,
      });
      setIsSubmitting(false);
      navigateTo({ type: 'interview-report', reportId: report.id });
    }, 1000);
  };

  const theoryQuestions = [
    {
      id: 't-1',
      question: 'Explain the difference between mutable and immutable types in Python memory management.',
      snippet: 'a = [1, 2]\nb = a\nb.append(3)\nprint(a)',
      options: [
        'Lists are mutable objects; b and a point to the same memory reference, so a becomes [1, 2, 3]',
        'Assignment always creates a deep copy in Python; a remains [1, 2]',
        'Python throws an AssignmentReferenceError',
      ],
      correct: 0,
    },
    {
      id: 't-2',
      question: 'How does the CPython Global Interpreter Lock (GIL) influence multi-threaded CPU-bound programs?',
      options: [
        'It allows threads to achieve true parallelism on multi-core processors',
        'It serializes execution of Python bytecodes, preventing true multi-core speedup for pure CPU-bound tasks',
        'It disables memory allocation outside the main thread',
      ],
      correct: 1,
    },
    {
      id: 't-3',
      question: 'What is the time complexity of a key membership test `if key in my_dict:` in Python?',
      options: [
        'Average O(1), Worst Case O(N) during extreme hash collisions',
        'Always O(log N) binary search',
        'Always O(N) sequential search',
      ],
      correct: 0,
    },
  ];

  const dsaQuestions = [
    {
      id: 'd-1',
      question: 'Which algorithmic paradigm is optimal for finding the maximum sum contiguous subarray in an array of integers?',
      options: [
        "Kadane's Algorithm (Dynamic Programming / Sliding Window) with O(N) time and O(1) space",
        'Divide and Conquer with O(N^3) time',
        'Breadth-First Search with O(2^N) space',
      ],
      correct: 0,
    },
    {
      id: 'd-2',
      question: 'What is the worst-case time complexity of quicksort when the pivot chosen is always the smallest or largest element?',
      options: ['O(N log N)', 'O(N)', 'O(N^2)', 'O(log N)'],
      correct: 2,
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-in fade-in duration-200">
      {/* Simulation Top Bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
          <div>
            <h1 className="text-sm font-bold text-white">
              {config.language.toUpperCase()} Technical Interview
            </h1>
            <p className="text-[11px] font-mono text-slate-400">
              {config.difficultyLevel} Level · Timed Simulation
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm">{formatTimer(secondsRemaining)}</span>
          </div>

          <Button
            variant="primary"
            size="sm"
            onClick={handleFinish}
            loading={isSubmitting}
            icon={<Send className="w-3.5 h-3.5" />}
          >
            End & Submit Interview
          </Button>
        </div>
      </div>

      {/* Section Switcher Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('theory')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'theory'
              ? 'bg-slate-800 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Part 1: Language Theory ({Object.keys(theoryAnswers).length}/3)
        </button>
        <button
          onClick={() => setActiveTab('dsa')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'dsa'
              ? 'bg-slate-800 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Part 2: DSA Architecture ({Object.keys(dsaAnswers).length}/2)
        </button>
        <button
          onClick={() => setActiveTab('coding')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
            activeTab === 'coding'
              ? 'bg-slate-800 text-white font-semibold'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          Part 3: Live Coding Challenge
        </button>
      </div>

      {/* Part 1: Theory Questions */}
      {activeTab === 'theory' && (
        <div className="space-y-5">
          {theoryQuestions.map((q, idx) => (
            <Card key={q.id} padding="md" className="space-y-4 bg-slate-900 border-slate-800">
              <div className="text-xs font-mono text-emerald-400">Question {idx + 1} of 3</div>
              <h3 className="text-sm sm:text-base font-semibold text-white">{q.question}</h3>
              {q.snippet && <CodeBlock code={q.snippet} language="python" showLineNumbers={false} />}
              <div className="space-y-2 pt-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = theoryAnswers[q.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setTheoryAnswers({ ...theoryAnswers, [q.id]: oIdx })}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-emerald-950/40 border-emerald-500 text-emerald-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] flex items-center justify-center text-slate-400">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
          <div className="flex justify-end">
            <Button variant="secondary" onClick={() => setActiveTab('dsa')}>
              Proceed to Part 2: DSA →
            </Button>
          </div>
        </div>
      )}

      {/* Part 2: DSA Questions */}
      {activeTab === 'dsa' && (
        <div className="space-y-5">
          {dsaQuestions.map((q, idx) => (
            <Card key={q.id} padding="md" className="space-y-4 bg-slate-900 border-slate-800">
              <div className="text-xs font-mono text-sky-400">DSA Question {idx + 1} of 2</div>
              <h3 className="text-sm sm:text-base font-semibold text-white">{q.question}</h3>
              <div className="space-y-2 pt-1">
                {q.options.map((opt, oIdx) => {
                  const isSelected = dsaAnswers[q.id] === oIdx;
                  return (
                    <button
                      key={oIdx}
                      onClick={() => setDsaAnswers({ ...dsaAnswers, [q.id]: oIdx })}
                      className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'bg-sky-950/40 border-sky-500 text-sky-200'
                          : 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] flex items-center justify-center text-slate-400">
                          {String.fromCharCode(65 + oIdx)}
                        </span>
                        <span>{opt}</span>
                      </div>
                      {isSelected && <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </Card>
          ))}
          <div className="flex justify-between">
            <Button variant="ghost" onClick={() => setActiveTab('theory')}>
              ← Back to Part 1
            </Button>
            <Button variant="secondary" onClick={() => setActiveTab('coding')}>
              Proceed to Part 3: Coding Challenge →
            </Button>
          </div>
        </div>
      )}

      {/* Part 3: Live Coding */}
      {activeTab === 'coding' && (
        <div className="space-y-4">
          <Card padding="md" className="bg-slate-900 border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-amber-400 uppercase">Live Coding Prompt</span>
              <span className="text-xs font-mono text-slate-400">Target Time: O(N)</span>
            </div>
            <h2 className="text-base font-bold text-white">
              Two Sum with Single Pass Hash Map
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Given an array of integers <code className="text-emerald-400">nums</code> and an integer{' '}
              <code className="text-emerald-400">target</code>, return indices of the two numbers
              such that they add up to target. You may assume each input has exactly one solution,
              and you may not use the same element twice.
            </p>
          </Card>

          {/* Mini Editor */}
          <div className="rounded-xl border border-slate-800 bg-slate-950 overflow-hidden font-mono text-xs">
            <div className="px-3.5 py-2 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-slate-400">
              <span>Python 3 Live Editor</span>
              <div className="flex items-center gap-2">
                <button className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-750 text-slate-200">
                  Run Tests
                </button>
              </div>
            </div>
            <textarea
              value={codingCode}
              onChange={(e) => setCodingCode(e.target.value)}
              rows={12}
              aria-label="Interview coding code editor"
              className="w-full p-4 bg-transparent text-slate-100 font-mono leading-relaxed resize-none focus:outline-none"
            />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={handleFinish}
              loading={isSubmitting}
              icon={<Send className="w-4 h-4" />}
            >
              Submit & Generate Diagnostic Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
