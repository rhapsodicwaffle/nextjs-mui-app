import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/lib/auth/jwt'
import { RegisterSchema } from '@/lib/validation'
import type { RegisterRequest, AuthResponse } from '@/types/auth'

// Mock user database (in production, use a real database)
const MOCK_USERS: Array<{
  id: number
  email: string
  password: string
  name: string
}> = []

export async function POST(request: NextRequest) {
  try {
    const body: RegisterRequest = await request.json()

    // Validate input
    const validation = RegisterSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        } as AuthResponse,
        { status: 400 }
      )
    }

    const { email, password, name } = validation.data

    // Check if user already exists
    const existingUser = MOCK_USERS.find((u) => u.email === email)
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: 'Email already registered',
        } as AuthResponse,
        { status: 409 }
      )
    }

    // Create new user (in production, hash password and save to database)
    const newUser = {
      id: MOCK_USERS.length + 1,
      email,
      password, // In production, hash this with bcrypt
      name,
    }

    MOCK_USERS.push(newUser)

    // Generate JWT token
    const token = await signJWT({
      userId: newUser.id,
      email: newUser.email,
      name: newUser.name,
    })

    // Create response with httpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
      },
    } as AuthResponse)

    // Set httpOnly cookie
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during registration',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
