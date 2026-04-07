export interface User {
  id: number
  email: string
  name: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  name: string
}

export interface AuthResponse {
  success: boolean
  user?: User
  message?: string
}

export interface JWTPayload {
  userId: number
  email: string
  name: string
  iat?: number
  exp?: number
}
