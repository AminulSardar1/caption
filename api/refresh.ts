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
    const category = (req.body?.category || req.query?.category || 'love') as string;
    const success = await captionService.tryScrapeLiveCategory(category);
    return res.status(200).json({
      status: true,
      scraped: success,
      category,
      message: success
        ? `Successfully live scraped lovelycaption.com for '${category}'`
        : `Live scrape fallback applied to cached repository for '${category}'`,
    });
  } catch (err: any) {
    return res.status(500).json({ status: false, error: err?.message || 'Scrape refresh failed' });
  }
}
