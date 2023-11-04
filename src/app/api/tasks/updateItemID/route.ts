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
        },
        data: {
          title: task.updateTitle,
          fromColumn: task.fromColumn,
          itemID: task.itemID.toString(),
        },
      })

      task.subtasksIDS !== undefined &&
        (await Promise.all(
          task.subtasksIDS.map(async (id: string) => {
            await prisma.subtask.update({
              where: {
                id,
                fromBoard: task.fromBoard,
              },
              data: {
                fromColumn: task.fromColumn,
              },
            })
          }),
        ))
    }),
  )

  return NextResponse.json(currentTasks)
}
