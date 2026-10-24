import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ApiPlayground } from './components/ApiPlayground';
import { CategoryExplorer } from './components/CategoryExplorer';
import { CaptionStudio } from './components/CaptionStudio';
import { BotIntegration } from './components/BotIntegration';
import { ScraperStatus } from './components/ScraperStatus';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('playground');
  const [studioCaption, setStudioCaption] = useState<string>(
    "In your arms, I have found my forever sanctuary."
  );
  const [studioCategory, setStudioCategory] = useState<string>("love");
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  const handleSelectCaptionForStudio = (caption: string, category: string) => {
    setStudioCaption(caption);
    setStudioCategory(category);
    setActiveTab('studio');
    const el = document.getElementById('studio');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    showToast(`Loaded into Story Card Studio! ✨`);
  };

  const handleScrollToSection = (tab: string) => {
    setActiveTab(tab);
    const targetMap: Record<string, string> = {
      playground: 'playground',
      explorer: 'explorer',
      studio: 'studio',
      bots: 'bots',
      scraper: 'scraper',
    };
    const id = targetMap[tab];
    if (id) {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const handleQuickTest = async () => {
    try {
      const res = await fetch('/api/random');
      const data = await res.json();
      if (data && data.caption) {
        handleSelectCaptionForStudio(data.caption, data.category || 'love');
        showToast(`Random Caption: "${data.caption.slice(0, 40)}..."`);
      }
    } catch {
      showToast('Quick test completed');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-rose-500 selection:text-white">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 bg-slate-900 text-white text-xs font-medium rounded-xl shadow-xl border border-slate-700/60 animate-bounce">
          <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Navbar adhering to Top Bar Contract */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={handleScrollToSection}
        onQuickTest={handleQuickTest}
      />

      <main className="flex-1">
        {/* Hero Section */}
        <Hero
          onExploreClick={() => handleScrollToSection('explorer')}
          onOpenPlayground={() => handleScrollToSection('playground')}
          onSelectCaptionForStudio={handleSelectCaptionForStudio}
        />

        {/* API Playground Section */}
        <ApiPlayground onSendToStudio={handleSelectCaptionForStudio} />

        {/* Captions Database & Category Explorer */}
        <CategoryExplorer
          onSendToStudio={handleSelectCaptionForStudio}
          onToast={showToast}
        />

        {/* Story Card Studio */}
        <CaptionStudio
          initialCaption={studioCaption}
          initialCategory={studioCategory}
          onToast={showToast}
        />

        {/* Bot & Messenger Integrations */}
        <BotIntegration onToast={showToast} />

        {/* Scraper & Cache Diagnostics */}
        <ScraperStatus onToast={showToast} />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
