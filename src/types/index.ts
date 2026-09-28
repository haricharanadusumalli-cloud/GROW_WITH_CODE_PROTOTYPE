export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type Language = 'python' | 'java' | 'c' | 'sql' | 'html' | 'css';

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isPublic: boolean;
}

export interface Problem {
  id: string;
  order: number; // 1 to 5
  title: string;
  difficulty: Difficulty;
  topicId: string;
  courseId: string;
  timeEstimate: string;
  acceptanceRate: string;
  description: string;
  constraints: string[];
  inputFormat: string;
  outputFormat: string;
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<string, string>;
  solutionCode: Record<string, string>;
  testCases: TestCase[];
  hints: string[];
  explanation: string;
  isUnlocked: boolean;
  isCompleted: boolean;
}

export interface LessonSection {
  id: string;
  title: string;
  content: string;
  codeSnippet?: {
    language: string;
    code: string;
    explanation?: string;
  };
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  readTime: string;
  videoUrl?: string;
  videoDuration?: string;
  overview: string;
  objectives: string[];
  definition: string;
  whyItExists: string;
  whyImportant: string;
  whenToUse: string;
  syntax: string;
  detailedExplanation: string[];
  codeExamples: {
    title: string;
    code: string;
    language: string;
    lineByLine: { line: number; text: string; code: string }[];
  }[];
  realWorldExample: {
    context: string;
    code: string;
    explanation: string;
  };
  commonMistakes: {
    mistake: string;
    whyWrong: string;
    correctWay: string;
  }[];
  edgeCases: string[];
  quickTips: string[];
  isCompleted: boolean;
}

export type TopicStatus = 'completed' | 'current' | 'available' | 'locked' | 'upcoming';

export interface Topic {
  id: string;
  courseId: string;
  moduleId: string;
  order: number;
  title: string;
  status: TopicStatus;
  estimatedMinutes: number;
  difficulty: Difficulty;
  prerequisites: string[];
  learningObjectives: string[];
  overview: string;
  videoPreviewDuration: string;
  lessonId: string;
  problemIds: string[];
}

export interface Module {
  id: string;
  courseId: string;
  order: number;
  title: string;
  description: string;
  topicIds: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  description: string;
  difficulty: string;
  totalModules: number;
  totalTopics: number;
  totalProblems: number;
  estimatedHours: number;
  iconName: string;
  color: string;
  isPopular?: boolean;
}

export interface Question {
  id: string;
  questionText: string;
  type: 'mcq' | 'code-output' | 'debugging';
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topicTag: string;
}

export interface Assessment {
  id: string;
  type: 'topic' | 'course';
  title: string;
  courseId: string;
  topicId?: string;
  timeLimitMinutes: number;
  passingScorePercent: number;
  questions: Question[];
}

export interface CertificateData {
  id: string;
  certificateNumber: string;
  studentName: string;
  courseId: string;
  courseTitle: string;
  completionDate: string;
  score: number;
  verificationUrl: string;
  skillsAcquired: string[];
}

export interface ArenaChallenge {
  id: string;
  title: string;
  level: number;
  difficulty: Difficulty;
  topic: string;
  estimatedMinutes: number;
  xpReward: number;
  timeLimitMinutes: number;
  description: string;
  constraints: string[];
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  starterCode: Record<string, string>;
  testCases: TestCase[];
}

export interface InterviewConfig {
  language: Language;
  durationMinutes: number;
  difficultyLevel: 'Junior' | 'Mid' | 'Placement';
}

export interface InterviewReportData {
  id: string;
  date: string;
  language: string;
  durationMinutes: number;
  overallScore: number;
  readinessVerdict: string;
  breakdown: {
    dsa: number;
    language: number;
    coding: number;
  };
  topicBreakdown: {
    topic: string;
    status: 'Strong' | 'Needs Practice' | 'Good';
    score: number;
  }[];
  metrics: {
    questionsAttempted: number;
    correctAnswers: number;
    incorrectAnswers: number;
    skipped: number;
    timeUsedSeconds: number;
    averageTimePerQuestionSeconds: number;
  };
  recommendations: {
    title: string;
    actionText: string;
    targetRoute: string;
    topicId?: string;
  }[];
}

export interface UserState {
  id: string;
  name: string;
  email: string;
  avatarUrl?: string;
  joinedDate: string;
  primaryGoal: string;
  experienceLevel: string;
  activeCourseId: string;
  currentTopicId: string;
  currentLessonId: string;
  currentProblemId: string;
  streakDays: number;
  arenaLevel: number;
  arenaXp: number;
  solvedProblemsCount: number;
  completedTopicsCount: number;
  certificates: CertificateData[];
  interviewHistory: InterviewReportData[];
  problemSubmissions: Record<string, {
    status: 'accepted' | 'failed';
    code: string;
    runtime: number;
    memory: number;
    submittedAt: string;
  }>;
  completedTopicIds: string[];
  completedLessonIds: string[];
  unlockedProblemIds: string[];
}

export type AppView =
  | { type: 'landing' }
  | { type: 'onboarding' }
  | { type: 'dashboard' }
  | { type: 'learn-catalog' }
  | { type: 'course'; courseId: string }
  | { type: 'topic'; topicId: string }
  | { type: 'lesson'; lessonId: string }
  | { type: 'problem'; problemId: string }
  | { type: 'assessment'; assessmentId: string }
  | { type: 'course-completed'; courseId: string; score: number }
  | { type: 'certificate'; certificateId: string }
  | { type: 'verify-certificate'; certificateNumber: string }
  | { type: 'arena' }
  | { type: 'arena-challenge'; challengeId: string }
  | { type: 'interview-setup' }
  | { type: 'interview-sim'; config: InterviewConfig }
  | { type: 'interview-report'; reportId: string }
  | { type: 'profile' };
