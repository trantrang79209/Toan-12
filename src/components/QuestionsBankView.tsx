import React, { useState } from 'react';
import { QUESTIONS_BANK } from '../data/questionsData';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { DifficultyLevel, ErrorCode } from '../types/math';
import { Search, Filter, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';

interface QuestionsBankViewProps {
  onStartCustomExam: (selectedLessonId?: string, targetErrorCode?: ErrorCode) => void;
}

export const QuestionsBankView: React.FC<QuestionsBankViewProps> = ({
  onStartCustomExam
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedChapter, setSelectedChapter] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedError, setSelectedError] = useState<string>('all');
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const filteredQuestions = QUESTIONS_BANK.filter(q => {
    if (selectedChapter !== 'all' && q.chapterId !== selectedChapter) return false;
    if (selectedDifficulty !== 'all' && q.difficulty !== selectedDifficulty) return false;
    if (selectedError !== 'all' && q.primaryErrorTrap !== selectedError) return false;
    if (searchQuery.trim() !== '') {
      const qLower = searchQuery.toLowerCase();
      const matchContent = q.content.toLowerCase().includes(qLower);
      const matchExplanation = q.explanation.toLowerCase().includes(qLower);
      if (!matchContent && !matchExplanation) return false;
    }
    return true;
  });

  const toggleExpand = (id: string) => {
    setExpandedQuestionId(prev => (prev === id ? null : id));
  };

  const getDifficultyBadge = (diff: DifficultyLevel) => {
    switch (diff) {
      case 'NB':
        return { label: 'Nhận biết', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
      case 'TH':
        return { label: 'Thông hiểu', color: 'text-sky-700 bg-sky-50 border-sky-200' };
      case 'VD':
        return { label: 'Vận dụng', color: 'text-amber-700 bg-amber-50 border-amber-200' };
      case 'VDC':
        return { label: 'Vận dụng cao', color: 'text-rose-700 bg-rose-50 border-rose-200' };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            KHO DỮ LIỆU ĐỀ THI
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Ngân Hàng Câu Hỏi Gắn Nhãn 7 Nhóm Lỗi
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 mt-1">
            Mỗi phương án nhiễu đều được giải mã chi tiết tại sao học sinh dễ nhầm lẫn.
          </p>
        </div>

        <button
          onClick={() => onStartCustomExam()}
          className="px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-xs transition-colors shrink-0"
        >
          Tạo bài thi từ kho câu hỏi
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl border border-slate-200 p-4 sm:p-5 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search box */}
          <div className="flex-1 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm nội dung câu hỏi, hàm số, phương trình..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
            />
          </div>

          {/* Chapter filter */}
          <div className="sm:w-64">
            <select
              value={selectedChapter}
              onChange={e => setSelectedChapter(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Tất cả chương học (Cả 2 tập)</option>
              <optgroup label="Học kỳ 1 (Tập 1)">
                {CHAPTERS_DATA.filter(c => c.semester === 1).map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title.split(':')[0]}
                  </option>
                ))}
              </optgroup>
              <optgroup label="Học kỳ 2 (Tập 2)">
                {CHAPTERS_DATA.filter(c => c.semester === 2).map(c => (
                  <option key={c.id} value={c.id}>
                    {c.title.split(':')[0]}
                  </option>
                ))}
              </optgroup>
            </select>
          </div>

          {/* Difficulty filter */}
          <div className="sm:w-44">
            <select
              value={selectedDifficulty}
              onChange={e => setSelectedDifficulty(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Mọi mức độ khó</option>
              <option value="NB">Nhận biết</option>
              <option value="TH">Thông hiểu</option>
              <option value="VD">Vận dụng</option>
              <option value="VDC">Vận dụng cao</option>
            </select>
          </div>

          {/* Error group filter */}
          <div className="sm:w-52">
            <select
              value={selectedError}
              onChange={e => setSelectedError(e.target.value)}
              className="w-full py-2 px-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
            >
              <option value="all">Tất cả 7 nhóm lỗi</option>
              {Object.keys(ERROR_CATEGORIES).map(code => (
                <option key={code} value={code}>
                  {ERROR_CATEGORIES[code as ErrorCode].name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center justify-between text-xs text-slate-500 pt-1 border-t border-slate-100">
          <span>Tìm thấy <strong className="text-slate-800">{filteredQuestions.length}</strong> câu hỏi phù hợp</span>
          {(selectedChapter !== 'all' || selectedDifficulty !== 'all' || selectedError !== 'all' || searchQuery !== '') && (
            <button
              onClick={() => {
                setSelectedChapter('all');
                setSelectedDifficulty('all');
                setSelectedError('all');
                setSearchQuery('');
              }}
              className="text-sky-600 hover:text-sky-800 font-semibold underline"
            >
              Xóa tất cả bộ lọc
            </button>
          )}
        </div>
      </div>

      {/* Questions list */}
      <div className="space-y-4">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center text-xs text-slate-500">
            Không tìm thấy câu hỏi nào phù hợp với bộ lọc hiện tại.
          </div>
        ) : (
          filteredQuestions.map((q, idx) => {
            const isExpanded = expandedQuestionId === q.id;
            const diffInfo = getDifficultyBadge(q.difficulty);
            const errCategory = ERROR_CATEGORIES[q.primaryErrorTrap];

            return (
              <div
                key={q.id}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-3 hover:border-slate-300 transition-all"
              >
                {/* Header */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">
                      Câu {idx + 1}
                    </span>
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${diffInfo.color}`}>
                      {diffInfo.label}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                      {q.lessonId}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span
                      className="text-[11px] font-bold px-2 py-0.5 rounded border"
                      style={{
                        backgroundColor: `${errCategory.color}15`,
                        color: errCategory.color,
                        borderColor: `${errCategory.color}40`
                      }}
                    >
                      Bẫy: {errCategory.shortName} ({q.primaryErrorTrap})
                    </span>

                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                      title={isExpanded ? 'Thu gọn' : 'Xem giải mã chi tiết'}
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <p className="text-xs sm:text-sm font-medium text-slate-800 math-formula leading-relaxed">
                  {q.content}
                </p>

                {/* Options 4 boxes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {q.options.map(opt => (
                    <div
                      key={opt.id}
                      className={`p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-colors ${
                        opt.isCorrect
                          ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium'
                          : 'bg-slate-50/70 border-slate-200 text-slate-700'
                      }`}
                    >
                      <span className={`w-5 h-5 rounded flex items-center justify-center font-bold text-[10px] shrink-0 ${
                        opt.isCorrect
                          ? 'bg-emerald-600 text-white'
                          : 'bg-slate-200 text-slate-700'
                      }`}>
                        {opt.id}
                      </span>
                      <div className="flex-1 min-w-0">
                        <span className="math-formula">{opt.text}</span>
                        {opt.isCorrect && (
                          <span className="ml-2 text-[10px] font-bold text-emerald-700">
                            (Đáp án đúng)
                          </span>
                        )}
                        {!opt.isCorrect && opt.errorGroup && isExpanded && (
                          <div className="mt-1 text-[10px] text-rose-800 bg-rose-50 p-1.5 rounded border border-rose-100">
                            <strong>Bẫy {opt.errorGroup}: </strong>{opt.errorNote}
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expanded Details: Explanation & Prevention rule */}
                {isExpanded && (
                  <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1">
                      <span className="font-bold text-slate-800">Lời giải chi tiết:</span>
                      <p className="text-slate-700 leading-relaxed math-formula">
                        {q.explanation}
                      </p>
                    </div>

                    <div className="p-3 bg-amber-50/80 border border-amber-200 rounded-xl text-amber-900">
                      <span className="font-bold text-amber-950">✓ Thần chú phòng tránh bẫy: </span>
                      {q.recommendedTip}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
