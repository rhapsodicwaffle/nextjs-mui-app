'use client';

import { IconButton, Tooltip } from '@mui/material';
import { useColorMode } from '@/context/ColorModeContext';


function SunIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 4a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0V5a1 1 0 0 1 1-1ZM12 18a1 1 0 0 1 1 1v1a1 1 0 0 1-2 0v-1a1 1 0 0 1 1-1ZM4 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2H5a1 1 0 0 1-1-1ZM18 12a1 1 0 0 1 1-1h1a1 1 0 0 1 0 2h-1a1 1 0 0 1-1-1ZM6.343 6.343a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414ZM15.536 15.536a1 1 0 0 1 1.414 0l.707.707a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 0 1 0-1.414ZM6.343 17.657a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0ZM15.536 8.464a1 1 0 0 1 0-1.414l.707-.707a1 1 0 0 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0ZM12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
      <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79Z" />
    </svg>
  );
}

export default function ThemeToggle() {
  const { mode, toggleColorMode } = useColorMode();

  return (
    <Tooltip title={mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}>
      <IconButton
        onClick={toggleColorMode}
        color="inherit"
        aria-label="toggle light/dark mode"
        sx={{ ml: 1 }}
      >
        {mode === 'light' ? <MoonIcon /> : <SunIcon />}
      </IconButton>
    </Tooltip>
  );
}
