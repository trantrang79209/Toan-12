import React, { useState, useEffect } from 'react';
import { ExamResult, ErrorCode } from '../types/math';
import { QUESTIONS_BANK } from '../data/questionsData';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { CheckCircle2, XCircle, Clock, Award, BookOpen, ArrowRight, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ExamResultViewProps {
  result: ExamResult;
  onRetest: () => void;
  onGoToLesson: (lessonId: string) => void;
  onDrillError: (errorCode: ErrorCode) => void;
  onGoToProgress: () => void;
}

export const ExamResultView: React.FC<ExamResultViewProps> = ({
  result,
  onRetest,
  onGoToLesson,
  onDrillError,
  onGoToProgress
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'wrong' | 'correct'>('all');

  // Launch confetti if score >= 8
  useEffect(() => {
    if (result.score >= 8.0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Safe fallback
      }
    }
  }, [result.score]);

  const errorCodes: ErrorCode[] = ['KT', 'TT', 'PP', 'DG', 'SU', 'QT', 'MH'];
  const totalWrong = result.totalQuestions - result.correctCount;

  // Filter questions
  const displayedAnswers = result.answers.filter(ans => {
    if (filterMode === 'wrong') return !ans.isCorrect;
    if (filterMode === 'correct') return ans.isCorrect;
    return true;
  });

  const formatTime = (totalSec: number) => {
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}m ${s}s`;
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Score Summary Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Left: Score Badge */}
          <div className="md:col-span-4 text-center md:border-r border-slate-100 md:pr-6">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">
              Điểm số bài thi
            </span>
            <div className="text-5xl sm:text-6xl font-extrabold text-sky-600 tracking-tight">
              {result.score.toFixed(1)}
              <span className="text-xl sm:text-2xl text-slate-400 font-normal">/10</span>
            </div>
            <div className="mt-2 inline-block px-3 py-1 rounded-full text-xs font-bold bg-sky-100 text-sky-800">
              {result.feedback.gradeBadge}
            </div>
          </div>

          {/* Right: Detailed metrics */}
          <div className="md:col-span-8 space-y-4">
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              {result.feedback.headline}
            </h2>

            <div className="grid grid-cols-3 gap-3">
              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  Số câu đúng
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {result.correctCount} / {result.totalQuestions}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-0.5">
                  <Clock className="w-3.5 h-3.5 text-sky-600" />
                  Thời gian làm
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900 font-mono">
                  {formatTime(result.timeSpentSeconds)}
                </span>
              </div>

              <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
                <span className="text-slate-400 text-xs flex items-center justify-center gap-1 mb-0.5">
                  <Award className="w-3.5 h-3.5 text-amber-600" />
                  Tỉ lệ đúng
                </span>
                <span className="text-base sm:text-lg font-bold text-slate-900">
                  {Math.round((result.correctCount / result.totalQuestions) * 100)}%
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onRetest}
                className="flex items-center gap-1.5 px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại bài thi này</span>
              </button>
              <button
                onClick={onGoToProgress}
                className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
              >
                <span>Xem biểu đồ tiến độ</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. SƠ ĐỒ ĐÁNH GIÁ 7 NHÓM LỖI SAI (Error Assessment Chart) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
              SƠ ĐỒ ĐÁNH GIÁ CHUYÊN SÂU
            </span>
            <h3 className="text-lg font-bold text-slate-900">
              Phân Bố 7 Nhóm Lỗi Sai Trong Bài Thi
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            Tổng số lỗi mắc phải: <strong className="text-rose-600">{totalWrong} lỗi</strong>
          </span>
        </div>

        {/* Visual Error Breakdown Bar Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {errorCodes.map(code => {
            const count = result.errorDistribution[code] || 0;
            const category = ERROR_CATEGORIES[code];
            const isDominant = result.feedback.dominantErrorCode === code && count > 0;
            const percent = totalWrong > 0 ? Math.round((count / totalWrong) * 100) : 0;

            return (
              <div
                key={code}
                className={`p-4 rounded-xl border transition-all ${
                  isDominant
                    ? 'border-rose-400 bg-rose-50/50 shadow-xs ring-1 ring-rose-400'
                    : count > 0
                    ? 'border-slate-200 bg-slate-50/60'
                    : 'border-slate-100 bg-white opacity-70'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                      style={{ backgroundColor: `${category.color}20`, color: category.color }}
                    >
                      {category.code}
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      {category.name}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isDominant && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-rose-100 text-rose-800">
                        Bị sai nhiều nhất
                      </span>
                    )}
                    <span className="text-xs font-mono font-bold text-slate-900">
                      {count} lỗi ({percent}%)
                    </span>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden mb-2">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${percent}%`,
                      backgroundColor: category.color
                    }}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="truncate max-w-[200px]">{category.tagline}</span>
                  {count > 0 && (
                    <button
                      onClick={() => onDrillError(code)}
                      className="text-sky-600 hover:text-sky-800 font-semibold underline shrink-0 ml-2"
                    >
                      Luyện đề nhóm này →
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. HỆ THỐNG PHẢN HỒI TỰ ĐỘNG & LỘ TRÌNH HỌC TẬP (Pedagogical Feedback & 3-Step Pathway) */}
      <div className="bg-sky-50/60 border border-sky-200 rounded-2xl p-6 sm:p-8 space-y-6">
        <div>
          <span className="text-xs font-bold text-sky-700 uppercase tracking-wider">
            PHẢN HỒI TỰ ĐỘNG &amp; LỘ TRÌNH KHẮC PHỤC
          </span>
          <h3 className="text-lg font-bold text-slate-900 mt-1">
            Kế Hoạch Cải Thiện Điểm Số Cá Nhân Hóa
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 mt-1 leading-relaxed">
            {result.feedback.pedagogicalAdvice}
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.feedback.remedialSteps.map((step, sIdx) => (
            <div
              key={sIdx}
              className="bg-white rounded-xl border border-sky-100 p-5 shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="w-7 h-7 rounded-full bg-sky-600 text-white font-bold text-xs flex items-center justify-center">
                    {step.step}
                  </span>
                  <span className="text-[11px] font-semibold text-sky-700">
                    Bước {step.step}
                  </span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 mb-1.5 leading-snug">
                  {step.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {step.detail}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 mt-3 border-t border-slate-100">
                {step.actionType === 'read_textbook' && step.actionLessonId && (
                  <button
                    onClick={() => onGoToLesson(step.actionLessonId!)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-sky-50 hover:bg-sky-100 text-sky-800 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-sky-600" />
                    <span>Mở Sách giáo khoa</span>
                  </button>
                )}

                {step.actionType === 'drill_error' && step.actionErrorCode && (
                  <button
                    onClick={() => onDrillError(step.actionErrorCode!)}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-amber-50 hover:bg-amber-100 text-amber-900 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <span>Luyện 10 câu nhóm {step.actionErrorCode}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-700" />
                  </button>
                )}

                {step.actionType === 'retest' && (
                  <button
                    onClick={onRetest}
                    className="w-full flex items-center justify-center gap-1.5 py-2 px-3 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-lg text-xs font-semibold transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Làm bài kiểm tra lại</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Chi tiết từng câu hỏi (Detailed Question Review) */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Xem Lại Chi Tiết &amp; Giải Mã Từng Câu Hỏi
            </h3>
            <p className="text-xs text-slate-500">
              Đọc kỹ lời giải và nguyên nhân bẫy sai lầm của các câu bạn chưa làm đúng.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl">
            <button
              onClick={() => setFilterMode('all')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterMode === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Tất cả ({result.answers.length})
            </button>
            <button
              onClick={() => setFilterMode('wrong')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterMode === 'wrong'
                  ? 'bg-white text-rose-700 shadow-xs'
                  : 'text-slate-600 hover:text-rose-700'
              }`}
            >
              Câu sai ({totalWrong})
            </button>
            <button
              onClick={() => setFilterMode('correct')}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                filterMode === 'correct'
                  ? 'bg-white text-emerald-700 shadow-xs'
                  : 'text-slate-600 hover:text-emerald-700'
              }`}
            >
              Câu đúng ({result.correctCount})
            </button>
          </div>
        </div>

        {/* Questions list */}
        <div className="space-y-6">
          {displayedAnswers.map((ans, idx) => {
            const question = QUESTIONS_BANK.find(q => q.id === ans.questionId);
            if (!question) return null;

            const selectedOption = question.options.find(o => o.id === ans.selectedOptionId);
            const correctOption = question.options.find(o => o.isCorrect);

            return (
              <div
                key={ans.questionId}
                className={`p-5 rounded-2xl border transition-all ${
                  ans.isCorrect
                    ? 'border-slate-200 bg-white'
                    : 'border-rose-200 bg-rose-50/20'
                }`}
              >
                {/* Question Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-800">
                      Câu {idx + 1}
                    </span>
                    {ans.isCorrect ? (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Đúng
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                        <XCircle className="w-3.5 h-3.5" /> Sai
                      </span>
                    )}
                  </div>

                  {/* Primary error trap indicator */}
                  <span className="text-[11px] text-slate-500">
                    Bẫy chính: <strong className="text-slate-700">{question.primaryErrorTrap} ({ERROR_CATEGORIES[question.primaryErrorTrap]?.shortName})</strong>
                  </span>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm font-medium text-slate-900 mb-4 math-formula leading-relaxed">
                  {question.content}
                </p>

                {/* Options display */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4">
                  {question.options.map(opt => {
                    const isUserChoice = ans.selectedOptionId === opt.id;
                    const isThisCorrect = opt.isCorrect;

                    let optStyle = 'border-slate-200 bg-slate-50 text-slate-700';
                    if (isThisCorrect) {
                      optStyle = 'border-emerald-300 bg-emerald-50 text-emerald-950 font-bold';
                    } else if (isUserChoice && !isThisCorrect) {
                      optStyle = 'border-rose-300 bg-rose-50 text-rose-950 font-bold';
                    }

                    return (
                      <div
                        key={opt.id}
                        className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 ${optStyle}`}
                      >
                        <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                          isThisCorrect
                            ? 'bg-emerald-600 text-white'
                            : isUserChoice
                            ? 'bg-rose-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}>
                          {opt.id}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="math-formula">{opt.text}</span>
                          {isUserChoice && (
                            <span className="block text-[10px] mt-0.5 font-normal text-slate-500">
                              (Lựa chọn của bạn)
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Error explanation if wrong */}
                {!ans.isCorrect && selectedOption?.errorGroup && (
                  <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl mb-3 space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                      <XCircle className="w-4 h-4 text-rose-600" />
                      <span>
                        Giải mã lỗi sai: Bạn đã mắc {ERROR_CATEGORIES[selectedOption.errorGroup]?.name}
                      </span>
                    </div>
                    <p className="text-xs text-rose-900 leading-relaxed">
                      {selectedOption.errorNote || question.trapDescription}
                    </p>
                  </div>
                )}

                {/* Explanation */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1.5">
                  <span className="font-bold text-slate-800 block">Lời giải chi tiết:</span>
                  <p className="text-slate-700 leading-relaxed math-formula">
                    {question.explanation}
                  </p>
                  {question.recommendedTip && (
                    <div className="pt-1.5 border-t border-slate-200/60 text-emerald-800 text-[11px] font-medium">
                      ✓ <strong>Thần chú khắc phục: </strong>{question.recommendedTip}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
