'use client'

import { useState } from 'react'
import { Container, Divider, Grid, Stack, Typography } from '@mui/material'
import {
  AppAlert,
  AppButton,
  EmptyState,
  LoadingSpinner,
  PageHeader,
  StatCard,
  StatusBadge,
  UserCard,
} from '@/components/ui'
import type { BadgeStatus } from '@/components/ui'

const BADGE_STATUSES: BadgeStatus[] = [
  'active',
  'inactive',
  'pending',
  'error',
  'success',
  'warning',
]

const SAMPLE_USERS = [
  { id: 1, name: 'Alice Nguyen', role: 'Engineer' },
  { id: 2, name: 'Bob Tanaka', role: 'Designer' },
  { id: 3, name: 'Carol Smith', role: 'Product Manager' },
]

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section style={{ marginBottom: 48 }}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        {title}
      </Typography>
      <Divider sx={{ mb: 3 }} />
      {children}
    </section>
  )
}

export default function ComponentsPage() {
  const [loadingBtn, setLoadingBtn] = useState(false)

  const handleLoadingDemo = () => {
    setLoadingBtn(true)
    setTimeout(() => setLoadingBtn(false), 2000)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <PageHeader
        title="Component Library"
        subtitle="Reusable MUI-based components available across the app."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Components' }]}
      />

      {/* AppButton */}
      <Section title="AppButton">
        <Stack direction="row" flexWrap="wrap" gap={2} alignItems="center">
          <AppButton solid>Primary</AppButton>
          <AppButton variant="outlined">Outlined</AppButton>
          <AppButton variant="text">Text</AppButton>
          <AppButton solid color="error">
            Danger
          </AppButton>
          <AppButton solid color="success">
            Success
          </AppButton>
          <AppButton solid disabled>
            Disabled
          </AppButton>
          <AppButton solid loading={loadingBtn} onClick={handleLoadingDemo}>
            {loadingBtn ? '' : 'Click to load'}
          </AppButton>
        </Stack>
      </Section>

      {/* StatusBadge */}
      <Section title="StatusBadge">
        <Stack direction="row" flexWrap="wrap" gap={1.5}>
          {BADGE_STATUSES.map((s) => (
            <StatusBadge key={s} status={s} />
          ))}
        </Stack>
      </Section>

      {/* AppAlert */}
      <Section title="AppAlert">
        <Stack gap={1.5}>
          <AppAlert severity="info" title="Info" dismissible>
            This is an informational alert that can be dismissed.
          </AppAlert>
          <AppAlert severity="success" title="Success">
            Your changes have been saved successfully.
          </AppAlert>
          <AppAlert severity="warning">
            Warning — please review before proceeding.
          </AppAlert>
          <AppAlert severity="error" title="Error" dismissible>
            Something went wrong. Please try again.
          </AppAlert>
        </Stack>
      </Section>

      {/* StatCard */}
      <Section title="StatCard">
        <Grid container spacing={3}>
          {[
            {
              label: 'Total Users',
              value: '3,842',
              description: '+12% from last month',
            },
            {
              label: 'Active Sessions',
              value: '128',
              description: 'Live right now',
            },
            { label: 'Revenue', value: '$24,580', description: 'March 2026' },
            { label: 'Loading…', value: 0, loading: true },
          ].map(({ label, value, description, loading: l }) => (
            <Grid item xs={12} sm={6} md={3} key={label}>
              <StatCard
                label={label}
                value={value}
                description={description}
                loading={l}
              />
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* UserCard */}
      <Section title="UserCard">
        <Grid container spacing={2}>
          {SAMPLE_USERS.map((u) => (
            <Grid item xs={12} sm={6} md={4} key={u.id}>
              <UserCard name={u.name} role={u.role} />
            </Grid>
          ))}
        </Grid>
      </Section>

      {/* EmptyState */}
      <Section title="EmptyState">
        <EmptyState
          title="No results found"
          description="Try adjusting your search or filters to find what you're looking for."
          action={<AppButton solid>Reset filters</AppButton>}
          sx={{
            border: '1px dashed',
            borderColor: 'divider',
            borderRadius: 2,
            py: 6,
          }}
        />
      </Section>

      {/* LoadingSpinner */}
      <Section title="LoadingSpinner">
        <LoadingSpinner label="Fetching data…" size={40} />
      </Section>
    </Container>
  )
}
