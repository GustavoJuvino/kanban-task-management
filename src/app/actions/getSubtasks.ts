import prisma from '@/app/libs/prismadb'

import getCurrentUser from './getCurrentUser'

export default async function getSubtasks() {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return []

    const tasks = await prisma.subtask.findMany({
      where: {
        taskID: currentUser.id,
      },
    })

    return tasks
  } catch (error: any) {
    throw new Error(error)
  }
}
