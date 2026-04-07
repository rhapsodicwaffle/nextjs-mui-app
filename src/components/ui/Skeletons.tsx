import { Skeleton, Card, CardContent, Box, Stack } from '@mui/material'

export function PostCardSkeleton() {
  return (
    <Card variant="outlined">
      <CardContent>
        <Skeleton variant="text" width="60%" height={32} />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="100%" />
        <Skeleton variant="text" width="80%" />
        <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
          <Skeleton variant="rectangular" width={80} height={32} />
          <Skeleton variant="rectangular" width={80} height={32} />
        </Box>
      </CardContent>
    </Card>
  )
}

export function ListItemSkeleton() {
  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
      <Skeleton variant="text" width="70%" height={24} />
      <Skeleton variant="text" width="40%" height={20} />
    </Box>
  )
}

export function FormSkeleton() {
  return (
    <Stack spacing={3}>
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Skeleton variant="rectangular" width="100%" height={56} />
      <Skeleton variant="rectangular" width="100%" height={120} />
      <Skeleton variant="rectangular" width={120} height={42} />
    </Stack>
  )
}
