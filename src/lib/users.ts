export type User = {
  id: number
  name: string
  email: string
  username: string
}

const API_BASE = 'https://jsonplaceholder.typicode.com'

export async function getUsers(): Promise<User[]> {
  const res = await fetch(`${API_BASE}/users`, {
    next: { revalidate: 300 },
  })
  if (!res.ok) throw new Error('Failed to fetch users')
  return res.json()
}

export async function getUserById(id: string): Promise<User | null> {
  const res = await fetch(`${API_BASE}/users/${id}`, {
    next: { revalidate: 300 },
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to fetch user')
  return res.json()
}
