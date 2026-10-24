import React, { useState, useEffect } from 'react';
import { Search, Copy, Check, Sparkles, RefreshCw, Heart, HeartCrack, Flame, CloudRain, Users, Compass, Palette, Zap, Smile, MapPin, Gift, ExternalLink } from 'lucide-react';
import { CATEGORIES_CONFIG, CaptionItem } from '../data/captionsData';

interface CategoryExplorerProps {
  onSendToStudio: (caption: string, category: string) => void;
  onToast: (msg: string) => void;
}

export const CategoryExplorer: React.FC<CategoryExplorerProps> = ({ onSendToStudio, onToast }) => {
  const [activeCategory, setActiveCategory] = useState<string>('love');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [captions, setCaptions] = useState<CaptionItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const fetchCategoryCaptions = async (categoryName: string) => {
    setLoading(true);
    try {
      // No limited: fetch all available captions without restriction
      const res = await fetch(`/api/category?name=${encodeURIComponent(categoryName)}&limit=all`);
      const data = await res.json();
      if (data && data.data) {
        setCaptions(data.data);
      } else {
        setCaptions([]);
      }
    } catch (err) {
      console.error(err);
      onToast('Failed to load category captions');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryCaptions(activeCategory);
  }, [activeCategory]);

  const handleCopyCaption = (item: CaptionItem) => {
    navigator.clipboard.writeText(item.caption);
    setCopiedId(item.id);
    onToast('Caption copied to clipboard! ❤️');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleFetchRandom = async () => {
    try {
      const res = await fetch(`/api/random?name=${encodeURIComponent(activeCategory)}`);
      const data = await res.json();
      if (data && data.caption) {
        onToast(`Random: "${data.caption.slice(0, 45)}..."`);
      }
    } catch {
      onToast('Failed to get random caption');
    }
  };

  const filteredCaptions = captions.filter((c) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.caption.toLowerCase().includes(q) ||
      (c.author && c.author.toLowerCase().includes(q)) ||
      c.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Heart': return <Heart className="w-4 h-4 text-rose-500 fill-rose-50" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-pink-500" />;
      case 'Flame': return <Flame className="w-4 h-4 text-amber-500" />;
      case 'CloudRain': return <CloudRain className="w-4 h-4 text-indigo-400" />;
      case 'Users': return <Users className="w-4 h-4 text-teal-500" />;
      case 'HeartCrack': return <HeartCrack className="w-4 h-4 text-rose-400" />;
      case 'Compass': return <Compass className="w-4 h-4 text-blue-500" />;
      case 'Palette': return <Palette className="w-4 h-4 text-violet-500" />;
      case 'Zap': return <Zap className="w-4 h-4 text-amber-500" />;
      case 'Smile': return <Smile className="w-4 h-4 text-emerald-500" />;
      case 'MapPin': return <MapPin className="w-4 h-4 text-orange-500" />;
      case 'Gift': return <Gift className="w-4 h-4 text-purple-500" />;
      default: return <Heart className="w-4 h-4 text-rose-500" />;
    }
  };

  const currentCategoryConfig = CATEGORIES_CONFIG.find((c) => c.name === activeCategory);

  return (
    <section id="explorer" className="py-14 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
              <span>Captions Database</span>
              <span>·</span>
              <span>12 Curated Packs</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Captions Archive & Category Explorer
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Browse hundreds of ready-to-use captions. Copy with one click or launch directly into the card maker.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleFetchRandom}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-all active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-500" />
              <span>Surprise Me</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        <div className="mb-6 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CATEGORIES_CONFIG.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(cat.name)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-medium rounded-xl border whitespace-nowrap shrink-0 transition-all ${
                  isActive
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs font-semibold'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                }`}
              >
                <span>{getCategoryIcon(cat.icon)}</span>
                <span>{cat.title}</span>
                <span className={`text-[10px] font-mono tabular-nums px-1.5 py-0.5 rounded-full ${
                  isActive ? 'bg-rose-700/80 text-rose-100' : 'bg-slate-200/70 text-slate-600'
                }`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & Category Info Bar */}
        <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
              <span>{currentCategoryConfig?.title}</span>
              <span className="text-slate-400 font-normal">·</span>
              <span className="text-xs font-normal text-slate-600">{currentCategoryConfig?.tagline}</span>
              <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-2 py-0.5 rounded-full font-semibold">
                No Limit Active ({filteredCaptions.length} captions)
              </span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              {currentCategoryConfig?.description}
            </p>
          </div>

          <div className="relative min-w-[240px]">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search in this category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800"
            />
          </div>
        </div>

        {/* Captions Grid */}
        {loading ? (
          <div className="py-20 text-center text-slate-400">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-rose-500" />
            <p className="text-sm">Loading captions...</p>
          </div>
        ) : filteredCaptions.length === 0 ? (
          <div className="py-16 text-center text-slate-500 bg-slate-50 rounded-2xl border border-slate-200">
            <p className="text-sm font-medium">No captions match your query "{searchQuery}"</p>
            <p className="text-xs text-slate-400 mt-1">Try another keyword or switch category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredCaptions.map((item) => (
              <div
                key={item.id}
                className="group p-5 bg-white rounded-2xl border border-slate-200/90 hover:border-rose-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <p className="text-sm font-medium text-slate-800 leading-relaxed text-balance">
                    "{item.caption}"
                  </p>

                  {item.author && (
                    <p className="text-xs font-serif italic text-slate-500 mt-2">
                      — {item.author}
                    </p>
                  )}
                </div>

                <div className="mt-5 pt-3.5 border-t border-slate-100 flex items-center justify-between">
                  {/* Clean unboxed tags with separator */}
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    {item.tags.slice(0, 2).map((tag, idx) => (
                      <React.Fragment key={tag}>
                        {idx > 0 && <span>·</span>}
                        <span>#{tag}</span>
                      </React.Fragment>
                    ))}
                    <span className="font-mono tabular-nums ml-1">({item.likes})</span>
                  </div>

                  <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100">
                    <button
                      onClick={() => handleCopyCaption(item)}
                      title="Copy Caption Text"
                      className="p-1.5 text-slate-500 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    >
                      {copiedId === item.id ? (
                        <Check className="w-4 h-4 text-emerald-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                    <button
                      onClick={() => onSendToStudio(item.caption, activeCategory)}
                      title="Open in Story Card Studio"
                      className="px-2 py-1 text-[11px] font-medium text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors"
                    >
                      Card Studio
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
