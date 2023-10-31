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
          itemID: task.itemID,
          title: task.updateTitle,
        },
      })
    }),
  )

  return NextResponse.json(currentTasks)
}
