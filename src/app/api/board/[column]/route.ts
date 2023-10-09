import { NextResponse } from 'next/server'

import prisma from '@/app/libs/prismadb'
import getCurrentUser from '@/app/actions/getCurrentUser'

interface IDParams {
  columns: string
}

export async function DELETE(
  request: Request,
  { params }: { params: IDParams },
) {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return NextResponse.error()
  }

  const { columns } = params

  // const deleteColumns = await Promise.all(
  //   excludeColumns.map(async (column: ColumnsProps) => {
  //     await prisma.column.deleteMany({
  //       where: {
  //         id: '6503513e3ad7c5d4849bbfcd',
  //         boardID: '6503513e3ad7c5d4849bbfcd',
  //         fromBoard: 'WebTesting',
  //       },
  //     })
  //   }),
  // )

  const deleteColumns = await prisma.column.delete({
    where: {
      id: columns,
      boardID: currentUser.id,
      fromBoard: 'WebTesting',
    },
  })

  return NextResponse.json(deleteColumns)
}
