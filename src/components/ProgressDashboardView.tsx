import React, { useState } from 'react';
import { getExamHistory, getCompletedLessons, clearExamHistory } from '../utils/storage';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { ErrorCode, ExamResult } from '../types/math';
import { BarChart2, TrendingUp, CheckCircle, Clock, Trash2, ArrowRight, Play, BookOpen } from 'lucide-react';

interface ProgressDashboardViewProps {
  onReviewExam: (result: ExamResult) => void;
  onOpenExamCreator: () => void;
  onGoToTextbook: () => void;
  onDrillError: (errorCode: ErrorCode) => void;
}

export const ProgressDashboardView: React.FC<ProgressDashboardViewProps> = ({
  onReviewExam,
  onOpenExamCreator,
  onGoToTextbook,
  onDrillError
}) => {
  const [history, setHistory] = useState<ExamResult[]>(getExamHistory());
  const completedLessons = getCompletedLessons();

  const totalExams = history.length;
  const avgScore = totalExams > 0 ? history.reduce((acc, h) => acc + h.score, 0) / totalExams : 0;
  const totalQuestionsDone = history.reduce((acc, h) => acc + h.totalQuestions, 0);
  const totalCorrectDone = history.reduce((acc, h) => acc + h.correctCount, 0);
  const accuracyRate = totalQuestionsDone > 0 ? Math.round((totalCorrectDone / totalQuestionsDone) * 100) : 0;

  // Cumulative errors
  const errorTotals: Record<ErrorCode, number> = {
    KT: 0,
    TT: 0,
    PP: 0,
    DG: 0,
    SU: 0,
    QT: 0,
    MH: 0
  };

  history.forEach(h => {
    (Object.keys(h.errorDistribution) as ErrorCode[]).forEach(c => {
      errorTotals[c] += h.errorDistribution[c] || 0;
    });
  });

  const totalCumulativeErrors = Object.values(errorTotals).reduce((a, b) => a + b, 0);

  const errorCodes: ErrorCode[] = ['KT', 'TT', 'PP', 'DG', 'SU', 'QT', 'MH'];

  const handleClear = () => {
    if (window.confirm('Bạn có chắc muốn xóa toàn bộ lịch sử thi để bắt đầu lại?')) {
      clearExamHistory();
      setHistory([]);
    }
  };

  const totalLessonsInCurriculum = CHAPTERS_DATA.reduce((acc, c) => acc + c.lessons.length, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            BÁO CÁO NĂNG LỰC
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Tiến Độ Học Tập &amp; Sơ Đồ Khắc Phục Lỗi Sai
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Biểu đồ trực quan ghi lại sự trưởng thành trong tư duy và tốc độ khắc phục các bẫy đề thi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {totalExams > 0 && (
            <button
              onClick={handleClear}
              className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors text-xs flex items-center gap-1"
              title="Xóa lịch sử thi"
            >
              <Trash2 className="w-4 h-4" />
              <span className="hidden sm:inline">Đặt lại dữ liệu</span>
            </button>
          )}

          <button
            onClick={onOpenExamCreator}
            className="flex items-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Làm đề kiểm tra mới</span>
          </button>
        </div>
      </div>

      {/* 1. Four KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Bài thi đã làm</span>
            <BarChart2 className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {totalExams}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {totalQuestionsDone} câu hỏi trắc nghiệm
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Điểm trung bình</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {avgScore.toFixed(1)}
            <span className="text-sm font-normal text-slate-400">/10</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Tỉ lệ chính xác: {accuracyRate}%
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Bài SGK hoàn thành</span>
            <BookOpen className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">
            {completedLessons.length} / {totalLessonsInCurriculum}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            {Math.round((completedLessons.length / totalLessonsInCurriculum) * 100)}% chương trình
          </p>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-semibold">Lỗi sai tích lũy</span>
            <CheckCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-rose-600">
            {totalCumulativeErrors}
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
            Trên 7 nhóm sai lầm
          </p>
        </div>
      </div>

      {/* 2. Visual Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Score Progression History Bar Chart */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                BIỂU ĐỒ DIỄN BIẾN
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Lịch Sử Điểm Số Các Lần Thi
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              {history.length} lần thi gần nhất
            </span>
          </div>

          {history.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center mx-auto text-slate-400">
                <BarChart2 className="w-6 h-6" />
              </div>
              <p className="text-xs text-slate-500">
                Chưa có dữ liệu bài thi. Hãy làm bài thi đầu tiên để theo dõi biểu đồ điểm số!
              </p>
              <button
                onClick={onOpenExamCreator}
                className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold shadow-xs"
              >
                Bắt đầu làm bài thi
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Interactive Bar Chart Representation */}
              <div className="h-48 flex items-end justify-between gap-2 pt-6 px-2 border-b border-slate-200">
                {history.slice(0, 10).reverse().map((exam, idx) => {
                  const barHeight = Math.max(8, (exam.score / 10) * 100);
                  const isHighScore = exam.score >= 8.0;

                  return (
                    <div key={exam.id} className="flex-1 flex flex-col items-center gap-1 group relative">
                      {/* Tooltip on hover */}
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-slate-900 text-white text-[10px] py-1 px-2 rounded whitespace-nowrap z-20 pointer-events-none">
                        {exam.score.toFixed(1)} đ ({exam.correctCount}/{exam.totalQuestions})
                      </div>

                      <span className="text-[10px] font-bold text-slate-600">
                        {exam.score.toFixed(1)}
                      </span>

                      <div
                        className={`w-full max-w-[32px] rounded-t-lg transition-all duration-500 ${
                          isHighScore ? 'bg-sky-600 group-hover:bg-sky-700' : 'bg-slate-400 group-hover:bg-slate-500'
                        }`}
                        style={{ height: `${barHeight}%` }}
                      />

                      <span className="text-[9px] text-slate-400 mt-1 font-mono">
                        #{idx + 1}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <span>← Bài thi cũ nhất</span>
                <span>Bài thi mới nhất →</span>
              </div>
            </div>
          )}
        </div>

        {/* Right: Cumulative Error Distribution Radar / Bar Breakdown */}
        <div className="lg:col-span-6 bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                ĐIỂM NÓNG SAI LẦM
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Phân Bố 7 Nhóm Lỗi Sai Tích Lũy
              </h3>
            </div>
            <span className="text-xs text-slate-500">
              Tổng {totalCumulativeErrors} lỗi
            </span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {errorCodes.map(code => {
              const count = errorTotals[code];
              const category = ERROR_CATEGORIES[code];
              const percent = totalCumulativeErrors > 0 ? Math.round((count / totalCumulativeErrors) * 100) : 0;

              return (
                <div key={code} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span
                        className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px]"
                        style={{ backgroundColor: `${category.color}20`, color: category.color }}
                      >
                        {category.code}
                      </span>
                      <span className="font-semibold text-slate-800">
                        {category.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-slate-900">
                        {count} ({percent}%)
                      </span>
                      {count > 0 && (
                        <button
                          onClick={() => onDrillError(code)}
                          className="text-[10px] text-sky-600 hover:text-sky-800 font-bold underline"
                        >
                          Trị bẫy
                        </button>
                      )}
                    </div>
                  </div>

                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: category.color
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3. Detailed Exam History Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Nhật Ký Các Bài Thi Đã Hoàn Thành
            </h3>
            <p className="text-xs text-slate-500">
              Nhấp vào bài thi để mở lại sơ đồ phân tích lỗi sai và lộ trình cải thiện chi tiết.
            </p>
          </div>
        </div>

        {history.length === 0 ? (
          <div className="py-8 text-center text-xs text-slate-500">
            Chưa có bài thi nào được ghi nhận.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 text-slate-500">
                  <th className="pb-3 font-semibold">Tên bài thi</th>
                  <th className="pb-3 font-semibold">Điểm số</th>
                  <th className="pb-3 font-semibold">Số câu đúng</th>
                  <th className="pb-3 font-semibold">Thời gian</th>
                  <th className="pb-3 font-semibold">Nhóm lỗi chính</th>
                  <th className="pb-3 text-right font-semibold">Hành động</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {history.map((exam) => (
                  <tr key={exam.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 font-medium text-slate-900 max-w-xs truncate">
                      {exam.examTitle}
                    </td>
                    <td className="py-3.5 font-bold text-sky-600">
                      {exam.score.toFixed(1)} / 10
                    </td>
                    <td className="py-3.5 text-slate-700">
                      {exam.correctCount} / {exam.totalQuestions}
                    </td>
                    <td className="py-3.5 text-slate-500 font-mono flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{Math.floor(exam.timeSpentSeconds / 60)}m {exam.timeSpentSeconds % 60}s</span>
                    </td>
                    <td className="py-3.5">
                      {exam.feedback.dominantErrorCode ? (
                        <span className="font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          {exam.feedback.dominantErrorCode}
                        </span>
                      ) : (
                        <span className="text-emerald-700 font-medium">Hoàn hảo</span>
                      )}
                    </td>
                    <td className="py-3.5 text-right">
                      <button
                        onClick={() => onReviewExam(exam)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <span>Xem sơ đồ</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
