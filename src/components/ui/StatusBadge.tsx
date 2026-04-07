'use client'

import { Chip, type ChipProps } from '@mui/material'

export type BadgeStatus =
  | 'active'
  | 'inactive'
  | 'pending'
  | 'error'
  | 'success'
  | 'warning'

const STATUS_MAP: Record<
  BadgeStatus,
  { label: string; color: ChipProps['color'] }
> = {
  active: { label: 'Active', color: 'success' },
  inactive: { label: 'Inactive', color: 'default' },
  pending: { label: 'Pending', color: 'warning' },
  error: { label: 'Error', color: 'error' },
  success: { label: 'Success', color: 'success' },
  warning: { label: 'Warning', color: 'warning' },
}

type StatusBadgeProps = Omit<ChipProps, 'color' | 'label'> & {
  status: BadgeStatus
  label?: string
}
export default function StatusBadge({
  status,
  label,
  size = 'small',
  ...rest
}: StatusBadgeProps) {
  const { label: defaultLabel, color } = STATUS_MAP[status]

  return (
    <Chip
      label={label ?? defaultLabel}
      color={color}
      size={size}
      sx={{ fontWeight: 600, letterSpacing: 0.4 }}
      {...rest}
    />
  )
}
