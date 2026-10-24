import React, { useState, useEffect } from 'react';
import { Send, Copy, Check, Terminal, Code2, Sliders, RefreshCw, Layers } from 'lucide-react';
import { CATEGORIES_CONFIG } from '../data/captionsData';

interface ApiPlaygroundProps {
  onSendToStudio?: (caption: string, category: string) => void;
}

type EndpointPreset = 'all_categories' | 'category_captions' | 'single_caption' | 'random_caption' | 'live_fetch';

export const ApiPlayground: React.FC<ApiPlaygroundProps> = ({ onSendToStudio }) => {
  const [selectedPreset, setSelectedPreset] = useState<EndpointPreset>('category_captions');
  const [selectedCategory, setSelectedCategory] = useState<string>('love');
  const [isUnlimited, setIsUnlimited] = useState<boolean>(true);
  const [limit, setLimit] = useState<number>(10);
  const [isLive, setIsLive] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<any>(null);
  const [status, setStatus] = useState<number>(200);
  const [duration, setDuration] = useState<number>(28);
  const [codeLanguage, setCodeLanguage] = useState<'curl' | 'js' | 'python' | 'node'>('curl');
  const [copiedCode, setCopiedCode] = useState<boolean>(false);
  const [copiedJson, setCopiedJson] = useState<boolean>(false);

  // Compute the endpoint path and query based on current settings
  const computeUrl = (): string => {
    if (selectedPreset === 'all_categories') {
      return '/api/category';
    }
    if (selectedPreset === 'random_caption') {
      return `/api/random?name=${encodeURIComponent(selectedCategory)}`;
    }
    if (selectedPreset === 'single_caption') {
      return `/api/category?name=${encodeURIComponent(selectedCategory)}&limit=1`;
    }
    if (selectedPreset === 'live_fetch') {
      return `/api/category?name=${encodeURIComponent(selectedCategory)}&live=true`;
    }
    // category_captions
    const params = new URLSearchParams();
    params.set('name', selectedCategory);
    if (!isUnlimited && limit) {
      params.set('limit', String(limit));
    }
    if (isLive) params.set('live', 'true');
    return `/api/category?${params.toString()}`;
  };

  const handlePresetChange = (preset: EndpointPreset) => {
    setSelectedPreset(preset);
    if (preset === 'single_caption') {
      setIsUnlimited(false);
      setLimit(1);
      setIsLive(false);
    } else if (preset === 'live_fetch') {
      setIsUnlimited(true);
      setIsLive(true);
    } else if (preset === 'category_captions') {
      setIsUnlimited(true);
      setIsLive(false);
    }
  };

  const executeRequest = async () => {
    setLoading(true);
    const start = performance.now();
    try {
      const url = computeUrl();
      const res = await fetch(url);
      const data = await res.json();
      setDuration(Math.round(performance.now() - start));
      setStatus(res.status);
      setResponse(data);
    } catch (err: any) {
      setStatus(500);
      setResponse({ status: false, error: err.message || 'Request failed' });
    } finally {
      setLoading(false);
    }
  };

  // Initial request on mount
  useEffect(() => {
    executeRequest();
  }, [selectedPreset, selectedCategory]);

  const currentUrl = computeUrl();
  const fullUrl = `https://lovelycaption.com${currentUrl}`;

  // Generate code snippet
  const generateSnippet = (): string => {
    switch (codeLanguage) {
      case 'curl':
        return `# cURL Request
curl -X GET "${fullUrl}" \\
  -H "Accept: application/json"`;

      case 'js':
        return `// JavaScript (Fetch API)
const response = await fetch('${currentUrl}');
const data = await response.json();
console.log(data);`;

      case 'node':
        return `// Node.js (Axios)
import axios from 'axios';

const { data } = await axios.get('${currentUrl}');
console.log(data.status, data.data || data.caption);`;

      case 'python':
        return `# Python 3 (Requests)
import requests

response = requests.get("${fullUrl}")
data = response.json()
print(data)`;
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateSnippet());
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(response, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  return (
    <section id="playground" className="py-12 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <span>REST API Console</span>
            <span>·</span>
            <span>Live Interactive Tester</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            API Playground & Query Builder
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Test all endpoints in real time. Inspect JSON caching, live Cheerio scraping, and custom limits with zero configuration.
          </p>
        </div>

        {/* Preset Endpoints Bar */}
        <div className="mb-6 flex flex-wrap items-center gap-2 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200/80">
          <button
            onClick={() => handlePresetChange('category_captions')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPreset === 'category_captions'
                ? 'bg-white text-rose-600 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            /api/category?name=love (No Limit)
          </button>
          <button
            onClick={() => handlePresetChange('single_caption')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPreset === 'single_caption'
                ? 'bg-white text-rose-600 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            /api/category?name=love&limit=1
          </button>
          <button
            onClick={() => handlePresetChange('random_caption')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPreset === 'random_caption'
                ? 'bg-white text-rose-600 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            /api/random?name=love
          </button>
          <button
            onClick={() => handlePresetChange('live_fetch')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPreset === 'live_fetch'
                ? 'bg-white text-rose-600 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            /api/category?name=love&live=true
          </button>
          <button
            onClick={() => handlePresetChange('all_categories')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all ${
              selectedPreset === 'all_categories'
                ? 'bg-white text-rose-600 shadow-xs font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            /api/category (All Categories)
          </button>
        </div>

        {/* Query Controls Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: Request Parameters Panel */}
          <div className="lg:col-span-5 space-y-5 bg-slate-50 p-5 rounded-2xl border border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold text-slate-900 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-rose-600" />
                <span>Request Parameters</span>
              </h3>
              <span className="text-[11px] font-mono text-slate-400">
                HTTP GET
              </span>
            </div>

            {/* Category Selector */}
            {selectedPreset !== 'all_categories' && (
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1.5">
                  Category Name (<code className="text-rose-600 font-mono">name</code>)
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full text-xs font-medium px-3 py-2 bg-white border border-slate-300 rounded-lg text-slate-800 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all"
                >
                  {CATEGORIES_CONFIG.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.title} ({cat.name})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Limit Mode Switcher & Slider */}
            {selectedPreset === 'category_captions' && (
              <div className="space-y-2 p-3 bg-white rounded-xl border border-slate-200">
                <div className="flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">Unlimited / No Limit</span>
                    <p className="text-[11px] text-slate-500">Return all available category captions</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsUnlimited(!isUnlimited)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                      isUnlimited ? 'bg-emerald-600' : 'bg-slate-300'
                    }`}
                  >
                    <div
                      className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                        isUnlimited ? 'translate-x-5' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {!isUnlimited && (
                  <div className="pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs font-medium text-slate-700 mb-1.5">
                      <span>Custom Limit</span>
                      <span className="font-mono text-slate-900 font-semibold">{limit}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="50"
                      value={limit}
                      onChange={(e) => setLimit(parseInt(e.target.value, 10))}
                      className="w-full accent-rose-600 cursor-pointer"
                    />
                    <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                      <span>1</span>
                      <span>25</span>
                      <span>50</span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Live Scraping Toggle */}
            {(selectedPreset === 'category_captions' || selectedPreset === 'live_fetch') && (
              <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-200">
                <div>
                  <p className="text-xs font-medium text-slate-800">
                    Live Web Scraping (<code className="text-rose-600 font-mono">live=true</code>)
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Scrapes lovelycaption.com with Cheerio & refreshes JSON cache.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsLive(!isLive)}
                  className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${
                    isLive ? 'bg-rose-600' : 'bg-slate-300'
                  }`}
                >
                  <div
                    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                      isLive ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            )}

            {/* Request URL Box */}
            <div>
              <label className="block text-xs font-medium text-slate-700 mb-1.5">
                Evaluated Request URL
              </label>
              <div className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 rounded-lg">
                <span className="text-[11px] font-mono text-slate-400 select-none">GET</span>
                <span className="text-xs font-mono text-slate-800 truncate flex-1">
                  {currentUrl}
                </span>
              </div>
            </div>

            {/* Send Request Button */}
            <button
              onClick={executeRequest}
              disabled={loading}
              className="w-full py-2.5 px-4 bg-rose-600 hover:bg-rose-700 active:scale-98 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center justify-center gap-2 transition-all disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Executing Request...</span>
                </>
              ) : (
                <>
                  <Send className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </>
              )}
            </button>

            {/* Code Snippet Tabs */}
            <div className="pt-2 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1">
                  {(['curl', 'js', 'node', 'python'] as const).map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setCodeLanguage(lang)}
                      className={`px-2 py-1 text-[11px] font-medium rounded transition-colors ${
                        codeLanguage === lang
                          ? 'bg-slate-800 text-white font-semibold'
                          : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleCopyCode}
                  className="text-slate-400 hover:text-slate-700 p-1 text-xs flex items-center gap-1"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span className="text-[11px]">{copiedCode ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="p-3 bg-slate-900 rounded-lg overflow-x-auto max-h-36">
                <pre className="text-[11px] font-mono text-slate-300 whitespace-pre">
                  {generateSnippet()}
                </pre>
              </div>
            </div>
          </div>

          {/* Right: Response Inspector */}
          <div className="lg:col-span-7 bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shadow-lg flex flex-col min-h-[460px]">
            {/* Header with status badge */}
            <div className="px-5 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xs font-mono font-medium text-slate-300">
                  Response Payload
                </span>
                <span className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                  status === 200
                    ? 'bg-emerald-950/60 text-emerald-400 border-emerald-800/40'
                    : 'bg-rose-950/60 text-rose-400 border-rose-800/40'
                }`}>
                  {status} {status === 200 ? 'OK' : 'Error'}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {duration}ms
                </span>
                {response?.source && (
                  <span className="text-[11px] font-mono text-rose-300 bg-rose-950/40 border border-rose-800/30 px-2 py-0.5 rounded">
                    {response.source}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopyJson}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded transition-colors"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedJson ? 'Copied' : 'Copy JSON'}</span>
                </button>
              </div>
            </div>

            {/* Response Viewer */}
            <div className="p-5 flex-1 overflow-auto max-h-[440px] font-mono text-xs text-slate-200">
              {loading ? (
                <div className="h-full flex items-center justify-center text-slate-500 py-16">
                  <RefreshCw className="w-5 h-5 animate-spin mr-2" />
                  <span>Fetching response from Express server...</span>
                </div>
              ) : (
                <pre className="text-emerald-300 leading-relaxed">
                  {JSON.stringify(response, null, 2)}
                </pre>
              )}
            </div>

            {/* Response actions toolbar if single caption or array */}
            {response && (response.caption || (response.data && response.data.length > 0)) && onSendToStudio && (
              <div className="px-5 py-3 bg-slate-950/90 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-400 truncate max-w-sm">
                  "{response.caption || response.data[0]?.caption}"
                </span>
                <button
                  onClick={() => onSendToStudio(
                    response.caption || response.data[0]?.caption,
                    response.category || selectedCategory
                  )}
                  className="px-3 py-1 bg-rose-600 hover:bg-rose-500 text-white rounded font-medium transition-colors shrink-0"
                >
                  Open in Card Studio
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
