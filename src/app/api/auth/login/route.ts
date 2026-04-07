import { NextRequest, NextResponse } from 'next/server'
import { signJWT } from '@/lib/auth/jwt'
import { LoginSchema } from '@/lib/validation'
import type { LoginRequest, AuthResponse } from '@/types/auth'

// Mock user database (in production, use a real database)
const MOCK_USERS = [
  {
    id: 1,
    email: 'demo@example.com',
    password: 'password123', // In production, this would be hashed
    name: 'Demo User',
  },
]

export async function POST(request: NextRequest) {
  try {
    const body: LoginRequest = await request.json()

    // Validate input
    const validation = LoginSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          message: validation.error.issues[0].message,
        } as AuthResponse,
        { status: 400 }
      )
    }

    const { email, password } = validation.data

    // Find user (in production, query database)
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    )

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email or password',
        } as AuthResponse,
        { status: 401 }
      )
    }

    // Generate JWT token
    const token = await signJWT({
      userId: user.id,
      email: user.email,
      name: user.name,
    })

    // Create response with httpOnly cookie
    const response = NextResponse.json({
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
      },
    } as AuthResponse)

    // Set httpOnly cookie (more secure than localStorage)
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
        message: 'An error occurred during login',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
