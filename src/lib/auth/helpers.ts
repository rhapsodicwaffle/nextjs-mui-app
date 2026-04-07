import { NextRequest } from 'next/server'
import { verifyJWT } from './jwt'
import type { JWTPayload } from '@/types/auth'

export async function authenticateRequest(
  request: NextRequest
): Promise<JWTPayload | null> {
  const token = request.cookies.get('auth-token')?.value

  if (!token) {
    return null
  }

  return await verifyJWT(token)
}

export function unauthorizedResponse() {
  return Response.json({ error: 'Unauthorized' }, { status: 401 })
}
