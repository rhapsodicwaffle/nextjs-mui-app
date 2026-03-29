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

// Async Server Component — no 'use client' needed
export default async function UsersPage() {
  const users = await getUsers()

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
            <Link href={`/users/${user.id}`} passHref legacyBehavior>
              <ListItemButton component="a">
                <ListItemText
                  primary={user.name}
                  secondary={user.email}
                  primaryTypographyProps={{ fontWeight: 500 }}
                />
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
      </List>

      <Typography variant="caption" color="text.disabled" sx={{ mt: 3, display: 'block' }}>
        {users.length} users loaded · revalidates every 5 min
      </Typography>
    </Container>
  )
}
