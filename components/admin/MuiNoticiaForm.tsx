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
  Alert,
  CircularProgress,
  Chip,
} from '@mui/material'
import {
  ArrowBack as ArrowBackIcon,
  Save as SaveIcon,
  Newspaper as NewspaperIcon,
  Star as StarIcon,
} from '@mui/icons-material'

interface MuiNoticiaFormProps {
  noticia?: {
    id: string
    title: string
    slug: string
    excerpt: string | null
    content: string
    coverImage: string | null
    category: string | null
    tags: string[]
    published: boolean
    featured: boolean
  }
  isEdit?: boolean
}

export default function MuiNoticiaForm({ noticia, isEdit = false }: MuiNoticiaFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [tagsInput, setTagsInput] = useState(noticia?.tags?.join(', ') || '')
  const [formData, setFormData] = useState({
    title: noticia?.title || '',
    slug: noticia?.slug || '',
    excerpt: noticia?.excerpt || '',
    content: noticia?.content || '',
    coverImage: noticia?.coverImage || '',
    category: noticia?.category || '',
    tags: noticia?.tags || [],
    published: noticia?.published || false,
    featured: noticia?.featured || false,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const url = isEdit ? `/api/news/${noticia?.id}` : '/api/news'
      const method = isEdit ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push('/admin/noticias')
        router.refresh()
      } else {
        const errorData = await response.json()
        setError(errorData.error || 'Erro ao salvar notícia')
      }
    } catch (error) {
      console.error('Erro:', error)
      setError('Erro ao salvar notícia')
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

  const handleTagsChange = (value: string) => {
    setTagsInput(value)
    const tagsArray = value
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
    setFormData((prev) => ({ ...prev, tags: tagsArray }))
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
        <Button
          component={Link}
          href="/admin/noticias"
          variant="outlined"
          sx={{ minWidth: 'auto', p: 1 }}
        >
          <ArrowBackIcon />
        </Button>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 600, display: 'flex', alignItems: 'center', gap: 1 }}>
            <NewspaperIcon sx={{ color: '#d9b060' }} />
            {isEdit ? 'Editar Notícia' : 'Criar Nova Notícia'}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {isEdit ? 'Atualize as informações da notícia' : 'Publique uma notícia jurídica'}
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
                  label="Título da Notícia"
                  fullWidth
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  helperText="Título principal que aparecerá na notícia"
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

                <TextField
                  label="Categoria"
                  fullWidth
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  helperText="Categoria da notícia (opcional)"
                  placeholder="Ex: Direito Trabalhista, Direito Civil, etc."
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
                label="Conteúdo da Notícia"
                fullWidth
                required
                multiline
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                helperText="Conteúdo completo da notícia em Markdown"
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                    fontSize: '0.9rem',
                  },
                }}
              />
            </CardContent>
          </Card>

          {/* Mídia e Tags */}
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 3, color: '#8b5cf6' }}>
                Mídia e Tags
              </Typography>

              <Stack spacing={3}>
                <TextField
                  label="URL da Imagem de Capa"
                  fullWidth
                  value={formData.coverImage}
                  onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                  helperText="URL da imagem de capa (opcional)"
                  placeholder="https://exemplo.com/imagem.jpg"
                />

                {formData.coverImage && (
                  <Box>
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

                <Box>
                  <TextField
                    label="Tags"
                    fullWidth
                    value={tagsInput}
                    onChange={(e) => handleTagsChange(e.target.value)}
                    helperText="Separe as tags por vírgula (ex: direito, trabalhista, legislação)"
                    placeholder="direito, trabalhista, legislação"
                  />
                  {formData.tags.length > 0 && (
                    <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {formData.tags.map((tag, index) => (
                        <Chip key={index} label={tag} size="small" color="primary" variant="outlined" />
                      ))}
                    </Box>
                  )}
                </Box>
              </Stack>
            </CardContent>
          </Card>

          {/* Configurações de Publicação */}
          <Card sx={{ bgcolor: '#fef3c7', borderLeft: '4px solid #d9b060' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: '#d9b060' }}>
                Configurações de Publicação
              </Typography>

              <Stack spacing={2}>
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
                        Publicar notícia imediatamente
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {formData.published
                          ? 'A notícia ficará visível publicamente no site'
                          : 'A notícia será salva como rascunho'}
                      </Typography>
                    </Box>
                  }
                />

                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      color="warning"
                    />
                  }
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <StarIcon sx={{ fontSize: 20, color: formData.featured ? '#d9b060' : '#9ca3af' }} />
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 500 }}>
                          Marcar como destaque
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          A notícia aparecerá em posição de destaque
                        </Typography>
                      </Box>
                    </Box>
                  }
                />
              </Stack>
            </CardContent>
          </Card>

          {/* Botões de Ação */}
          <Paper sx={{ p: 3, bgcolor: '#f5f5f5' }}>
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                component={Link}
                href="/admin/noticias"
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
                {isLoading ? 'Salvando...' : isEdit ? 'Atualizar Notícia' : 'Criar Notícia'}
              </Button>
            </Stack>
          </Paper>
        </Stack>
      </form>
    </Box>
  )
}

