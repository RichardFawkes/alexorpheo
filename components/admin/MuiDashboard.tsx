'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Avatar,
  Stack,
  Chip,
} from '@mui/material'
import {
  Article as ArticleIcon,
  Newspaper as NewspaperIcon,
  CheckCircle as CheckCircleIcon,
  Folder as FolderIcon,
  Add as AddIcon,
  TrendingUp as TrendingUpIcon,
  ArrowForward as ArrowForwardIcon,
  Edit as EditIcon,
} from '@mui/icons-material'

type TStats = {
  totalArtigos: number
  artigosPublicados: number
  rascunhosArtigos: number
  totalNoticias: number
  noticiasPublicadas: number
  rascunhosNoticias: number
  totalCategorias: number
  totalPublicado: number
}

interface MuiDashboardProps {
  stats: TStats
}

export default function MuiDashboard({ stats }: MuiDashboardProps) {
  const statsCards = [
    {
      title: 'Artigos',
      value: stats.totalArtigos,
      subtitle: `${stats.artigosPublicados} publicados • ${stats.rascunhosArtigos} rascunhos`,
      icon: <ArticleIcon />,
      color: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Notícias',
      value: stats.totalNoticias,
      subtitle: `${stats.noticiasPublicadas} publicadas • ${stats.rascunhosNoticias} rascunhos`,
      icon: <NewspaperIcon />,
      color: '#d9b060',
      bgColor: '#fef3c7',
    },
    {
      title: 'Conteúdo Publicado',
      value: stats.totalPublicado,
      subtitle: 'Total visível no site',
      icon: <CheckCircleIcon />,
      color: '#10b981',
      bgColor: '#d1fae5',
      badge: 'Ao Vivo',
    },
    {
      title: 'Categorias',
      value: stats.totalCategorias,
      subtitle: 'Categorias ativas',
      icon: <FolderIcon />,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
  ]

  const quickActions = [
    {
      title: 'Novo Artigo',
      description: 'Escreva um artigo jurídico',
      icon: <ArticleIcon />,
      href: '/admin/artigos/novo',
      color: '#1976d2',
    },
    {
      title: 'Nova Notícia',
      description: 'Publique uma notícia',
      icon: <NewspaperIcon />,
      href: '/admin/noticias/novo',
      color: '#d9b060',
    },
    {
      title: 'Gerenciar Artigos',
      description: 'Ver todos os artigos',
      icon: <EditIcon />,
      href: '/admin/artigos',
      color: '#64748b',
    },
    {
      title: 'Gerenciar Notícias',
      description: 'Ver todas as notícias',
      icon: <EditIcon />,
      href: '/admin/noticias',
      color: '#64748b',
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Visão geral do conteúdo do site
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3} sx={{ mb: 4, flexWrap: 'wrap' }}>
        {statsCards.map((card, index) => (
          <Card
            key={index}
            sx={{
              flex: { xs: '1 1 100%', sm: '1 1 calc(50% - 12px)', md: '1 1 calc(25% - 18px)' },
              minWidth: 0,
              transition: 'all 0.3s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 4,
              },
            }}
          >
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Avatar
                    sx={{
                      bgcolor: card.bgColor,
                      color: card.color,
                      width: 48,
                      height: 48,
                    }}
                  >
                    {card.icon}
                  </Avatar>
                  {card.badge && (
                    <Chip
                      label={card.badge}
                      size="small"
                      sx={{
                        bgcolor: '#d1fae5',
                        color: '#10b981',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                      }}
                    />
                  )}
                </Box>
                <Box>
                  <Typography variant="h3" sx={{ fontWeight: 700, mb: 0.5 }}>
                    {card.value}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500, mb: 0.5 }}>
                    {card.title}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {card.subtitle}
                  </Typography>
                </Box>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Quick Actions */}
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 3 }}>
          Ações Rápidas
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          {quickActions.map((action, index) => (
            <Box key={index} sx={{ flex: 1 }}>
              <Card
                component={Link}
                href={action.href}
                sx={{
                  textDecoration: 'none',
                  transition: 'all 0.3s',
                  cursor: 'pointer',
                  '&:hover': {
                    boxShadow: 3,
                    borderColor: action.color,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: `${action.color}15`,
                          color: action.color,
                          width: 40,
                          height: 40,
                        }}
                      >
                        {action.icon}
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                          {action.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {action.description}
                        </Typography>
                      </Box>
                    </Box>
                    <ArrowForwardIcon sx={{ color: 'text.secondary' }} />
                  </Box>
                </CardContent>
              </Card>
            </Box>
          ))}
        </Stack>
      </Box>

      {/* Recent Activity Section (Optional) */}
      <Box sx={{ mt: 4 }}>
        <Paper sx={{ p: 3, textAlign: 'center', bgcolor: '#f8fafc' }}>
          <TrendingUpIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
            Bem-vindo ao Painel Administrativo
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Gerencie todo o conteúdo do seu site de forma simples e eficiente
          </Typography>
        </Paper>
      </Box>
    </Box>
  )
}

