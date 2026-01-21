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
      title: 'Total de Artigos',
      value: totalArtigos,
      icon: <ArticleIcon />,
      bg: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
      color: '#fff',
      iconColor: '#d9b060'
    },
    {
      title: 'Publicados',
      value: artigosPublicados,
      icon: <VisibilityIcon />,
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
            Artigos
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Gerencie o conhecimento jurídico do seu escritório
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/admin/artigos/novo"
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
          Novo Artigo
        </Button>
      </Box>

      {/* Stats */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
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
                {/* Optional decorative element */}
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

      {/* Articles List */}
      <Box>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
          Todos os Artigos
          <Chip label={totalArtigos} size="small" sx={{ bgcolor: '#f1f5f9', fontWeight: 700 }} />
        </Typography>

        {artigos.length === 0 ? (
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
              <ArticleIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
              Nenhum artigo criado
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Comece criando seu primeiro artigo jurídico e compartilhe conhecimento com seus clientes.
            </Typography>
            <Button
              component={Link}
              href="/admin/artigos/novo"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                bgcolor: '#0f172a',
                borderRadius: 2,
                '&:hover': { bgcolor: '#1e293b' }
              }}
            >
              Criar Primeiro Artigo
            </Button>
          </Paper>
        ) : (
          <Stack spacing={2}>
            {artigos.map((artigo) => (
              <Card
                key={artigo.id}
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
                          label={artigo.published ? 'Publicado' : 'Rascunho'}
                          size="small"
                          sx={{
                            bgcolor: artigo.published ? '#dcfce7' : '#fef3c7',
                            color: artigo.published ? '#166534' : '#b45309',
                            fontWeight: 700,
                            borderRadius: 1,
                            height: 24
                          }}
                        />
                        {artigo.category && (
                          <Chip
                            icon={<FolderIcon sx={{ fontSize: '14px !important' }} />}
                            label={artigo.category.name}
                            size="small"
                            sx={{
                              bgcolor: '#f1f5f9',
                              color: '#64748b',
                              fontWeight: 600,
                              borderRadius: 1,
                              height: 24,
                              '& .MuiChip-icon': { color: '#94a3b8' }
                            }}
                          />
                        )}
                        <Typography variant="caption" sx={{ color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarIcon sx={{ fontSize: 14 }} />
                          {formatarData(artigo.createdAt)}
                        </Typography>
                      </Box>

                      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b', fontSize: '1.25rem' }}>
                        {artigo.title}
                      </Typography>

                      {artigo.excerpt && (
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
                          {artigo.excerpt}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', borderLeft: { md: '1px solid' }, borderColor: { md: 'divider' }, pl: { md: 3 } }}>
                      <Button
                        component={Link}
                        href={`/admin/artigos/${artigo.id}`}
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

