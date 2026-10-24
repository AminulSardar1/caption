import React, { useState } from 'react';
import { Sparkles, Terminal, Copy, Check, ArrowRight, RefreshCw, Zap } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onOpenPlayground: () => void;
  onSelectCaptionForStudio: (caption: string, category: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreClick,
  onOpenPlayground,
  onSelectCaptionForStudio,
}) => {
  const [quickResult, setQuickResult] = useState<any>({
    status: true,
    category: "love",
    caption: "In your arms, I have found my forever sanctuary.",
    author: "Nicholas Sparks",
    tags: ["love", "forever", "sanctuary"],
    likes: 1840,
    developer: "Aminulsordar",
    api_version: "1.0.0",
    source: "cached_json",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [responseTime, setResponseTime] = useState<number>(42);

  const fetchRandom = async () => {
    setIsLoading(true);
    const start = performance.now();
    try {
      const res = await fetch('/api/random?name=love');
      const data = await res.json();
      setQuickResult(data);
      setResponseTime(Math.round(performance.now() - start));
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const copyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(quickResult, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="relative overflow-hidden pt-8 pb-16 lg:py-20 bg-gradient-to-b from-rose-50/50 via-white to-slate-50 border-b border-rose-100/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Headline and Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
              <span className="text-rose-600 font-semibold">Love Caption API</span>
              <span aria-hidden="true">·</span>
              <span>v1.0.0</span>
              <span aria-hidden="true">·</span>
              <span>By Aminulsordar</span>
              <span aria-hidden="true">·</span>
              <span>lovelycaption.com</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] text-balance">
              Discover the <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500">perfect caption</span> for every moment.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              A high-performance caption API built with Node.js, Express, Axios & Cheerio. Effortlessly retrieve category-filtered captions, generate random quotes, and scrape live content with instant JSON caching.
            </p>

            {/* Quick Actions */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenPlayground}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95"
              >
                <span>Launch API Playground</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-5 py-3 text-sm font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200/90 rounded-xl shadow-xs transition-all active:scale-95"
              >
                <span>Browse Categories</span>
              </button>
            </div>

            {/* Feature Highlights List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200/80">
              <div>
                <p className="text-xs text-slate-400 font-medium">Scraping</p>
                <p className="text-sm font-semibold text-slate-800">Live Cheerio</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Caching</p>
                <p className="text-sm font-semibold text-slate-800">Automatic JSON</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Categories</p>
                <p className="text-sm font-semibold text-slate-800">12 Curated Packs</p>
              </div>
              <div>
                <p className="text-xs text-slate-400 font-medium">Response</p>
                <p className="text-sm font-semibold text-rose-600 font-mono tabular-nums">~25ms Avg</p>
              </div>
            </div>
          </div>

          {/* Right Column: Live Interactive Console */}
          <div className="lg:col-span-5">
            <div className="bg-slate-900 rounded-2xl shadow-xl border border-slate-800 overflow-hidden">
              {/* Terminal Title Bar */}
              <div className="px-4 py-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                  <span className="text-xs font-mono text-slate-400 ml-2">GET /api/random?name=love</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
                    200 OK · {responseTime}ms
                  </span>
                  <button
                    onClick={copyJson}
                    title="Copy response JSON"
                    className="text-slate-400 hover:text-white p-1 rounded transition-colors"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="p-4 font-mono text-xs text-slate-300 overflow-x-auto max-h-[300px]">
                <pre className="text-slate-200">
                  {JSON.stringify(quickResult, null, 2)}
                </pre>
              </div>

              {/* Terminal Footer Controls */}
              <div className="p-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 truncate">
                  Ready for Bots & Web Apps
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => onSelectCaptionForStudio(quickResult.caption, quickResult.category)}
                    className="px-2.5 py-1 text-xs font-medium text-rose-300 hover:text-white hover:bg-rose-950/40 rounded transition-colors"
                  >
                    Create Story Card
                  </button>
                  <button
                    onClick={fetchRandom}
                    disabled={isLoading}
                    className="flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-rose-600 hover:bg-rose-500 text-white rounded-md shadow-xs transition-all active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Send Again</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Hero Image Showcase strip */}
            <div className="mt-4 rounded-xl overflow-hidden border border-rose-200/60 shadow-xs relative group">
              <img
                src="/src/assets/images/hero_love_captions_1792848156789.jpg"
                alt="Romantic coastal couple enjoying golden hour"
                referrerPolicy="no-referrer"
                className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/30 to-transparent flex items-end p-3">
                <p className="text-xs text-rose-100 font-medium italic">
                  "{quickResult.caption}"
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
