'use client';

import { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeProvider, useColorMode } from '@/context/ColorModeContext';
import { getTheme } from '@/theme/theme';
import AppLayout from '@/components/layout/AppLayout';

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppLayout>{children}</AppLayout>
    </ThemeProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider>
      <MuiThemeWrapper>{children}</MuiThemeWrapper>
    </ColorModeProvider>
  );
}
