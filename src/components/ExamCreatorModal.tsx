import React, { useState } from 'react';
import { X, Layers, Target, Clock, Shuffle, Play, Check } from 'lucide-react';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { QUESTIONS_BANK } from '../data/questionsData';
import { ErrorCode, ExamConfig } from '../types/math';

interface ExamCreatorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExam: (config: ExamConfig) => void;
  initialErrorCode?: ErrorCode;
  initialLessonId?: string;
}

export const ExamCreatorModal: React.FC<ExamCreatorModalProps> = ({
  isOpen,
  onClose,
  onStartExam,
  initialErrorCode,
  initialLessonId
}) => {
  // Default to 'chapter_custom' (user request: chọn bài và lỗi sai để ôn tập trong 1 chương)
  const [mode, setMode] = useState<'chapter_custom' | 'random' | 'error_targeted'>(
    initialErrorCode ? 'error_targeted' : 'chapter_custom'
  );

  // Chapter custom state
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap-1');
  const activeChapter = CHAPTERS_DATA.find(c => c.id === selectedChapterId) || CHAPTERS_DATA[0];

  // Lessons inside the selected chapter (multi-select)
  const [selectedLessonIds, setSelectedLessonIds] = useState<string[]>(
    initialLessonId ? [initialLessonId] : activeChapter.lessons.map(l => l.id)
  );

  // Error groups (multi-select)
  const [selectedErrorGroups, setSelectedErrorGroups] = useState<ErrorCode[]>(
    initialErrorCode ? [initialErrorCode] : ['KT', 'TT', 'PP', 'DG', 'SU', 'QT', 'MH']
  );

  const [totalQuestions, setTotalQuestions] = useState<number>(10);
  const [durationMinutes, setDurationMinutes] = useState<number>(20);

  if (!isOpen) return null;

  const errorCodes: ErrorCode[] = ['KT', 'TT', 'PP', 'DG', 'SU', 'QT', 'MH'];

  const handleSelectChapter = (chapId: string) => {
    setSelectedChapterId(chapId);
    const chap = CHAPTERS_DATA.find(c => c.id === chapId);
    if (chap) {
      setSelectedLessonIds(chap.lessons.map(l => l.id)); // select all by default
    }
  };

  const toggleLesson = (lessonId: string) => {
    if (selectedLessonIds.includes(lessonId)) {
      if (selectedLessonIds.length > 1) {
        setSelectedLessonIds(selectedLessonIds.filter(id => id !== lessonId));
      }
    } else {
      setSelectedLessonIds([...selectedLessonIds, lessonId]);
    }
  };

  const toggleAllLessons = () => {
    if (selectedLessonIds.length === activeChapter.lessons.length) {
      setSelectedLessonIds([activeChapter.lessons[0].id]);
    } else {
      setSelectedLessonIds(activeChapter.lessons.map(l => l.id));
    }
  };

  const toggleErrorCode = (code: ErrorCode) => {
    if (selectedErrorGroups.includes(code)) {
      if (selectedErrorGroups.length > 1) {
        setSelectedErrorGroups(selectedErrorGroups.filter(c => c !== code));
      }
    } else {
      setSelectedErrorGroups([...selectedErrorGroups, code]);
    }
  };

  const toggleAllErrors = () => {
    if (selectedErrorGroups.length === errorCodes.length) {
      setSelectedErrorGroups(['KT']);
    } else {
      setSelectedErrorGroups([...errorCodes]);
    }
  };

  // Calculate matching question count
  const matchingQuestions = QUESTIONS_BANK.filter(q => {
    if (mode === 'chapter_custom') {
      const matchChapter = q.chapterId === selectedChapterId;
      const matchLesson = selectedLessonIds.includes(q.lessonId);
      const matchError = selectedErrorGroups.includes(q.primaryErrorTrap);
      return matchChapter && matchLesson && matchError;
    }
    if (mode === 'error_targeted') {
      return selectedErrorGroups.includes(q.primaryErrorTrap);
    }
    return true;
  });

  const handleStart = () => {
    let title = 'Bài thi môn Toán 12';
    if (mode === 'chapter_custom') {
      title = `${activeChapter.title.split(':')[0]} (${selectedLessonIds.length} bài, ${selectedErrorGroups.length} nhóm lỗi)`;
    } else if (mode === 'error_targeted') {
      title = `Luyện chuyên đề bẫy lỗi [${selectedErrorGroups.join(', ')}] (${totalQuestions} câu)`;
    } else {
      title = `Đề luyện tập ngẫu nhiên Toán 12 (${totalQuestions} câu)`;
    }

    const config: ExamConfig = {
      id: `exam-${Date.now()}`,
      title,
      totalQuestions,
      durationMinutes,
      mode,
      selectedChapterId: mode === 'chapter_custom' ? selectedChapterId : undefined,
      selectedLessonIds: mode === 'chapter_custom' ? selectedLessonIds : undefined,
      targetErrorGroups: selectedErrorGroups
    };

    onStartExam(config);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <span className="text-xs font-semibold text-sky-600 tracking-wider">
              BỘ TẠO ĐỀ THI THÔNG MINH
            </span>
            <h3 className="text-lg font-bold text-slate-900">Tùy Chỉnh Bài Thi Theo Nhu Cầu</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5 overflow-y-auto space-y-6 flex-1">
          {/* Mode Selector */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Chế độ tạo đề
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setMode('chapter_custom')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'chapter_custom'
                    ? 'border-sky-600 bg-sky-50 text-sky-950 ring-1 ring-sky-600 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                  <Layers className="w-3.5 h-3.5 text-sky-600" />
                  <span>Trong 1 Chương</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Chọn chương, chọn từng bài và nhóm lỗi cụ thể.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('error_targeted')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'error_targeted'
                    ? 'border-amber-600 bg-amber-50 text-amber-950 ring-1 ring-amber-600 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                  <Target className="w-3.5 h-3.5 text-amber-600" />
                  <span>Chuyên đề 7 nhóm lỗi</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Diệt trừ nhóm lỗi sai trên toàn bộ chương trình.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setMode('random')}
                className={`p-3 rounded-xl border text-left transition-all ${
                  mode === 'random'
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-950 ring-1 ring-emerald-600 shadow-xs'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center gap-1.5 font-bold text-xs mb-1">
                  <Shuffle className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Ngẫu nhiên toàn diện</span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Đề tổng hợp quét đều mọi dạng toán lớp 12.
                </p>
              </button>
            </div>
          </div>

          {/* Chapter Custom Controls */}
          {mode === 'chapter_custom' && (
            <div className="p-4 bg-sky-50/50 border border-sky-200 rounded-2xl space-y-4">
              {/* 1. Select Chapter */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-sky-950 flex items-center justify-between">
                  <span>1. Chọn chương học:</span>
                  <span className="text-[11px] font-normal text-sky-700">{activeChapter.semesterLabel}</span>
                </label>
                <select
                  value={selectedChapterId}
                  onChange={e => handleSelectChapter(e.target.value)}
                  className="w-full p-2.5 bg-white border border-slate-300 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                >
                  <optgroup label="Học kỳ 1 (Tập 1)">
                    {CHAPTERS_DATA.filter(c => c.semester === 1).map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </optgroup>
                  <optgroup label="Học kỳ 2 (Tập 2)">
                    {CHAPTERS_DATA.filter(c => c.semester === 2).map(c => (
                      <option key={c.id} value={c.id}>{c.title}</option>
                    ))}
                  </optgroup>
                </select>
              </div>

              {/* 2. Select Lessons in this Chapter */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-sky-950">
                    2. Chọn bài học trong {activeChapter.title.split(':')[0]}:
                  </label>
                  <button
                    type="button"
                    onClick={toggleAllLessons}
                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline"
                  >
                    {selectedLessonIds.length === activeChapter.lessons.length ? 'Bỏ chọn bớt' : 'Chọn tất cả bài'}
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeChapter.lessons.map(lesson => {
                    const isChecked = selectedLessonIds.includes(lesson.id);
                    return (
                      <button
                        type="button"
                        key={lesson.id}
                        onClick={() => toggleLesson(lesson.id)}
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                          isChecked
                            ? 'bg-white border-sky-600 text-sky-950 font-bold shadow-xs'
                            : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                        }`}
                      >
                        <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 mt-0.5 text-[10px] ${
                          isChecked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300'
                        }`}>
                          {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                        </span>
                        <div className="flex-1 min-w-0">
                          <span className="block truncate">{lesson.title}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 3. Select Error Groups to Drill within this Chapter */}
              <div className="space-y-2 pt-2 border-t border-sky-200/60">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-sky-950">
                    3. Chọn các nhóm lỗi sai muốn ôn luyện:
                  </label>
                  <button
                    type="button"
                    onClick={toggleAllErrors}
                    className="text-[11px] font-semibold text-sky-700 hover:text-sky-900 underline"
                  >
                    {selectedErrorGroups.length === errorCodes.length ? 'Bỏ chọn bớt' : 'Chọn tất cả 7 nhóm lỗi'}
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {errorCodes.map(code => {
                    const item = ERROR_CATEGORIES[code];
                    const isChecked = selectedErrorGroups.includes(code);
                    return (
                      <button
                        type="button"
                        key={code}
                        onClick={() => toggleErrorCode(code)}
                        className={`p-2 rounded-xl border text-left text-xs transition-all flex items-center gap-2 ${
                          isChecked
                            ? 'bg-white border-sky-600 text-sky-950 font-bold shadow-xs'
                            : 'bg-white/60 border-slate-200 text-slate-600 hover:bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0"
                          style={{ backgroundColor: `${item.color}20`, color: item.color }}
                        >
                          {item.code}
                        </span>
                        <span className="truncate text-[11px]">{item.shortName}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Error targeted mode selection */}
          {mode === 'error_targeted' && (
            <div className="p-4 bg-amber-50/50 border border-amber-200 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-950">
                  Chọn các nhóm lỗi sai muốn diệt trừ:
                </label>
                <button
                  type="button"
                  onClick={toggleAllErrors}
                  className="text-[11px] font-semibold text-amber-700 hover:text-amber-900 underline"
                >
                  {selectedErrorGroups.length === errorCodes.length ? 'Bỏ chọn bớt' : 'Chọn cả 7 nhóm'}
                </button>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {errorCodes.map(code => {
                  const item = ERROR_CATEGORIES[code];
                  const isChecked = selectedErrorGroups.includes(code);
                  return (
                    <button
                      type="button"
                      key={code}
                      onClick={() => toggleErrorCode(code)}
                      className={`p-2.5 rounded-xl border text-left text-xs transition-all flex items-center gap-2.5 ${
                        isChecked
                          ? 'bg-white border-amber-600 text-amber-950 font-bold shadow-xs'
                          : 'bg-white/70 border-slate-200 text-slate-600 hover:bg-white'
                      }`}
                    >
                      <span
                        className="w-6 h-6 rounded flex items-center justify-center font-bold text-xs"
                        style={{ backgroundColor: `${item.color}20`, color: item.color }}
                      >
                        {item.code}
                      </span>
                      <span className="truncate">{item.shortName}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Number of Questions (10 - 20 questions) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Số lượng câu hỏi (10 – 20 câu)
              </label>
              <span className="text-xs font-semibold text-sky-600">
                {totalQuestions} câu
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[10, 15, 20].map(qty => (
                <button
                  type="button"
                  key={qty}
                  onClick={() => setTotalQuestions(qty)}
                  className={`py-2 px-3 rounded-xl border text-xs font-semibold transition-all ${
                    totalQuestions === qty
                      ? 'bg-sky-600 text-white border-sky-600 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {qty} câu hỏi
                </button>
              ))}
            </div>
          </div>

          {/* Time Duration */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-500" />
                Thời gian làm bài
              </label>
              <span className="text-xs font-semibold text-slate-600">
                {durationMinutes === 0 ? 'Tự do (không giới hạn)' : `${durationMinutes} phút`}
              </span>
            </div>
            <div className="grid grid-cols-4 gap-2">
              {[
                { min: 15, label: '15 phút' },
                { min: 20, label: '20 phút' },
                { min: 30, label: '30 phút' },
                { min: 0, label: 'Tự do' }
              ].map(opt => (
                <button
                  type="button"
                  key={opt.min}
                  onClick={() => setDurationMinutes(opt.min)}
                  className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all ${
                    durationMinutes === opt.min
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="text-xs text-slate-500">
            Khả dụng: <strong className="text-slate-800">{matchingQuestions.length}</strong> câu thỏa mãn tiêu chí
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-700 hover:bg-slate-200 rounded-lg transition-colors"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleStart}
              className="flex items-center gap-1.5 px-5 py-2.5 text-xs sm:text-sm font-bold text-white bg-sky-600 hover:bg-sky-700 rounded-xl transition-colors shadow-sm"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Bắt đầu làm bài thi</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
