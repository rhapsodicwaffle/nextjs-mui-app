'use client'

import { useState } from 'react'
import {
  AppBar,
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
  Button,
  useTheme,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import { useAuth } from '@/context/AuthContext'
import ThemeToggle from '@/components/ui/ThemeToggle'
import { useRouter } from 'next/navigation'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Users', href: '/users' },
  { label: 'Posts', href: '/posts' },
  { label: 'Components', href: '/components' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const DRAWER_WIDTH = 240

function HamburgerIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M3 6h18v2H3V6Zm0 5h18v2H3v-2Zm0 5h18v2H3v-2Z" />
    </svg>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { user, isAuthenticated, logout } = useAuth()
  const router = useRouter()
  const theme = useTheme()

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev)
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    logout()
    handleMenuClose()
    router.push('/')
  }

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 700 }}>
        My App
      </Typography>
      <Divider />
      <List>
        {NAV_LINKS.map(({ label, href }) => (
          <ListItem key={label} disablePadding>
            <ListItemButton
              component="a"
              href={href}
              sx={{ textAlign: 'center' }}
            >
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  )

  return (
    <>
      <AppBar component="nav" position="sticky" elevation={1}>
        <Toolbar>
          {/* Mobile hamburger */}
          <IconButton
            color="inherit"
            aria-label="open navigation drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <HamburgerIcon />
          </IconButton>

          {/* Logo */}
          <Typography
            variant="h6"
            component="a"
            href="/"
            fontWeight={700}
            sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none' }}
          >
            My App
          </Typography>

          {/* Desktop nav links */}
          <Box
            sx={{
              display: { xs: 'none', sm: 'flex' },
              gap: 1,
              alignItems: 'center',
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <Button
                key={label}
                component="a"
                href={href}
                color="inherit"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                {label}
              </Button>
            ))}
          </Box>

          <ThemeToggle />

          {/* Auth buttons */}
          {isAuthenticated ? (
            <>
              <IconButton onClick={handleMenuOpen} sx={{ ml: 1 }}>
                <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                  {user?.name?.charAt(0).toUpperCase()}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled>
                  <Typography variant="body2">{user?.email}</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, gap: 1, ml: 1 }}>
              <Button
                component="a"
                href="/auth/login"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Login
              </Button>
              <Button
                component="a"
                href="/auth/signup"
                variant="outlined"
                color="inherit"
                sx={{ textTransform: 'none' }}
              >
                Sign Up
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {/* Mobile drawer */}
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </>
  )
}
