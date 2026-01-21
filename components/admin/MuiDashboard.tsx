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
      subtitle: `${stats.artigosPublicados} publicados`,
      icon: <ArticleIcon sx={{ fontSize: 28 }} />,
      color: '#fff',
      bgColor: '#1e293b', // Dark slate
      trend: '+12%', // Placeholder for trend
    },
    {
      title: 'Notícias',
      value: stats.totalNoticias,
      subtitle: `${stats.noticiasPublicadas} publicadas`,
      icon: <NewspaperIcon sx={{ fontSize: 28 }} />,
      color: '#1e293b',
      bgColor: '#d9b060', // Gold
      trend: '+5%',
    },
    {
      title: 'Conteúdo',
      value: stats.totalPublicado,
      subtitle: 'Itens ao vivo',
      icon: <CheckCircleIcon sx={{ fontSize: 28 }} />,
      color: '#10b981',
      bgColor: '#d1fae5', // Light green
      trend: 'Ativo',
    },
    {
      title: 'Categorias',
      value: stats.totalCategorias,
      subtitle: 'Seções ativas',
      icon: <FolderIcon sx={{ fontSize: 28 }} />,
      color: '#6366f1',
      bgColor: '#e0e7ff', // Light indigo
      trend: 'Estrutura',
    },
  ]

  const quickActions = [
    {
      title: 'Novo Artigo',
      description: 'Escreva um artigo jurídico',
      icon: <AddIcon />,
      href: '/admin/artigos/novo',
      color: '#fff',
      bgcolor: '#1e293b',
      hover: '#334155'
    },
    {
      title: 'Nova Notícia',
      description: 'Publique uma notícia',
      icon: <AddIcon />,
      href: '/admin/noticias/novo',
      color: '#1e293b',
      bgcolor: '#d9b060',
      hover: '#b08d4b'
    },
    {
      title: 'Ver Artigos',
      description: 'Gerenciar publicações',
      icon: <ArticleIcon />,
      href: '/admin/artigos',
      color: '#64748b',
      bgcolor: '#fff',
      hover: '#f1f5f9',
      border: true
    },
    {
      title: 'Ver Notícias',
      description: 'Gerenciar notícias',
      icon: <NewspaperIcon />,
      href: '/admin/noticias',
      color: '#64748b',
      bgcolor: '#fff',
      hover: '#f1f5f9',
      border: true
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#0f172a', letterSpacing: '-0.025em' }}>
          Visão Geral
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600 }}>
          Bem-vindo ao painel de controle. Aqui está o resumo da performance do seu conteúdo jurídico.
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={3} sx={{ mb: 6 }}>
        {statsCards.map((card, index) => (
          <Card
            key={index}
            elevation={0}
            sx={{
              flex: 1,
              borderRadius: 4,
              bgcolor: '#fff',
              border: '1px solid #e2e8f0',
              transition: 'all 0.3s ease',
              position: 'relative',
              overflow: 'hidden',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
                borderColor: 'transparent',
              },
            }}
          >
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar
                  variant="rounded"
                  sx={{
                    bgcolor: card.bgColor,
                    color: card.color,
                    width: 56,
                    height: 56,
                    borderRadius: 3,
                  }}
                >
                  {card.icon}
                </Avatar>
                {card.trend && (
                  <Chip
                    label={card.trend}
                    size="small"
                    sx={{
                      bgcolor: '#f1f5f9',
                      color: '#475569',
                      fontWeight: 600,
                      borderRadius: 2
                    }}
                  />
                )}
              </Box>

              <Typography variant="h3" sx={{ fontWeight: 800, mb: 0.5, color: '#0f172a' }}>
                {card.value}
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#64748b', mb: 0.5 }}>
                {card.title}
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                {card.subtitle}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      {/* Quick Actions */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#0f172a' }}>
          Ações Rápidas
        </Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={3}>
          {quickActions.map((action, index) => (
            <Card
              key={index}
              component={Link}
              href={action.href}
              elevation={0}
              sx={{
                flex: 1,
                textDecoration: 'none',
                borderRadius: 4,
                bgcolor: action.bgcolor,
                color: action.color,
                border: action.border ? '1px solid #e2e8f0' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: action.hover,
                  transform: 'scale(1.02)',
                },
              }}
            >
              <CardContent sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: '50%',
                    bgcolor: 'rgba(255,255,255,0.2)',
                    display: 'flex'
                  }}
                >
                  {action.icon}
                </Box>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {action.title}
                  </Typography>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>
                    {action.description}
                  </Typography>
                </Box>
                <ArrowForwardIcon sx={{ ml: 'auto', opacity: 0.7 }} />
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Box>

      {/* Welcome Banner */}
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            Painel Administrativo Premium
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.8, maxWidth: 500, mb: 3 }}>
            Gerencie seus artigos e notícias com facilidade. Mantenha seu site atualizado para atrair mais clientes.
          </Typography>
          <Button
            component={Link}
            href="/"
            variant="contained"
            sx={{
              bgcolor: '#d9b060',
              color: '#0f172a',
              fontWeight: 700,
              '&:hover': { bgcolor: '#b08d4b' }
            }}
          >
            Visualizar Site
          </Button>
        </Box>
        <Box
          sx={{
            display: { xs: 'none', md: 'block' },
            position: 'relative',
            zIndex: 1
          }}
        >
          <TrendingUpIcon sx={{ fontSize: 120, opacity: 0.1 }} />
        </Box>

        {/* Decorative circle */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(217,176,96,0.1) 0%, rgba(217,176,96,0) 70%)',
          }}
        />
      </Paper>
    </Box>
  )
}


