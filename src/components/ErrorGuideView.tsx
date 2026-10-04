import React, { useState } from 'react';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { ErrorCode } from '../types/math';
import { AlertCircle, CheckCircle2, XCircle, ShieldCheck, Play, ArrowRight } from 'lucide-react';

interface ErrorGuideViewProps {
  initialErrorCode?: ErrorCode;
  onDrillErrorExam: (errorCode: ErrorCode) => void;
}

export const ErrorGuideView: React.FC<ErrorGuideViewProps> = ({
  initialErrorCode = 'KT',
  onDrillErrorExam
}) => {
  const [selectedCode, setSelectedCode] = useState<ErrorCode>(initialErrorCode);
  const activeError = ERROR_CATEGORIES[selectedCode];

  const errorCodes: ErrorCode[] = ['KT', 'TT', 'PP', 'DG', 'SU', 'QT', 'MH'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-8 text-white mb-8 shadow-sm bg-slate-900 flex items-center">
        <img
          src="/src/assets/images/math12_study_compass_1791117243875.jpg"
          alt="Toán 12 Study Compass"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-25"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-transparent" />
        <div className="relative z-10 max-w-3xl">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
            CẨM NANG SƯ PHẠM ĐỘT PHÁ
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mt-1">
            Phân Tích 7 Nhóm Lỗi Sai Kinh Điển Môn Toán 12
          </h1>
          <p className="mt-2 text-sm text-slate-300 leading-relaxed">
            Học từ sai lầm là con đường nhanh nhất để tiến bộ. Khi nắm chắc nguồn gốc của từng loại bẫy đề thi, bạn sẽ hình thành phản xạ tự nhiên để né tránh và đạt điểm số tối đa.
          </p>
        </div>
      </div>

      {/* Segmented Selector for the 7 Groups */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 mb-8">
        {errorCodes.map((code) => {
          const item = ERROR_CATEGORIES[code];
          const isSelected = code === selectedCode;

          return (
            <button
              key={code}
              onClick={() => setSelectedCode(code)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-white border-slate-900 shadow-sm ring-1 ring-slate-900'
                  : 'bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className="w-7 h-7 rounded flex items-center justify-center font-bold text-xs"
                  style={{ backgroundColor: `${item.color}15`, color: item.color }}
                >
                  {item.code}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">
                  G{item.groupNumber}
                </span>
              </div>
              <h4 className="text-xs font-bold text-slate-900 truncate">
                {item.shortName}
              </h4>
              <p className="text-[10px] text-slate-500 truncate mt-0.5">
                {item.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Main Error Detail Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs space-y-8">
        {/* Header of Active Group */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
          <div className="flex items-start gap-3">
            <span
              className="w-12 h-12 rounded-xl flex items-center justify-center font-extrabold text-lg shrink-0 mt-0.5"
              style={{ backgroundColor: `${activeError.color}20`, color: activeError.color }}
            >
              {activeError.code}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  Nhóm {activeError.groupNumber} trong 7 nhóm lỗi
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900">
                {activeError.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                {activeError.description}
              </p>
            </div>
          </div>

          <button
            onClick={() => onDrillErrorExam(activeError.code)}
            className="flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors shrink-0 whitespace-nowrap"
          >
            <Play className="w-4 h-4 fill-current" />
            <span>Luyện ngay đề bài tập nhóm {activeError.code}</span>
          </button>
        </div>

        {/* Symptoms Section */}
        <div className="space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-500" />
            Biểu hiện đặc trưng &amp; Dấu hiệu nhận biết
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
            {activeError.coreSymptoms.map((symptom, sIdx) => (
              <div
                key={sIdx}
                className="p-3 bg-slate-50 rounded-xl border border-slate-200/80 flex items-start gap-2.5 text-xs text-slate-700"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{symptom}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Classic Real Exam Examples */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <XCircle className="w-4 h-4 text-rose-500" />
            Ví dụ kinh điển trong đề thi: Đối chiếu Lời giải Sai vs Lời giải Chuẩn
          </h3>

          <div className="space-y-6">
            {activeError.classicExamples.map((ex, exIdx) => (
              <div key={exIdx} className="bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden">
                <div className="px-5 py-3 bg-slate-100/80 border-b border-slate-200 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800">{ex.title}</span>
                  <span className="text-[11px] text-slate-500">Ví dụ {exIdx + 1}</span>
                </div>

                <div className="p-5 space-y-4">
                  <div className="p-3 bg-white border border-slate-200 rounded-xl text-xs font-medium text-slate-900 math-formula">
                    {ex.problem}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Wrong column */}
                    <div className="p-4 bg-rose-50/70 border border-rose-200 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-rose-800">
                        <XCircle className="w-4 h-4 text-rose-600" />
                        <span>Lời giải sai thường gặp:</span>
                      </div>
                      <p className="text-xs text-rose-950 font-medium">{ex.wrongAnswer}</p>
                      <div className="text-[11px] text-rose-800/90 bg-white/80 p-2 rounded border border-rose-100">
                        <strong>Nguyên nhân mắc lỗi: </strong>{ex.wrongAnalysis}
                      </div>
                    </div>

                    {/* Correct column */}
                    <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Lời giải chuẩn &amp; Kết quả đúng:</span>
                      </div>
                      <p className="text-xs text-emerald-950 font-medium">{ex.correctAnswer}</p>
                      <div className="text-[11px] text-emerald-900/90 bg-white/80 p-2 rounded border border-emerald-100">
                        {ex.correctSolution}
                      </div>
                    </div>
                  </div>

                  {/* Prevention Mantra */}
                  <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                    <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-amber-950">Bí quyết phòng tránh: </span>
                      {ex.preventionRule}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Self-Audit Checklist */}
        <div className="p-5 bg-sky-50/60 border border-sky-200 rounded-2xl space-y-3">
          <h3 className="text-xs font-bold text-sky-900 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-sky-600" />
            Bảng kiểm tra tự rà soát (Checklist phòng chống lỗi {activeError.code})
          </h3>
          <p className="text-xs text-sky-800">
            Trước khi chọn đáp án, hãy tự hỏi bản thân các câu sau để chắc chắn không bị dính bẫy:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
            {activeError.checklist.map((item, cIdx) => (
              <div key={cIdx} className="p-2.5 bg-white border border-sky-100 rounded-lg flex items-center gap-2 text-xs text-slate-800">
                <span className="w-4 h-4 rounded-full bg-sky-100 text-sky-700 flex items-center justify-center font-bold text-[10px] shrink-0">
                  {cIdx + 1}
                </span>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Next Group Trigger */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              const currentIdx = errorCodes.indexOf(selectedCode);
              const prevIdx = currentIdx > 0 ? currentIdx - 1 : errorCodes.length - 1;
              setSelectedCode(errorCodes[prevIdx]);
              window.scrollTo({ top: 150, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            ← Nhóm trước
          </button>

          <button
            onClick={() => onDrillErrorExam(activeError.code)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Tạo bài thi 10 câu chuyên nhóm {activeError.code}
          </button>

          <button
            onClick={() => {
              const currentIdx = errorCodes.indexOf(selectedCode);
              const nextIdx = currentIdx < errorCodes.length - 1 ? currentIdx + 1 : 0;
              setSelectedCode(errorCodes[nextIdx]);
              window.scrollTo({ top: 150, behavior: 'smooth' });
            }}
            className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center gap-1"
          >
            <span>Nhóm kế tiếp</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
