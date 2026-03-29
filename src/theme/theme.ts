import { createTheme, PaletteMode } from '@mui/material';

export function getTheme(mode: PaletteMode) {
  return createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            primary: { main: '#1976d2' },
            background: { default: '#f5f5f5', paper: '#ffffff' },
          }
        : {
            primary: { main: '#90caf9' },
            background: { default: '#121212', paper: '#1e1e1e' },
          }),
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    shape: {
      borderRadius: 8,
    },
  });
}
