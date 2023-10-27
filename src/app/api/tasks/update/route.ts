import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { task, subtasks } = body

  const currentTask = [
    await prisma.task.update({
      where: {
        id: task.id,
        title: task.title,
        fromBoard: task.fromBoard,
        fromColumn: task.fromColumn,
      },
      data: {
        status: task.status,
      },
    }),

    subtasks !== undefined &&
      (await Promise.all(
        subtasks?.map(async (subtask: SubtaskProps) => {
          await prisma.subtask.update({
            where: {
              id: subtask.id,
              name: subtask.name,
              taskID: currentUser.id,
              fromColumn: task.fromColumn,
              fromBoard: subtask.fromBoard,
            },
            data: {
              completed: subtask.completed,
            },
          })
        }),
      )),
  ]

  return NextResponse.json(currentTask)
}
