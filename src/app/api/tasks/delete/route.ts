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

  const deleteTask = [
    task.id !== undefined &&
      (await prisma.task.delete({
        where: {
          id: task.id,
          columnID: task.columnID,
          title: task.title,
        },
      })),

    await prisma.subtask.deleteMany({
      where: {
        fromTask: task.title,
        fromColumn: task.fromColumn,
      },
    }),
  ]

  return NextResponse.json(deleteTask)
}
