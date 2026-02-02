
'use client'

import { useState, useEffect } from 'react'
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Snackbar,
  Alert,
  CircularProgress
} from '@mui/material'
import { Save as SaveIcon, CloudUpload as CloudUploadIcon } from '@mui/icons-material'
import Image from 'next/image'
import { uploadImage } from '@/lib/storage/uploadImage'

export default function SettingsPage() {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [bannerUrl, setBannerUrl] = useState('')
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const res = await fetch('/api/settings')
      if (res.ok) {
        const data = await res.json()
        if (data.bannerImage) {
          setBannerUrl(data.bannerImage)
        }
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      setSaving(true)
      const result = await uploadImage(file, 'articles') // Reusing 'articles' bucket for now as it's public
      if (result.success && result.url) {
        setBannerUrl(result.url)
      } else {
        setMessage({ type: 'error', text: result.error || 'Erro ao fazer upload da imagem' })
      }
    } catch (error) {
      console.error('Erro no upload:', error)
      setMessage({ type: 'error', text: 'Erro ao fazer upload da imagem' })
    } finally {
      setSaving(false)
    }
  }

  const handleSave = async () => {
    try {
      setSaving(true)
      const res = await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bannerImage: bannerUrl }),
      })

      if (res.ok) {
        setMessage({ type: 'success', text: 'Configurações salvas com sucesso!' })
      } else {
        throw new Error('Falha ao salvar')
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'Erro ao salvar configurações' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    )
  }

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 700, color: '#1e293b' }}>
        Configurações do Site
      </Typography>

      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 3, color: '#334155' }}>
          Banner da Home
        </Typography>

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4 }}>
          <Box>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="URL da Imagem do Banner"
                value={bannerUrl}
                onChange={(e) => setBannerUrl(e.target.value)}
                variant="outlined"
                helperText="Cole a URL ou faça upload de uma imagem"
              />
            </Box>

            <Button
              variant="outlined"
              component="label"
              startIcon={<CloudUploadIcon />}
              sx={{ mb: 2 }}
              disabled={saving}
            >
              Fazer Upload de Imagem
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageUpload}
              />
            </Button>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1, color: '#64748b' }}>
              Pré-visualização:
            </Typography>
            <Box
              sx={{
                width: '100%',
                height: 200,
                position: 'relative',
                bgcolor: '#f1f5f9',
                borderRadius: 1,
                overflow: 'hidden',
                border: '1px dashed #cbd5e1'
              }}
            >
              {bannerUrl ? (
                <Image
                  src={bannerUrl}
                  alt="Banner Preview"
                  fill
                  style={{ objectFit: 'cover' }}
                />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#94a3b8' }}>
                  Sem imagem
                </Box>
              )}
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
            disabled={saving}
            size="large"
            sx={{
              bgcolor: '#d9b060',
              '&:hover': { bgcolor: '#c5a059' }
            }}
          >
            {saving ? 'Salvando...' : 'Salvar Alterações'}
          </Button>
        </Box>
      </Paper>

      <Snackbar
        open={!!message}
        autoHideDuration={6000}
        onClose={() => setMessage(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert
          onClose={() => setMessage(null)}
          severity={message?.type || 'info'}
          sx={{ width: '100%' }}
        >
          {message?.text}
        </Alert>
      </Snackbar>
    </Box>
  )
}
