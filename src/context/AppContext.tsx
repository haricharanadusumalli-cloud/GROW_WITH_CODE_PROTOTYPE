import React, { createContext, useContext, useState } from 'react';
import {
  AppView,
  UserState,
  Problem,
  CertificateData,
  InterviewReportData,
} from '../types';
import {
  INITIAL_USER_STATE,
  COURSES,
  PYTHON_TOPICS,
  PYTHON_LOOPS_PROBLEMS,
  PYTHON_LOOPS_LESSON,
  PYTHON_TOPIC_ASSESSMENT,
  PYTHON_COURSE_ASSESSMENT,
  CODE_ARENA_CHALLENGES,
  INITIAL_INTERVIEW_REPORT,
} from '../data/mockData';

interface SubmissionResult {
  status: 'accepted' | 'wrong_answer' | 'runtime_error';
  runtime: number; // ms
  memory: number; // MB
  testCasesPassed: number;
  totalTestCases: number;
  message: string;
  outputSnippet?: string;
}

interface AppContextType {
  user: UserState;
  isAuthenticated: boolean;
  currentView: AppView;
  navigateTo: (view: AppView) => void;
  login: (email?: string, name?: string) => void;
  signup: (name: string, email: string) => void;
  logout: () => void;
  finishOnboarding: (goal: string, experience: string, courseId: string) => void;
  unlockedProblemIds: string[];
  completedProblemIds: string[];
  submitProblem: (problemId: string, code: string, language: string) => Promise<SubmissionResult>;
  resetProblemState: (problemId: string) => void;
  markLessonComplete: (lessonId: string) => void;
  isLessonCompleted: (lessonId: string) => boolean;
  isTopicCompleted: (topicId: string) => boolean;
  completeAssessment: (assessmentId: string, scorePercent: number) => { passed: boolean; newCert?: CertificateData };
  completeArenaChallenge: (challengeId: string, xpEarned: number) => void;
  submitInterviewSimulation: (
    language: string,
    durationMinutes: number,
    answersCount: { correct: number; incorrect: number; skipped: number }
  ) => InterviewReportData;
  activeNotification: string | null;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserState>(INITIAL_USER_STATE);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [currentView, setCurrentView] = useState<AppView>({ type: 'dashboard' });
  const [unlockedProblemIds, setUnlockedProblemIds] = useState<string[]>([
    'prob-loop-1',
    'prob-loop-2',
    'prob-loop-3',
  ]);
  const [completedProblemIds, setCompletedProblemIds] = useState<string[]>([
    'prob-loop-1',
    'prob-loop-2',
  ]);
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const navigateTo = (view: AppView) => {
    setCurrentView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const clearNotification = () => setActiveNotification(null);

  const notify = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => {
      setActiveNotification((prev) => (prev === msg ? null : prev));
    }, 4500);
  };

  const login = (email = 'haricharanadusumalli@gmail.com', name = 'Hari Charan') => {
    setUser((prev) => ({
      ...prev,
      email,
      name,
    }));
    setIsAuthenticated(true);
    navigateTo({ type: 'dashboard' });
    notify(`Welcome back, ${name}!`);
  };

  const signup = (name: string, email: string) => {
    setUser((prev) => ({
      ...prev,
      name: name || 'Hari Charan',
      email: email || 'haricharanadusumalli@gmail.com',
      joinedDate: 'September 2026',
    }));
    setIsAuthenticated(true);
    navigateTo({ type: 'onboarding' });
  };

  const logout = () => {
    setIsAuthenticated(false);
    navigateTo({ type: 'landing' });
    notify('Logged out successfully.');
  };

  const finishOnboarding = (goal: string, experience: string, courseId: string) => {
    setUser((prev) => ({
      ...prev,
      primaryGoal: goal,
      experienceLevel: experience,
      activeCourseId: courseId,
    }));
    notify('Your personalized learning path is ready!');
    navigateTo({ type: 'dashboard' });
  };

  const markLessonComplete = (lessonId: string) => {
    if (!user.completedLessonIds.includes(lessonId)) {
      setUser((prev) => ({
        ...prev,
        completedLessonIds: [...prev.completedLessonIds, lessonId],
      }));
      notify('Lesson marked as completed! (+20 XP)');
    }
  };

  const isLessonCompleted = (lessonId: string) => {
    return user.completedLessonIds.includes(lessonId);
  };

  const isTopicCompleted = (topicId: string) => {
    return user.completedTopicIds.includes(topicId);
  };

  const submitProblem = async (
    problemId: string,
    code: string,
    _language: string
  ): Promise<SubmissionResult> => {
    // Simulated realistic compilation/test evaluation delay
    await new Promise((resolve) => setTimeout(resolve, 800));

    const problem = PYTHON_LOOPS_PROBLEMS.find((p) => p.id === problemId);
    const totalTestCases = problem?.testCases.length || 3;

    // Simulated acceptance
    const result: SubmissionResult = {
      status: 'accepted',
      runtime: Math.floor(Math.random() * 20) + 35, // 35 - 55ms
      memory: +(11.5 + Math.random() * 1.5).toFixed(1), // 11.5 - 13.0 MB
      testCasesPassed: totalTestCases,
      totalTestCases,
      message: 'All test cases passed successfully.',
      outputSnippet: 'Execution completed with exit code 0.',
    };

    // Update state & unlock next problem sequentially
    if (!completedProblemIds.includes(problemId)) {
      const newCompleted = [...completedProblemIds, problemId];
      setCompletedProblemIds(newCompleted);

      // Identify next problem
      if (problem) {
        const nextOrder = problem.order + 1;
        const nextProb = PYTHON_LOOPS_PROBLEMS.find((p) => p.order === nextOrder);
        if (nextProb && !unlockedProblemIds.includes(nextProb.id)) {
          setUnlockedProblemIds((prev) => [...prev, nextProb.id]);
          notify(`Problem ${problem.order} solved! Problem ${nextOrder} is now unlocked.`);
        }
      }

      // If all 5 problems completed:
      if (newCompleted.filter((id) => id.startsWith('prob-loop-')).length >= 5) {
        if (!user.completedTopicIds.includes('topic-py-loops')) {
          setUser((prev) => ({
            ...prev,
            completedTopicIds: [...prev.completedTopicIds, 'topic-py-loops'],
            completedTopicsCount: prev.completedTopicsCount + 1,
          }));
          notify('Topic Completed: 5/5 Coding Problems Solved! 🎉');
        }
      }

      setUser((prev) => ({
        ...prev,
        solvedProblemsCount: prev.solvedProblemsCount + 1,
        arenaXp: prev.arenaXp + 35,
        problemSubmissions: {
          ...prev.problemSubmissions,
          [problemId]: {
            status: 'accepted',
            code,
            runtime: result.runtime,
            memory: result.memory,
            submittedAt: 'Just now',
          },
        },
      }));
    } else {
      notify('Code accepted! Updated submission record.');
    }

    return result;
  };

  const resetProblemState = (problemId: string) => {
    // helper to reset if testing
    setCompletedProblemIds((prev) => prev.filter((id) => id !== problemId));
    notify(`Reset problem status for testing.`);
  };

  const completeAssessment = (
    assessmentId: string,
    scorePercent: number
  ): { passed: boolean; newCert?: CertificateData } => {
    const passed = scorePercent >= 70;

    if (passed && assessmentId === 'assess-course-python') {
      const newCert: CertificateData = {
        id: `cert-py-${Date.now()}`,
        certificateNumber: `GWC-PY-2026-${Math.floor(100000 + Math.random() * 900000)}`,
        studentName: user.name,
        courseId: 'course-python',
        courseTitle: 'Python Programming',
        completionDate: new Date().toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        score: scorePercent,
        verificationUrl: `https://growwithcode.dev/verify/GWC-PY-2026-000123`,
        skillsAcquired: [
          'Python 3 Syntax & Runtime',
          'Control Flow & Iteration Mechanics',
          'Data Structures & Algorithmic Complexity',
          'Object-Oriented Design',
          'Interview Problem Solving',
        ],
      };

      setUser((prev) => ({
        ...prev,
        arenaXp: prev.arenaXp + 250,
        certificates: [newCert, ...prev.certificates.filter((c) => c.courseId !== 'course-python')],
      }));

      notify(`Course Assessment Passed with ${scorePercent}%! Certificate unlocked! 🎓`);
      return { passed: true, newCert };
    }

    if (passed) {
      setUser((prev) => ({
        ...prev,
        arenaXp: prev.arenaXp + 75,
      }));
      notify(`Topic Assessment Passed with ${scorePercent}%! (+75 XP)`);
    }

    return { passed };
  };

  const completeArenaChallenge = (_challengeId: string, xpEarned: number) => {
    setUser((prev) => {
      const newXp = prev.arenaXp + xpEarned;
      const newLevel = Math.floor(newXp / 350) + 1;
      const leveledUp = newLevel > prev.arenaLevel;
      if (leveledUp) {
        notify(`Level Up! You reached Arena Level ${newLevel}! 🔥 (+${xpEarned} XP)`);
      } else {
        notify(`Arena Challenge Accepted! +${xpEarned} XP`);
      }
      return {
        ...prev,
        arenaXp: newXp,
        arenaLevel: Math.max(prev.arenaLevel, newLevel),
      };
    });
  };

  const submitInterviewSimulation = (
    language: string,
    durationMinutes: number,
    counts: { correct: number; incorrect: number; skipped: number }
  ): InterviewReportData => {
    const total = counts.correct + counts.incorrect + counts.skipped || 18;
    const overallScore = Math.round((counts.correct / total) * 100);

    const report: InterviewReportData = {
      id: `rpt-${Date.now()}`,
      date: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      language: language.charAt(0).toUpperCase() + language.slice(1),
      durationMinutes,
      overallScore,
      readinessVerdict:
        overallScore >= 75
          ? 'Strong Candidate: High Placement Readiness'
          : overallScore >= 60
          ? 'Solid Foundation: Address 2-3 Weak Areas'
          : 'Developing: Additional Foundational Review Recommended',
      breakdown: {
        dsa: Math.min(95, Math.max(50, overallScore + Math.floor(Math.random() * 8) - 4)),
        language: Math.min(95, Math.max(50, overallScore + Math.floor(Math.random() * 8) - 4)),
        coding: Math.min(95, Math.max(50, overallScore + Math.floor(Math.random() * 6) - 3)),
      },
      topicBreakdown: [
        { topic: 'Arrays & Slicing', status: 'Strong', score: 90 },
        { topic: 'Strings & Parsing', status: 'Strong', score: 85 },
        { topic: 'Hash Tables & Sets', status: overallScore >= 75 ? 'Good' : 'Needs Practice', score: 64 },
        { topic: 'Trees & Recursion', status: 'Needs Practice', score: 55 },
        { topic: 'Iteration & Loop Invariants', status: 'Strong', score: 92 },
      ],
      metrics: {
        questionsAttempted: counts.correct + counts.incorrect,
        correctAnswers: counts.correct,
        incorrectAnswers: counts.incorrect,
        skipped: counts.skipped,
        timeUsedSeconds: Math.floor(durationMinutes * 52), // ~85% of time limit
        averageTimePerQuestionSeconds: Math.floor((durationMinutes * 60) / total),
      },
      recommendations: [
        {
          title: 'Review Hash Tables & Collisions',
          actionText: 'Study Dictionaries Module',
          targetRoute: 'topic',
          topicId: 'topic-py-dictionaries',
        },
        {
          title: 'Practice Binary Tree Problems in Arena',
          actionText: 'Open Code Arena',
          targetRoute: 'arena',
        },
        {
          title: 'Master Iteration & Loops Constraints',
          actionText: 'Solve Problem 4 in Loops',
          targetRoute: 'problem',
          topicId: 'prob-loop-4',
        },
      ],
    };

    setUser((prev) => ({
      ...prev,
      arenaXp: prev.arenaXp + 120,
      interviewHistory: [report, ...prev.interviewHistory],
    }));

    notify(`Interview simulation submitted! Overall Score: ${overallScore}%`);
    return report;
  };

  return (
    <AppContext.Provider
      value={{
        user,
        isAuthenticated,
        currentView,
        navigateTo,
        login,
        signup,
        logout,
        finishOnboarding,
        unlockedProblemIds,
        completedProblemIds,
        submitProblem,
        resetProblemState,
        markLessonComplete,
        isLessonCompleted,
        isTopicCompleted,
        completeAssessment,
        completeArenaChallenge,
        submitInterviewSimulation,
        activeNotification,
        clearNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
