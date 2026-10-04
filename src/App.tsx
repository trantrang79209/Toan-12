import React, { useState, useEffect } from 'react';
import { Header, NavTab } from './components/Header';
import { TextbookView } from './components/TextbookView';
import { ErrorGuideView } from './components/ErrorGuideView';
import { QuestionsBankView } from './components/QuestionsBankView';
import { ProgressDashboardView } from './components/ProgressDashboardView';
import { ExamCreatorModal } from './components/ExamCreatorModal';
import { OnboardingModal } from './components/OnboardingModal';
import { ExamTakingView } from './components/ExamTakingView';
import { ExamResultView } from './components/ExamResultView';
import { QUESTIONS_BANK } from './data/questionsData';
import { ErrorCode, ExamConfig, ExamResult, Question, UserAnswer } from './types/math';
import { generateAutomatedFeedback } from './utils/feedbackEngine';
import { saveExamResult } from './utils/storage';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavTab>('textbook');
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isExamCreatorOpen, setIsExamCreatorOpen] = useState<boolean>(false);
  const [activeErrorCode, setActiveErrorCode] = useState<ErrorCode>('KT');

  // Exam taking state
  const [activeExamConfig, setActiveExamConfig] = useState<ExamConfig | null>(null);
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);

  // Exam result state
  const [currentExamResult, setCurrentExamResult] = useState<ExamResult | null>(null);

  // Initial check for first-time visitor
  useEffect(() => {
    const hasVisited = localStorage.getItem('toan12_has_visited');
    if (!hasVisited) {
      setIsOnboardingOpen(true);
      localStorage.setItem('toan12_has_visited', 'true');
    }
  }, []);

  // Launch a new exam based on configuration
  const handleStartExam = (config: ExamConfig) => {
    let pool: Question[] = [];

    if (config.mode === 'chapter_custom' && config.selectedChapterId) {
      pool = QUESTIONS_BANK.filter(q => {
        const matchChapter = q.chapterId === config.selectedChapterId;
        const matchLesson = config.selectedLessonIds ? config.selectedLessonIds.includes(q.lessonId) : true;
        const matchError = config.targetErrorGroups && config.targetErrorGroups.length > 0
          ? config.targetErrorGroups.includes(q.primaryErrorTrap)
          : true;
        return matchChapter && matchLesson && matchError;
      });
      // If pool is smaller than totalQuestions requested, pad with other questions from the same chapter or bank
      if (pool.length < config.totalQuestions) {
        const chapterFallback = QUESTIONS_BANK.filter(q => q.chapterId === config.selectedChapterId && !pool.includes(q));
        pool = [...pool, ...chapterFallback];
        if (pool.length < config.totalQuestions) {
          const others = QUESTIONS_BANK.filter(q => !pool.includes(q));
          pool = [...pool, ...others];
        }
      }
    } else if (config.mode === 'lesson_specific' && config.selectedLessonId) {
      pool = QUESTIONS_BANK.filter(q => q.lessonId === config.selectedLessonId);
      if (pool.length < config.totalQuestions) {
        const others = QUESTIONS_BANK.filter(q => !pool.includes(q));
        pool = [...pool, ...others];
      }
    } else if (config.mode === 'error_targeted' && config.targetErrorGroups && config.targetErrorGroups.length > 0) {
      pool = QUESTIONS_BANK.filter(q => config.targetErrorGroups!.includes(q.primaryErrorTrap));
      // If not enough questions in targeted pool, pad with related questions
      if (pool.length < config.totalQuestions) {
        const others = QUESTIONS_BANK.filter(q => !pool.includes(q));
        pool = [...pool, ...others];
      }
    } else {
      // Random mixed
      pool = [...QUESTIONS_BANK];
    }

    // Shuffle pool
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(config.totalQuestions, shuffled.length));

    setActiveExamConfig(config);
    setActiveQuestions(selected);
    setCurrentExamResult(null);
  };

  // Quick launch for a specific lesson from textbook (10 questions)
  const handleStartLessonExam = (lessonId: string, lessonTitle: string) => {
    const config: ExamConfig = {
      id: `lesson-exam-${Date.now()}`,
      title: `Kiểm tra: ${lessonTitle} (10 câu)`,
      totalQuestions: 10,
      durationMinutes: 20,
      mode: 'lesson_specific',
      selectedLessonId: lessonId
    };
    handleStartExam(config);
  };

  // Quick launch for drilling a specific error group (10 questions)
  const handleDrillErrorExam = (errorCode: ErrorCode) => {
    const config: ExamConfig = {
      id: `drill-exam-${Date.now()}`,
      title: `Chuyên đề diệt bẫy: Nhóm ${errorCode} (10 câu)`,
      totalQuestions: 10,
      durationMinutes: 20,
      mode: 'error_targeted',
      targetErrorGroups: [errorCode]
    };
    handleStartExam(config);
  };

  // Called when student finishes taking exam
  const handleFinishExam = (answers: UserAnswer[], timeSpentSeconds: number) => {
    if (!activeExamConfig) return;

    const totalQuestions = answers.length;
    const correctCount = answers.filter(a => a.isCorrect).length;
    const score = Number(((correctCount / totalQuestions) * 10).toFixed(1));

    // Calculate error distribution
    const errorDistribution: Record<ErrorCode, number> = {
      KT: 0,
      TT: 0,
      PP: 0,
      DG: 0,
      SU: 0,
      QT: 0,
      MH: 0
    };

    answers.forEach(a => {
      if (!a.isCorrect && a.errorIncurred) {
        errorDistribution[a.errorIncurred] = (errorDistribution[a.errorIncurred] || 0) + 1;
      }
    });

    const feedback = generateAutomatedFeedback(
      answers,
      errorDistribution,
      score,
      totalQuestions
    );

    const result: ExamResult = {
      id: `result-${Date.now()}`,
      examTitle: activeExamConfig.title,
      timestamp: Date.now(),
      totalQuestions,
      correctCount,
      score,
      timeSpentSeconds,
      answers,
      errorDistribution,
      feedback
    };

    // Save result to local storage
    saveExamResult(result);

    // Switch view
    setActiveExamConfig(null);
    setCurrentExamResult(result);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Cancel exam
  const handleCancelExam = () => {
    setActiveExamConfig(null);
    setActiveQuestions([]);
  };

  // Retest from result screen
  const handleRetestFromResults = () => {
    if (!currentExamResult) return;
    const config: ExamConfig = {
      id: `retest-${Date.now()}`,
      title: `Thi lại: ${currentExamResult.examTitle}`,
      totalQuestions: currentExamResult.totalQuestions,
      durationMinutes: 20,
      mode: 'random'
    };
    handleStartExam(config);
  };

  // If student is currently taking an exam, show full screen ExamTakingView
  if (activeExamConfig && activeQuestions.length > 0) {
    return (
      <ExamTakingView
        config={activeExamConfig}
        questions={activeQuestions}
        onFinishExam={handleFinishExam}
        onCancelExam={handleCancelExam}
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col text-slate-800">
      {/* Universal Top Bar */}
      <Header
        currentTab={currentTab}
        onSelectTab={tab => {
          setCurrentExamResult(null);
          setCurrentTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenExamCreator={() => setIsExamCreatorOpen(true)}
        onOpenGuide={() => setIsOnboardingOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If user just completed an exam or clicked an exam from history, show ExamResultView */}
        {currentExamResult ? (
          <ExamResultView
            result={currentExamResult}
            onRetest={handleRetestFromResults}
            onGoToLesson={() => {
              setCurrentExamResult(null);
              setCurrentTab('textbook');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onDrillError={code => {
              setCurrentExamResult(null);
              handleDrillErrorExam(code);
            }}
            onGoToProgress={() => {
              setCurrentExamResult(null);
              setCurrentTab('progress');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        ) : (
          <>
            {currentTab === 'textbook' && (
              <TextbookView
                onStartLessonExam={handleStartLessonExam}
                onExploreErrorGroup={code => {
                  setActiveErrorCode(code as ErrorCode);
                  setCurrentTab('errors');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            )}

            {currentTab === 'errors' && (
              <ErrorGuideView
                initialErrorCode={activeErrorCode}
                onDrillErrorExam={handleDrillErrorExam}
              />
            )}

            {currentTab === 'questions' && (
              <QuestionsBankView
                onStartCustomExam={(lessonId, errorCode) => {
                  if (lessonId) {
                    handleStartLessonExam(lessonId, 'Chuyên đề');
                  } else if (errorCode) {
                    handleDrillErrorExam(errorCode);
                  } else {
                    setIsExamCreatorOpen(true);
                  }
                }}
              />
            )}

            {currentTab === 'progress' && (
              <ProgressDashboardView
                onReviewExam={res => {
                  setCurrentExamResult(res);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenExamCreator={() => setIsExamCreatorOpen(true)}
                onGoToTextbook={() => {
                  setCurrentTab('textbook');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onDrillError={handleDrillErrorExam}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>
            Toán 12 Master · Nền tảng học tập &amp; khắc phục 7 nhóm lỗi sai kinh điển GDPT 2018
          </span>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsOnboardingOpen(true)}
              className="hover:text-slate-800 transition-colors"
            >
              Hướng dẫn sử dụng
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setCurrentExamResult(null);
                setCurrentTab('textbook');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              Sách giáo khoa
            </button>
            <span>·</span>
            <button
              onClick={() => {
                setCurrentExamResult(null);
                setCurrentTab('errors');
              }}
              className="hover:text-slate-800 transition-colors"
            >
              7 Nhóm lỗi
            </button>
          </div>
        </div>
      </footer>

      {/* Onboarding Guide Modal */}
      <OnboardingModal
        isOpen={isOnboardingOpen}
        onClose={() => setIsOnboardingOpen(false)}
        onStartExam={() => setIsExamCreatorOpen(true)}
        onGoToTextbook={() => setCurrentTab('textbook')}
        onGoToErrors={() => setCurrentTab('errors')}
      />

      {/* Custom Exam Creator Modal */}
      <ExamCreatorModal
        isOpen={isExamCreatorOpen}
        onClose={() => setIsExamCreatorOpen(false)}
        onStartExam={handleStartExam}
      />
    </div>
  );
}
