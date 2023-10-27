import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function POST(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body: BoardFormInputs = await request.json()
  const { board, boardColumns, tasks, subtasks } = body

  const currentBoard = [
    await prisma.board.update({
      where: {
        // eslint-disable-next-line object-shorthand
        boardName: board.currentBoard,
      },
      data: {
        boardName: board.name,
        currentBoard: board.name.replace(/\s/g, ''),
      },
    }),

    await Promise.all(
      boardColumns.map(async (column) => {
        boardColumns !== undefined &&
          (await prisma.column.upsert({
            where: {
              id: column.id,
              boardID: currentUser.id,
            },
            update: {
              columnName: column.columnName,
              fromBoard: board.name.replace(/\s/g, ''),
            },
            create: {
              fromBoard: board.name.replace(/\s/g, ''),
              columnName: column.columnName,
              itemID: String(column.itemID),
              color: column.color,
              boardID: currentUser.id,
            },
          }))
      }),
    ),

    tasks !== undefined &&
      (await Promise.all(
        tasks.map(async (task) => {
          if (task.id !== '' && task.fromBoard === board.name) {
            await prisma.task.update({
              where: {
                id: task.id,
                title: task.title,
                columnID: currentUser.id,
              },
              data: {
                fromBoard: board.name.replace(/\s/g, ''),
                fromColumn: boardColumns[Number(task.itemID)].columnName,
                updateColumn: boardColumns[Number(task.itemID)].columnName,
              },
            })
          }

          subtasks !== undefined &&
            (await Promise.all(
              subtasks.map(async (subtask) => {
                if (
                  subtask.id !== '' &&
                  subtask.fromTask === task.title &&
                  subtask.fromColumn === task.fromColumn &&
                  subtask.fromBoard === board.name
                ) {
                  await prisma.subtask.update({
                    where: {
                      id: subtask.id,
                      name: subtask.name,
                      fromTask: subtask.fromTask,
                      fromColumn: subtask.fromColumn,
                    },
                    data: {
                      fromBoard: board.name.replace(/\s/g, ''),
                      fromColumn: boardColumns[Number(task.itemID)].columnName,
                    },
                  })
                }
              }),
            ))
        }),
      )),
  ]

  return NextResponse.json(currentBoard)
}
