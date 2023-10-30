import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: BoardFormInputs = await request.json()
  const { tasks } = body

  const currentTasks =
    tasks &&
    (await Promise.all(
      tasks.map(async (task) => {
        await prisma.task.update({
          where: {
            id: task.id,
            title: task.title,
            fromBoard: task.fromBoard,
            fromColumn: task.fromColumn,
          },
          data: {
            itemID: task.itemID,
          },
        })
      }),
    ))

  return NextResponse.json(currentTasks)
}
