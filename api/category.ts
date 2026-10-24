import type { VercelRequest, VercelResponse } from '@vercel/node';
import { captionService } from '../src/server/captionService';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const { name, limit, live, unlimited, no_limit } = req.query;

    if (name) {
      const categoryName = Array.isArray(name) ? name[0] : String(name);
      const limitVal = limit ? (Array.isArray(limit) ? limit[0] : String(limit)) : undefined;
      const liveVal = live ? (Array.isArray(live) ? live[0] : String(live)) : undefined;
      const isUnlimited = (unlimited as string) || (no_limit as string);

      const result = await captionService.getCaptionsByCategory(
        categoryName,
        limitVal,
        liveVal,
        isUnlimited
      );
      return res.status(200).json(result);
    }

    const result = captionService.getCategories();
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Error in /api/category handler:', err);
    return res.status(500).json({
      status: false,
      error: 'Failed to process caption request',
      developer: 'Aminulsordar',
      details: err?.message || 'Internal Server Error',
    });
  }
}
