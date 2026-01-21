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
      <Box sx={{ mb: 5 }}>
        <Button
          component={Link}
          href="/admin/noticias"
          startIcon={<ArrowBackIcon />}
          sx={{ color: '#64748b', mb: 2, '&:hover': { color: '#0f172a' } }}
        >
          Voltar para Lista
        </Button>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
            {isEdit ? 'Editar Notícia' : 'Nova Notícia'}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          {isEdit ? 'Atualize as informações da notícia' : 'Publique uma notícia jurídica importante'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          {/* Informações Básicas */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
              <NewspaperIcon sx={{ color: '#d9b060' }} />
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
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
                  '& .MuiOutlinedInput-root': { borderRadius: 2, bgcolor: '#f8fafc' },
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
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              <TextField
                label="Categoria"
                fullWidth
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                helperText="Categoria da notícia (opcional)"
                placeholder="Ex: Direito Trabalhista, Direito Civil, etc."
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />
            </Stack>
          </Paper>

          {/* Conteúdo */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
              Conteúdo
            </Typography>

            <TextField
              label="Conteúdo da Notícia (Markdown)"
              fullWidth
              required
              multiline
              rows={15}
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              helperText="Utilize Markdown para formatar o texto"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontFamily: 'monospace',
                  fontSize: '0.95rem',
                },
              }}
            />
          </Paper>

          {/* Mídia e Tags */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: 'divider',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: '#1e293b' }}>
              Mídia e Tags
            </Typography>

            <Stack spacing={3}>
              <TextField
                label="URL da Imagem de Capa"
                fullWidth
                value={formData.coverImage}
                onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                helperText="Link direto para a imagem de capa (opcional)"
                placeholder="https://exemplo.com/imagem.jpg"
                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
              />

              {formData.coverImage && (
                <Box sx={{ mt: 2 }}>
                  <Typography variant="caption" sx={{ color: '#64748b', display: 'block', mb: 1, fontWeight: 600 }}>
                    PREVIEW DA IMAGEM
                  </Typography>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 1,
                      bgcolor: '#f1f5f9',
                      borderRadius: 3,
                      overflow: 'hidden',
                      border: '1px dashed #cbd5e1',
                      display: 'inline-block',
                      maxWidth: '100%'
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
                        display: 'block'
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
                  sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }}
                />
                {formData.tags.length > 0 && (
                  <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        size="small"
                        sx={{
                          bgcolor: '#f1f5f9',
                          color: '#0f172a',
                          fontWeight: 500
                        }}
                      />
                    ))}
                  </Box>
                )}
              </Box>
            </Stack>
          </Paper>

          {/* Configurações de Publicação */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: 4,
              border: '1px solid',
              borderColor: '#d9b060',
              bgcolor: '#fffbeb',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '4px',
                height: '100%',
                bgcolor: '#d9b060'
              }}
            />

            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#92400e' }}>
              Visibilidade e Destaque
            </Typography>

            <Stack spacing={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.published}
                    onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#d9b060',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#d9b060',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ ml: 1 }}>
                    <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b' }}>
                      Publicar notícia
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#78350f' }}>
                      {formData.published
                        ? 'A notícia estará visível publicamente no site'
                        : 'A notícia será salva apenas como rascunho'}
                    </Typography>
                  </Box>
                }
              />

              <Box sx={{ my: 2, height: 1, bgcolor: 'rgba(217, 176, 96, 0.2)' }} />

              <FormControlLabel
                control={
                  <Switch
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    sx={{
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: '#d9b060',
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: '#d9b060',
                      },
                    }}
                  />
                }
                label={
                  <Box sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#1e293b', display: 'flex', alignItems: 'center', gap: 1 }}>
                        Marcar como Destaque
                        {formData.featured && <StarIcon sx={{ fontSize: 18, color: '#d9b060' }} />}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#78350f' }}>
                        Notícias em destaque aparecem no topo da página inicial
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            </Stack>
          </Paper>

          {/* Botões de Ação */}
          <Paper
            elevation={0}
            sx={{
              p: 3,
              bgcolor: '#f8fafc',
              borderTop: '1px solid',
              borderColor: 'divider',
              position: 'sticky',
              bottom: 0,
              zIndex: 10,
              backdropFilter: 'blur(8px)',
              background: 'rgba(248, 250, 252, 0.9)'
            }}
          >
            <Stack direction="row" spacing={2} justifyContent="flex-end">
              <Button
                component={Link}
                href="/admin/noticias"
                variant="outlined"
                disabled={isLoading}
                sx={{
                  textTransform: 'none',
                  color: '#64748b',
                  borderColor: '#cbd5e1',
                  borderRadius: 2,
                  px: 3,
                  '&:hover': {
                    borderColor: '#94a3b8',
                    bgcolor: '#f1f5f9',
                    color: '#0f172a'
                  }
                }}
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={isLoading}
                startIcon={isLoading ? <CircularProgress size={20} color="inherit" /> : <SaveIcon />}
                sx={{
                  textTransform: 'none',
                  bgcolor: '#d9b060',
                  color: '#0f172a',
                  fontWeight: 700,
                  borderRadius: 2,
                  px: 4,
                  boxShadow: '0 4px 6px -1px rgba(217, 176, 96, 0.2)',
                  '&:hover': {
                    bgcolor: '#b08d4b',
                    boxShadow: '0 10px 15px -3px rgba(217, 176, 96, 0.3)'
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
