import React, { useState, useEffect } from 'react';
import { Question, ExamConfig, UserAnswer } from '../types/math';
import { Clock, Flag, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, AlertTriangle } from 'lucide-react';

interface ExamTakingViewProps {
  config: ExamConfig;
  questions: Question[];
  onFinishExam: (answers: UserAnswer[], timeSpentSeconds: number) => void;
  onCancelExam: () => void;
}

export const ExamTakingView: React.FC<ExamTakingViewProps> = ({
  config,
  questions,
  onFinishExam,
  onCancelExam
}) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, 'A' | 'B' | 'C' | 'D' | null>>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<string[]>([]);
  const [secondsRemaining, setSecondsRemaining] = useState<number>(config.durationMinutes * 60);
  const [timeSpentSeconds, setTimeSpentSeconds] = useState<number>(0);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState<boolean>(false);
  const [showConfirmExit, setShowConfirmExit] = useState<boolean>(false);

  const currentQuestion = questions[currentIndex];

  // Timer logic
  useEffect(() => {
    if (config.durationMinutes === 0) {
      // Free time mode, just count up
      const timer = setInterval(() => {
        setTimeSpentSeconds(prev => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }

    const timer = setInterval(() => {
      setTimeSpentSeconds(prev => prev + 1);
      setSecondsRemaining(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [config.durationMinutes]);

  const handleSelectOption = (optionId: 'A' | 'B' | 'C' | 'D') => {
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestion.id]: optionId
    }));
  };

  const handleToggleFlag = (qId: string) => {
    setFlaggedQuestions(prev =>
      prev.includes(qId) ? prev.filter(id => id !== qId) : [...prev, qId]
    );
  };

  const handleSubmit = () => {
    const formattedAnswers: UserAnswer[] = questions.map(q => {
      const selected = selectedAnswers[q.id] || null;
      const matchedOption = q.options.find(o => o.id === selected);
      const isCorrect = matchedOption ? matchedOption.isCorrect : false;
      const errorIncurred = !isCorrect && matchedOption ? matchedOption.errorGroup : undefined;

      return {
        questionId: q.id,
        selectedOptionId: selected,
        isCorrect,
        errorIncurred,
        timeSpentSeconds: Math.round(timeSpentSeconds / questions.length)
      };
    });

    onFinishExam(formattedAnswers, timeSpentSeconds);
  };

  const answeredCount = Object.values(selectedAnswers).filter(Boolean).length;

  const formatTimer = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const getDifficultyBadge = (diff: string) => {
    switch (diff) {
      case 'NB':
        return { label: 'Nhận biết', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'TH':
        return { label: 'Thông hiểu', color: 'text-sky-700 bg-sky-50 border-sky-200' };
      case 'VD':
        return { label: 'Vận dụng', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'VDC':
        return { label: 'Vận dụng cao', color: 'text-rose-700 bg-rose-50 border-rose-200' };
      default:
        return { label: 'Cơ bản', color: 'text-slate-700 bg-slate-50 border-slate-200' };
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Test Header Bar */}
      <header className="sticky top-0 z-40 bg-white border-b border-slate-200 px-4 sm:px-6 py-3 shadow-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowConfirmExit(true)}
              className="text-slate-500 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 text-xs font-semibold flex items-center gap-1"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Thoát</span>
            </button>
            <div className="border-l border-slate-200 pl-3">
              <h1 className="text-xs sm:text-sm font-bold text-slate-900 truncate max-w-xs sm:max-w-md">
                {config.title}
              </h1>
              <span className="text-[11px] text-slate-500">
                Đã trả lời {answeredCount} / {questions.length} câu
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Timer */}
            {config.durationMinutes > 0 ? (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs sm:text-sm font-mono font-bold ${
                secondsRemaining < 120
                  ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                  : 'bg-slate-50 border-slate-200 text-slate-800'
              }`}>
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{formatTimer(secondsRemaining)}</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs sm:text-sm font-mono text-slate-700">
                <Clock className="w-4 h-4 text-slate-500" />
                <span>{formatTimer(timeSpentSeconds)}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              onClick={() => setShowConfirmSubmit(true)}
              className="flex items-center gap-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
            >
              <CheckCircle className="w-4 h-4" />
              <span>Nộp bài</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace Layout */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Question Navigation Grid */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-5 shadow-xs order-2 lg:order-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Danh sách câu hỏi
            </h3>
            <span className="text-xs text-slate-500">
              {answeredCount}/{questions.length} đã xong
            </span>
          </div>

          {/* Grid buttons */}
          <div className="grid grid-cols-5 sm:grid-cols-5 gap-2">
            {questions.map((q, idx) => {
              const isAnswered = !!selectedAnswers[q.id];
              const isCurrent = idx === currentIndex;
              const isFlagged = flaggedQuestions.includes(q.id);

              let style = 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100';
              if (isAnswered) {
                style = 'bg-sky-600 text-white border-sky-600 font-bold';
              }
              if (isCurrent) {
                style += ' ring-2 ring-slate-900 ring-offset-1 font-bold';
              }

              return (
                <button
                  key={q.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`h-10 rounded-xl border text-xs relative flex items-center justify-center transition-all ${style}`}
                >
                  <span>{idx + 1}</span>
                  {isFlagged && (
                    <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-sky-600 inline-block" />
              <span>Đã chọn</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded bg-slate-100 border border-slate-300 inline-block" />
              <span>Chưa làm</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" />
              <span>Đã cắm cờ</span>
            </div>
          </div>
        </div>

        {/* Right Column: Question Content */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs order-1 lg:order-2 space-y-6">
          {/* Question Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-sm font-extrabold text-slate-900">
                Câu {currentIndex + 1} / {questions.length}
              </span>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${getDifficultyBadge(currentQuestion.difficulty).color}`}>
                {getDifficultyBadge(currentQuestion.difficulty).label}
              </span>
            </div>

            <button
              onClick={() => handleToggleFlag(currentQuestion.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition-colors ${
                flaggedQuestions.includes(currentQuestion.id)
                  ? 'bg-amber-50 border-amber-300 text-amber-800'
                  : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Flag className={`w-3.5 h-3.5 ${flaggedQuestions.includes(currentQuestion.id) ? 'fill-amber-500 text-amber-500' : ''}`} />
              <span>{flaggedQuestions.includes(currentQuestion.id) ? 'Đã cắm cờ' : 'Đặt cờ xem lại'}</span>
            </button>
          </div>

          {/* Question Body */}
          <div className="text-sm sm:text-base font-medium text-slate-900 leading-relaxed math-formula">
            {currentQuestion.content}
          </div>

          {/* Options List */}
          <div className="space-y-3 pt-2">
            {currentQuestion.options.map(option => {
              const isSelected = selectedAnswers[currentQuestion.id] === option.id;

              return (
                <button
                  key={option.id}
                  onClick={() => handleSelectOption(option.id)}
                  className={`w-full text-left p-4 rounded-xl border transition-all flex items-start gap-3 ${
                    isSelected
                      ? 'bg-sky-50 border-sky-600 text-sky-950 font-semibold ring-1 ring-sky-600 shadow-xs'
                      : 'bg-white border-slate-200 text-slate-800 hover:border-slate-300 hover:bg-slate-50/70'
                  }`}
                >
                  <span className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                    isSelected
                      ? 'bg-sky-600 text-white'
                      : 'bg-slate-100 text-slate-700'
                  }`}>
                    {option.id}
                  </span>
                  <div className="flex-1 pt-0.5 text-xs sm:text-sm math-formula leading-relaxed">
                    {option.text}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Nav Controls */}
          <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => setCurrentIndex(prev => Math.max(0, prev - 1))}
              disabled={currentIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border transition-colors ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-slate-50 border-slate-200 text-slate-400'
                  : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Câu trước</span>
            </button>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={() => setCurrentIndex(prev => Math.min(questions.length - 1, prev + 1))}
                className="flex items-center gap-1.5 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <span>Câu tiếp theo</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => setShowConfirmSubmit(true)}
                className="flex items-center gap-1.5 px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <CheckCircle className="w-4 h-4" />
                <span>Hoàn tất &amp; Nộp bài</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Submit Confirmation Modal */}
      {showConfirmSubmit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Xác nhận nộp bài thi?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Bạn đã trả lời <strong className="text-slate-800">{answeredCount}/{questions.length}</strong> câu hỏi.
                {questions.length - answeredCount > 0 && (
                  <span className="block text-amber-600 mt-1 font-medium">
                    (Còn {questions.length - answeredCount} câu chưa trả lời)
                  </span>
                )}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowConfirmSubmit(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
              >
                Làm tiếp
              </button>
              <button
                onClick={() => {
                  setShowConfirmSubmit(false);
                  handleSubmit();
                }}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Nộp bài ngay
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Exit Confirmation Modal */}
      {showConfirmExit && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-xl max-w-sm w-full p-6 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center mx-auto">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-900">
                Thoát bài thi đang làm?
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Kết quả bài thi hiện tại sẽ không được lưu nếu bạn thoát ra lúc này.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 pt-2">
              <button
                onClick={() => setShowConfirmExit(false)}
                className="px-4 py-2 border border-slate-200 text-slate-700 hover:bg-slate-50 rounded-xl text-xs font-semibold transition-colors"
              >
                Tiếp tục thi
              </button>
              <button
                onClick={() => {
                  setShowConfirmExit(false);
                  onCancelExam();
                }}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Thoát ngay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
