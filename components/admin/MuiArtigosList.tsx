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
  Article as ArticleIcon,
  Visibility as VisibilityIcon,
  Edit as EditIcon,
  Add as AddIcon,
  CalendarToday as CalendarIcon,
  Folder as FolderIcon,
} from '@mui/icons-material'

type TCategory = {
  id: string
  name: string
  slug: string
}

type TArtigo = {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published: boolean
  createdAt: string
  category: TCategory | null
}

interface MuiArtigosListProps {
  artigos: TArtigo[]
}

function formatarData(data: string) {
  return new Date(data).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function MuiArtigosList({ artigos }: MuiArtigosListProps) {
  const totalArtigos = artigos.length
  const artigosPublicados = artigos.filter((a) => a.published).length
  const rascunhos = totalArtigos - artigosPublicados

  const statsCards = [
    {
      title: 'Total',
      value: totalArtigos,
      icon: <ArticleIcon />,
      color: '#1976d2',
      bgColor: '#e3f2fd',
    },
    {
      title: 'Publicados',
      value: artigosPublicados,
      icon: <VisibilityIcon />,
      color: '#10b981',
      bgColor: '#d1fae5',
    },
    {
      title: 'Rascunhos',
      value: rascunhos,
      icon: <EditIcon />,
      color: '#f59e0b',
      bgColor: '#fef3c7',
    },
  ]

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, mb: 1 }}>
            Artigos
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Gerencie todos os artigos do blog
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/admin/artigos/novo"
          variant="contained"
          startIcon={<AddIcon />}
          sx={{ textTransform: 'none' }}
        >
          Novo Artigo
        </Button>
      </Box>

      {/* Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {statsCards.map((card, index) => (
          <Grid item xs={12} sm={4} key={index}>
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

      {/* Articles List */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 600, mb: 2 }}>
          Todos os Artigos
        </Typography>

        {artigos.length === 0 ? (
          <Paper sx={{ p: 8, textAlign: 'center', bgcolor: '#f8fafc' }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                bgcolor: '#e3f2fd',
                color: '#1976d2',
                mx: 'auto',
                mb: 2,
              }}
            >
              <ArticleIcon sx={{ fontSize: 32 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
              Nenhum artigo criado
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, maxWidth: 400, mx: 'auto' }}>
              Comece criando seu primeiro artigo jurídico e compartilhe conhecimento com seus clientes
            </Typography>
            <Button
              component={Link}
              href="/admin/artigos/novo"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{ textTransform: 'none' }}
            >
              Criar Primeiro Artigo
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {artigos.map((artigo) => (
              <Card
                key={artigo.id}
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
                        {artigo.title}
                      </Typography>

                      {artigo.excerpt && (
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
                          {artigo.excerpt}
                        </Typography>
                      )}

                      <Stack direction="row" spacing={2} flexWrap="wrap" useFlexGap>
                        {artigo.category && (
                          <Chip
                            icon={<FolderIcon />}
                            label={artigo.category.name}
                            size="small"
                            sx={{
                              bgcolor: '#e3f2fd',
                              color: '#1976d2',
                              fontWeight: 500,
                            }}
                          />
                        )}

                        <Chip
                          label={artigo.published ? 'Publicado' : 'Rascunho'}
                          size="small"
                          sx={{
                            bgcolor: artigo.published ? '#d1fae5' : '#fef3c7',
                            color: artigo.published ? '#10b981' : '#f59e0b',
                            fontWeight: 500,
                          }}
                        />

                        <Chip
                          icon={<CalendarIcon />}
                          label={formatarData(artigo.createdAt)}
                          size="small"
                          variant="outlined"
                        />
                      </Stack>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Button
                        component={Link}
                        href={`/admin/artigos/${artigo.id}`}
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

