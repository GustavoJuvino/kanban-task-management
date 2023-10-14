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

  const createTask = [
    await Promise.all(
      columns.map(
        async (col) =>
          task.status === col.columnName &&
          (await prisma.task.create({
            data: {
              title: task.title,
              itemID: col.itemID,
              status: task.status,
              columnID: currentUser.id,
              description: task.description,
            },
          })),
      ),
    ),

    // await prisma.task.create({
    //   data: {
    //     title: task.title,
    //     description: task.description,
    //     status: task.status,
    //     columnID: currentUser.id,
    //   },
    // }),

    await Promise.all(
      subtasks.map(async (subtask) => {
        await prisma.subtask.create({
          data: {
            name: subtask.name,
            fromTask: task.title,
            taskID: currentUser.id,
            subtaskID: String(subtask.subtaskID),
          },
        })
      }),
    ),
  ]

  return NextResponse.json(createTask)
}
