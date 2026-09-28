import React from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ExternalLink,
  Award,
  TerminalSquare,
  FileCheck,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';

interface VerificationViewProps {
  certificateNumber: string;
}

export const VerificationView: React.FC<VerificationViewProps> = ({ certificateNumber }) => {
  const { navigateTo, user } = useApp();

  const cert =
    user.certificates.find((c) => c.certificateNumber === certificateNumber) ||
    user.certificates[0] || {
      id: 'cert-py-001',
      certificateNumber: certificateNumber || 'GWC-PY-2026-000123',
      studentName: user.name || 'Hari Charan',
      courseId: 'course-python',
      courseTitle: 'Python Programming',
      completionDate: 'September 26, 2026',
      score: 88,
      verificationUrl: 'https://growwithcode.dev/verify/GWC-PY-2026-000123',
      skillsAcquired: [
        'Python 3 Syntax & Runtime Architecture',
        'Iteration Mechanics & Loop Invariants',
        'Data Structures: Lists, Tuples, Dictionaries, Sets',
        'Object-Oriented Design & Encapsulation',
        'Algorithmic Complexity & Optimization (Big-O)',
      ],
    };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8 animate-in fade-in duration-200">
      <div className="flex items-center justify-between border-b border-slate-800 pb-4">
        <button
          onClick={() =>
            navigateTo({ type: 'certificate', certificateId: cert.id || 'cert-py-001' })
          }
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Certificate</span>
        </button>

        <span className="text-xs font-mono text-slate-500">
          Public Credential Registry Prototype
        </span>
      </div>

      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-2xl bg-emerald-950 border border-emerald-500/50 text-emerald-400 flex items-center justify-center mx-auto shadow-xl">
          <ShieldCheck className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-3 py-1 rounded-full">
          <CheckCircle2 className="w-3.5 h-3.5" />
          <span>VALID & VERIFIED OFFICIAL CREDENTIAL</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
          Credential Verification Record
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-lg mx-auto">
          Demonstrating the public verification system for recruiters, hiring managers, and academic
          institutions.
        </p>
      </div>

      {/* Verification Details Card */}
      <Card padding="lg" className="bg-slate-900 border-slate-800 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-6 border-b border-slate-800 text-xs font-mono">
          <div>
            <span className="text-slate-500 block text-[11px]">CERTIFICATE ID</span>
            <span className="text-white font-bold text-sm">{cert.certificateNumber}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">STUDENT NAME</span>
            <span className="text-emerald-400 font-bold text-sm">{cert.studentName}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">COURSE</span>
            <span className="text-white font-semibold">{cert.courseTitle}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">DATE OF ISSUANCE</span>
            <span className="text-slate-300">{cert.completionDate}</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">ASSESSMENT RESULT</span>
            <span className="text-emerald-400 font-bold">{cert.score}% Passed</span>
          </div>

          <div>
            <span className="text-slate-500 block text-[11px]">VERIFYING ENTITY</span>
            <span className="text-slate-300">Grow With Code Automated Engine</span>
          </div>
        </div>

        {/* Verification criteria fulfilled */}
        <div className="space-y-3">
          <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider">
            Verified Completion Milestones
          </h3>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2 p-2.5 rounded bg-slate-950 border border-slate-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">10 / 10 Curriculum Modules & Lessons Finished</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded bg-slate-950 border border-slate-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">50 / 50 Coding Problems Passed Automated Testcases</span>
            </div>
            <div className="flex items-center gap-2 p-2.5 rounded bg-slate-950 border border-slate-850">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-slate-200">30-Question Certification Assessment Passed ({cert.score}%)</span>
            </div>
          </div>
        </div>

        {/* Note on prototype architecture */}
        <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 text-[11px] font-mono text-slate-400">
          <span className="text-slate-300 font-semibold block mb-0.5">Prototype Implementation:</span>
          In production, this URL will serve an authenticated public endpoint queryable by third-party recruiters without requiring an account.
        </div>
      </Card>
    </div>
  );
};
