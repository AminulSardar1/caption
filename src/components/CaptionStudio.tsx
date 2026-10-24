import React, { useState, useRef } from 'react';
import { Download, Copy, Check, RefreshCw, Palette, Type, Sliders, Sparkles, Share2 } from 'lucide-react';

interface CaptionStudioProps {
  initialCaption?: string;
  initialCategory?: string;
  onToast: (msg: string) => void;
}

export const CaptionStudio: React.FC<CaptionStudioProps> = ({
  initialCaption = "In your arms, I have found my forever sanctuary.",
  initialCategory = "love",
  onToast,
}) => {
  const [caption, setCaption] = useState<string>(initialCaption);
  const [author, setAuthor] = useState<string>('Nicholas Sparks');
  const [theme, setTheme] = useState<'sunset' | 'linen' | 'midnight' | 'rosegold' | 'minimal'>('sunset');
  const [fontStyle, setFontStyle] = useState<'serif' | 'sans' | 'italic'>('serif');
  const [aspect, setAspect] = useState<'square' | 'story' | 'landscape'>('square');
  const [showWatermark, setShowWatermark] = useState<boolean>(true);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleFetchAnother = async () => {
    setIsGenerating(true);
    try {
      const res = await fetch(`/api/random?name=${encodeURIComponent(initialCategory || 'love')}`);
      const data = await res.json();
      if (data && data.caption) {
        setCaption(data.caption);
        setAuthor(data.author || 'LovelyCaption');
        onToast(`Loaded fresh ${data.category} caption!`);
      }
    } catch {
      onToast('Failed to fetch new caption');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopyText = () => {
    const textToCopy = `"${caption}" ${author ? `— ${author}` : ''} \n\n#LovelyCaption #Quotes`;
    navigator.clipboard.writeText(textToCopy);
    onToast('Caption copied to clipboard! ❤️');
  };

  const handleDownloadCard = () => {
    // Render using standard Canvas API for instant, crisp client-side export
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 1080;
    let height = 1080;
    if (aspect === 'story') {
      height = 1920;
    } else if (aspect === 'landscape') {
      height = 608;
    }

    canvas.width = width;
    canvas.height = height;

    const renderTextOnCanvas = () => {
      // Draw dark vignette scrim
      const grad = ctx.createLinearGradient(0, 0, 0, height);
      grad.addColorStop(0, 'rgba(0,0,0,0.4)');
      grad.addColorStop(0.5, 'rgba(0,0,0,0.6)');
      grad.addColorStop(1, 'rgba(0,0,0,0.85)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Draw caption text
      ctx.fillStyle = '#ffffff';
      const isSerif = fontStyle === 'serif';
      const isItalic = fontStyle === 'italic';
      const fontName = isSerif ? 'Georgia, serif' : 'system-ui, sans-serif';
      const fontSize = aspect === 'story' ? 56 : 50;
      ctx.font = `${isItalic ? 'italic ' : ''}600 ${fontSize}px ${fontName}`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Word wrapping
      const words = (`"${caption}"`).split(' ');
      let line = '';
      const lines: string[] = [];
      const maxWidth = width - 160;

      for (let n = 0; n < words.length; n++) {
        const testLine = line + words[n] + ' ';
        const metrics = ctx.measureText(testLine);
        if (metrics.width > maxWidth && n > 0) {
          lines.push(line);
          line = words[n] + ' ';
        } else {
          line = testLine;
        }
      }
      lines.push(line);

      const lineHeight = fontSize * 1.4;
      const totalTextHeight = lines.length * lineHeight;
      let startY = (height / 2) - (totalTextHeight / 2);

      lines.forEach((l) => {
        ctx.fillText(l.trim(), width / 2, startY);
        startY += lineHeight;
      });

      // Author attribution
      if (author) {
        ctx.fillStyle = '#fda4af'; // light rose
        ctx.font = `italic 32px Georgia, serif`;
        ctx.fillText(`— ${author}`, width / 2, startY + 30);
      }

      // Watermark
      if (showWatermark) {
        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.font = '500 24px system-ui, sans-serif';
        ctx.fillText('lovelycaption.com · Love Caption API', width / 2, height - 60);
      }

      // Trigger download
      const dataUrl = canvas.toDataURL('image/png');
      const a = document.createElement('a');
      a.href = dataUrl;
      a.download = `caption-${Date.now()}.png`;
      a.click();
      onToast('Card downloaded successfully! 📸');
    };

    // Load background image or gradient
    if (theme === 'sunset' || theme === 'linen') {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = theme === 'sunset'
        ? '/src/assets/images/hero_love_captions_1792848156789.jpg'
        : '/src/assets/images/caption_studio_art_1792848156816.jpg';

      img.onload = () => {
        // Draw image cover
        const imgRatio = img.width / img.height;
        const canvasRatio = width / height;
        let sWidth = img.width;
        let sHeight = img.height;
        let sx = 0;
        let sy = 0;

        if (imgRatio > canvasRatio) {
          sWidth = img.height * canvasRatio;
          sx = (img.width - sWidth) / 2;
        } else {
          sHeight = img.width / canvasRatio;
          sy = (img.height - sHeight) / 2;
        }

        ctx.drawImage(img, sx, sy, sWidth, sHeight, 0, 0, width, height);
        renderTextOnCanvas();
      };
      img.onerror = () => {
        // Fallback gradient if image not ready
        ctx.fillStyle = '#1e293b';
        ctx.fillRect(0, 0, width, height);
        renderTextOnCanvas();
      };
    } else {
      // Solid or CSS gradient
      if (theme === 'midnight') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#0f172a');
        bgGrad.addColorStop(1, '#1e1b4b');
        ctx.fillStyle = bgGrad;
      } else if (theme === 'rosegold') {
        const bgGrad = ctx.createLinearGradient(0, 0, width, height);
        bgGrad.addColorStop(0, '#4c0519');
        bgGrad.addColorStop(1, '#831843');
        ctx.fillStyle = bgGrad;
      } else {
        ctx.fillStyle = '#18181b';
      }
      ctx.fillRect(0, 0, width, height);
      renderTextOnCanvas();
    }
  };

  return (
    <section id="studio" className="py-14 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs font-semibold text-rose-600 uppercase tracking-wider mb-1">
            <span>Visual Creator</span>
            <span>·</span>
            <span>Story & Social Card Maker</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Caption Story Card Studio
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-2xl">
            Transform captions from the API into aesthetic, high-resolution visual quote cards ready for Instagram, WhatsApp status, or TikTok.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Panel */}
          <div className="lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs">
            {/* Caption Text Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold text-slate-800">
                  Caption Wording
                </label>
                <button
                  onClick={handleFetchAnother}
                  disabled={isGenerating}
                  className="text-xs text-rose-600 hover:text-rose-700 font-medium flex items-center gap-1"
                >
                  <RefreshCw className={`w-3 h-3 ${isGenerating ? 'animate-spin' : ''}`} />
                  <span>Shuffle from API</span>
                </button>
              </div>
              <textarea
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full text-xs p-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800 resize-none"
                placeholder="Enter caption text..."
              />
            </div>

            {/* Author Attribution */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                Author / Citation
              </label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full text-xs px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 text-slate-800"
                placeholder="e.g. Nicholas Sparks or LovelyCaption"
              />
            </div>

            {/* Background Theme Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-800 mb-2">
                Card Atmosphere
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setTheme('sunset')}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    theme === 'sunset'
                      ? 'border-rose-600 bg-rose-50/60 font-semibold text-rose-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="w-full h-8 rounded-md bg-gradient-to-r from-amber-500 to-rose-600 mb-1.5" />
                  <span>Golden Coast</span>
                </button>

                <button
                  onClick={() => setTheme('linen')}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    theme === 'linen'
                      ? 'border-rose-600 bg-rose-50/60 font-semibold text-rose-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="w-full h-8 rounded-md bg-gradient-to-r from-rose-200 to-amber-100 mb-1.5" />
                  <span>Rose Linen</span>
                </button>

                <button
                  onClick={() => setTheme('rosegold')}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    theme === 'rosegold'
                      ? 'border-rose-600 bg-rose-50/60 font-semibold text-rose-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="w-full h-8 rounded-md bg-gradient-to-r from-rose-950 to-pink-900 mb-1.5" />
                  <span>Deep Rose</span>
                </button>

                <button
                  onClick={() => setTheme('midnight')}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    theme === 'midnight'
                      ? 'border-rose-600 bg-rose-50/60 font-semibold text-rose-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="w-full h-8 rounded-md bg-gradient-to-r from-slate-900 to-indigo-950 mb-1.5" />
                  <span>Midnight</span>
                </button>

                <button
                  onClick={() => setTheme('minimal')}
                  className={`p-2 rounded-xl text-left border transition-all text-xs ${
                    theme === 'minimal'
                      ? 'border-rose-600 bg-rose-50/60 font-semibold text-rose-900'
                      : 'border-slate-200 hover:border-slate-300 text-slate-600'
                  }`}
                >
                  <div className="w-full h-8 rounded-md bg-zinc-900 mb-1.5" />
                  <span>Noir Mood</span>
                </button>
              </div>
            </div>

            {/* Typography & Aspect Ratio */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Font Mood
                </label>
                <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200">
                  <button
                    onClick={() => setFontStyle('serif')}
                    className={`flex-1 py-1 text-xs font-medium rounded ${
                      fontStyle === 'serif' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Serif
                  </button>
                  <button
                    onClick={() => setFontStyle('italic')}
                    className={`flex-1 py-1 text-xs font-medium italic rounded ${
                      fontStyle === 'italic' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Italic
                  </button>
                  <button
                    onClick={() => setFontStyle('sans')}
                    className={`flex-1 py-1 text-xs font-medium rounded ${
                      fontStyle === 'sans' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    Sans
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-800 mb-1.5">
                  Format
                </label>
                <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200">
                  <button
                    onClick={() => setAspect('square')}
                    className={`flex-1 py-1 text-xs font-medium rounded ${
                      aspect === 'square' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    1:1
                  </button>
                  <button
                    onClick={() => setAspect('story')}
                    className={`flex-1 py-1 text-xs font-medium rounded ${
                      aspect === 'story' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    9:16
                  </button>
                  <button
                    onClick={() => setAspect('landscape')}
                    className={`flex-1 py-1 text-xs font-medium rounded ${
                      aspect === 'landscape' ? 'bg-white shadow-xs text-rose-600 font-semibold' : 'text-slate-600'
                    }`}
                  >
                    16:9
                  </button>
                </div>
              </div>
            </div>

            {/* Watermark toggle */}
            <div className="flex items-center justify-between text-xs py-1">
              <span className="text-slate-700 font-medium">Show API Attribution</span>
              <input
                type="checkbox"
                checked={showWatermark}
                onChange={(e) => setShowWatermark(e.target.checked)}
                className="w-4 h-4 text-rose-600 rounded border-slate-300 focus:ring-rose-500 cursor-pointer"
              />
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleDownloadCard}
                className="flex-1 py-2.5 px-4 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-xl shadow-xs flex items-center justify-center gap-2 active:scale-95 transition-all"
              >
                <Download className="w-4 h-4" />
                <span>Download PNG Card</span>
              </button>
              <button
                onClick={handleCopyText}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl flex items-center gap-2 active:scale-95 transition-all"
              >
                <Copy className="w-4 h-4" />
                <span>Copy Text</span>
              </button>
            </div>
          </div>

          {/* Right Preview Card Canvas */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            <div
              ref={cardRef}
              className={`w-full max-w-md rounded-2xl overflow-hidden shadow-2xl relative transition-all duration-300 flex flex-col justify-between p-8 text-center ${
                aspect === 'square' ? 'aspect-square' : aspect === 'story' ? 'aspect-[9/16] max-h-[580px]' : 'aspect-video'
              }`}
              style={{
                backgroundImage:
                  theme === 'sunset'
                    ? `linear-gradient(rgba(15, 23, 42, 0.55), rgba(15, 23, 42, 0.85)), url('/src/assets/images/hero_love_captions_1792848156789.jpg')`
                    : theme === 'linen'
                    ? `linear-gradient(rgba(24, 24, 27, 0.65), rgba(24, 24, 27, 0.9)), url('/src/assets/images/caption_studio_art_1792848156816.jpg')`
                    : theme === 'rosegold'
                    ? `linear-gradient(135deg, #4c0519 0%, #831843 100%)`
                    : theme === 'midnight'
                    ? `linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%)`
                    : `linear-gradient(135deg, #18181b 0%, #27272a 100%)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              {/* Card Header tag */}
              <div className="flex items-center justify-center">
                <span className="text-[11px] uppercase tracking-widest text-rose-300/80 font-medium font-mono">
                  {initialCategory.toUpperCase()} COLLECTION
                </span>
              </div>

              {/* Card Center: Caption Text */}
              <div className="my-auto py-6">
                <p
                  className={`text-white leading-relaxed text-balance ${
                    fontStyle === 'serif'
                      ? 'font-serif text-xl sm:text-2xl font-semibold'
                      : fontStyle === 'italic'
                      ? 'font-serif italic text-xl sm:text-2xl'
                      : 'font-sans text-lg sm:text-xl font-bold tracking-tight'
                  }`}
                >
                  "{caption}"
                </p>

                {author && (
                  <p className="mt-4 text-xs font-serif italic text-rose-200/90 tracking-wide">
                    — {author}
                  </p>
                )}
              </div>

              {/* Card Footer: Watermark */}
              <div className="text-[10px] text-white/60 tracking-wider">
                {showWatermark && <span>lovelycaption.com · Love Caption API</span>}
              </div>
            </div>

            <p className="text-[11px] text-slate-400 mt-3 text-center">
              Real-time Canvas Rendering · 1080p High-DPI Output
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
