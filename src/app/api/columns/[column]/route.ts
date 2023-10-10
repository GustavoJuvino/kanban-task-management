import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

// interface Iparams {
//   column: ColumnsProps[]
// }

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const body = await request.json()
  const { data } = body

  const deleteColumns = await Promise.all(
    data.map(async (col: ColumnsProps) => {
      await prisma.column.delete({
        where: {
          id: col.id,
          boardID: currentUser.id,
          fromBoard: col.fromBoard,
        },
      })
    }),
  )

  //   const deleteColumns = await prisma.column.delete({
  //     where: {
  //       id:,
  //       boardID: fromBoard,
  //     },
  //   })

  return NextResponse.json(deleteColumns)
}
