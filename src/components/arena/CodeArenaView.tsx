import React from 'react';
import {
  TerminalSquare,
  Zap,
  Flame,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  Trophy,
  Sparkles,
  TrendingUp,
  Target,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { CODE_ARENA_CHALLENGES } from '../../data/mockData';

export const CodeArenaView: React.FC = () => {
  const { navigateTo, user } = useApp();

  const dailyChallenge = CODE_ARENA_CHALLENGES[0];
  const ladderChallenges = CODE_ARENA_CHALLENGES.slice(1);

  // Level progress math
  const currentLevel = user.arenaLevel; // e.g. 7
  const currentXp = user.arenaXp; // e.g. 2450
  const xpForCurrentLevel = (currentLevel - 1) * 350;
  const xpForNextLevel = currentLevel * 350;
  const levelProgress = Math.min(
    100,
    Math.round(((currentXp - xpForCurrentLevel) / 350) * 100)
  );

  return (
    <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
      {/* Header */}
      <div className="space-y-2 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
          <Zap className="w-4 h-4" />
          <span>ALGORITHMIC CHALLENGE ARENA</span>
          <span>·</span>
          <span>SEPARATE FROM COURSE ROADMAPS</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Code Arena
        </h1>
        <p className="text-sm sm:text-base text-slate-300 max-w-2xl leading-relaxed">
          Practice. Compete with yourself. Level up. Test your algorithm speed and problem-solving
          under timed conditions.
        </p>
      </div>

      {/* Gamification Stats Bar: Level, XP, Streak */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Level card */}
        <Card padding="md" className="bg-slate-900 border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Current Tier</span>
            <div className="text-2xl font-black text-sky-400 mt-0.5">Level {user.arenaLevel}</div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Advanced Problem Tier</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center font-bold text-lg font-mono">
            L{user.arenaLevel}
          </div>
        </Card>

        {/* XP card */}
        <Card padding="md" className="bg-slate-900 border-slate-800 flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase">Progression XP</span>
            <span className="text-xs font-mono text-emerald-400 font-bold">
              {user.arenaXp.toLocaleString()} XP
            </span>
          </div>
          <div className="my-2">
            <Progress value={levelProgress} size="sm" color="emerald" />
          </div>
          <div className="flex justify-between text-[11px] font-mono text-slate-500">
            <span>Next Level</span>
            <span>{350 - (user.arenaXp % 350)} XP to L{user.arenaLevel + 1}</span>
          </div>
        </Card>

        {/* Streak card */}
        <Card padding="md" className="bg-slate-900 border-slate-800 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-mono text-slate-400 uppercase">Active Streak</span>
            <div className="text-2xl font-black text-amber-400 flex items-center gap-1.5 mt-0.5">
              <Flame className="w-6 h-6 fill-amber-400/20" />
              <span>{user.streakDays} Days</span>
            </div>
            <div className="text-[11px] font-mono text-slate-500 mt-1">Consistency multiplier 1.2x</div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center">
            <Flame className="w-6 h-6" />
          </div>
        </Card>
      </div>

      {/* Today's Challenge Hero Card */}
      <div className="rounded-2xl border border-amber-500/40 bg-gradient-to-r from-amber-950/30 via-slate-900 to-slate-900 p-6 sm:p-7 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold">
              Today's Challenge · Resets in 06:42:15
            </span>
          </div>
          <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
            <span>Topic: {dailyChallenge.topic}</span>
            <span>·</span>
            <span className="text-emerald-400 font-semibold">+{dailyChallenge.xpReward} XP</span>
          </div>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-amber-300 font-bold">
                Tier {dailyChallenge.level} ({dailyChallenge.difficulty})
              </span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400 font-mono">
                {dailyChallenge.estimatedMinutes} mins allocated
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              {dailyChallenge.title.replace("Today's Challenge: ", '')}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
              {dailyChallenge.description}
            </p>
          </div>

          <div className="shrink-0">
            <Button
              variant="primary"
              size="lg"
              onClick={() =>
                navigateTo({ type: 'arena-challenge', challengeId: dailyChallenge.id })
              }
              icon={<Zap className="w-5 h-5 text-amber-300" />}
            >
              Start Challenge (+{dailyChallenge.xpReward} XP)
            </Button>
          </div>
        </div>
      </div>

      {/* Progressive Challenge Ladder */}
      <section aria-label="Progressive challenge ladder" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">Challenge Ladder</h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Calibrated algorithmic milestones from Level 1 Warmup to Level 8 Hard.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-500">8 Tiers Total</span>
        </div>

        <div className="space-y-3">
          {ladderChallenges.map((ch) => {
            const isUnlocked = ch.level <= user.arenaLevel;
            const isCompleted = ch.level < user.arenaLevel;
            const isCurrent = ch.level === user.arenaLevel;

            return (
              <div
                key={ch.id}
                onClick={() => {
                  if (isUnlocked) {
                    navigateTo({ type: 'arena-challenge', challengeId: ch.id });
                  }
                }}
                className={`p-4 rounded-xl border transition-all ${
                  isCurrent
                    ? 'bg-slate-900 border-sky-500/50 shadow-md cursor-pointer ring-1 ring-sky-500/20'
                    : isCompleted
                    ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700 cursor-pointer'
                    : 'bg-slate-950/40 border-slate-900 opacity-60 cursor-not-allowed'
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-lg font-mono text-xs font-bold flex items-center justify-center shrink-0 ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40'
                          : isCurrent
                          ? 'bg-sky-950 text-sky-400 border border-sky-500/40 animate-pulse'
                          : 'bg-slate-800 text-slate-500 border border-slate-700/50'
                      }`}
                    >
                      {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : `L${ch.level}`}
                    </div>

                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-slate-400">Level {ch.level}</span>
                        <span className="text-slate-600">·</span>
                        <span
                          className={`text-xs font-mono ${
                            ch.difficulty === 'Easy'
                              ? 'text-emerald-400'
                              : ch.difficulty === 'Medium'
                              ? 'text-amber-400'
                              : 'text-rose-400'
                          }`}
                        >
                          {ch.difficulty}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-mono text-slate-400">{ch.topic}</span>
                      </div>

                      <h3 className="text-sm sm:text-base font-bold text-white mt-0.5">
                        {ch.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs font-mono text-slate-400">
                    <span className="text-emerald-400 font-semibold">+{ch.xpReward} XP</span>
                    <span>·</span>
                    <span>{ch.estimatedMinutes} mins</span>
                    {isUnlocked ? (
                      <span className="text-emerald-400 flex items-center gap-1 font-semibold ml-2">
                        <span>{isCompleted ? 'Solved ✓' : 'Tackle'}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="text-slate-600 flex items-center gap-1 ml-2">
                        <Lock className="w-3 h-3" />
                        <span>Locked</span>
                      </span>
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
