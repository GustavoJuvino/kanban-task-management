import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { board, columns } = body

  const deleteBoard = [
    await prisma.board.delete({
      where: {
        id: board.id,
        boardName: board.name,
        userID: currentUser.id,
      },
    }),

    await Promise.all(
      columns.map(async (col: ColumnsProps) => {
        await prisma.column.deleteMany({
          where: {
            fromBoard: col.fromBoard,
            boardID: col.boardID,
          },
        })
        await prisma.task.deleteMany({
          where: {
            fromColumn: col.columnName,
            columnID: currentUser.id,
          },
        })

        await prisma.subtask.deleteMany({
          where: {
            fromColumn: col.columnName,
            taskID: currentUser.id,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(deleteBoard)
}
