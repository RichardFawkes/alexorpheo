'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  Alert,
  Chip,
} from '@mui/material'

type TArea = {
  id?: string
  titulo: string
  slug: string
  descricao: string
  icone: string
  destaque: boolean
  servicos: string[]
  detalhes?: string | null
}

export default function MuiAreaAtuacaoForm({ initialData }: { initialData?: TArea }) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [servicosInput, setServicosInput] = useState(initialData?.servicos?.join(', ') || '')
  const [formData, setFormData] = useState<TArea>({
    titulo: initialData?.titulo || '',
    slug: initialData?.slug || '',
    descricao: initialData?.descricao || '',
    icone: initialData?.icone || 'Scale',
    destaque: initialData?.destaque || false,
    servicos: initialData?.servicos || [],
    detalhes: initialData?.detalhes || '',
  })

  const generateSlug = (value: string) => {
    return value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  useEffect(() => {
    if (!initialData && formData.titulo) {
      setFormData(prev => ({ ...prev, slug: generateSlug(prev.titulo) }))
    }
    const tagsArray = servicosInput
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
    setFormData(prev => ({ ...prev, servicos: tagsArray }))
  }, [formData.titulo, servicosInput, initialData])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)
    try {
      const url = initialData?.id ? `/api/practice-areas/${initialData.id}` : '/api/practice-areas'
      const method = initialData?.id ? 'PUT' : 'POST'
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })
      if (response.ok) {
        router.push('/admin/areas')
        router.refresh()
      } else {
        const ct = response.headers.get('content-type') || ''
        if (ct.includes('application/json')) {
          const data = await response.json()
          setError(data.error || 'Erro ao salvar área')
        } else {
          const text = await response.text()
          setError(text || 'Erro ao salvar área')
        }
      }
    } catch (err) {
      setError('Erro ao salvar área')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em' }}>
          {initialData ? 'Editar Área de Atuação' : 'Nova Área de Atuação'}
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Gerencie as áreas exibidas na Home e na página de Áreas
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Card elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stack spacing={3}>
              <TextField
                label="Título"
                fullWidth
                required
                value={formData.titulo}
                onChange={(e) => setFormData(prev => ({ ...prev, titulo: e.target.value }))}
              />
              <TextField
                label="Slug (URL)"
                fullWidth
                required
                value={formData.slug}
                onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
                helperText="Gerado automaticamente pelo título. Pode ajustar se precisar."
              />
              <TextField
                label="Descrição"
                fullWidth
                multiline
                rows={4}
                value={formData.descricao}
                onChange={(e) => setFormData(prev => ({ ...prev, descricao: e.target.value }))}
              />
              <TextField
                label="Ícone (Briefcase, Users, Scale, Shield, ShoppingCart, Building)"
                fullWidth
                value={formData.icone}
                onChange={(e) => setFormData(prev => ({ ...prev, icone: e.target.value }))}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.destaque}
                    onChange={(e) => setFormData(prev => ({ ...prev, destaque: e.target.checked }))}
                  />
                }
                label="Exibir em destaque"
              />
              <TextField
                label="Serviços (separados por vírgula)"
                fullWidth
                value={servicosInput}
                onChange={(e) => setServicosInput(e.target.value)}
                helperText="Ex.: Contratos, Responsabilidade Civil, Indenizações"
              />
              <TextField
                label="Detalhes (opcional)"
                fullWidth
                multiline
                rows={3}
                value={formData.detalhes || ''}
                onChange={(e) => setFormData(prev => ({ ...prev, detalhes: e.target.value }))}
              />

              <Box sx={{ display: 'flex', gap: 2, mt: 2, flexWrap: 'wrap' }}>
                {formData.servicos.map((s, i) => (
                  <Chip key={i} label={s} />
                ))}
              </Box>

              <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting}
                  sx={{ bgcolor: '#d9b060', color: '#0f172a', fontWeight: 700, borderRadius: 2 }}
                >
                  {isSubmitting ? 'Salvando...' : 'Salvar'}
                </Button>
                <Button variant="outlined" onClick={() => router.push('/admin/areas')}>
                  Cancelar
                </Button>
              </Box>
            </Stack>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}
