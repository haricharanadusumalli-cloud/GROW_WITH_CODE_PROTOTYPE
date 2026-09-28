import React, { useState } from 'react';
import {
  Award,
  ShieldCheck,
  Download,
  Share2,
  Printer,
  ExternalLink,
  ChevronLeft,
  CheckCircle2,
  TerminalSquare,
  QrCode,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button } from '../common/Button';
import { Card } from '../common/Card';
import { CertificateData } from '../../types';

interface CertificateViewProps {
  certificateId: string;
}

export const CertificateView: React.FC<CertificateViewProps> = ({ certificateId }) => {
  const { navigateTo, user } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);

  const cert: CertificateData =
    user.certificates.find((c) => c.id === certificateId) ||
    user.certificates[0] || {
      id: 'cert-py-001',
      certificateNumber: 'GWC-PY-2026-000123',
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

  const handleCopy = () => {
    navigator.clipboard.writeText(cert.verificationUrl);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl mx-auto py-6 sm:py-10 px-4 space-y-8 animate-in fade-in duration-200">
      {/* Top Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <button
          onClick={() => navigateTo({ type: 'dashboard' })}
          className="flex items-center gap-1.5 text-xs font-mono text-slate-400 hover:text-slate-200 cursor-pointer"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            icon={<Share2 className="w-4 h-4" />}
          >
            {copiedLink ? 'Link Copied!' : 'Share Verification Link'}
          </Button>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            icon={<Printer className="w-4 h-4" />}
          >
            Print / PDF
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() =>
              navigateTo({
                type: 'verify-certificate',
                certificateNumber: cert.certificateNumber,
              })
            }
            icon={<ExternalLink className="w-4 h-4" />}
          >
            Verify Certificate
          </Button>
        </div>
      </div>

      {/* High-Fidelity Professional Certificate Frame */}
      <div className="relative p-8 sm:p-14 rounded-2xl bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border-4 border-slate-800 shadow-2xl text-center space-y-8 overflow-hidden">
        {/* Subtle decorative security grid background */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #10b981 1px, transparent 0)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Certificate Header */}
        <div className="flex flex-col items-center space-y-3 relative z-10">
          <div className="flex items-center gap-2 text-emerald-400">
            <div className="w-10 h-10 rounded-xl bg-emerald-950 border border-emerald-500/40 flex items-center justify-center">
              <TerminalSquare className="w-6 h-6" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-white">
              GROW WITH CODE
            </span>
          </div>

          <div className="text-[11px] font-mono tracking-widest uppercase text-slate-400 pt-1">
            Official Credential of Engineering Competency
          </div>
        </div>

        {/* Main Certificate Title */}
        <div className="space-y-1 relative z-10">
          <h2 className="text-2xl sm:text-4xl font-serif text-white tracking-wide">
            Certificate of Completion
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 font-sans">
            This certifies that
          </p>
        </div>

        {/* Recipient Name */}
        <div className="py-2 relative z-10">
          <div className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-teal-200 to-emerald-400 font-serif pb-2">
            {cert.studentName}
          </div>
          <div className="w-48 h-0.5 bg-gradient-to-r from-transparent via-emerald-500 to-transparent mx-auto" />
        </div>

        {/* Course Name & Statement */}
        <div className="max-w-2xl mx-auto space-y-2 relative z-10 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
          <p>
            has successfully fulfilled all curriculum requirements, solved 50 progressive coding
            problems, and demonstrated competency on the 30-question comprehensive certification
            benchmark in:
          </p>
          <div className="text-xl sm:text-2xl font-bold text-white font-mono pt-1">
            {cert.courseTitle}
          </div>
        </div>

        {/* Skills Tagline */}
        <div className="pt-4 border-t border-slate-800/80 max-w-xl mx-auto relative z-10">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
            Skills Verified Through Automated Assessment
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs font-mono text-emerald-300">
            {cert.skillsAcquired.map((skill, idx) => (
              <span key={idx} className="bg-slate-950 border border-slate-800 px-2 py-1 rounded">
                ✓ {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom Signature & Verification Seal Bar */}
        <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs font-mono text-slate-400 relative z-10">
          <div className="text-left space-y-1">
            <div className="text-slate-500 text-[10px]">ISSUED DATE</div>
            <div className="text-slate-200 font-semibold">{cert.completionDate}</div>
            <div className="text-[11px] text-emerald-400">Score: {cert.score}%</div>
          </div>

          {/* Verification Badge */}
          <div className="flex items-center gap-3 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
            <ShieldCheck className="w-8 h-8 text-emerald-400" />
            <div className="text-left text-[11px]">
              <div className="text-white font-bold">VERIFIED AUTHENTIC</div>
              <div className="text-slate-500">{cert.certificateNumber}</div>
            </div>
          </div>

          <div className="text-right space-y-1">
            <div className="text-slate-500 text-[10px]">ISSUING AUTHORITY</div>
            <div className="text-slate-200 font-semibold">Grow With Code Academy</div>
            <div className="text-[11px] text-slate-500">Academic Verification Registry</div>
          </div>
        </div>
      </div>
    </div>
  );
};
