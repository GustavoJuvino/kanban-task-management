import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: TaskProps[] = await request.json()

  const currentTasks = await Promise.all(
    body.map(async (task: any) => {
      await prisma.task.update({
        where: {
          id: task.id,
          title: task.title,
          fromBoard: task.fromBoard,
          fromColumn: task.fromColumn,
        },
        data: {
          title: task.updateTitle,
          fromColumn: task.updateColumn,
          itemID: task.itemID.toString(),
          updateColumn: task.updateColumn,
        },
      })

      task.subtasksIDS !== undefined &&
        task.subtasksIDS.length > 0 &&
        (await Promise.all(
          task.subtasksIDS.map(async (subtaskID: string) => {
            await prisma.subtask.update({
              where: {
                id: subtaskID,
                fromBoard: task.fromBoard,
                fromColumn: task.fromColumn,
              },
              data: {
                fromColumn: task.updateColumn,
              },
            })
          }),
        ))
    }),
  )

  return NextResponse.json(currentTasks)
}
