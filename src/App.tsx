import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Shell } from './components/layout/Shell';
import { AuthModal } from './components/auth/AuthModal';
import { LandingPage } from './components/landing/LandingPage';
import { OnboardingView } from './components/auth/OnboardingView';
import { DashboardView } from './components/dashboard/DashboardView';
import { LearnCatalogView } from './components/learn/LearnCatalogView';
import { CourseView } from './components/learn/CourseView';
import { TopicView } from './components/learn/TopicView';
import { LessonView } from './components/learn/LessonView';
import { CodingProblemView } from './components/practice/CodingProblemView';
import { AssessmentView } from './components/assessment/AssessmentView';
import { CourseCompletionView } from './components/assessment/CourseCompletionView';
import { CertificateView } from './components/certificate/CertificateView';
import { VerificationView } from './components/certificate/VerificationView';
import { CodeArenaView } from './components/arena/CodeArenaView';
import { ArenaChallengeView } from './components/arena/ArenaChallengeView';
import { InterviewSetupView } from './components/interview/InterviewSetupView';
import { InterviewSimView } from './components/interview/InterviewSimView';
import { InterviewReportView } from './components/interview/InterviewReportView';
import { ProfileView } from './components/profile/ProfileView';
import {
  Compass,
  Layers,
  ChevronUp,
  ChevronDown,
  Play,
  RotateCcw,
} from 'lucide-react';

function AppContent() {
  const { currentView, navigateTo } = useApp();
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [prototypeTourOpen, setPrototypeTourOpen] = useState(false);

  const handleOpenAuth = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setAuthModalOpen(true);
  };

  const renderActiveView = () => {
    switch (currentView.type) {
      case 'landing':
        return <LandingPage onOpenAuth={handleOpenAuth} />;
      case 'onboarding':
        return <OnboardingView />;
      case 'dashboard':
        return <DashboardView />;
      case 'learn-catalog':
        return <LearnCatalogView />;
      case 'course':
        return <CourseView courseId={currentView.courseId} />;
      case 'topic':
        return <TopicView topicId={currentView.topicId} />;
      case 'lesson':
        return <LessonView lessonId={currentView.lessonId} />;
      case 'problem':
        return <CodingProblemView problemId={currentView.problemId} />;
      case 'assessment':
        return <AssessmentView assessmentId={currentView.assessmentId} />;
      case 'course-completed':
        return (
          <CourseCompletionView
            courseId={currentView.courseId}
            score={currentView.score}
          />
        );
      case 'certificate':
        return <CertificateView certificateId={currentView.certificateId} />;
      case 'verify-certificate':
        return (
          <VerificationView
            certificateNumber={currentView.certificateNumber}
          />
        );
      case 'arena':
        return <CodeArenaView />;
      case 'arena-challenge':
        return <ArenaChallengeView challengeId={currentView.challengeId} />;
      case 'interview-setup':
        return <InterviewSetupView />;
      case 'interview-sim':
        return <InterviewSimView config={currentView.config} />;
      case 'interview-report':
        return <InterviewReportView reportId={currentView.reportId} />;
      case 'profile':
        return <ProfileView />;
      default:
        return <DashboardView />;
    }
  };

  const tourSteps = [
    { label: '01. Landing', view: { type: 'landing' as const } },
    { label: '02. Onboarding', view: { type: 'onboarding' as const } },
    { label: '03. Dashboard', view: { type: 'dashboard' as const } },
    { label: '04. Learn Catalog', view: { type: 'learn-catalog' as const } },
    { label: '05. Course Roadmap', view: { type: 'course' as const, courseId: 'course-python' } },
    { label: '06. Topic Page', view: { type: 'topic' as const, topicId: 'topic-py-loops' } },
    { label: '07. Lesson Page', view: { type: 'lesson' as const, lessonId: 'lesson-py-loops' } },
    { label: '08. Problem 3 (IDE)', view: { type: 'problem' as const, problemId: 'prob-loop-3' } },
    { label: '09. Topic Test', view: { type: 'assessment' as const, assessmentId: 'assess-py-loops' } },
    { label: '10. 30Q Final Exam', view: { type: 'assessment' as const, assessmentId: 'assess-course-python' } },
    { label: '11. Completion', view: { type: 'course-completed' as const, courseId: 'course-python', score: 88 } },
    { label: '12. Certificate', view: { type: 'certificate' as const, certificateId: 'cert-py-001' } },
    { label: '13. Public Verify', view: { type: 'verify-certificate' as const, certificateNumber: 'GWC-PY-2026-000123' } },
    { label: '14. Code Arena', view: { type: 'arena' as const } },
    { label: '15. Arena Challenge', view: { type: 'arena-challenge' as const, challengeId: 'arena-daily' } },
    { label: '16. Interview Prep', view: { type: 'interview-setup' as const } },
    { label: '17. Interview Report', view: { type: 'interview-report' as const, reportId: 'rpt-mock-001' } },
    { label: '18. Profile & Stats', view: { type: 'profile' as const } },
  ];

  return (
    <Shell onOpenAuth={handleOpenAuth}>
      {renderActiveView()}

      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authMode}
      />

      {/* Discrete Prototype Quick Navigator */}
      <aside aria-label="Prototype quick navigation" className="fixed bottom-3 right-3 sm:right-6 z-40">
        <div className="bg-slate-900/95 border border-slate-700/80 rounded-xl shadow-2xl backdrop-blur-md overflow-hidden text-xs">
          <button
            onClick={() => setPrototypeTourOpen((prev) => !prev)}
            className="flex items-center justify-between gap-3 px-3 py-2 text-slate-300 hover:text-white cursor-pointer w-full text-left"
          >
            <div className="flex items-center gap-1.5 font-mono text-[11px]">
              <Layers className="w-3.5 h-3.5 text-emerald-400" />
              <span>Prototype Tour</span>
              <span className="text-[10px] text-slate-400">({currentView.type})</span>
            </div>
            {prototypeTourOpen ? (
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            ) : (
              <ChevronUp className="w-3.5 h-3.5 text-slate-400" />
            )}
          </button>

          {prototypeTourOpen && (
            <div className="p-3 border-t border-slate-800 space-y-2 max-h-72 overflow-y-auto w-64 text-[11px] font-mono">
              <div className="text-[10px] text-slate-400 uppercase">Jump to Product Area</div>
              <div className="grid grid-cols-1 gap-1">
                {tourSteps.map((step) => {
                  const isActive = currentView.type === step.view.type;
                  return (
                    <button
                      key={step.label}
                      onClick={() => {
                        navigateTo(step.view as any);
                        setPrototypeTourOpen(false);
                      }}
                      className={`text-left px-2 py-1 rounded transition-colors cursor-pointer truncate ${
                        isActive
                          ? 'bg-emerald-600/30 text-emerald-300 font-bold border border-emerald-500/40'
                          : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                      }`}
                    >
                      {step.label}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </aside>
    </Shell>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
