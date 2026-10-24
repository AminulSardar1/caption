import type { VercelRequest, VercelResponse } from '@vercel/node';
import { captionService } from '../src/server/captionService';

export default function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  try {
    const stats = captionService.getStats();
    return res.status(200).json({
      status: true,
      service: 'Love Caption API',
      version: '1.0.0',
      developer: 'Aminulsordar',
      website: 'https://lovelycaption.com',
      endpoints: {
        all_categories: '/api/category',
        category_captions: '/api/category?name=love',
        single_caption: '/api/category?name=love&limit=1',
        random_caption: '/api/random?name=love',
        live_fetch: '/api/category?name=love&live=true',
        stats: '/api/stats',
      },
      stats,
    });
  } catch (err: any) {
    return res.status(500).json({
      status: false,
      error: 'API index handler error',
      details: err?.message,
    });
  }
}
