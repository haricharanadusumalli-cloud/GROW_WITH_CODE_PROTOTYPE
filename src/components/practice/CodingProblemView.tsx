import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  Lock,
  ArrowRight,
  HelpCircle,
  FileText,
  Clock,
  Code2,
  Check,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  Sparkles,
  Trophy,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { CodeBlock } from '../common/CodeBlock';
import { Card } from '../common/Card';
import { Modal } from '../common/Modal';
import { PYTHON_LOOPS_PROBLEMS, PYTHON_TOPICS } from '../../data/mockData';
import { Problem } from '../../types';

interface CodingProblemViewProps {
  problemId: string;
}

export const CodingProblemView: React.FC<CodingProblemViewProps> = ({ problemId }) => {
  const {
    navigateTo,
    submitProblem,
    resetProblemState,
    completedProblemIds,
    unlockedProblemIds,
  } = useApp();

  const currentProblem: Problem =
    PYTHON_LOOPS_PROBLEMS.find((p) => p.id === problemId) || PYTHON_LOOPS_PROBLEMS[2]; // Default Problem 3

  const [language, setLanguage] = useState<'python' | 'java' | 'c'>('python');
  const [code, setCode] = useState<string>(
    currentProblem.starterCode[language] || currentProblem.solutionCode[language] || ''
  );
  const [activeLeftTab, setActiveLeftTab] = useState<'description' | 'editorial' | 'submissions'>('description');
  const [activeTestCaseTab, setActiveTestCaseTab] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [submissionResult, setSubmissionResult] = useState<{
    status: 'accepted' | 'wrong_answer' | 'runtime_error';
    runtime: number;
    memory: number;
    testCasesPassed: number;
    totalTestCases: number;
    message: string;
  } | null>(null);
  const [openHintIndex, setOpenHintIndex] = useState<number | null>(null);
  const [showTopicCompletionModal, setShowTopicCompletionModal] = useState<boolean>(false);

  // Update starter code when language or problem changes
  useEffect(() => {
    setCode(currentProblem.starterCode[language] || currentProblem.solutionCode[language] || '');
    setSubmissionResult(null);
  }, [problemId, language]);

  const handleRun = async () => {
    setIsRunning(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsRunning(false);
    setSubmissionResult({
      status: 'accepted',
      runtime: 38,
      memory: 11.9,
      testCasesPassed: currentProblem.testCases.filter((t) => t.isPublic).length,
      totalTestCases: currentProblem.testCases.filter((t) => t.isPublic).length,
      message: 'Sample test cases passed successfully.',
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const res = await submitProblem(currentProblem.id, code, language);
    setIsSubmitting(false);
    setSubmissionResult(res);

    // Check if this was Problem 5 and all are now completed
    const newTotalCompleted = completedProblemIds.includes(currentProblem.id)
      ? completedProblemIds.length
      : completedProblemIds.length + 1;

    if (newTotalCompleted >= 5 || currentProblem.order === 5) {
      setShowTopicCompletionModal(true);
    }
  };

  const handleUseSolution = () => {
    setCode(currentProblem.solutionCode[language] || currentProblem.starterCode[language]);
  };

  const nextProblem = PYTHON_LOOPS_PROBLEMS.find((p) => p.order === currentProblem.order + 1);
  const isNextUnlocked = nextProblem && unlockedProblemIds.includes(nextProblem.id);

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* Top Problem Navigation Bar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900 border border-slate-800 rounded-t-xl shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo({ type: 'topic', topicId: 'topic-py-loops' })}
            className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Python Loops</span>
          </button>
          <span className="text-slate-700">|</span>

          {/* Problem Selector 1 to 5 */}
          <div className="flex items-center gap-1">
            {PYTHON_LOOPS_PROBLEMS.map((p) => {
              const isComp = completedProblemIds.includes(p.id);
              const isUnl = unlockedProblemIds.includes(p.id) || isComp;
              const isCurr = p.id === currentProblem.id;

              return (
                <button
                  key={p.id}
                  disabled={!isUnl}
                  onClick={() => navigateTo({ type: 'problem', problemId: p.id })}
                  className={`flex items-center gap-1 px-2.5 py-1 rounded text-xs font-mono transition-colors ${
                    isCurr
                      ? 'bg-emerald-600 text-white font-bold'
                      : isComp
                      ? 'bg-slate-800 text-emerald-400 hover:bg-slate-750'
                      : isUnl
                      ? 'bg-slate-850 text-slate-300 hover:bg-slate-800'
                      : 'bg-slate-950 text-slate-600 cursor-not-allowed'
                  }`}
                  title={isUnl ? `P0${p.order}: ${p.title}` : `Solve P0${p.order - 1} first`}
                >
                  {isComp ? (
                    <Check className="w-3 h-3" />
                  ) : !isUnl ? (
                    <Lock className="w-2.5 h-2.5" />
                  ) : null}
                  <span>P0{p.order}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Prototype Testing Helper Button */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleUseSolution}
            className="text-[11px] font-mono text-emerald-400/90 hover:text-emerald-300 px-2 py-1 rounded hover:bg-slate-800 transition-colors cursor-pointer"
            title="Load reference working solution for quick testing"
          >
            Load Reference Code
          </button>
          {completedProblemIds.includes(currentProblem.id) && (
            <button
              onClick={() => resetProblemState(currentProblem.id)}
              className="text-[11px] font-mono text-slate-500 hover:text-slate-300 px-1.5 py-1 rounded cursor-pointer"
              title="Reset status for testing"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Main Split Layout: Left Problem Description, Right IDE */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-0 border-x border-b border-slate-800 bg-slate-950 overflow-hidden rounded-b-xl">
        {/* Left Side: Tabs & Problem Details (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col h-full border-r border-slate-800 bg-slate-900/50 overflow-hidden">
          {/* Left Tabs */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900 shrink-0 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveLeftTab('description')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeLeftTab === 'description'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveLeftTab('editorial')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeLeftTab === 'editorial'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Solution & Hints
              </button>
              <button
                onClick={() => setActiveLeftTab('submissions')}
                className={`px-3 py-1 rounded font-medium transition-colors cursor-pointer ${
                  activeLeftTab === 'submissions'
                    ? 'bg-slate-800 text-white'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                Submissions
              </button>
            </div>

            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span
                className={
                  currentProblem.difficulty === 'Easy'
                    ? 'text-emerald-400'
                    : currentProblem.difficulty === 'Medium'
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }
              >
                {currentProblem.difficulty}
              </span>
              <span>·</span>
              <span className="text-slate-400">{currentProblem.acceptanceRate}</span>
            </div>
          </div>

          {/* Left Content Scrollable */}
          <div className="flex-1 overflow-y-auto p-5 space-y-6 text-slate-200 text-xs sm:text-sm">
            {activeLeftTab === 'description' && (
              <>
                <div>
                  <div className="text-[11px] font-mono text-emerald-400 mb-1">
                    Problem 0{currentProblem.order} of 5
                  </div>
                  <h1 className="text-xl font-bold text-white">{currentProblem.title}</h1>
                  <p className="text-xs text-slate-400 mt-1">Est. Time: {currentProblem.timeEstimate}</p>
                </div>

                <div className="space-y-3 leading-relaxed">
                  <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Problem Statement
                  </h3>
                  <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 whitespace-pre-line text-slate-300 font-sans">
                    {currentProblem.description}
                  </div>
                </div>

                {/* Examples */}
                <div className="space-y-4">
                  <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Examples
                  </h3>
                  {currentProblem.examples.map((ex, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 space-y-2 font-mono text-xs"
                    >
                      <div className="font-semibold text-slate-300">Example {idx + 1}:</div>
                      <div className="text-slate-400">
                        <strong className="text-slate-300">Input:</strong> {ex.input}
                      </div>
                      <div className="text-slate-400">
                        <strong className="text-slate-300">Output:</strong> {ex.output}
                      </div>
                      {ex.explanation && (
                        <div className="text-slate-500 font-sans text-[11px]">
                          <strong>Explanation:</strong> {ex.explanation}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {/* Constraints */}
                <div className="space-y-2">
                  <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Constraints
                  </h3>
                  <ul className="space-y-1 font-mono text-xs text-slate-300">
                    {currentProblem.constraints.map((c, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-emerald-400">•</span>
                        <span>{c}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Expandable Hints */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                    Hints ({currentProblem.hints.length})
                  </h3>
                  {currentProblem.hints.map((hint, i) => {
                    const isOpen = openHintIndex === i;
                    return (
                      <div
                        key={i}
                        className="rounded-lg border border-slate-800 bg-slate-950 overflow-hidden"
                      >
                        <button
                          onClick={() => setOpenHintIndex(isOpen ? null : i)}
                          className="w-full flex items-center justify-between p-2.5 text-xs text-left text-slate-300 hover:text-white cursor-pointer"
                        >
                          <span className="flex items-center gap-2">
                            <HelpCircle className="w-3.5 h-3.5 text-amber-400" />
                            <span>Hint {i + 1}</span>
                          </span>
                          {isOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                        </button>
                        {isOpen && (
                          <div className="p-3 text-xs text-slate-300 border-t border-slate-850 bg-slate-900/50">
                            {hint}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {activeLeftTab === 'editorial' && (
              <div className="space-y-4">
                <h2 className="text-base font-bold text-white">Editorial & Algorithmic Analysis</h2>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {currentProblem.explanation}
                </p>
                <div>
                  <h3 className="text-xs font-mono uppercase text-slate-400 mb-2">
                    Reference Solution ({language.toUpperCase()})
                  </h3>
                  <CodeBlock
                    code={currentProblem.solutionCode[language] || currentProblem.solutionCode.python}
                    language={language}
                  />
                </div>
                <Button variant="secondary" size="sm" onClick={handleUseSolution}>
                  Copy Solution to Editor
                </Button>
              </div>
            )}

            {activeLeftTab === 'submissions' && (
              <div className="space-y-3">
                <h2 className="text-base font-bold text-white">Submission History</h2>
                {completedProblemIds.includes(currentProblem.id) ? (
                  <div className="p-4 rounded-lg bg-slate-950 border border-emerald-500/30 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-emerald-400 font-semibold">
                        ✓ Accepted (All test cases passed)
                      </span>
                      <span className="text-[11px] font-mono text-slate-500">Latest</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs font-mono text-slate-400">
                      <div>Runtime: 42 ms (Top 12%)</div>
                      <div>Memory: 12.4 MB (Top 9%)</div>
                    </div>
                    <div className="text-[11px] text-slate-500 font-mono">Language: Python 3</div>
                  </div>
                ) : (
                  <div className="text-xs text-slate-400 py-6 text-center">
                    No submissions yet for this problem. Write your code and click Submit.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Code Editor & Test Terminal (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-950 overflow-hidden">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900 shrink-0">
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                aria-label="Programming Language"
                className="bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200 rounded px-2.5 py-1 focus:outline-none focus:border-emerald-500 cursor-pointer"
              >
                <option value="python">Python 3</option>
                <option value="java">Java 21</option>
                <option value="c">C (GCC 13)</option>
              </select>
            </div>

            {/* Editor Action Buttons */}
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCode(currentProblem.starterCode[language] || '')}
                icon={<RotateCcw className="w-3.5 h-3.5" />}
                title="Reset starter code"
              >
                Reset
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleRun}
                loading={isRunning}
                icon={<Play className="w-3.5 h-3.5" />}
              >
                Run
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleSubmit}
                loading={isSubmitting}
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Submit
              </Button>
            </div>
          </div>

          {/* Interactive Code Editor Area */}
          <div className="flex-1 flex flex-col bg-slate-950 font-mono text-xs sm:text-sm overflow-hidden relative">
            <div className="flex-1 flex overflow-hidden">
              {/* Line numbers gutter */}
              <div
                className="w-10 sm:w-12 bg-slate-900/60 border-r border-slate-800 py-3 text-right pr-3 select-none text-slate-600 font-mono text-xs overflow-hidden"
                aria-hidden="true"
              >
                {Array.from({ length: Math.max(16, code.split('\n').length + 2) }).map((_, i) => (
                  <div key={i} className="leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              {/* Textarea code editor */}
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                spellCheck={false}
                aria-label="Code editor"
                placeholder="# Write your solution here"
                className="flex-1 p-3 bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none overflow-y-auto selection:bg-emerald-500/30"
              />
            </div>
          </div>

          {/* Bottom Execution & Test Cases Drawer */}
          <div className="h-56 sm:h-64 border-t border-slate-800 bg-slate-900/90 flex flex-col shrink-0">
            {/* Drawer Tabs Header */}
            <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900 text-xs">
              <div className="flex items-center gap-3">
                <span className="font-mono text-slate-400 uppercase text-[11px]">Test Cases</span>
                <div className="flex items-center gap-1">
                  {currentProblem.testCases.map((tc, idx) => (
                    <button
                      key={tc.id}
                      onClick={() => setActiveTestCaseTab(idx)}
                      className={`px-2 py-0.5 rounded font-mono text-[11px] transition-colors cursor-pointer ${
                        activeTestCaseTab === idx
                          ? 'bg-slate-800 text-emerald-400 font-semibold border border-slate-700'
                          : 'text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Case {idx + 1} {!tc.isPublic && '(Hidden)'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Verdict Indicator */}
              {submissionResult && (
                <div className="flex items-center gap-2 font-mono">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Accepted</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{submissionResult.runtime} ms</span>
                  <span className="text-slate-500">·</span>
                  <span className="text-slate-400">{submissionResult.memory} MB</span>
                </div>
              )}
            </div>

            {/* Test Case Inputs & Outputs or Submission Results */}
            <div className="flex-1 p-3.5 overflow-y-auto text-xs font-mono space-y-3">
              {submissionResult ? (
                <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/40 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold text-sm">
                      ✓ Accepted (Status: Passed)
                    </span>
                    <span className="text-[11px] text-emerald-400 font-mono">
                      {submissionResult.testCasesPassed} / {submissionResult.totalTestCases} Testcases
                      Passed
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-300">
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <div className="text-[10px] text-slate-400">Runtime</div>
                      <div className="font-bold text-slate-100">{submissionResult.runtime} ms</div>
                      <div className="text-[10px] text-emerald-400">Beats 89.4% of users</div>
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800">
                      <div className="text-[10px] text-slate-400">Memory</div>
                      <div className="font-bold text-slate-100">{submissionResult.memory} MB</div>
                      <div className="text-[10px] text-emerald-400">Beats 91.2% of users</div>
                    </div>
                    <div className="p-2 bg-slate-950/80 rounded border border-slate-800 col-span-2 sm:col-span-1">
                      <div className="text-[10px] text-slate-400">Next Action</div>
                      {nextProblem && isNextUnlocked ? (
                        <button
                          onClick={() => navigateTo({ type: 'problem', problemId: nextProblem.id })}
                          className="text-emerald-400 hover:underline font-bold text-[11px] flex items-center gap-1 mt-1 cursor-pointer"
                        >
                          <span>Solve Problem 0{nextProblem.order}</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <div className="text-slate-400 font-bold text-[11px] mt-1">Topic Completed!</div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <div className="text-slate-400 mb-1">Input:</div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 text-slate-200">
                      {currentProblem.testCases[activeTestCaseTab]?.input || 'N/A'}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400 mb-1">Expected Output:</div>
                    <div className="p-2 rounded bg-slate-950 border border-slate-800 text-emerald-400">
                      {currentProblem.testCases[activeTestCaseTab]?.expectedOutput || 'N/A'}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Topic Completed Celebration Modal */}
      <Modal
        isOpen={showTopicCompletionModal}
        onClose={() => setShowTopicCompletionModal(false)}
        maxWidth="lg"
      >
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-emerald-400">
              Milestone Reached
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
              Topic Completed: Python Loops
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-md mx-auto">
              Outstanding work. You solved all 5 progressive coding problems from Easy to Hard.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 max-w-md mx-auto text-center font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-500 text-[10px]">Progress</div>
              <div className="font-bold text-emerald-400 text-sm mt-0.5">100%</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-500 text-[10px]">Solved</div>
              <div className="font-bold text-white text-sm mt-0.5">5 / 5</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-500 text-[10px]">XP Earned</div>
              <div className="font-bold text-amber-400 text-sm mt-0.5">+175 XP</div>
            </div>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-left text-xs space-y-1">
            <div className="text-slate-400">Next Unlocked Topic:</div>
            <div className="text-white font-semibold">Functions & Variable Scope</div>
            <div className="text-slate-400 text-[11px]">
              Positional args, keyword args, default mutable traps, and LEGB scope rules.
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="secondary"
              onClick={() => {
                setShowTopicCompletionModal(false);
                navigateTo({ type: 'assessment', assessmentId: 'assess-py-loops' });
              }}
            >
              Take Topic Assessment
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowTopicCompletionModal(false);
                navigateTo({ type: 'course', courseId: 'course-python' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Continue to Next Topic
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
