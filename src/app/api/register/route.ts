import bcrypt from 'bcrypt'
import prisma from '@/app/libs/prismadb'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const body = await request.json()
  const { username, email, password } = body

  const existingEmail = await prisma.user.findUnique({
    // eslint-disable-next-line object-shorthand
    where: { email: email },
  })

  if (existingEmail) {
    return NextResponse.json(
      { user: null, message: 'Email already registered' },
      {
        status: 409,
      },
    )
  }

  const hashedPassword = await bcrypt.hash(password, 12)

  const user = await prisma.user.create({
    data: {
      username,
      email,
      hashedPassword,
    },
  })

  return NextResponse.json(user)
}
