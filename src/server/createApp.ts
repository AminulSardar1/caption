import express, { Express, Request, Response } from 'express';
import { captionService } from './captionService';

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  // CORS headers for API access
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next();
  });

  // 1. All Categories & Category Captions: /api/category
  app.get('/api/category', async (req: Request, res: Response) => {
    try {
      const { name, limit, live, unlimited, no_limit } = req.query;

      // If 'name' is provided in query (e.g. /api/category?name=love)
      if (name) {
        const result = await captionService.getCaptionsByCategory(
          String(name),
          limit ? String(limit) : undefined,
          live ? String(live) : undefined,
          (unlimited as string) || (no_limit as string)
        );
        return res.json(result);
      }

      // Otherwise, return all categories
      const result = captionService.getCategories();
      return res.json(result);
    } catch (err) {
      console.error('Error in /api/category:', err);
      return res.status(500).json({
        status: false,
        error: 'Failed to process caption request',
        developer: 'Aminulsordar',
      });
    }
  });

  // 2. Random Caption: /api/random?name=love
  app.get('/api/random', (req: Request, res: Response) => {
    try {
      const { name } = req.query;
      const result = captionService.getRandomCaption(name ? String(name) : undefined);
      return res.json(result);
    } catch (err) {
      console.error('Error in /api/random:', err);
      return res.status(500).json({
        status: false,
        error: 'Failed to fetch random caption',
        developer: 'Aminulsordar',
      });
    }
  });

  // 3. Stats & Health: /api/stats and /api/health
  app.get(['/api/stats', '/api/health'], (req: Request, res: Response) => {
    return res.json(captionService.getStats());
  });

  // 4. Force Live Scrape / Cache Refresh: /api/scrape/refresh
  app.post('/api/scrape/refresh', async (req: Request, res: Response) => {
    try {
      const category = (req.body?.category || req.query?.category || 'love') as string;
      const success = await captionService.tryScrapeLiveCategory(category);
      return res.json({
        status: true,
        scraped: success,
        category,
        message: success
          ? `Successfully live scraped lovelycaption.com for '${category}'`
          : `Live scrape fallback applied to cached repository for '${category}'`,
      });
    } catch (err) {
      return res.status(500).json({ status: false, error: 'Scrape refresh failed' });
    }
  });

  return app;
}
