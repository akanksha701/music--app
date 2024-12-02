import type { NextApiResponse } from 'next';
import { getAuth } from '@clerk/nextjs/server';
import { NextRequest } from 'next/server';

export default function handler(req: NextRequest, res: NextApiResponse) {
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  res.status(200).json({});
}