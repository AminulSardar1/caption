import React from 'react';
import { Heart, Terminal, Sparkles } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onQuickTest: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, onQuickTest }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-rose-100/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2.5 whitespace-nowrap shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-600 via-pink-500 to-rose-400 flex items-center justify-center text-white shadow-sm shadow-rose-200">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold tracking-tight text-slate-900">
              Love Caption API
            </span>
            <span className="text-[11px] font-mono font-medium text-rose-600 bg-rose-50 border border-rose-200/60 px-1.5 py-0.5 rounded">
              v1.0.0
            </span>
          </div>
        </div>

        {/* Zone 2: 4–5 clean single-line navigation links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => setActiveTab('playground')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'playground'
                ? 'text-rose-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Playground
          </button>
          <button
            onClick={() => setActiveTab('explorer')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'explorer'
                ? 'text-rose-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Captions Archive
          </button>
          <button
            onClick={() => setActiveTab('studio')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'studio'
                ? 'text-rose-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Story Card Studio
          </button>
          <button
            onClick={() => setActiveTab('bots')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'bots'
                ? 'text-rose-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Bot Integration
          </button>
          <button
            onClick={() => setActiveTab('scraper')}
            className={`whitespace-nowrap shrink-0 transition-colors ${
              activeTab === 'scraper'
                ? 'text-rose-600 font-semibold'
                : 'hover:text-slate-900'
            }`}
          >
            Scraper Engine
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onQuickTest}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-slate-900 hover:bg-rose-600 rounded-lg shadow-sm transition-all whitespace-nowrap shrink-0 active:scale-95"
          >
            <Sparkles className="w-3.5 h-3.5 text-rose-300" />
            <span>Test Random</span>
          </button>
        </div>
      </div>
    </header>
  );
};
