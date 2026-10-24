import React, { useState, useEffect } from 'react';
import { Cpu, RefreshCw, CheckCircle, ShieldCheck, Database, Globe, ArrowRight, Zap } from 'lucide-react';

interface ScraperStatusProps {
  onToast: (msg: string) => void;
}

export const ScraperStatus: React.FC<ScraperStatusProps> = ({ onToast }) => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [refreshCategory, setRefreshCategory] = useState<string>('love');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const fetchStats = async () => {
    try {
      const res = await fetch('/api/stats');
      const data = await res.json();
      setStats(data);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleTriggerScrape = async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch('/api/scrape/refresh', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: refreshCategory }),
      });
      const data = await res.json();
      onToast(data.message || 'Cache refreshed!');
      fetchStats();
    } catch {
      onToast('Failed to trigger scrape');
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <section id="scraper" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <span>Core Architecture</span>
            <span>·</span>
            <span>Scraper & Cache Diagnostics</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Scraper Engine & Automatic JSON Caching
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Under the hood: Axios performs HTTP requests with browser headers, Cheerio traverses DOM selectors to extract quotes, and an automatic cache ensures lightning-fast responses.
          </p>
        </div>

        {/* Architecture Flow Pipeline */}
        <div className="mb-8 p-6 bg-slate-900 rounded-2xl border border-slate-800 text-white">
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-mono font-medium text-slate-400">
              Scraping & Caching Pipeline
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded">
              High Availability
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
            {/* Step 1 */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                <Globe className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold">1. Client Request</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                /api/category?live=true
              </p>
            </div>

            {/* Step 2 */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-amber-500/20 text-amber-400 flex items-center justify-center mb-2">
                <Cpu className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold">2. Axios & Cheerio</p>
              <p className="text-[11px] text-slate-400 mt-1">
                Scrapes lovelycaption.com
              </p>
            </div>

            {/* Step 3 */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center mb-2">
                <Database className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold">3. JSON Cache Sync</p>
              <p className="text-[11px] text-slate-400 mt-1">
                In-Memory + Structured JSON
              </p>
            </div>

            {/* Step 4 */}
            <div className="p-4 bg-slate-800/60 rounded-xl border border-slate-700/60 flex flex-col items-center">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                <Zap className="w-4 h-4" />
              </div>
              <p className="text-xs font-semibold">4. Instant Response</p>
              <p className="text-[11px] text-slate-400 mt-1 font-mono">
                {"{ status: true, data: [...] }"}
              </p>
            </div>
          </div>
        </div>

        {/* Live Metrics & Manual Trigger */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Metrics */}
          <div className="lg:col-span-7 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Database className="w-4 h-4 text-rose-600" />
              <span>Service Diagnostics & Telemetry</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Developer</p>
                <p className="text-sm font-bold text-slate-900 mt-0.5">
                  {stats?.developer || 'Aminulsordar'}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Total Captions</p>
                <p className="text-sm font-bold text-rose-600 font-mono tabular-nums mt-0.5">
                  {stats?.total_captions || '260+'}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Categories</p>
                <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                  {stats?.total_categories || 12}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Requests Served</p>
                <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                  {stats?.requests_served ?? 128}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Live Scrapes</p>
                <p className="text-sm font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                  {stats?.live_scrapes_executed ?? 14}
                </p>
              </div>

              <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                <p className="text-xs text-slate-400 font-medium">Uptime</p>
                <p className="text-sm font-bold text-emerald-600 font-mono tabular-nums mt-0.5">
                  {stats?.uptime_seconds ? `${stats.uptime_seconds}s` : 'Active'}
                </p>
              </div>
            </div>
          </div>

          {/* Manual Scrape Trigger */}
          <div className="lg:col-span-5 bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <h3 className="text-sm font-bold text-slate-900 mb-2 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-600" />
              <span>Force Cache Invalidation</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Manually trigger the live scraper to fetch new entries from lovelycaption.com and refresh the local JSON cache.
            </p>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">
                  Select Category to Re-scrape
                </label>
                <select
                  value={refreshCategory}
                  onChange={(e) => setRefreshCategory(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800"
                >
                  <option value="love">Love Captions</option>
                  <option value="romantic">Romantic Captions</option>
                  <option value="attitude">Attitude Captions</option>
                  <option value="sad">Sad Captions</option>
                  <option value="friendship">Friendship Captions</option>
                  <option value="breakup">Breakup Captions</option>
                  <option value="deep">Deep Captions</option>
                  <option value="motivation">Motivation Captions</option>
                  <option value="aesthetic">Aesthetic Captions</option>
                </select>
              </div>

              <button
                onClick={handleTriggerScrape}
                disabled={isRefreshing}
                className="w-full py-2.5 px-4 bg-slate-900 hover:bg-rose-600 text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-all active:scale-95 disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                <span>{isRefreshing ? 'Scraping Target...' : `Trigger Scrape for '${refreshCategory}'`}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
