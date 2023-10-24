import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { subtasks } = body

  const deleteSubs = [
    await Promise.all(
      subtasks.map(async (sub: SubtaskProps) => {
        if (sub.name !== '') {
          await prisma.subtask.delete({
            where: {
              id: sub.id,
              name: sub.name,
              fromTask: sub.fromTask,
              subtaskID: String(sub.subtaskID),
              fromColumn: sub.fromColumn,
            },
          })
        }
      }),
    ),
  ]

  return NextResponse.json(deleteSubs)
}
