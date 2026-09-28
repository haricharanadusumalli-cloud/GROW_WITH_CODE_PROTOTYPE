import React from 'react';
import {
  User,
  Mail,
  Calendar,
  Target,
  Flame,
  Zap,
  Award,
  BookOpen,
  Briefcase,
  Terminal,
  CheckCircle2,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { Progress } from '../common/Progress';
import { COURSES } from '../../data/mockData';

export const ProfileView: React.FC = () => {
  const { user, navigateTo } = useApp();

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-200">
      {/* Profile Header */}
      <div className="p-6 sm:p-8 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-emerald-950 border-2 border-emerald-500/40 text-emerald-300 font-extrabold text-2xl sm:text-3xl flex items-center justify-center shrink-0">
            {user.name.charAt(0)}
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold text-white">{user.name}</h1>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/10 text-sky-400 border border-sky-500/30">
                Lvl {user.arenaLevel} Engineer
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono flex items-center gap-2">
              <Mail className="w-3.5 h-3.5" />
              <span>{user.email}</span>
              <span>·</span>
              <Calendar className="w-3.5 h-3.5" />
              <span>Joined {user.joinedDate}</span>
            </p>
            <div className="text-xs text-emerald-400 pt-1">
              Primary Goal: <strong>{user.primaryGoal}</strong> ({user.experienceLevel})
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 border-t sm:border-t-0 pt-4 sm:pt-0 border-slate-800">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateTo({ type: 'learn-catalog' })}
            icon={<BookOpen className="w-4 h-4" />}
          >
            Explore Courses
          </Button>
        </div>
      </div>

      {/* Primary Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 font-mono text-xs">
        <Card padding="md" className="bg-slate-900 border-slate-800 text-center">
          <span className="text-slate-400 text-[11px]">Problems Solved</span>
          <div className="text-2xl font-bold text-white mt-1">{user.solvedProblemsCount}</div>
          <div className="text-[10px] text-emerald-400 mt-0.5">Automated test verified</div>
        </Card>

        <Card padding="md" className="bg-slate-900 border-slate-800 text-center">
          <span className="text-slate-400 text-[11px]">Arena Level</span>
          <div className="text-2xl font-bold text-sky-400 mt-1">Level {user.arenaLevel}</div>
          <div className="text-[10px] text-slate-400 mt-0.5">{user.arenaXp.toLocaleString()} XP</div>
        </Card>

        <Card padding="md" className="bg-slate-900 border-slate-800 text-center">
          <span className="text-slate-400 text-[11px]">Current Streak</span>
          <div className="text-2xl font-bold text-amber-400 mt-1 flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 fill-amber-400/20" />
            <span>{user.streakDays}d</span>
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Active daily</div>
        </Card>

        <Card padding="md" className="bg-slate-900 border-slate-800 text-center">
          <span className="text-slate-400 text-[11px]">Certificates</span>
          <div className="text-2xl font-bold text-emerald-400 mt-1">
            {user.certificates.length}
          </div>
          <div className="text-[10px] text-slate-400 mt-0.5">Verified credentials</div>
        </Card>
      </div>

      {/* Enrolled Courses Progress */}
      <section aria-label="Course tracks in progress" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-emerald-400" />
            <span>Curriculum Tracks In Progress</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">1 Active Track</span>
        </div>

        <div className="space-y-3">
          <Card padding="md" className="bg-slate-900 border-slate-800 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-base font-bold text-white">Python Programming</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Current Topic: Loops & Iteration (Topic 5 of 10)
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono text-emerald-400 font-bold">40% Complete</span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => navigateTo({ type: 'course', courseId: 'course-python' })}
                >
                  Resume Track
                </Button>
              </div>
            </div>
            <Progress value={40} size="sm" color="emerald" />
          </Card>
        </div>
      </section>

      {/* Earned Certificates */}
      <section aria-label="Earned certificates" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-400" />
            <span>Official Certificates</span>
          </h2>
          <span className="text-xs font-mono text-slate-400">
            {user.certificates.length} Issued
          </span>
        </div>

        {user.certificates.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {user.certificates.map((cert) => (
              <div
                key={cert.id}
                onClick={() =>
                  navigateTo({ type: 'certificate', certificateId: cert.id })
                }
                className="p-5 rounded-xl border border-slate-800 bg-slate-900/80 hover:bg-slate-850 hover:border-slate-700 transition-all cursor-pointer flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.5 rounded">
                      VERIFIED OFFICIAL
                    </span>
                    <span className="text-xs font-mono text-slate-400">Score: {cert.score}%</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{cert.courseTitle}</h3>
                  <p className="text-xs font-mono text-slate-400 mt-1">
                    ID: {cert.certificateNumber} · Issued {cert.completionDate}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Recipient: {cert.studentName}</span>
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <span>View Certificate</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <Card padding="md" className="text-center text-xs text-slate-500">
            No certificates earned yet. Pass a 30-question course certification benchmark to unlock.
          </Card>
        )}
      </section>

      {/* Technical Interview History */}
      <section aria-label="Technical interview records" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-sky-400" />
            <span>Technical Interview Simulation History</span>
          </h2>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateTo({ type: 'interview-setup' })}
          >
            Start New Simulation
          </Button>
        </div>

        <div className="space-y-3">
          {user.interviewHistory.map((rpt) => (
            <div
              key={rpt.id}
              onClick={() => navigateTo({ type: 'interview-report', reportId: rpt.id })}
              className="p-4 rounded-xl border border-slate-800 bg-slate-900 hover:bg-slate-850 hover:border-slate-700 transition-colors cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-lg bg-sky-950 border border-sky-500/40 text-sky-400 font-bold font-mono text-sm flex items-center justify-center shrink-0">
                  {rpt.overallScore}%
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {rpt.language} Technical Interview Round
                  </div>
                  <div className="text-xs text-slate-400">
                    DSA: {rpt.breakdown.dsa}% · Core: {rpt.breakdown.language}% · Coding: {rpt.breakdown.coding}%
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                <span>{rpt.date}</span>
                <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                  <span>Diagnostic Report</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
