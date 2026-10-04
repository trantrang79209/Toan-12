import React, { useState } from 'react';
import { X, BookOpen, Target, CheckCircle2, ChevronRight, Zap } from 'lucide-react';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { ErrorCode } from '../types/math';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: () => void;
  onGoToTextbook: () => void;
  onGoToErrors: () => void;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
  onGoToTextbook,
  onGoToErrors
}) => {
  const [activeStep, setActiveStep] = useState<number>(0);

  if (!isOpen) return null;

  const steps = [
    {
      title: 'Chào mừng bạn đến với Toán 12 Master',
      subtitle: 'Nền tảng học tập & khắc phục 7 nhóm lỗi sai kinh điển môn Toán lớp 12',
      content: (
        <div className="space-y-4">
          <p className="text-slate-600 leading-relaxed">
            Hầu hết học sinh lớp 12 mất điểm trong các kỳ thi tốt nghiệp THPT và ĐGNL không phải vì không biết làm, mà do <span className="font-semibold text-slate-800">mắc phải các bẫy tâm lý và lỗi sai kinh điển</span>.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3.5 bg-sky-50 border border-sky-100 rounded-xl">
              <div className="text-sky-700 font-bold text-sm mb-1 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4" /> 1. Chuẩn hóa lý thuyết
              </div>
              <p className="text-xs text-slate-600">
                Sách giáo khoa điện tử Toán 12 tích hợp cảnh báo bẫy thi ngay trong bài học.
              </p>
            </div>
            <div className="p-3.5 bg-amber-50 border border-amber-100 rounded-xl">
              <div className="text-amber-700 font-bold text-sm mb-1 flex items-center gap-1.5">
                <Target className="w-4 h-4" /> 2. Nhận diện 7 nhóm lỗi
              </div>
              <p className="text-xs text-slate-600">
                Phân tích tận gốc căn nguyên sai lầm kèm thần chú và bảng kiểm tra (checklist).
              </p>
            </div>
            <div className="p-3.5 bg-emerald-50 border border-emerald-100 rounded-xl">
              <div className="text-emerald-700 font-bold text-sm mb-1 flex items-center gap-1.5">
                <Zap className="w-4 h-4" /> 3. Chẩn đoán &amp; Lộ trình
              </div>
              <p className="text-xs text-slate-600">
                Sơ đồ đánh giá tự động sau mỗi bài thi và lộ trình khắc phục 3 bước cá nhân hóa.
              </p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Hệ thống 7 Nhóm Lỗi Sai Kinh Điển',
      subtitle: 'Mỗi phương án trắc nghiệm sai đều được mã hóa theo nguồn gốc sai lầm',
      content: (
        <div className="space-y-3">
          <p className="text-xs text-slate-500">
            Khi làm bài thi, nếu bạn chọn sai phương án, hệ thống sẽ phân tích chính xác bạn vướng vào nhóm lỗi nào:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
            {(Object.keys(ERROR_CATEGORIES) as ErrorCode[]).map(code => {
              const item = ERROR_CATEGORIES[code];
              return (
                <div
                  key={code}
                  className="p-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 transition-colors flex items-start gap-2.5"
                >
                  <span
                    className="w-7 h-7 shrink-0 rounded flex items-center justify-center font-bold text-xs"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    {item.code}
                  </span>
                  <div>
                    <h4 className="text-xs font-semibold text-slate-800">{item.name}</h4>
                    <p className="text-[11px] text-slate-500 line-clamp-1">{item.tagline}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )
    },
    {
      title: 'Quy trình 4 Bước Luyện Tập Đột Phá',
      subtitle: 'Cách sử dụng trang web để nâng cao điểm số từ 7+ lên 9+ môn Toán',
      content: (
        <div className="space-y-3">
          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              1
            </span>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Đọc bài học Sách giáo khoa</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Vào tab <span className="font-medium text-slate-700">Sách giáo khoa</span> để ôn lại định lý, xem các ví dụ mẫu và đặc biệt là đọc kỹ mục <span className="text-rose-600 font-medium">Cảnh báo bẫy kinh điển</span>.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              2
            </span>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Tự tạo bài thi theo nhu cầu</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Bấm nút <span className="font-medium text-sky-700">Tạo bài thi</span>: chọn số câu (10–20 câu), chế độ <span className="font-medium">Ngẫu nhiên</span> hoặc chế độ <span className="font-medium text-amber-700">Tự chọn nhóm lỗi sai</span> để trị dứt điểm các lỗi hay mắc.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              3
            </span>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Xem Sơ đồ đánh giá &amp; Lộ trình khắc phục</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Sau khi nộp bài, hệ thống hiển thị trực quan tỷ lệ mắc lỗi theo 7 nhóm, phát hiện &quot;điểm huyệt&quot; bị mất điểm và đưa ra kế hoạch 3 bước hành động cụ thể.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
            <span className="w-6 h-6 rounded-full bg-sky-600 text-white flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
              4
            </span>
            <div>
              <h4 className="text-sm font-semibold text-slate-800">Theo dõi tiến độ tích lũy</h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Vào tab <span className="font-medium text-slate-700">Tiến độ &amp; Sơ đồ</span> để quan sát biểu đồ điểm số theo thời gian và tỷ lệ khắc phục thành công từng nhóm lỗi.
              </p>
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div>
            <span className="text-xs font-semibold text-sky-600 tracking-wider">
              HƯỚNG DẪN SỬ DỤNG
            </span>
            <h3 className="text-lg font-bold text-slate-900">{steps[activeStep].title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-5 overflow-y-auto flex-1">
          <p className="text-xs text-slate-500 mb-4">{steps[activeStep].subtitle}</p>
          {steps[activeStep].content}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          {/* Step indicators */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                className={`h-2 rounded-full transition-all ${
                  idx === activeStep ? 'w-6 bg-sky-600' : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            {activeStep < steps.length - 1 ? (
              <button
                onClick={() => setActiveStep(prev => prev + 1)}
                className="flex items-center gap-1 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors"
              >
                <span>Tiếp tục</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    onClose();
                    onGoToTextbook();
                  }}
                  className="px-3 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
                >
                  Mở Sách GK
                </button>
                <button
                  onClick={() => {
                    onClose();
                    onStartExam();
                  }}
                  className="flex items-center gap-1 px-4 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg transition-colors shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Bắt đầu luyện tập</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
