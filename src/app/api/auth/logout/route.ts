import { NextResponse } from 'next/server'
import type { AuthResponse } from '@/types/auth'

export async function POST() {
  try {
    const response = NextResponse.json({
      success: true,
      message: 'Logged out successfully',
    } as AuthResponse)

    // Clear the auth token cookie
    response.cookies.set('auth-token', '', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 0,
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred during logout',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
