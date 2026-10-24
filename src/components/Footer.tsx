import React from 'react';
import { Heart, Globe, Terminal, Code2 } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800/80">
          {/* Brand & Dev Info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2 text-white">
              <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center text-white">
                <Heart className="w-4 h-4 fill-white" />
              </div>
              <span className="font-bold tracking-tight text-base">Love Caption API</span>
              <span className="text-[11px] font-mono text-rose-400 bg-rose-950/60 border border-rose-800/40 px-1.5 py-0.5 rounded">
                v1.0.0
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Discover the perfect caption for every moment. A powerful caption API designed to fetch captions from different categories using simple API requests.
            </p>

            <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
              <span>Developed by</span>
              <span className="text-rose-400 font-semibold">Aminulsordar</span>
              <span aria-hidden="true">·</span>
              <a
                href="https://lovelycaption.com"
                target="_blank"
                rel="noreferrer"
                className="hover:text-white transition-colors"
              >
                lovelycaption.com
              </a>
            </div>
          </div>

          {/* Endpoints Quick Reference */}
          <div className="md:col-span-4 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              API Endpoints
            </p>
            <ul className="space-y-1.5 text-xs font-mono text-slate-400">
              <li>
                <span className="text-rose-400">GET</span> /api/category
              </li>
              <li>
                <span className="text-rose-400">GET</span> /api/category?name=love
              </li>
              <li>
                <span className="text-rose-400">GET</span> /api/category?name=love&limit=1
              </li>
              <li>
                <span className="text-rose-400">GET</span> /api/random?name=love
              </li>
              <li>
                <span className="text-rose-400">GET</span> /api/category?name=love&live=true
              </li>
            </ul>
          </div>

          {/* Technology Stack */}
          <div className="md:col-span-3 space-y-2">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-200">
              Built With
            </p>
            <div className="flex flex-col gap-1.5 text-xs text-slate-400">
              <span>Node.js & Express.js</span>
              <span>Axios HTTP Client</span>
              <span>Cheerio DOM Scraper</span>
              <span>Automatic JSON Caching</span>
              <span>React 19 & Tailwind CSS</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Love Caption API</span>
            <span aria-hidden="true">·</span>
            <span>All rights reserved</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-rose-400 font-medium">Simple API. Endless Caption Possibilities!</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
