'use client'

import { useEffect, useRef } from 'react'
import {
  Container,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Box,
  CircularProgress,
  Button,
} from '@mui/material'
import Link from 'next/link'
import useSWRInfinite from 'swr/infinite'
import PageHeader from '@/components/ui/PageHeader'
import { AppAlert } from '@/components/ui'
import type { User } from '@/lib/users'

const PAGE_SIZE = 5

const fetcher = (url: string) =>
  fetch(url).then((res) => {
    if (!res.ok) throw new Error('Failed to fetch')
    return res.json()
  })

const getKey = (pageIndex: number, previousPageData: User[] | null) => {
  // Reached the end
  if (previousPageData && previousPageData.length === 0) return null

  // First page
  if (pageIndex === 0)
    return `https://jsonplaceholder.typicode.com/users?_page=1&_limit=${PAGE_SIZE}`

  // Add the cursor to the API endpoint
  return `https://jsonplaceholder.typicode.com/users?_page=${
    pageIndex + 1
  }&_limit=${PAGE_SIZE}`
}

export default function UsersInfiniteScrollPage() {
  const { data, error, size, setSize, isLoading, isValidating } =
    useSWRInfinite<User[]>(getKey, fetcher, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
    })

  const observerTarget = useRef<HTMLDivElement>(null)

  // Flatten the data from all pages
  const users = data ? data.flat() : []
  const isLoadingMore =
    isLoading || (size > 0 && data && typeof data[size - 1] === 'undefined')
  const isEmpty = data?.[0]?.length === 0
  const isReachingEnd =
    isEmpty || (data && data[data.length - 1]?.length < PAGE_SIZE)

  // Infinite scroll with Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && !isReachingEnd) {
          setSize(size + 1)
        }
      },
      { threshold: 1.0 }
    )

    const currentTarget = observerTarget.current
    if (currentTarget) {
      observer.observe(currentTarget)
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget)
      }
    }
  }, [isLoadingMore, isReachingEnd, size, setSize])

  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 6 }}>
        <PageHeader
          title="Users (Infinite Scroll)"
          subtitle="Automatically load more users as you scroll down."
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
        title="Users (Infinite Scroll)"
        subtitle="Automatically load more users as you scroll down with SWR Infinite."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Users' }]}
      />

      {isLoading && users.length === 0 ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
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

          {/* Intersection observer target */}
          <Box ref={observerTarget} py={2}>
            {isLoadingMore && (
              <Box display="flex" justifyContent="center">
                <CircularProgress size={24} />
              </Box>
            )}
            {isReachingEnd && users.length > 0 && (
              <Typography variant="body2" color="text.secondary" align="center">
                No more users to load
              </Typography>
            )}
          </Box>

          {/* Manual load more button as fallback */}
          {!isReachingEnd && !isLoadingMore && (
            <Box display="flex" justifyContent="center" mt={2}>
              <Button
                variant="outlined"
                onClick={() => setSize(size + 1)}
                disabled={isValidating}
              >
                Load More
              </Button>
            </Box>
          )}

          <Typography
            variant="caption"
            color="text.disabled"
            sx={{ mt: 3, display: 'block' }}
          >
            {users.length} users loaded · infinite scroll with SWR
          </Typography>
        </>
      )}
    </Container>
  )
}
