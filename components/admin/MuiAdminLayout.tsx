'use client'

import { useMemo, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { ThemeProvider } from '@mui/material/styles'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  List,
  Typography,
  Divider,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Article as ArticleIcon,
  Newspaper as NewspaperIcon,
  Folder as FolderIcon,
  AccountCircle,
  Logout,
  Home,
  Settings as SettingsIcon,
  Gavel as GavelIcon,
} from '@mui/icons-material'
import { signOut } from 'next-auth/react'
import { muiTheme } from '@/lib/theme/mui-theme'

const DRAWER_WIDTH = 260

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/admin' },
  { text: 'Artigos', icon: <ArticleIcon />, path: '/admin/artigos' },
  { text: 'Notícias', icon: <NewspaperIcon />, path: '/admin/noticias' },
  { text: 'Áreas de Atuação', icon: <GavelIcon />, path: '/admin/areas' },
  { text: 'Categorias', icon: <FolderIcon />, path: '/admin/categorias' },
  { text: 'Configurações', icon: <SettingsIcon />, path: '/admin/configuracoes' },
]

interface MuiAdminLayoutProps {
  children: React.ReactNode
  user?: {
    name?: string | null
    email?: string | null
  } | null
}

export default function MuiAdminLayout({ children, user }: MuiAdminLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const pathname = usePathname()
  const router = useRouter()
  const emotionInsertionPoint = typeof document !== 'undefined'
    ? (document.querySelector('meta[name=\"emotion-insertion-point\"]') as HTMLElement | null)
    : null
  const emotionCache = useMemo(() => createCache({
    key: 'mui',
    insertionPoint: emotionInsertionPoint || undefined,
    prepend: true,
  }), [emotionInsertionPoint])

  if (!user) {
    return <>{children}</>
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleMenuClose()
    signOut({ callbackUrl: '/' })
  }

  const handleNavigate = (path: string) => {
    router.push(path)
    setMobileOpen(false)
  }

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', bgcolor: '#0f172a', color: '#94a3b8' }}>
      <Toolbar
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          px: 3,
          py: 4,
          minHeight: '80px !important'
        }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h6" sx={{ fontWeight: 700, color: '#fff', letterSpacing: '0.05em', textTransform: 'uppercase', fontSize: '1.1rem' }}>
            Alex Orpheo
          </Typography>
          <Typography variant="caption" sx={{ color: '#d9b060', letterSpacing: '0.1em', textTransform: 'uppercase', fontSize: '0.7rem' }}>
            Advocacia Premium
          </Typography>
        </Box>
      </Toolbar>
      <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)', mx: 3 }} />
      <List sx={{ px: 2, py: 3, flexGrow: 1 }}>
        {menuItems.map((item) => {
          const isActive = pathname === item.path || (pathname?.startsWith(item.path + '/') && item.path !== '/admin')
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => handleNavigate(item.path)}
                sx={{
                  borderRadius: '12px',
                  py: 1.5,
                  px: 2.5,
                  transition: 'all 0.2s ease-in-out',
                  color: isActive ? '#0f172a' : '#94a3b8',
                  backgroundColor: isActive ? '#d9b060' : 'transparent',
                  '&:hover': {
                    backgroundColor: isActive
                      ? '#b08d4b'
                      : 'rgba(255,255,255,0.05)',
                    color: isActive ? '#0f172a' : '#fff',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: 'inherit',
                    minWidth: 40,
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    fontSize: '0.95rem',
                    fontWeight: isActive ? 600 : 500,
                  }}
                />
              </ListItemButton>
            </ListItem>
          )
        })}
      </List>
      <Box sx={{ p: 2 }}>
        <ListItemButton
          onClick={() => handleNavigate('/')}
          sx={{
            borderRadius: '12px',
            py: 1.5,
            px: 2.5,
            border: '1px solid rgba(255,255,255,0.1)',
            color: '#94a3b8',
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.05)',
              borderColor: '#d9b060',
              color: '#d9b060',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit', minWidth: 40 }}>
            <Home />
          </ListItemIcon>
          <ListItemText
            primary="Ver Site"
            primaryTypographyProps={{
              fontSize: '0.95rem',
              fontWeight: 500,
            }}
          />
        </ListItemButton>
      </Box>
    </Box>
  )

  return (
    <div suppressHydrationWarning>
      <CacheProvider value={emotionCache}>
      <ThemeProvider theme={muiTheme}>
        <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
        {/* AppBar */}
        <AppBar
          position="fixed"
          elevation={0}
          sx={{
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            ml: { sm: `${DRAWER_WIDTH}px` },
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(12px)',
            color: '#1e293b',
            borderBottom: '1px solid #e2e8f0',
          }}
        >
          <Toolbar sx={{ height: 80, px: { xs: 2, sm: 4 } }}>
            <IconButton
              color="inherit"
              aria-label="abrir menu"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' }, color: '#64748b' }}
            >
              <MenuIcon />
            </IconButton>

            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h6" component="div" sx={{ fontWeight: 700, color: '#0f172a' }}>
                {menuItems.find((item) => pathname === item.path)?.text || 'Painel Admin'}
              </Typography>
              <Typography variant="body2" sx={{ color: '#64748b' }}>
                {new Date().toLocaleDateString('pt-BR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ textAlign: 'right', display: { xs: 'none', sm: 'block' } }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#0f172a' }}>
                  {user?.name || 'Administrador'}
                </Typography>
                <Typography variant="caption" sx={{ color: '#64748b' }}>
                  {user?.email || 'admin@alexorpheo.com'}
                </Typography>
              </Box>
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  p: 0.5,
                  border: '2px solid transparent',
                  '&:hover': { border: '2px solid #d9b060' },
                  transition: 'all 0.2s'
                }}
              >
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: '#0f172a',
                    color: '#d9b060',
                    fontWeight: 700
                  }}
                >
                  {user?.name?.[0] || user?.email?.[0] || 'A'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  elevation: 0,
                  sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                    mt: 1.5,
                    minWidth: 180,
                    borderRadius: 2,
                    '&:before': {
                      content: '""',
                      display: 'block',
                      position: 'absolute',
                      top: 0,
                      right: 14,
                      width: 10,
                      height: 10,
                      bgcolor: 'background.paper',
                      transform: 'translateY(-50%) rotate(45deg)',
                      zIndex: 0,
                    },
                  },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem onClick={handleLogout} sx={{ py: 1.5, px: 2.5, color: '#ef4444' }}>
                  <ListItemIcon sx={{ color: 'inherit' }}>
                    <Logout fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="Sair do Sistema" primaryTypographyProps={{ fontWeight: 500 }} />
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>

        {/* Drawer */}
        <Box
          component="nav"
          sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
          aria-label="menu de navegação"
        >
          {/* Mobile drawer */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none' },
            }}
          >
            {drawer}
          </Drawer>
          {/* Desktop drawer */}
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: DRAWER_WIDTH, border: 'none' },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>

        {/* Main content */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: { xs: 2, sm: 4 },
            width: { sm: `calc(100% - ${DRAWER_WIDTH}px)` },
            backgroundColor: '#f8fafc',
            minHeight: '100vh',
          }}
        >
          <Toolbar sx={{ height: 80 }} />
          <Box sx={{ maxWidth: '1600px', mx: 'auto' }}>
            {children}
          </Box>
        </Box>
      </Box>
      </ThemeProvider>
      </CacheProvider>
    </div>
  )

}
