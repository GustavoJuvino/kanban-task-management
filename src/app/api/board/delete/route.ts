import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { board } = body

  const deleteBoard = [
    await prisma.board.delete({
      where: {
        boardName: board.boardName,
        userID: currentUser.id,
      },
    }),

    await prisma.column.deleteMany({
      where: {
        fromBoard: board.boardName.replace(/\s/g, ''),
        boardID: currentUser.id,
      },
    }),
  ]

  return NextResponse.json(deleteBoard)
}
