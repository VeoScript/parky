import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const artists = await prisma.users.findMany({
      select: {
        id: true,
        uuid: true,
        profile: true,
        account_type: true,
        name: true,
        username: true,
        followedBy: true
      }
    })
    res.status(200).json(artists)
  }
}