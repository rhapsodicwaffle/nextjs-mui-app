import {
  Card,
  CardContent,
  Skeleton,
  Typography,
  Box,
  type SxProps,
  type Theme,
} from '@mui/material'

type StatCardProps = {
  label: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  loading?: boolean
  sx?: SxProps<Theme>
}
export default function StatCard({
  label,
  value,
  description,
  icon,
  loading = false,
  sx,
}: StatCardProps) {
  return (
    <Card variant="outlined" sx={{ height: '100%', ...sx }}>
      <CardContent>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
        >
          <Typography
            variant="overline"
            color="text.secondary"
            letterSpacing={1}
          >
            {label}
          </Typography>
          {icon && (
            <Box sx={{ color: 'primary.main', opacity: 0.8 }}>{icon}</Box>
          )}
        </Box>

        {loading ? (
          <>
            <Skeleton variant="text" width="60%" height={48} />
            {description && <Skeleton variant="text" width="80%" />}
          </>
        ) : (
          <>
            <Typography variant="h4" fontWeight={700} sx={{ my: 0.5 }}>
              {value}
            </Typography>
            {description && (
              <Typography variant="body2" color="text.secondary">
                {description}
              </Typography>
            )}
          </>
        )}
      </CardContent>
    </Card>
  )
}
