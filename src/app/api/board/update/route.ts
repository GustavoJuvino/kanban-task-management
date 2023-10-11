import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: BoardFormInputs = await request.json()
  const { board, boardColumns } = body

  const currentBoard = [
    await prisma.board.update({
      where: {
        // eslint-disable-next-line object-shorthand
        boardName: board.currentBoard,
      },
      data: {
        boardName: board.name,
        currentBoard: board.name.replace(/\s/g, ''),
      },
    }),

    await Promise.all(
      boardColumns.map(async (column) => {
        await prisma.column.upsert({
          where: {
            id: column.id,
            boardID: currentUser.id,
          },
          update: {
            columnName: column.columnName,
            fromBoard: board.name.replace(/\s/g, ''),
          },
          create: {
            fromBoard: board.currentBoard.replace(/\s/g, ''),
            columnName: column.columnName,
            itemID: String(column.itemID),
            color: column.color,
            boardID: currentUser.id,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(currentBoard)
}
