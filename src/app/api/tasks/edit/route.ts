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

  const existingTask =
    task.fromColumn !== task.updateColumn &&
    (await prisma.task.findFirst({
      where: { title: task.updateTitle, fromColumn: task.updateColumn },
    }))

  if (existingTask) {
    return NextResponse.json(
      { message: 'Task already exists in this column' },
      {
        status: 409,
      },
    )
  }

  const currentTask = [
    await prisma.task.update({
      where: {
        id: task.id,
        title: task.title,
        columnID: currentUser.id,
        fromColumn: task.fromColumn,
      },
      data: {
        title: task.updateTitle,
        updateTitle: task.updateTitle,
        description: task.description,
        fromColumn: task.updateColumn,
        updateColumn: task.updateColumn,
      },
    }),

    subtasks !== undefined &&
      (await Promise.all(
        subtasks?.map(
          async (subtask: SubtaskProps) =>
            subtask.id !== '' &&
            (await prisma.subtask.upsert({
              where: {
                id: subtask.id,
                taskID: currentUser.id,
                fromBoard: task.fromBoard,
                fromColumn: task.fromColumn,
              },
              update: {
                name: subtask.name,
                fromTask: task.updateTitle,
                fromColumn: task.updateColumn,
              },
              create: {
                name: subtask.name,
                fromTask: task.updateTitle,
                taskID: currentUser.id,
                fromColumn: task.updateColumn,
                completed: subtask.completed,
                fromBoard: task.fromBoard,
                subtaskID: String(subtask.subtaskID),
              },
            })),
        ),
      )),
  ]

  return NextResponse.json(currentTask)
}
