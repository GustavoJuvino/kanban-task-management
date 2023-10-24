import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { columns, tasks, subtasks } = body

  const deleteColumns = [
    await Promise.all(
      columns.map(async (col: ColumnsProps) => {
        if (col.columnName !== '') {
          await prisma.column.delete({
            where: {
              id: col.id,
              boardID: currentUser.id,
              columnName: col.columnName,
              fromBoard: col.fromBoard,
            },
          })
        }
        tasks.map(async (task: TaskProps) => {
          await prisma.task.delete({
            where: {
              id: task.id,
              title: task.title,
              itemID: col.itemID,
              fromColumn: col.columnName,
              columnID: currentUser.id,
            },
          })
          await Promise.all(
            subtasks.map(async (subtask: SubtaskProps) => {
              await prisma.subtask.delete({
                where: {
                  id: subtask.id,
                  name: subtask.name,
                  fromTask: task.title,
                  subtaskID: String(subtask.subtaskID),
                },
              })
            }),
          )
        })
      }),
    ),
  ]

  return NextResponse.json(deleteColumns)
}
