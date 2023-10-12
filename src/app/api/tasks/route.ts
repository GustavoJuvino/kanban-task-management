import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: TaskFormInputs = await request.json()
  const { task, subtasks } = body

  const createTask = [
    await prisma.task.create({
      data: {
        title: task.title,
        description: task.description,
        status: task.status,
        columnID: currentUser.id,

        // boardName: board.name,
        // currentBoard: board.name.replace(/\s/g, ''),
        // userID: currentUser.id,
      },
    }),
    await Promise.all(
      subtasks.map(async (subtask) => {
        await prisma.subtask.create({
          data: {
            name: subtask.name,
            subtaskID: String(subtask.subtaskID),
            taskID: currentUser.id,

            // fromBoard: board.name.replace(/\s/g, ''),
            // columnName: column.columnName,
            // itemID: String(column.itemID),
            // color: column.color,
            // boardID: currentUser.id,
          },
        })
      }),
    ),
  ]

  return NextResponse.json(createTask)
}
