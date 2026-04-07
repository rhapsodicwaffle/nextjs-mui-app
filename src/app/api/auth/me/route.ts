import { NextRequest, NextResponse } from 'next/server'
import { verifyJWT } from '@/lib/auth/jwt'
import type { AuthResponse } from '@/types/auth'

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('auth-token')?.value

    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Not authenticated',
        } as AuthResponse,
        { status: 401 }
      )
    }

    const payload = await verifyJWT(token)

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid or expired token',
        } as AuthResponse,
        { status: 401 }
      )
    }

    return NextResponse.json({
      success: true,
      user: {
        id: payload.userId,
        email: payload.email,
        name: payload.name,
      },
    } as AuthResponse)
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: 'An error occurred',
      } as AuthResponse,
      { status: 500 }
    )
  }
}
