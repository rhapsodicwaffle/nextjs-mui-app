'use client';

import { useMemo } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { ColorModeProvider, useColorMode } from '@/context/ColorModeContext';
import { AuthProvider } from '@/context/AuthContext';
import { getTheme } from '@/theme/theme';
import { Toaster } from 'sonner';

function MuiThemeWrapper({ children }: { children: React.ReactNode }) {
  const { mode } = useColorMode();
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Toaster position="top-right" richColors closeButton />
      {children}
    </ThemeProvider>
  );
}

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ColorModeProvider>
      <AuthProvider>
        <MuiThemeWrapper>{children}</MuiThemeWrapper>
      </AuthProvider>
    </ColorModeProvider>
  );
}
