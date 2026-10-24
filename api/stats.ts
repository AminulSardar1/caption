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
    return res.status(200).json(captionService.getStats());
  } catch (err: any) {
    return res.status(500).json({ status: false, error: err?.message || 'Failed to fetch stats' });
  }
}
