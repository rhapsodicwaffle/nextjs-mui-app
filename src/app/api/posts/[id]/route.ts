import { NextRequest, NextResponse } from 'next/server'
import { authenticateRequest, unauthorizedResponse } from '@/lib/auth/helpers'
import { PostSchema } from '@/lib/validation'

const API_BASE = 'https://jsonplaceholder.typicode.com'

type Params = {
  params: Promise<{ id: string }>
}

export async function GET(request: NextRequest, { params }: Params) {
  // Require authentication
  const user = await authenticateRequest(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`)
    if (!res.ok) throw new Error('Failed to fetch post')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch post' }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  // Require authentication
  const user = await authenticateRequest(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params
  try {
    const body = await request.json()

    // Validate input (partial update allowed)
    const validation = PostSchema.partial().safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        { error: validation.error.issues[0].message },
        { status: 400 }
      )
    }

    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(validation.data),
    })
    if (!res.ok) throw new Error('Failed to update post')
    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  // Require authentication
  const user = await authenticateRequest(request)
  if (!user) {
    return unauthorizedResponse()
  }

  const { id } = await params
  try {
    const res = await fetch(`${API_BASE}/posts/${id}`, {
      method: 'DELETE',
    })
    if (!res.ok) throw new Error('Failed to delete post')
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete post' },
      { status: 500 }
    )
  }
}
