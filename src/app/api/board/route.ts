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

  const existingBoard = await prisma.board.findUnique({
    // eslint-disable-next-line object-shorthand
    where: { boardName: boardName },
  })

  if (existingBoard) {
    return NextResponse.json(
      { message: 'Board already exists' },
      {
        status: 409,
      },
    )
  }

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
            color: column.color,
            boardID: currentUser.id,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(board)
}
