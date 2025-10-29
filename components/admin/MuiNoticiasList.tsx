'use client'

import Link from 'next/link'
import {
  Box,
  Grid,
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
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
    {
      title: 'Publicadas',
      value: noticiasPublicadas,
      icon: <VisibilityIcon />,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: 'Em Destaque',
      value: noticiasDestaque,
      icon: <StarIcon />,
      color: '#8b5cf6',
      bgColor: '#ede9fe',
    },
    {
      title: 'Rascunhos',
      value: rascunhos,
      icon: <EditIcon />,
      color: '#64748b',
      bgColor: '#f1f5f9',
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Notícias
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie e publique notícias jurídicas
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/admin/noticias/novo"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ 
            textTransform: 'none',
            bgcolor: '#f59e0b',
            '&:hover': {
              bgcolor: '#d97706',
            },
          }}
        >
          Nova Notícia
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {card.title}
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>
                      {card.value}
                    </Typography>
                  </Box>
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
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* News List */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Todas as Notícias
        </Typography>

        {noticias.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: 'center', bgcolor: '#fefce8' }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: '#fef3c7',
                color: '#f59e0b',
                mx: 'auto',
                mb: 2,
              }}
            >
              <NewspaperIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Nenhuma notícia criada
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
              Comece criando sua primeira notícia jurídica e mantenha seus clientes informados
            </Typography>
            <Button
              component={Link}
              href="/admin/noticias/novo"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ 
                textTransform: 'none',
                bgcolor: '#f59e0b',
                '&:hover': {
                  bgcolor: '#d97706',
                },
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
                sx={{
                  transition: 'all 0.3s',
                  '&:hover': {
                    boxShadow: 3,
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 3 }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                        {noticia.title}
                      </Typography>

                      {noticia.excerpt && (
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                          }}
                        >
                          {noticia.excerpt}
                        </Typography>
                      )}

                      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        {noticia.featured && (
                          <Chip
                            icon={<StarIcon />}
                            label="Destaque"
                            size="small"
                            sx={{
                              bgcolor: '#ede9fe',
                              color: '#8b5cf6',
                              fontWeight: 500,
                            }}
                          />
                        )}

                        <Chip
                          label={noticia.published ? 'Publicada' : 'Rascunho'}
                          size="small"
                          sx={{
                            bgcolor: noticia.published ? '#d1fae5' : '#fef3c7',
                            color: noticia.published ? '#10b981' : '#f59e0b',
                            fontWeight: 500,
                          }}
                        />

                        <Chip
                          icon={<CalendarIcon />}
                          label={formatarData(noticia.createdAt)}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        component={Link}
                        href={`/admin/noticias/${noticia.id}`}
                        variant="outlined"
                        startIcon={<EditIcon />}
                        sx={{ textTransform: 'none' }}
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

