'use client'

import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Avatar,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material'
import {
  Category as CategoryIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Folder as FolderIcon,
} from '@mui/icons-material'

type TCategory = {
  id: string
  name: string
  slug: string
  _count?: {
    articles: number
  }
}

interface MuiCategoriasListProps {
  categorias: TCategory[]
}

export default function MuiCategoriasList({ categorias }: MuiCategoriasListProps) {
  const totalCategorias = categorias.length

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
            Categorias
          </Typography>
          <Typography variant="body1" sx={{ color: '#64748b' }}>
            Organize seu conteúdo jurídico com eficiência
          </Typography>
        </Box>
        <Button
          component={Link}
          href="/admin/categorias/nova"
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
          Nova Categoria
        </Button>
      </Box>

      {/* Stats Summary */}
      <Box sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 5
      }}>
        {[
          {
            title: 'Total de Categorias',
            value: totalCategorias,
            icon: <FolderIcon />,
            bg: 'linear-gradient(135deg, #0f172a 0%, #334155 100%)',
            color: '#fff',
            iconColor: '#d9b060'
          },
          {
            title: 'Artigos Vinculados',
            value: categorias.reduce((acc, cat) => acc + (cat._count?.articles || 0), 0),
            icon: <CategoryIcon />,
            bg: 'linear-gradient(135deg, #d9b060 0%, #b08d4b 100%)',
            color: '#0f172a',
            iconColor: '#0f172a'
          }
        ].map((card, index) => (
          <Paper
            key={index}
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              background: card.bg,
              color: card.color,
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

      {/* Categories Grid */}
      <Box>
        {categorias.length === 0 ? (
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
              <FolderIcon sx={{ fontSize: 36 }} />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1, color: '#1e293b' }}>
              Nenhuma categoria encontrada
            </Typography>
            <Typography variant="body2" sx={{ color: '#64748b', mb: 4, maxWidth: 400, mx: 'auto' }}>
              Comece criando categorias para organizar seus artigos e facilitar a navegação dos seus clientes.
            </Typography>
            <Button
              component={Link}
              href="/admin/categorias/nova"
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                textTransform: 'none',
                bgcolor: '#0f172a',
                borderRadius: 2,
                '&:hover': { bgcolor: '#1e293b' }
              }}
            >
              Criar Primeira Categoria
            </Button>
          </Paper>
        ) : (
          <Box sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' },
            gap: 3
          }}>
            {categorias.map((categoria) => (
              <Card
                key={categoria.id}
                elevation={0}
                sx={{
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease-in-out',
                  position: 'relative',
                  overflow: 'visible',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
                    borderColor: 'transparent',
                    '& .action-buttons': {
                      opacity: 1,
                      transform: 'translateY(0)'
                    }
                  },
                }}
              >
                <CardContent sx={{ p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
                    <Avatar sx={{
                      bgcolor: '#0f172a',
                      color: '#d9b060',
                      width: 48,
                      height: 48,
                      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                    }}>
                      <CategoryIcon />
                    </Avatar>
                    <Box
                      className="action-buttons"
                      sx={{
                        display: 'flex',
                        gap: 1,
                        opacity: { xs: 1, md: 0 },
                        transform: { xs: 'none', md: 'translateY(-10px)' },
                        transition: 'all 0.3s',
                      }}
                    >
                      <Tooltip title="Editar">
                        <IconButton
                          component={Link}
                          href={`/admin/categorias/${categoria.id}`}
                          size="small"
                          sx={{
                            bgcolor: '#f1f5f9',
                            color: '#0f172a',
                            '&:hover': { bgcolor: '#d9b060' }
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </Box>

                  <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '1.1rem', mb: 0.5, color: '#1e293b' }}>
                    {categoria.name}
                  </Typography>
                  <Typography variant="caption" sx={{
                    display: 'inline-block',
                    py: 0.5,
                    px: 1.5,
                    bgcolor: '#f8fafc',
                    borderRadius: 1,
                    color: '#64748b',
                    fontFamily: 'monospace',
                    fontSize: '0.75rem'
                  }}>
                    /{categoria.slug}
                  </Typography>

                  <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="body2" sx={{ color: '#64748b', fontWeight: 500 }}>
                      Artigos vinculados
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: '#d9b060' }}>
                      {categoria._count?.articles || 0}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  )
}
