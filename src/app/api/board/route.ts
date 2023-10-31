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

  const existingBoard = await prisma.board.findUnique({
    // eslint-disable-next-line object-shorthand
    where: { boardName: board.name },
  })

  if (existingBoard) {
    return NextResponse.json(
      { message: 'Board already exists' },
      {
        status: 409,
      },
    )
  }

  const createBoard = [
    await prisma.board.create({
      data: {
        boardName: board.name,
        currentBoard: board.name.replace(/\s/g, ''),
        userID: currentUser.id,
      },
    }),
    await Promise.all(
      boardColumns.map(async (column) => {
        await prisma.column.create({
          data: {
            fromBoard: board.name.replace(/\s/g, ''),
            columnName: column.updateColumnName,
            updateColumnName: column.updateColumnName,
            itemID: String(column.itemID),
            color: column.color,
            boardID: currentUser.id,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(createBoard)
}
