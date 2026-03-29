'use client'

import { useState } from 'react'
import useSWR, { mutate } from 'swr'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Pagination,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material'
import { styled } from '@mui/material/styles'
import PageHeader from '@/components/ui/PageHeader'
import { PostCardSkeleton } from '@/components/ui/Skeletons'
import { AppAlert } from '@/components/ui'
import { toast } from 'sonner'
import type { Post } from '@/types/api'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}))

const EditIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
  </svg>
)

const DeleteIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
)

const ITEMS_PER_PAGE_OPTIONS = [6, 12, 24, 48]

export default function PostsPage() {
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(12)
  const {
    data: posts,
    error,
    isLoading,
  } = useSWR<Post[]>('/api/posts', fetcher)
  const [editDialog, setEditDialog] = useState<{
    open: boolean
    post: Post | null
  }>({
    open: false,
    post: null,
  })
  const [editTitle, setEditTitle] = useState('')
  const [editBody, setEditBody] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Calculate pagination
  const totalItems = Array.isArray(posts) ? posts.length : 0
  const totalPages = Math.ceil(totalItems / itemsPerPage)
  const startIndex = (page - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const paginatedPosts = Array.isArray(posts)
    ? posts.slice(startIndex, endIndex)
    : []

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value)
    setPage(1) // Reset to first page
  }

  const handleEdit = (post: Post) => {
    setEditDialog({ open: true, post })
    setEditTitle(post.title)
    setEditBody(post.body)
  }

  const handleUpdate = async () => {
    if (!editDialog.post) return

    setIsSubmitting(true)
    try {
      const res = await fetch(`/api/posts/${editDialog.post.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: editTitle, body: editBody }),
      })

      if (!res.ok) throw new Error('Failed to update post')

      // Optimistic update
      mutate('/api/posts')
      toast.success('Post updated successfully!')
      setEditDialog({ open: false, post: null })
    } catch (error) {
      toast.error('Failed to update post')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const res = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
      })

      if (!res.ok) throw new Error('Failed to delete post')

      // Optimistic update
      mutate('/api/posts')
      toast.success('Post deleted successfully!')
    } catch (error) {
      toast.error('Failed to delete post')
    }
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <PageHeader
        title="Posts Management"
        subtitle="Manage posts with SWR and pagination - Create, Read, Update, Delete"
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Posts' }]}
      />

      {/* Pagination Controls */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        flexWrap="wrap"
        gap={2}
      >
        <Typography variant="body2" color="text.secondary">
          Showing {startIndex + 1}-{Math.min(endIndex, totalItems)} of{' '}
          {totalItems} posts
        </Typography>
        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Per page</InputLabel>
          <Select
            value={itemsPerPage}
            label="Per page"
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            {ITEMS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {error && (
        <AppAlert severity="error" title="Error" sx={{ mb: 3 }}>
          Failed to load posts. Please try again.
        </AppAlert>
      )}

      {isLoading && (
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <Grid item xs={12} sm={6} md={4} key={n}>
              <PostCardSkeleton />
            </Grid>
          ))}
        </Grid>
      )}

      {paginatedPosts && (
        <>
          <Grid container spacing={3}>
            {paginatedPosts.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post.id}>
                <StyledCard variant="outlined">
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" gutterBottom fontWeight={600}>
                      {post.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {post.body.substring(0, 100)}...
                    </Typography>
                  </CardContent>
                  <CardActions sx={{ px: 2, pb: 2 }}>
                    <IconButton
                      size="small"
                      onClick={() => handleEdit(post)}
                      color="primary"
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => handleDelete(post.id)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </CardActions>
                </StyledCard>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          {totalPages > 1 && (
            <Box display="flex" justifyContent="center" mt={4}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
              />
            </Box>
          )}
        </>
      )}

      <Dialog
        open={editDialog.open}
        onClose={() => setEditDialog({ open: false, post: null })}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit Post</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Title"
              value={editTitle}
              onChange={(e) => setEditTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Body"
              value={editBody}
              onChange={(e) => setEditBody(e.target.value)}
              fullWidth
              multiline
              rows={4}
              required
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditDialog({ open: false, post: null })}>
            Cancel
          </Button>
          <Button
            onClick={handleUpdate}
            variant="contained"
            disabled={isSubmitting || !editTitle || !editBody}
          >
            {isSubmitting ? 'Updating...' : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  )
}
