
'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useRouter } from 'next/navigation'
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  Stack,
  Paper,
} from '@mui/material'
import { Save as SaveIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material'
import Link from 'next/link'

const categorySchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  slug: z.string().min(3, 'Slug deve ter no mínimo 3 caracteres')
    .regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
})

type CategoryFormData = z.infer<typeof categorySchema>

interface MuiCategoriaFormProps {
  initialData?: {
    id: string
    name: string
    slug: string
  }
}

export default function MuiCategoriaForm({ initialData }: MuiCategoriaFormProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: initialData?.name || '',
      slug: initialData?.slug || '',
    },
  })

  // Auto-generate slug from name if creating new category
  const nameValue = watch('name')
  useEffect(() => {
    if (!initialData && nameValue) {
      const slug = nameValue
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
      setValue('slug', slug)
    }
  }, [nameValue, initialData, setValue])

  const onSubmit = async (data: CategoryFormData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const url = initialData
        ? `/api/categories/${initialData.id}`
        : '/api/categories'

      const method = initialData ? 'PATCH' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/admin/categorias')
        router.refresh()
      } else {
        const errorData = await response.json()
        let errorMessage = 'Erro ao salvar categoria'

        if (errorData.details && Array.isArray(errorData.details)) {
          errorMessage = errorData.details.map((d: any) => d.message).join(', ')
        } else if (errorData.error) {
          errorMessage = errorData.error
        }

        setError(errorMessage)
      }
    } catch (err) {
      setError('Ocorreu um erro ao salvar a categoria.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Button
          component={Link}
          href="/admin/categorias"
          startIcon={<ArrowBackIcon />}
          sx={{ color: '#64748b', mb: 2, '&:hover': { color: '#0f172a' } }}
        >
          Voltar para Lista
        </Button>
        <Typography variant="h4" sx={{ fontWeight: 800, color: '#1e293b', letterSpacing: '-0.02em', mb: 1 }}>
          {initialData ? 'Editar Categoria' : 'Nova Categoria'}
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          {initialData ? 'Atualize os dados da categoria' : 'Crie uma nova categoria para organizar seus artigos'}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

      <Paper
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: '1px solid',
          borderColor: 'divider',
          bgcolor: '#fff'
        }}
      >
        <Stack spacing={4} maxWidth="md">
          <TextField
            label="Nome da Categoria"
            fullWidth
            {...register('name')}
            error={!!errors.name}
            helperText={errors.name?.message}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
              }
            }}
          />

          <TextField
            label="Slug (URL amigável)"
            fullWidth
            {...register('slug')}
            error={!!errors.slug}
            helperText={errors.slug?.message || 'Gerado automaticamente a partir do nome'}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                fontFamily: 'monospace'
              }
            }}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
            <Button
              component={Link}
              href="/admin/categorias"
              variant="outlined"
              sx={{
                mr: 2,
                borderRadius: 2,
                color: '#64748b',
                borderColor: '#e2e8f0',
                '&:hover': { borderColor: '#cbd5e1', bgcolor: '#f8fafc' }
              }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={isSubmitting}
              startIcon={<SaveIcon />}
              sx={{
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
                minWidth: 150
              }}
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Categoria'}
            </Button>
          </Box>
        </Stack>
      </Paper>
    </Box>
  )
}
