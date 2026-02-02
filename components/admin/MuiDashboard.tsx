'use client'

import { SITE_CONFIG } from '@/lib/constants/site-config'
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
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 4,
          overflow: 'hidden',
          position: 'relative',
          border: '1px solid rgba(255,255,255,0.05)',
          boxShadow: '0 20px 40px -10px rgba(15, 23, 42, 0.3)'
        }}
      >
        {/* Decorative elements */}
        <Box sx={{
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 176, 96, 0.1) 0%, rgba(217, 176, 96, 0) 70%)',
          zIndex: 0,
          pointerEvents: 'none'
        }} />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 600 }}>
          <Stack direction="row" spacing={1.5} sx={{ mb: 3 }} alignItems="center">
            <Box
              component="img"
              src={SITE_CONFIG.site.logo}
              sx={{
                height: 28,
                width: 'auto',
                filter: 'brightness(0) invert(1)',
                opacity: 0.9
              }}
            />
            <Typography variant="subtitle2" sx={{
              color: '#d9b060',
              fontWeight: 700,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontSize: '0.75rem'
            }}>
              {SITE_CONFIG.site.nome}
            </Typography>
          </Stack>

          <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, fontSize: { xs: '1.5rem', md: '2rem' } }}>
            Painel Administrativo Premium
          </Typography>

          <Typography variant="body1" sx={{ opacity: 0.8, mb: 4, lineHeight: 1.7, fontSize: '1.05rem' }}>
            Gerencie seus artigos e notícias com facilidade e elegância. Mantenha o padrão de excelência da {SITE_CONFIG.site.nome} sempre atualizado.
          </Typography>

          <Button
            component={Link}
            href="/"
            variant="contained"
            size="large"
            startIcon={<TrendingUpIcon />}
            sx={{
              bgcolor: '#d9b060',
              color: '#0f172a',
              fontWeight: 700,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(217, 176, 96, 0.3)',
              textTransform: 'none',
              fontSize: '1rem',
              '&:hover': {
                bgcolor: '#b08d4b',
                boxShadow: '0 6px 16px rgba(217, 176, 96, 0.4)',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.2s ease'
            }}
          >
            Visualizar Site
          </Button>
        </Box>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            position: 'relative',
            zIndex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            pr: 4
          }}
        >
          <Box
            component="img"
            src={SITE_CONFIG.site.logo}
            alt="Logo Orpheo"
            sx={{
              height: 160,
              width: 'auto',
              opacity: 0.9,
              filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.5))',
              transform: 'rotate(-5deg)',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
              '&:hover': {
                transform: 'rotate(0deg) scale(1.05)',
                filter: 'drop-shadow(0 15px 40px rgba(217, 176, 96, 0.3))'
              }
            }}
          />
        </Box>
      </Paper>
    </Box>
  )
}


