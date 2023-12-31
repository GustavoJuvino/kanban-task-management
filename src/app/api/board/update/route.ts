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
        id: board.id,
        boardName: board.currentBoard,
      },
      data: {
        boardName: board.name,
        currentBoard: board.name.replace(/\s/g, ''),
      },
    }),

    await Promise.all(
      boardColumns.map(async (column) => {
        await prisma.column.upsert({
          where: {
            id: column.id,
            boardID: currentUser.id,
            columnName: column.columnName,
          },
          update: {
            columnName: column.updateColumnName,
            updateColumnName: column.updateColumnName,
            fromBoard: board.name.replace(/\s/g, ''),
          },
          create: {
            fromBoard: board.name.replace(/\s/g, ''),
            columnName: column.updateColumnName,
            updateColumnName: column.updateColumnName,
            itemID: String(column.itemID),
            color: column.color,
            boardID: currentUser.id,
          },
        })

        tasks.map(async (task) => {
          if ((task.id !== '', task.fromColumn === column.columnName)) {
            await prisma.task.update({
              where: {
                id: task.id,
                title: task.title,
                columnID: currentUser.id,
                fromBoard: column.fromBoard,
                fromColumn: column.columnName,
              },
              data: {
                fromBoard: board.name.replace(/\s/g, ''),
                fromColumn: column.updateColumnName,
                updateColumn: column.updateColumnName,
              },
            })

            subtasks !== undefined &&
              (await Promise.all(
                subtasks.map(async (subtask) => {
                  if (
                    subtask.id !== '' &&
                    subtask.fromColumn === column.columnName
                  ) {
                    await prisma.subtask.update({
                      where: {
                        id: subtask.id,
                        name: subtask.name,
                        taskID: currentUser.id,
                        fromTask: subtask.fromTask,
                        fromColumn: subtask.fromColumn,
                      },
                      data: {
                        fromBoard: board.name.replace(/\s/g, ''),
                        fromColumn: column.updateColumnName,
                      },
                    })
                  }
                }),
              ))
          }
        })
      }),
    ),

    // await Promise.all(
    //   tasks.map(async (task) => {
    //     if (
    //       task.id !== '' &&
    //       task.fromBoard === board.name &&
    //       task.fromColumn === column.columnName
    //     ) {
    //   await prisma.task.update({
    //     where: {
    //       id: task.id,
    //       title: task.title,
    //       columnID: currentUser.id,
    //     },
    //     data: {
    //       fromBoard: board.name.replace(/\s/g, ''),
    //       fromColumn: column.updateColumnName,
    //       updateColumn: column.updateColumnName,
    //     },
    //   })
    // }

    //   }),
    // ),
  ]

  return NextResponse.json(currentBoard)
}
