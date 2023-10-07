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
    // await prisma.board.update({
    //   where: {
    //     // eslint-disable-next-line object-shorthand
    //     boardName: board.currentBoard,
    //   },
    //   data: {
    //     boardName: board.name,
    //     currentBoard: board.name.replace(/\s/g, ''),
    //   },
    // }),

    await prisma.column.update({
      where: {
        // eslint-disable-next-line object-shorthand
        fromBoard: 'Board',
        id: '6521695a2916a46f690a7838',
        boardID: '6503513e3ad7c5d4849bbfcd',
        columnName: 'Todo',
      },
      data: {
        columnName: 'Todo Updated',
      },
    }),

    // await Promise.all(
    //   boardColumns.map(async (column) => {
    //     await prisma.column.upsert({
    //       where: {
    //         id: currentUser.id,
    //         itemID: String(column.id),
    //         fromBoard: board.currentBoard,
    //       },
    //       update: {
    //         columnName: column.columnName,
    //       },
    //       create: {
    //         fromBoard: board.currentBoard,
    //         columnName: column.columnName,
    //         itemID: String(column.id),
    //         color: column.color,
    //         boardID: currentUser.id,
    //       },
    //     })
    //   }),
    // ),
  ]

  return NextResponse.json(currentBoard)
}
