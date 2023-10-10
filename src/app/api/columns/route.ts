import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { columns } = body

  const deleteColumns = await Promise.all(
    columns.map(async (col: ColumnsProps) => {
      await prisma.column.delete({
        where: {
          id: col.id,
          boardID: currentUser.id,
          fromBoard: col.fromBoard,
        },
      })
    }),
  )

  return NextResponse.json(deleteColumns)
}
