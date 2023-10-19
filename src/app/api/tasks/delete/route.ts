import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { task } = body

  //   title: task.title,
  //   itemID: col.itemID,
  //   status: task.status,
  //   columnID: currentUser.id,
  //   description: task.description,

  const deleteTask = [
    await prisma.task.delete({
      where: {
        id: task.id,
        columnID: task.columnID,
        title: task.title,
      },
    }),

    await prisma.subtask.deleteMany({
      where: {
        fromTask: task.title,
      },
    }),
  ]

  //   const deleteBoard = [
  //     await prisma.board.delete({
  //       where: {
  //         boardName: board.boardName,
  //         userID: currentUser.id,
  //       },
  //     }),

  //     await prisma.column.deleteMany({
  //       where: {
  //         fromBoard: board.boardName.replace(/\s/g, ''),
  //         boardID: currentUser.id,
  //       },
  //     }),
  //   ]

  return NextResponse.json(deleteTask)
}
