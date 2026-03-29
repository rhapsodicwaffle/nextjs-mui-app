'use client';

import { Alert, AlertTitle, Collapse, IconButton, type AlertProps } from '@mui/material';
import { useState } from 'react';

type AppAlertProps = AlertProps & {
  title?: string;
  dismissible?: boolean;
};

export default function AppAlert({
  title,
  dismissible = false,
  children,
  severity = 'info',
  sx,
  ...rest
}: AppAlertProps) {
  const [open, setOpen] = useState(true);

  return (
    <Collapse in={open}>
      <Alert
        severity={severity}
        sx={{ mb: 2, ...sx }}
        action={
          dismissible ? (
            <IconButton
              aria-label="close alert"
              color="inherit"
              size="small"
              onClick={() => setOpen(false)}
            >
              <span aria-hidden style={{ fontSize: 18, lineHeight: 1 }}>×</span>
            </IconButton>
          ) : undefined
        }
        {...rest}
      >
        {title && <AlertTitle sx={{ fontWeight: 600 }}>{title}</AlertTitle>}
        {children}
      </Alert>
    </Collapse>
  );
}
