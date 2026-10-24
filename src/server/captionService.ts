import { CATEGORIES_CONFIG, INITIAL_CAPTIONS, CaptionItem } from '../data/captionsData';

interface CacheStore {
  [category: string]: {
    lastUpdated: number;
    source: 'live_scraped' | 'cached_json';
    items: CaptionItem[];
  };
}

class CaptionService {
  private cache: CacheStore = {};
  private requestCount: number = 0;
  private scrapeCount: number = 0;

  constructor() {
    this.seedCache();
  }

  private seedCache() {
    for (const [catKey, items] of Object.entries(INITIAL_CAPTIONS)) {
      this.cache[catKey] = {
        lastUpdated: Date.now(),
        source: 'cached_json',
        items: [...items],
      };
    }
  }

  public getStats() {
    const totalCaptions = Object.values(this.cache).reduce((acc, cat) => acc + cat.items.length, 0);
    return {
      status: true,
      service: 'Love Caption API',
      version: '1.0.0',
      developer: 'Aminulsordar',
      total_categories: CATEGORIES_CONFIG.length,
      total_captions: totalCaptions,
      requests_served: this.requestCount,
      live_scrapes_executed: this.scrapeCount,
      cache_status: 'healthy',
      uptime_seconds: Math.floor(process.uptime()),
    };
  }

  public getCategories() {
    this.requestCount++;
    return {
      status: true,
      developer: 'Aminulsordar',
      api_version: '1.0.0',
      total_categories: CATEGORIES_CONFIG.length,
      categories: CATEGORIES_CONFIG.map((cfg) => {
        const cached = this.cache[cfg.name];
        return {
          name: cfg.name,
          title: cfg.title,
          count: cached ? cached.items.length : cfg.count,
          icon: cfg.icon,
          description: cfg.description,
          tagline: cfg.tagline,
          sample: cached && cached.items[0] ? cached.items[0].caption : '',
        };
      }),
    };
  }

  public async getCaptionsByCategory(
    nameInput?: string,
    limitInput?: number | string,
    liveInput?: boolean | string,
    unlimitedInput?: boolean | string
  ) {
    this.requestCount++;
    const categoryKey = (nameInput || 'love').toLowerCase().trim();
    const isLive = String(liveInput).toLowerCase() === 'true';

    // If live scraping requested, attempt live scrape
    if (isLive) {
      await this.tryScrapeLiveCategory(categoryKey);
    }

    const cached = this.cache[categoryKey] || this.cache['love'];
    const items = cached.items || [];

    // Check if unlimited was explicitly or implicitly requested
    const isUnlimited =
      unlimitedInput === true ||
      String(unlimitedInput).toLowerCase() === 'true' ||
      limitInput === 'all' ||
      limitInput === 'unlimited' ||
      limitInput === 'none' ||
      limitInput === '0' ||
      limitInput === undefined ||
      limitInput === null ||
      limitInput === '';

    let sliced = items;
    let limitNum: number | null = null;

    if (!isUnlimited && limitInput) {
      const parsed = parseInt(String(limitInput), 10);
      if (!isNaN(parsed) && parsed > 0) {
        limitNum = parsed;
        sliced = items.slice(0, limitNum);
      }
    }

    // If limit is specifically 1, return single caption format convenience
    if (limitNum === 1 && sliced.length > 0) {
      return {
        status: true,
        category: categoryKey,
        count: 1,
        is_unlimited: false,
        caption: sliced[0].caption,
        author: sliced[0].author || 'LovelyCaption',
        tags: sliced[0].tags,
        likes: sliced[0].likes,
        source: cached.source,
        data: sliced,
        developer: 'Aminulsordar',
        api_version: '1.0.0',
      };
    }

    return {
      status: true,
      category: categoryKey,
      count: sliced.length,
      total_available: items.length,
      is_unlimited: isUnlimited,
      limit_applied: limitNum !== null ? limitNum : 'unlimited',
      source: cached.source,
      developer: 'Aminulsordar',
      api_version: '1.0.0',
      data: sliced,
    };
  }

  public getRandomCaption(nameInput?: string) {
    this.requestCount++;
    let pool: CaptionItem[] = [];
    let chosenCat = '';

    if (nameInput) {
      const catKey = nameInput.toLowerCase().trim();
      if (this.cache[catKey] && this.cache[catKey].items.length > 0) {
        pool = this.cache[catKey].items;
        chosenCat = catKey;
      }
    }

    if (pool.length === 0) {
      // Pick random across all categories
      const allKeys = Object.keys(this.cache);
      chosenCat = allKeys[Math.floor(Math.random() * allKeys.length)];
      pool = this.cache[chosenCat]?.items || [];
    }

    const randomItem = pool[Math.floor(Math.random() * pool.length)] || {
      id: 'default',
      caption: 'In your arms, I have found my forever sanctuary.',
      category: 'love',
      tags: ['love'],
      likes: 1200,
    };

    return {
      status: true,
      category: chosenCat || randomItem.category,
      caption: randomItem.caption,
      author: randomItem.author || 'LovelyCaption',
      tags: randomItem.tags,
      likes: randomItem.likes,
      developer: 'Aminulsordar',
      api_version: '1.0.0',
      timestamp: new Date().toISOString(),
    };
  }

  public async tryScrapeLiveCategory(category: string): Promise<boolean> {
    this.scrapeCount++;
    try {
      // Target lovelycaption.com category or search path
      const targetUrls = [
        `https://lovelycaption.com/category/${encodeURIComponent(category)}/`,
        `https://lovelycaption.com/${encodeURIComponent(category)}-captions/`,
        `https://lovelycaption.com/?s=${encodeURIComponent(category)}`,
      ];

      const userAgents = [
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.2 Safari/605.1.15',
      ];

      let scrapedTexts: string[] = [];

      for (const url of targetUrls) {
        try {
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 3500);

          const resp = await fetch(url, {
            headers: {
              'User-Agent': userAgents[Math.floor(Math.random() * userAgents.length)],
              'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            },
            signal: controller.signal,
          });
          clearTimeout(timeoutId);

          if (resp.ok) {
            const html = await resp.text();
            const found: string[] = [];

            // Extract blockquotes
            const bqMatches = html.matchAll(/<blockquote[^>]*>([\s\S]*?)<\/blockquote>/gi);
            for (const m of bqMatches) {
              const text = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
              if (text.length > 15 && text.length < 240 && !text.includes('cookie') && !text.includes('privacy')) {
                found.push(text.replace(/^["'“”]+|["'“”]+$/g, '').trim());
              }
            }

            // Extract list items
            const liMatches = html.matchAll(/<li[^>]*>([\s\S]*?)<\/li>/gi);
            for (const m of liMatches) {
              const text = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
              if (text.length > 20 && text.length < 240 && !text.includes('http') && !text.includes('privacy')) {
                found.push(text.replace(/^["'“”]+|["'“”]+$/g, '').trim());
              }
            }

            // Extract paragraphs with quotes
            const pMatches = html.matchAll(/<p[^>]*>([\s\S]*?)<\/p>/gi);
            for (const m of pMatches) {
              const text = m[1].replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').trim();
              if (
                text.length > 25 &&
                text.length < 240 &&
                (text.startsWith('"') || text.startsWith('“') || text.includes('—') || text.includes('❤️'))
              ) {
                found.push(text.replace(/^["'“”]+|["'“”]+$/g, '').trim());
              }
            }

            if (found.length >= 3) {
              scrapedTexts = found;
              break;
            }
          }
        } catch {
          // Continue to next URL attempt
        }
      }

      if (scrapedTexts.length > 0) {
        // Normalize and merge into cache without losing initial captions
        const newItems: CaptionItem[] = scrapedTexts.slice(0, 30).map((text, idx) => ({
          id: `live-${category}-${Date.now()}-${idx}`,
          caption: text,
          category: category,
          tags: [category, 'live-scraped', 'trending'],
          likes: Math.floor(Math.random() * 2000) + 1000,
        }));

        const existingItems = this.cache[category]?.items || INITIAL_CAPTIONS[category] || [];
        const seen = new Set<string>();
        const merged: CaptionItem[] = [];

        for (const item of [...newItems, ...existingItems]) {
          const norm = item.caption.toLowerCase().trim();
          if (!seen.has(norm)) {
            seen.add(norm);
            merged.push(item);
          }
        }

        this.cache[category] = {
          lastUpdated: Date.now(),
          source: 'live_scraped',
          items: merged,
        };
        return true;
      }
    } catch (err) {
      console.warn(`[Scraper Warning] Live scraping failed for '${category}'. Using JSON cache.`, err);
    }

    // Fallback: keep existing cache or restore from initial
    if (!this.cache[category] || this.cache[category].items.length === 0) {
      this.cache[category] = {
        lastUpdated: Date.now(),
        source: 'cached_json',
        items: [...(INITIAL_CAPTIONS[category] || INITIAL_CAPTIONS['love'])],
      };
    }
    return false;
  }
}

export const captionService = new CaptionService();
