import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getColumns(currentBoard: string) {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const columns = await prisma.column.findMany({
      where: {
        fromBoard: currentBoard,
        boardID: currentUser.id,
      },
    })

    return columns
  } catch (error: any) {
    throw new Error(error)
  }
}
