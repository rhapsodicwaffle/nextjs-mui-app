'use client';

import React, { createContext, useContext, useMemo, useState, useEffect } from 'react';
import { PaletteMode } from '@mui/material';

interface ColorModeContextType {
  mode: PaletteMode;
  toggleColorMode: () => void;
}

export const ColorModeContext = createContext<ColorModeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ColorModeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setMode] = useState<PaletteMode>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('colorMode') as PaletteMode | null;
    if (stored === 'light' || stored === 'dark') {
      setMode(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setMode(prefersDark ? 'dark' : 'light');
    }
  }, []);

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem('colorMode', next);
      return next;
    });
  };

  const value = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return null;
  }

  return (
    <ColorModeContext.Provider value={value}>
      {children}
    </ColorModeContext.Provider>
  );
}
