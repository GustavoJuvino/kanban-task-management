import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getBoard() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const boards = await prisma.board.findMany({
      where: {
        userID: currentUser.id,
      },
    })

    return boards
  } catch (error: any) {
    throw new Error(error)
  } finally {
    console.log('finished')
  }
}
