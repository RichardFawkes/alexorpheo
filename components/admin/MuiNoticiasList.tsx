'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Chip,
  Stack,
  Avatar,
  Paper,
} from '@mui/material'
import {
  Newspaper as NewspaperIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Star as StarIcon,
} from '@mui/icons-material'

type TNoticia = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  featured: boolean
  createdAt: string
}

interface MuiNoticiasListProps {
  noticias: TNoticia[]
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function MuiNoticiasList({ noticias }: MuiNoticiasListProps) {
  const totalNoticias = noticias.length
  const noticiasPublicadas = noticias.filter((n) => n.published).length
  const noticiasDestaque = noticias.filter((n) => n.featured).length
  const rascunhos = totalNoticias - noticiasPublicadas

  const statsCards = [
    {
      title: 'Total',
      value: totalNoticias,
      icon: <NewspaperIcon />,
      bg: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      color: '#fff',
      iconColor: '#d9b060'
    },
    {
      title: 'Publicadas',
      value: noticiasPublicadas,
      icon: <VisibilityIcon />,
      bg: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
      color: '#fff',
      iconColor: '#fff'
    },
    {
      title: 'Em Destaque',
      value: noticiasDestaque,
      icon: <StarIcon />,
      bg: 'linear-gradient(135deg, #d9b060 0%, #b08d4b 100%)',
      color: '#0f172a',
      iconColor: '#0f172a'
    },
    {
      title: 'Rascunhos',
      value: rascunhos,
      icon: <EditIcon />,
      bg: '#fff',
      color: '#64748b',
      iconColor: '#94a3b8',
      border: true
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{
        display: 'flex',
        flexDirection: { xs: 'column', sm: 'row' },
        justifyContent: 'space-between',
        alignItems: { xs: 'flex-start', sm: 'center' },
        gap: 2,
        mb: 5
      }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, color: '#1e293b', letterSpacing: '-0.02em' }}>
            Notícias
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Mantenha seus clientes informados sobre o mundo jurídico
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/admin/noticias/novo"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            textTransform: 'none',
            bgcolor: '#d9b060',
            color: '#0f172a',
            fontWeight: 700,
            borderRadius: 2,
            px: 3,
            py: 1.2,
            boxShadow: '0 4px 6px -1px rgba(217, 176, 96, 0.2)',
            '&:hover': {
              bgcolor: '#b08d4b',
              boxShadow: '0 10px 15px -3px rgba(217, 176, 96, 0.3)'
            }
          }}
        >
          Nova Notícia
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 5
      }}>
        {statsCards.map((card, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: card.bg,
              color: card.color,
              border: card.border ? '1px solid #e2e8f0' : 'none',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Avatar
                  sx={{
                    bgcolor: 'rgba(255,255,255,0.1)',
                    color: card.iconColor,
                    width: 48,
                    height: 48,
                    borderRadius: 3
                  }}
                >
                  {card.icon}
                </Avatar>
              </Box>
              <Typography variant="h4" sx={{ fontWeight: 800, mb: 0.5 }}>
                {card.value}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {card.title}
              </Typography>
            </Box>
          </Paper>
        ))}
      </Box>

      {/* News List */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          Todas as Notícias
          <Chip label={totalNoticias} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 700 }} />
        </Typography>

        {noticias.length === 0 ? (
          <Paper
            elevation={0}
            sx={{
              p: 8,
              textAlign: 'center',
              borderRadius: 4,
              bgcolor: '#f8fafc',
              border: '2px dashed #e2e8f0'
            }}
          >
            <Avatar
              sx={{
                width: 72,
                height: 72,
                bgcolor: '#f1f5f9',
                color: '#94a3b8',
                mx: 'auto',
                mb: 3,
              }}
            >
              <NewspaperIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
              Nenhuma notícia criada
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Comece criando sua primeira notícia jurídica e mantenha seus clientes informados.
            </Typography>
            <Button
              component={Link}
              href="/admin/noticias/novo"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                bgcolor: '#0f172a',
                borderRadius: 2,
                '&:hover': { bgcolor: '#1e293b' }
              }}
            >
              Criar Primeira Notícia
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {noticias.map((noticia) => (
              <Card
                key={noticia.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateX(4px)',
                    borderColor: '#d9b060',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                        <Chip
                          label={noticia.published ? 'Publicada' : 'Rascunho'}
                          size="small"
                          sx={{
                            bgcolor: noticia.published ? '#dcfce7' : '#fef3c7',
                            color: noticia.published ? '#166534' : '#b45309',
                            fontWeight: 700,
                            borderRadius: 1,
                            height: 24
                          }}
                        />
                        {noticia.featured && (
                          <Chip
                            icon={<StarIcon sx={{ fontSize: '14px !important' }} />}
                            label="Destaque"
                            size="small"
                            sx={{
                              bgcolor: '#fffbeb',
                              color: '#b45309',
                              fontWeight: 700,
                              borderRadius: 1,
                              height: 24,
                              '& .MuiChip-icon': { color: '#d9b060' }
                            }}
                          />
                        )}
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarIcon sx={{ fontSize: 14 }} />
                          {formatarData(noticia.createdAt)}
                        </Typography>
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b', fontSize: '1.25rem' }}>
                        {noticia.title}
                      </Typography>

                      {noticia.excerpt && (
                        <Typography
                          variant="body2"
                          sx={{
                            color: '#64748b',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {noticia.excerpt}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: { md: '1px solid' }, borderColor: { md: 'divider' }, pl: { md: 3 } }}>
                      <Button
                        component={Link}
                        href={`/admin/noticias/${noticia.id}`}
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{
                          textTransform: 'none',
                          color: '#0f172a',
                          borderColor: '#e2e8f0',
                          borderRadius: 2,
                          px: 3,
                          '&:hover': {
                            borderColor: '#d9b060',
                            bgcolor: '#fffbeb'
                          }
                        }}
                      >
                        Editar
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  )
}

