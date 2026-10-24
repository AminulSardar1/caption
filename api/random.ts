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
    const { name } = req.query;
    const catName = name ? (Array.isArray(name) ? name[0] : String(name)) : undefined;
    const result = captionService.getRandomCaption(catName);
    return res.status(200).json(result);
  } catch (err: any) {
    console.error('Error in /api/random handler:', err);
    return res.status(500).json({
      status: false,
      error: 'Failed to fetch random caption',
      developer: 'Aminulsordar',
      details: err?.message || 'Internal Server Error',
    });
  }
}
