import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '~/lib/Prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(500).json('GET Method Only')
  } else {
    const get_compositions = await prisma.compositions.findMany({
      orderBy: [
        {
          id: 'desc'
        }
      ],
      select: {
        id: true,
        uuid: true,
        title: true,
        description: true,
        content: true,
        status: true,
        date: true,
        likes: true,
        comments: true,
        bookmarks: true,
        user: {
          select: {
            id: true,
            uuid: true,
            profile: true,
            account_type: true,
            name: true,
            username: true
          }
        }
      }
    })
    res.status(200).json(get_compositions)
  }
}