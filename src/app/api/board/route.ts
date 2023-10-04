import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: BoardFormInputs = await request.json()
  const { boardName, boardColumns } = body

  const board = [
    await prisma.board.create({
      data: {
        boardName,
        userID: currentUser.id,
      },
    }),
    await Promise.all(
      boardColumns.map(async (column) => {
        await prisma.column.create({
          data: {
            fromBoard: boardName.replace(/\s/g, ''),
            columnName: column.columnName,
            itemID: String(column.id),
            boardID: currentUser.id,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(board)
}
