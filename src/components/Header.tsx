import React from 'react';
import { BookOpen, AlertTriangle, Layers, BarChart2, PlusCircle, HelpCircle } from 'lucide-react';

export type NavTab = 'textbook' | 'errors' | 'questions' | 'progress';

interface HeaderProps {
  currentTab: NavTab;
  onSelectTab: (tab: NavTab) => void;
  onOpenExamCreator: () => void;
  onOpenGuide: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  onOpenExamCreator,
  onOpenGuide
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => onSelectTab('textbook')}
          className="flex items-center gap-2.5 text-left focus:outline-none group"
        >
          <div className="w-9 h-9 rounded-lg bg-sky-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            ∫
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-sky-600 transition-colors">
              Toán 12 Master
            </span>
            <span className="hidden sm:inline-block text-xs text-slate-500 ml-2 font-normal">
              · Khắc Phục Lỗi Sai Kinh Điển
            </span>
          </div>
        </button>

        {/* Zone 2: 4-5 text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <button
            onClick={() => onSelectTab('textbook')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              currentTab === 'textbook'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Sách giáo khoa</span>
          </button>

          <button
            onClick={() => onSelectTab('errors')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              currentTab === 'errors'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <AlertTriangle className="w-4 h-4" />
            <span>7 Nhóm lỗi sai</span>
          </button>

          <button
            onClick={() => onSelectTab('questions')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              currentTab === 'questions'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Ngân hàng câu hỏi</span>
          </button>

          <button
            onClick={() => onSelectTab('progress')}
            className={`flex items-center gap-1.5 py-1 transition-colors ${
              currentTab === 'progress'
                ? 'text-sky-600 font-semibold border-b-2 border-sky-600'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart2 className="w-4 h-4" />
            <span>Tiến độ &amp; Sơ đồ</span>
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onOpenGuide}
            title="Hướng dẫn sử dụng website"
            className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
          >
            <HelpCircle className="w-4 h-4 text-slate-600" />
            <span className="hidden sm:inline">Hướng dẫn</span>
          </button>

          <button
            onClick={onOpenExamCreator}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs sm:text-sm font-semibold text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Tạo bài thi</span>
          </button>
        </div>
      </div>

      {/* Mobile nav bar */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-100 px-2 py-2 bg-slate-50 text-xs">
        <button
          onClick={() => onSelectTab('textbook')}
          className={`px-2 py-1 rounded ${currentTab === 'textbook' ? 'text-sky-700 font-bold bg-sky-100' : 'text-slate-600'}`}
        >
          Sách GK
        </button>
        <button
          onClick={() => onSelectTab('errors')}
          className={`px-2 py-1 rounded ${currentTab === 'errors' ? 'text-sky-700 font-bold bg-sky-100' : 'text-slate-600'}`}
        >
          7 Nhóm lỗi
        </button>
        <button
          onClick={() => onSelectTab('questions')}
          className={`px-2 py-1 rounded ${currentTab === 'questions' ? 'text-sky-700 font-bold bg-sky-100' : 'text-slate-600'}`}
        >
          Câu hỏi
        </button>
        <button
          onClick={() => onSelectTab('progress')}
          className={`px-2 py-1 rounded ${currentTab === 'progress' ? 'text-sky-700 font-bold bg-sky-100' : 'text-slate-600'}`}
        >
          Tiến độ
        </button>
      </div>
    </header>
  );
};
