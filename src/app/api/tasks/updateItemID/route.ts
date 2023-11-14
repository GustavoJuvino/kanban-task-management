import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { tasks, subtasks } = body

  const currentTasks = [
    await Promise.all(
      tasks.map(async (task: TaskProps) => {
        await prisma.task.update({
          where: {
            id: task.id,
          },
          data: {
            fromColumn: task.updateColumn,
            itemID: task.itemID,
            updateColumn: task.updateColumn,
          },
        })
      }),
    ),

    await Promise.all(
      subtasks.map(async (sub: SubtaskProps) => {
        await prisma.subtask.update({
          where: {
            id: sub.id,
            fromTask: sub.fromTask,
            fromBoard: sub.fromBoard,
          },
          data: {
            fromColumn: sub.fromColumn,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(currentTasks)
}
