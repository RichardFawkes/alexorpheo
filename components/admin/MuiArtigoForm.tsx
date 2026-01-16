'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Stack,
  Paper,
  Divider,
  Alert,
  CircularProgress,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Article as ArticleIcon,
} from '@mui/icons-material'

interface MuiArtigoFormProps {
  artigo?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    coverImage: string | null
    categoryId: string | null
    published: boolean
  }
  isEdit?: boolean
}

export default function MuiArtigoForm({ artigo, isEdit = false }: MuiArtigoFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: artigo?.title || '',
    slug: artigo?.slug || '',
    excerpt: artigo?.excerpt || '',
    content: artigo?.content || '',
    coverImage: artigo?.coverImage || '',
    categoryId: artigo?.categoryId || '',
    published: artigo?.published || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const dataToSend = {
        ...formData,
        categoryId: formData.categoryId || undefined,
        excerpt: formData.excerpt || undefined,
        coverImage: formData.coverImage || undefined,
      }

      const url = isEdit ? `/api/articles/${artigo?.id}` : '/api/articles'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSend),
      })

      if (response.ok) {
        router.push('/admin/artigos')
        router.refresh()
      } else {
        const errorData = await response.json()
        setError(errorData.details || errorData.error || 'Erro ao salvar artigo')
      }
    } catch (error) {
      console.error('Erro:', error)
      setError('Erro ao salvar artigo')
    } finally {
      setIsLoading(false)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      title: value,
      slug: generateSlug(value),
    }))
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button
          component={Link}
          href="/admin/artigos"
          variant="outlined"
          sx={{ minWidth: 'auto', p: 1 }}
        >
          <ArrowBackIcon />
        </Button>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ArticleIcon sx={{ color: '#d9b060' }} />
            {isEdit ? 'Editar Artigo' : 'Criar Novo Artigo'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isEdit ? 'Atualize as informações do artigo' : 'Escreva e publique um artigo jurídico'}
          </Typography>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* Informações Básicas */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#d9b060' }}>
                Informações Básicas
              </Typography>

              <Stack spacing={3}>
                <TextField
                  label="Título do Artigo"
                  fullWidth
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  helperText="Título principal que aparecerá no artigo"
                />

                <TextField
                  label="Slug (URL)"
                  fullWidth
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  helperText="URL amigável gerada automaticamente"
                  InputProps={{
                    readOnly: true,
                  }}
                  sx={{
                    '& .MuiInputBase-input': {
                      fontFamily: 'monospace',
                      fontSize: '0.9rem',
                      color: '#64748b',
                    },
                  }}
                />

                <TextField
                  label="Resumo"
                  fullWidth
                  multiline
                  rows={3}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  helperText="Breve descrição que aparecerá nas listagens (opcional)"
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Conteúdo */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#10b981' }}>
                Conteúdo
              </Typography>

              <TextField
                label="Conteúdo do Artigo"
                fullWidth
                required
                multiline
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                helperText="Conteúdo completo do artigo em Markdown"
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Mídia */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#8b5cf6' }}>
                Imagem de Capa
              </Typography>

              <TextField
                label="URL da Imagem"
                fullWidth
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                helperText="URL da imagem de capa (opcional)"
                placeholder="https://exemplo.com/imagem.jpg"
              />

              {formData.coverImage && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    Preview:
                  </Typography>
                  <Paper
                    sx={{
                      p: 2,
                      bgcolor: '#f5f5f5',
                      borderRadius: 2,
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={formData.coverImage}
                      alt="Preview"
                      style={{
                        width: '100%',
                        maxHeight: '300px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                      }}
                      onError={(e) => {
                        e.currentTarget.style.display = 'none'
                      }}
                    />
                  </Paper>
                </Box>
              )}
            </CardContent>
          </Card>

          {/* Configurações de Publicação */}
          <Card sx={{ bgcolor: '#fef3c7', borderLeft: '4px solid #d9b060' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#d9b060' }}>
                Configurações de Publicação
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                Defina o status de publicação
              </Typography>

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    color="warning"
                  />
                }
                label={
                  <Box>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      Publicar artigo imediatamente
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formData.published
                        ? 'O artigo ficará visível publicamente no site'
                        : 'O artigo será salvo como rascunho'}
                    </Typography>
                  </Box>
                }
              />
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                component={Link}
                href="/admin/artigos"
                variant="outlined"
                disabled={isLoading}
                sx={{ textTransform: 'none' }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} /> : <SaveIcon />}
                sx={{
                  textTransform: 'none',
                  bgcolor: '#d9b060',
                  '&:hover': {
                    bgcolor: '#b08d4b',
                  },
                }}
              >
                {isLoading ? 'Salvando...' : isEdit ? 'Atualizar Artigo' : 'Criar Artigo'}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </form>
    </Box>
  )
}

