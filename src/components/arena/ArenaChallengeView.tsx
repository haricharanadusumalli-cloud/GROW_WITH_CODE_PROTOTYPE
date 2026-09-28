import React, { useState, useEffect } from 'react';
import {
  ChevronLeft,
  Clock,
  Zap,
  Play,
  Send,
  RotateCcw,
  CheckCircle2,
  Trophy,
  ArrowRight,
  Flame,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Modal } from '../common/Modal';
import { CODE_ARENA_CHALLENGES } from '../../data/mockData';
import { ArenaChallenge } from '../../types';

interface ArenaChallengeViewProps {
  challengeId: string;
}

export const ArenaChallengeView: React.FC<ArenaChallengeViewProps> = ({ challengeId }) => {
  const { navigateTo, user, completeArenaChallenge } = useApp();

  const challenge: ArenaChallenge =
    CODE_ARENA_CHALLENGES.find((c) => c.id === challengeId) || CODE_ARENA_CHALLENGES[0];

  const [code, setCode] = useState<string>(
    challenge.starterCode.python ||
      `def max_sub_array(nums: list[int]) -> int:
    # Kadane's Algorithm
    max_so_far = nums[0]
    curr_max = nums[0]
    for x in nums[1:]:
        curr_max = max(x, curr_max + x)
        max_so_far = max(max_so_far, curr_max)
    return max_so_far
`
  );

  const [secondsRemaining, setSecondsRemaining] = useState<number>(
    challenge.timeLimitMinutes * 60
  );
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  useEffect(() => {
    if (isCompleted) return;
    const interval = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, [isCompleted]);

  const formatTimer = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const timeTakenSeconds = challenge.timeLimitMinutes * 60 - secondsRemaining;
  const timeTakenFormatted = `${Math.floor(timeTakenSeconds / 60)}m ${timeTakenSeconds % 60}s`;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsCompleted(true);
    completeArenaChallenge(challenge.id, challenge.xpReward);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] max-w-[1600px] mx-auto animate-in fade-in duration-200">
      {/* Top Bar with Live Challenge Timer & XP */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900 border border-slate-800 rounded-t-xl shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo({ type: 'arena' })}
            className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Exit Arena</span>
          </button>
          <span className="text-slate-700">|</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-white">{challenge.title}</span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-950/60 border border-amber-500/30 px-1.5 py-0.2 rounded">
              Level {challenge.level}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="flex items-center gap-1.5 text-amber-400">
            <Clock className="w-4 h-4" />
            <span className="font-bold text-sm">{formatTimer(secondsRemaining)}</span>
          </div>
          <div className="flex items-center gap-1 text-emerald-400">
            <Zap className="w-4 h-4" />
            <span>+{challenge.xpReward} XP Reward</span>
          </div>
        </div>
      </div>

      {/* Split Main View */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 border-x border-b border-slate-800 bg-slate-950 rounded-b-xl overflow-hidden">
        {/* Left: Problem Statement (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col h-full border-r border-slate-800 bg-slate-900/40 p-5 overflow-y-auto space-y-5 text-xs sm:text-sm text-slate-200">
          <div>
            <div className="text-[11px] font-mono text-amber-400 mb-1">
              Code Arena Challenge · {challenge.topic}
            </div>
            <h1 className="text-xl font-bold text-white">{challenge.title}</h1>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 mt-1">
              <span>Difficulty: {challenge.difficulty}</span>
              <span>·</span>
              <span>Time limit: {challenge.timeLimitMinutes} mins</span>
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Problem Description
            </h3>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-sans leading-relaxed text-slate-300 whitespace-pre-line">
              {challenge.description}
            </div>
          </div>

          {/* Examples */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
              Examples
            </h3>
            {challenge.examples.map((ex, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs space-y-1.5"
              >
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
              {challenge.constraints.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="text-amber-400">•</span>
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right: Code Editor (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col h-full bg-slate-950 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 border-b border-slate-800 bg-slate-900 shrink-0">
            <span className="text-xs font-mono text-slate-400">Python 3 (Live Mode)</span>
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                onClick={handleSubmit}
                loading={isSubmitting}
                icon={<Send className="w-3.5 h-3.5" />}
              >
                Submit Arena Solution
              </Button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden font-mono text-xs sm:text-sm">
            <div
              className="w-10 sm:w-12 bg-slate-900/60 border-r border-slate-800 py-3 text-right pr-3 select-none text-slate-600 font-mono text-xs overflow-hidden"
              aria-hidden="true"
            >
              {Array.from({ length: 24 }).map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              spellCheck={false}
              aria-label="Arena code editor"
              className="flex-1 p-3 bg-transparent text-slate-100 font-mono text-xs sm:text-sm leading-6 resize-none focus:outline-none overflow-y-auto"
            />
          </div>
        </div>
      </div>

      {/* Arena Challenge Completed Modal */}
      <Modal isOpen={isCompleted} onClose={() => setIsCompleted(false)} maxWidth="md">
        <div className="text-center space-y-4 py-2">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/40 text-amber-400 flex items-center justify-center mx-auto shadow-xl">
            <Trophy className="w-8 h-8" />
          </div>

          <div>
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400">
              Challenge Accepted
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">Challenge Completed!</h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">
              All test cases passed under time limit constraints.
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center font-mono text-xs">
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-500 text-[10px]">XP Earned</div>
              <div className="font-bold text-amber-400 text-sm mt-0.5">
                +{challenge.xpReward} XP
              </div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-500 text-[10px]">Time Taken</div>
              <div className="font-bold text-slate-200 text-sm mt-0.5">{timeTakenFormatted}</div>
            </div>
            <div className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="text-slate-500 text-[10px]">Skill Tier</div>
              <div className="font-bold text-sky-400 text-sm mt-0.5">Level {challenge.level}</div>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              onClick={() => {
                setIsCompleted(false);
                navigateTo({ type: 'arena' });
              }}
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
            >
              Back to Arena Lobby
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
