export type ErrorCode = 'KT' | 'TT' | 'PP' | 'DG' | 'SU' | 'QT' | 'MH';

export type DifficultyLevel = 'NB' | 'TH' | 'VD' | 'VDC';

export interface ErrorCategory {
  code: ErrorCode;
  groupNumber: number;
  name: string;
  shortName: string;
  tagline: string;
  color: string;
  textColor: string;
  bgColor: string;
  borderColor: string;
  description: string;
  coreSymptoms: string[];
  classicExamples: Array<{
    title: string;
    problem: string;
    wrongAnswer: string;
    wrongAnalysis: string;
    correctAnswer: string;
    correctSolution: string;
    preventionRule: string;
  }>;
  checklist: string[];
}

export interface QuestionOption {
  id: 'A' | 'B' | 'C' | 'D';
  text: string;
  isCorrect: boolean;
  errorGroup?: ErrorCode;
  errorNote?: string;
}

export interface Question {
  id: string;
  chapterId: string;
  lessonId: string;
  content: string;
  latex?: string;
  difficulty: DifficultyLevel;
  options: QuestionOption[];
  explanation: string;
  primaryErrorTrap: ErrorCode;
  trapDescription: string;
  recommendedTip: string;
}

export interface LessonSection {
  heading: string;
  content: string[];
  keyPoints?: string[];
  formulas?: string[];
  classicTrap?: {
    trapName: string;
    errorCode: ErrorCode;
    warning: string;
    tip: string;
  };
  examples?: Array<{
    title: string;
    question: string;
    solutionSteps: string[];
    note: string;
  }>;
}

export interface Lesson {
  id: string;
  chapterId: string;
  title: string;
  order: number;
  readingTime: string;
  summary: string;
  sections: LessonSection[];
}

export interface Chapter {
  id: string;
  semester: 1 | 2; // 1: Học kỳ 1 (Tập 1), 2: Học kỳ 2 (Tập 2)
  semesterLabel: string;
  title: string;
  number: number;
  description: string;
  color: string;
  lessons: Lesson[];
}

export interface ExamConfig {
  id: string;
  title: string;
  totalQuestions: number; // 10 to 20
  durationMinutes: number;
  mode: 'random' | 'error_targeted' | 'lesson_specific' | 'chapter_custom';
  targetErrorGroups?: ErrorCode[];
  selectedChapterIds?: string[];
  selectedChapterId?: string;
  selectedLessonId?: string;
  selectedLessonIds?: string[];
}

export interface UserAnswer {
  questionId: string;
  selectedOptionId: 'A' | 'B' | 'C' | 'D' | null;
  isCorrect: boolean;
  errorIncurred?: ErrorCode;
  timeSpentSeconds: number;
}

export interface RemedialStep {
  step: number;
  title: string;
  detail: string;
  actionLessonId?: string;
  actionErrorCode?: ErrorCode;
  actionType: 'read_textbook' | 'drill_error' | 'retest';
}

export interface ExamFeedback {
  headline: string;
  gradeBadge: string;
  dominantErrorCode?: ErrorCode;
  diagnosisText: string;
  pedagogicalAdvice: string;
  remedialSteps: RemedialStep[];
}

export interface ExamResult {
  id: string;
  examTitle: string;
  timestamp: number;
  totalQuestions: number;
  correctCount: number;
  score: number; // Thang điểm 10
  timeSpentSeconds: number;
  answers: UserAnswer[];
  errorDistribution: Record<ErrorCode, number>;
  feedback: ExamFeedback;
}
