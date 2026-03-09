import { NextRequest, NextResponse } from 'next/server'
import { loginUser } from '@/lib/users-store'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email i hasło są wymagane' },
        { status: 400 }
      )
    }

    const user = loginUser(email, password)

    const token = Buffer.from(JSON.stringify({ userId: user.id, email })).toString('base64')

    return NextResponse.json({
      message: 'Logowanie udane',
      token,
      userId: user.id,
      email: user.email,
      company: user.company,
      nip: user.nip,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Błąd serwera'
    return NextResponse.json(
      { error: message },
      { status: 401 }
    )
  }
}
