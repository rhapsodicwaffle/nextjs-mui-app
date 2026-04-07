'use client'

import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
} from '@mui/material'
import Link from 'next/link'
import useSWR from 'swr'
import PageHeader from '@/components/ui/PageHeader'
import { AppAlert } from '@/components/ui'
import type { User } from '@/lib/users'

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })

export default function UsersPage() {
  const {
    data: users,
    error,
    isLoading,
  } = useSWR<User[]>('https://jsonplaceholder.typicode.com/users', fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: true,
    dedupingInterval: 300000, // 5 minutes
  })

  if (isLoading) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <PageHeader
          title="Users"
          subtitle="Fetched with SWR for optimal caching and revalidation."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
        />
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      </Container>
    )
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <PageHeader
          title="Users"
          subtitle="Fetched with SWR for optimal caching and revalidation."
          breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
        />
        <AppAlert severity="error" title="Error" sx={{ mt: 3 }}>
          Failed to load users. Please try again.
        </AppAlert>
      </Container>
    )
  }

  return (
    <Container maxWidth="md" sx={{ py: 6 }}>
      <PageHeader
        title="Users"
        subtitle="Fetched with SWR for optimal caching and revalidation."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
      />

      <List disablePadding>
        {users?.map((user) => (
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

      <Typography
        variant="caption"
        color="text.disabled"
        sx={{ mt: 3, display: 'block' }}
      >
        {users?.length || 0} users loaded · cached with SWR
      </Typography>
    </Container>
  )
}
