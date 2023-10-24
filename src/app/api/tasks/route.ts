import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: TaskFormInputs = await request.json()
  const { task, subtasks, columns } = body

  const existingTask = await prisma.task.findFirst({
    where: { title: task.title, fromColumn: task.updateColumn },
  })

  if (existingTask) {
    return NextResponse.json(
      { message: 'Task already exists in this column' },
      {
        status: 409,
      },
    )
  }

  const createTask = [
    await Promise.all(
      columns.map(async (col) => {
        if (task.updateColumn === col.columnName) {
          await prisma.task.create({
            data: {
              title: task.title,
              itemID: col.itemID,
              fromColumn: task.updateColumn,
              updateColumn: task.updateColumn,
              columnID: currentUser.id,
              description: task.description,
            },
          })
        }
      }),
    ),

    subtasks !== undefined &&
      (await Promise.all(
        subtasks?.map(async (subtask) => {
          await prisma.subtask.create({
            data: {
              name: subtask.name,
              fromTask: task.title,
              taskID: currentUser.id,
              fromColumn: task.updateColumn,
              completed: subtask.completed,
              subtaskID: String(subtask.subtaskID),
            },
          })
        }),
      )),
  ]

  return NextResponse.json(createTask)
}
