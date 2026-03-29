'use client';

import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from '@mui/material'
import Link from 'next/link'
import { getUsers } from '@/lib/users'
import PageHeader from '@/components/ui/PageHeader'
import { useEffect, useState } from 'react'
import type { User } from '@/lib/users'

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers().then((data) => {
      setUsers(data)
      setLoading(false)
    })
  }, [])

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <Typography>Loading...</Typography>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <PageHeader
        title="Users"
        subtitle="Fetched server-side from JSONPlaceholder via async Server Component."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
      />

      <List disablePadding>
        {users.map((user) => (
          <ListItem key={user.id} disablePadding divider>
            <ListItemButton href={`/users/${user.id}`} LinkComponent={Link}>
              <ListItemText
                primary={user.name}
                secondary={user.email}
                primaryTypographyProps={{ fontWeight: 500 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Typography variant="caption" color="text.disabled" sx={{ mt: 3, display: 'block' }}>
        {users.length} users loaded · revalidates every 5 min
      </Typography>
    </Container>
  )
}
