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
    board.id !== undefined &&
      (await prisma.board.delete({
        where: {
          id: board.id,
          userID: currentUser.id,
        },
      })),

    columns !== undefined &&
      (await Promise.all(
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
              fromBoard: board.boardName.replace(/\s/g, ''),
            },
          })

          await prisma.subtask.deleteMany({
            where: {
              fromColumn: col.columnName,
              taskID: currentUser.id,
              fromBoard: board.boardName.replace(/\s/g, ''),
            },
          })
        }),
      )),
  ]

  return NextResponse.json(deleteBoard)
}
