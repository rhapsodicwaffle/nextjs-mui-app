import { SignJWT, jwtVerify } from 'jose'
import type { JWTPayload } from '@/types/auth'

const SECRET_KEY = new TextEncoder().encode(
  process.env.JWT_SECRET || 'your-secret-key-change-in-production'
)

const TOKEN_EXPIRY = '7d' // 7 days

export async function signJWT(payload: JWTPayload): Promise<string> {
  try {
    const token = await new SignJWT({
      userId: payload.userId,
      email: payload.email,
      name: payload.name,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime(TOKEN_EXPIRY)
      .sign(SECRET_KEY)

    return token
  } catch (error) {
    throw new Error('Failed to sign JWT')
  }
}

export async function verifyJWT(token: string): Promise<JWTPayload | null> {
  try {
    const verified = await jwtVerify(token, SECRET_KEY)
    const payload = verified.payload

    // Ensure payload has required fields
    if (
      typeof payload.userId === 'number' &&
      typeof payload.email === 'string' &&
      typeof payload.name === 'string'
    ) {
      return {
        userId: payload.userId,
        email: payload.email,
        name: payload.name,
        iat: payload.iat,
        exp: payload.exp,
      }
    }

    return null
  } catch (error) {
    return null
  }
}

export async function refreshToken(oldToken: string): Promise<string | null> {
  const payload = await verifyJWT(oldToken)
  if (!payload) return null

  // Create new token with same payload
  return signJWT({
    userId: payload.userId,
    email: payload.email,
    name: payload.name,
  })
}
