import { NextRequest, NextResponse } from 'next/server'
import { registerUser } from '@/lib/users-store'

export async function POST(request: NextRequest) {
  try {
    const { email, password, company, nip } = await request.json()

    if (!email || !password || !company || !nip) {
      return NextResponse.json(
        { error: 'Wszystkie pola są wymagane' },
        { status: 400 }
      )
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Hasło musi mieć co najmniej 6 znaków' },
        { status: 400 }
      )
    }

    const user = registerUser(email, password, company, nip)

    const token = Buffer.from(JSON.stringify({ userId: user.userId, email })).toString('base64')

    return NextResponse.json(
      { message: 'Rejestracja udana', token, userId: user.userId, email, company, nip },
      { status: 201 }
    )
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Błąd serwera'
    return NextResponse.json(
      { error: message },
      { status: error instanceof Error && message.includes('już zarejestrowany') ? 400 : 500 }
    )
  }
}
