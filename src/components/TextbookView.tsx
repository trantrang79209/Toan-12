import React, { useState } from 'react';
import { CHAPTERS_DATA } from '../data/chaptersData';
import { ERROR_CATEGORIES } from '../data/errorCategories';
import { Chapter, Lesson } from '../types/math';
import { BookOpen, Clock, AlertTriangle, CheckCircle, ArrowRight, Play, BookmarkCheck } from 'lucide-react';
import { getCompletedLessons, toggleLessonCompleted } from '../utils/storage';

interface TextbookViewProps {
  onStartLessonExam: (lessonId: string, lessonTitle: string) => void;
  onExploreErrorGroup: (errorCode: string) => void;
}

export const TextbookView: React.FC<TextbookViewProps> = ({
  onStartLessonExam,
  onExploreErrorGroup
}) => {
  const [selectedSemester, setSelectedSemester] = useState<1 | 2>(1);
  const [selectedChapterId, setSelectedChapterId] = useState<string>('chap-1');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('lesson-1-1');
  const [completedLessons, setCompletedLessons] = useState<string[]>(getCompletedLessons());

  // Chapters in active semester
  const semesterChapters = CHAPTERS_DATA.filter(c => c.semester === selectedSemester);

  const currentChapter = CHAPTERS_DATA.find(c => c.id === selectedChapterId) || semesterChapters[0] || CHAPTERS_DATA[0];
  const currentLesson = currentChapter.lessons.find(l => l.id === selectedLessonId) || currentChapter.lessons[0];

  const handleSelectSemester = (sem: 1 | 2) => {
    setSelectedSemester(sem);
    const firstChap = CHAPTERS_DATA.find(c => c.semester === sem);
    if (firstChap) {
      setSelectedChapterId(firstChap.id);
      setSelectedLessonId(firstChap.lessons[0].id);
    }
  };

  const handleToggleComplete = (lessonId: string) => {
    const updated = toggleLessonCompleted(lessonId);
    setCompletedLessons(updated);
  };

  const handleNextLesson = () => {
    const currentIdx = currentChapter.lessons.findIndex(l => l.id === currentLesson.id);
    if (currentIdx < currentChapter.lessons.length - 1) {
      setSelectedLessonId(currentChapter.lessons[currentIdx + 1].id);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const chapterIdx = CHAPTERS_DATA.findIndex(c => c.id === currentChapter.id);
      if (chapterIdx < CHAPTERS_DATA.length - 1) {
        const nextChapter = CHAPTERS_DATA[chapterIdx + 1];
        setSelectedSemester(nextChapter.semester);
        setSelectedChapterId(nextChapter.id);
        setSelectedLessonId(nextChapter.lessons[0].id);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Textbook Hero Visual Banner */}
      <div className="relative rounded-2xl overflow-hidden mb-6 border border-slate-200 bg-slate-900 shadow-sm min-h-[160px] sm:min-h-[180px] flex items-center">
        <img
          src="/src/assets/images/math12_textbook_banner_1791117229415.jpg"
          alt="Toán 12 Sách Giáo Khoa Điện Tử"
          referrerPolicy="no-referrer"
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/85 to-transparent" />
        <div className="relative z-10 px-6 sm:px-8 py-6 max-w-2xl text-white">
          <span className="text-xs font-bold text-sky-400 uppercase tracking-wider block mb-1">
            SÁCH GIÁO KHOA ĐIỆN TỬ TOÁN 12 · CHƯƠNG TRÌNH GDPT MỚI
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Toàn Diện 6 Chương Toán 12 (Tập 1 &amp; Tập 2)
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-300 line-clamp-2">
            Học chuẩn lý thuyết, định lý và ví dụ mẫu kết hợp cảnh báo 7 nhóm lỗi sai kinh điển và luyện tập trắc nghiệm trực tiếp.
          </p>
        </div>
      </div>

      {/* Semester Switcher (Tập 1 vs Tập 2) */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-1.5 p-1 bg-slate-200/80 rounded-xl w-fit">
          <button
            onClick={() => handleSelectSemester(1)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              selectedSemester === 1
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Học kỳ 1 (Tập 1)
          </button>
          <button
            onClick={() => handleSelectSemester(2)}
            className={`px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all ${
              selectedSemester === 2
                ? 'bg-white text-sky-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Học kỳ 2 (Tập 2)
          </button>
        </div>

        <div className="text-xs text-slate-500">
          Đang xem: <strong className="text-slate-800">{selectedSemester === 1 ? 'Tập 1 (Chương 1, 2, 3)' : 'Tập 2 (Chương 4, 5, 6)'}</strong>
        </div>
      </div>

      {/* Chapter Selection Tabs for Active Semester */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6">
        {semesterChapters.map((chapter: Chapter) => {
          const isSelected = chapter.id === selectedChapterId;
          return (
            <button
              key={chapter.id}
              onClick={() => {
                setSelectedChapterId(chapter.id);
                setSelectedLessonId(chapter.lessons[0].id);
              }}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap flex items-center gap-2 ${
                isSelected
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <span>{chapter.title.split(':')[0]}</span>
              <span className={`text-[11px] px-1.5 py-0.5 rounded font-normal ${isSelected ? 'bg-sky-700/60 text-sky-100' : 'bg-slate-100 text-slate-500'}`}>
                {chapter.lessons.length} bài
              </span>
            </button>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Sidebar: Lesson index like a book contents table */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-sky-600" />
                Mục lục chương {currentChapter.number}
              </h3>
              <span className="text-xs text-slate-500">
                {currentChapter.lessons.filter(l => completedLessons.includes(l.id)).length} / {currentChapter.lessons.length} đã học
              </span>
            </div>

            <div className="space-y-1.5">
              {currentChapter.lessons.map((lesson: Lesson) => {
                const isCurrent = lesson.id === currentLesson.id;
                const isCompleted = completedLessons.includes(lesson.id);

                return (
                  <button
                    key={lesson.id}
                    onClick={() => {
                      setSelectedLessonId(lesson.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`w-full text-left p-3 rounded-xl transition-all flex items-start gap-3 ${
                      isCurrent
                        ? 'bg-sky-50 border border-sky-200 text-sky-900'
                        : 'hover:bg-slate-50 border border-transparent text-slate-700'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isCompleted ? (
                        <CheckCircle className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center text-[10px] ${
                          isCurrent ? 'border-sky-500 text-sky-600 font-bold' : 'border-slate-300 text-slate-400'
                        }`}>
                          {lesson.order}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className={`text-xs font-semibold block truncate ${isCurrent ? 'text-sky-950 font-bold' : 'text-slate-800'}`}>
                        {lesson.title}
                      </span>
                      <p className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                        {lesson.summary}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Quick Practice Trigger from Sidebar */}
            <div className="mt-5 pt-4 border-t border-slate-100">
              <button
                onClick={() => onStartLessonExam(currentLesson.id, currentLesson.title)}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-semibold shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Làm câu hỏi trắc nghiệm bài này</span>
              </button>
            </div>
          </div>

          {/* Textbook Companion Banner */}
          <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4.5">
            <h4 className="text-xs font-bold text-amber-900 flex items-center gap-1.5 mb-1.5">
              <BookmarkCheck className="w-4 h-4 text-amber-600" />
              Sách giáo khoa Toán 12 Chuẩn Mới
            </h4>
            <p className="text-xs text-amber-800/90 leading-relaxed">
              Biên soạn theo chương trình GDPT mới gồm 6 chương: Ứng dụng đạo hàm, Vectơ &amp; Oxyz, Thống kê ghép nhóm, Nguyên hàm tích phân, Hình học Oxyz và Xác suất có điều kiện.
            </p>
          </div>
        </div>

        {/* Right Main Column: Digital Textbook Book Page */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          {/* Header of Lesson */}
          <div className="border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center justify-between gap-2 text-xs text-slate-500 mb-2">
              <div className="flex items-center gap-2">
                <span>{currentChapter.semesterLabel}</span>
                <span>/</span>
                <span>{currentChapter.title.split(':')[0]}</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5" />
                <span>{currentLesson.readingTime}</span>
              </div>
            </div>

            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              {currentLesson.title}
            </h1>

            <p className="mt-2 text-sm text-slate-600 leading-relaxed bg-slate-50 border-l-3 border-sky-500 p-3 rounded-r-lg">
              {currentLesson.summary}
            </p>
          </div>

          {/* Lesson Content Sections */}
          <div className="space-y-8">
            {currentLesson.sections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-4">
                <h2 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-sky-600" />
                  {section.heading}
                </h2>

                <div className="space-y-2.5 text-sm text-slate-700 leading-relaxed">
                  {section.content.map((paragraph, pIdx) => (
                    <p key={pIdx}>{paragraph}</p>
                  ))}
                </div>

                {section.keyPoints && (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5">
                    <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Điểm cốt lõi cần nhớ:
                    </span>
                    <ul className="list-disc list-inside space-y-1 text-xs text-slate-600">
                      {section.keyPoints.map((point, kIdx) => (
                        <li key={kIdx} className="leading-relaxed">{point}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Classic Trap Callout */}
                {section.classicTrap && (
                  <div className="p-4.5 bg-rose-50/80 border border-rose-200 rounded-xl space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-rose-800 font-bold text-xs">
                        <AlertTriangle className="w-4 h-4 text-rose-600" />
                        <span>CẢNH BÁO BẪY KINH ĐIỂN: {section.classicTrap.trapName}</span>
                      </div>
                      <button
                        onClick={() => onExploreErrorGroup(section.classicTrap!.errorCode)}
                        className="text-[11px] font-semibold text-rose-700 hover:text-rose-900 underline flex items-center gap-1"
                      >
                        Thuộc {ERROR_CATEGORIES[section.classicTrap.errorCode]?.shortName} ({section.classicTrap.errorCode})
                      </button>
                    </div>

                    <p className="text-xs text-rose-900/90 leading-relaxed">
                      <span className="font-semibold text-rose-950">Nguy cơ sai sót: </span>
                      {section.classicTrap.warning}
                    </p>

                    <div className="bg-white/90 p-2.5 rounded-lg border border-rose-100 text-xs text-slate-800">
                      <span className="font-semibold text-emerald-700">✓ Thần chú phòng tránh: </span>
                      {section.classicTrap.tip}
                    </div>
                  </div>
                )}

                {/* Examples */}
                {section.examples && (
                  <div className="space-y-3 pt-2">
                    {section.examples.map((ex, exIdx) => (
                      <div key={exIdx} className="bg-slate-50/80 border border-slate-200 rounded-xl p-4.5 space-y-3">
                        <span className="text-xs font-bold text-slate-900">
                          {ex.title}
                        </span>
                        <div className="text-xs font-medium text-slate-800 p-2.5 bg-white border border-slate-200 rounded-lg math-formula">
                          {ex.question}
                        </div>
                        <div className="space-y-1.5 text-xs text-slate-700 pl-1">
                          <span className="font-semibold text-sky-800">Lời giải chi tiết:</span>
                          {ex.solutionSteps.map((step, stepIdx) => (
                            <div key={stepIdx} className="flex items-start gap-2">
                              <span className="text-slate-400 font-mono">·</span>
                              <span>{step}</span>
                            </div>
                          ))}
                        </div>
                        {ex.note && (
                          <div className="text-[11px] text-amber-800 bg-amber-50 p-2 rounded border border-amber-200">
                            <strong>Lưu ý: </strong>{ex.note}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Lesson Footer Controls */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => handleToggleComplete(currentLesson.id)}
              className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl border transition-colors ${
                completedLessons.includes(currentLesson.id)
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-300'
                  : 'bg-white text-slate-700 border-slate-300 hover:bg-slate-50'
              }`}
            >
              <CheckCircle className={`w-4 h-4 ${completedLessons.includes(currentLesson.id) ? 'text-emerald-600' : 'text-slate-400'}`} />
              <span>{completedLessons.includes(currentLesson.id) ? 'Đã hoàn thành bài học' : 'Đánh dấu đã học'}</span>
            </button>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => onStartLessonExam(currentLesson.id, currentLesson.title)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>Làm câu hỏi trắc nghiệm</span>
              </button>

              <button
                onClick={handleNextLesson}
                className="flex items-center gap-1.5 px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-semibold transition-colors"
              >
                <span>Bài tiếp</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
