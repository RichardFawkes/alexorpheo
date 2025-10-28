"use client"

import { useState, useRef } from "react"
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { uploadImage, deleteImage } from "@/lib/storage/uploadImage"
import Image from "next/image"

interface ImageUploadProps {
  value?: string
  onChange: (url: string) => void
  onRemove?: () => void
  disabled?: boolean
}

export default function ImageUpload({
  value,
  onChange,
  onRemove,
  disabled
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setError(null)
    setIsUploading(true)

    try {
      const result = await uploadImage(file)

      if (result.success && result.url) {
        onChange(result.url)
      } else {
        setError(result.error || 'Erro ao fazer upload')
      }
    } catch (err) {
      setError('Erro ao fazer upload da imagem')
    } finally {
      setIsUploading(false)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const handleRemove = async () => {
    if (!value) return

    try {
      await deleteImage(value)
      if (onRemove) onRemove()
      onChange('')
    } catch (err) {
      console.error('Erro ao remover imagem:', err)
    }
  }

  return (
    <div className="space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
        disabled={disabled || isUploading}
      />

      {value ? (
        <div className="relative aspect-video w-full max-w-lg rounded-lg overflow-hidden border">
          <Image
            src={value}
            alt="Preview"
            fill
            className="object-cover"
          />
          {!disabled && (
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-2 right-2 p-2 bg-destructive text-destructive-foreground rounded-full hover:bg-destructive/90 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      ) : (
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled || isUploading}
          className="w-full max-w-lg aspect-video border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/50 transition-colors flex flex-col items-center justify-center gap-2 bg-muted/5 hover:bg-muted/10 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isUploading ? (
            <>
              <Loader2 className="h-10 w-10 text-muted-foreground animate-spin" />
              <span className="text-sm text-muted-foreground">Fazendo upload...</span>
            </>
          ) : (
            <>
              <ImageIcon className="h-10 w-10 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                Clique para fazer upload da imagem
              </span>
              <span className="text-xs text-muted-foreground/60">
                JPG, PNG, WEBP ou GIF (máx. 5MB)
              </span>
            </>
          )}
        </button>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  )
}
