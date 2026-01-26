'use client'
import { useMemo } from 'react'
import { Box, Button, Paper, Stack } from '@mui/material'
import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import LinkExtension from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import TextAlign from '@tiptap/extension-text-align'
import Image from '@tiptap/extension-image'
import {
  FormatBold as FormatBoldIcon,
  FormatItalic as FormatItalicIcon,
  FormatUnderlined as FormatUnderlinedIcon,
  Link as LinkIcon,
  LinkOff as LinkOffIcon,
  Title as TitleIcon,
  FormatListBulleted as FormatListBulletedIcon,
  FormatListNumbered as FormatListNumberedIcon,
  FormatQuote as FormatQuoteIcon,
  Code as CodeIcon,
  FormatClear as FormatClearIcon,
  FormatAlignLeft as FormatAlignLeftIcon,
  FormatAlignCenter as FormatAlignCenterIcon,
  FormatAlignRight as FormatAlignRightIcon,
  Redo as RedoIcon,
  Undo as UndoIcon,
  Image as ImageIcon,
} from '@mui/icons-material'

type Props = {
  value: string
  onChange: (html: string) => void
  minHeight?: number
}

export default function RichTextEditor({ value, onChange, minHeight = 240 }: Props) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      LinkExtension.configure({
        openOnClick: false,
        autolink: true,
        HTMLAttributes: { rel: 'noopener noreferrer' },
      }),
      Placeholder.configure({
        placeholder: 'Escreva o conteúdo aqui...',
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Image,
    ],
    content: value || '',
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  const toolbarDisabled = useMemo(() => !editor, [editor])

  return (
    <Box>
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap' }}>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().undo().run()} startIcon={<UndoIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Undo</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().redo().run()} startIcon={<RedoIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Redo</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleBold().run()} startIcon={<FormatBoldIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Negrito</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleItalic().run()} startIcon={<FormatItalicIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Itálico</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleUnderline().run()} startIcon={<FormatUnderlinedIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Sublinhado</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()} startIcon={<TitleIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Título</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()} startIcon={<TitleIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>H3</Button>
        <Button
          variant="outlined"
          size="small"
          disabled={toolbarDisabled}
          onClick={() => {
            const url = prompt('URL do link:')
            if (url) editor?.chain().focus().setLink({ href: url }).run()
          }}
          startIcon={<LinkIcon />}
          sx={{ textTransform: 'none', borderRadius: 2 }}
        >
          Link
        </Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().unsetLink().run()} startIcon={<LinkOffIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Remover Link</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleBulletList().run()} startIcon={<FormatListBulletedIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Lista</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleOrderedList().run()} startIcon={<FormatListNumberedIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Numerada</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleBlockquote().run()} startIcon={<FormatQuoteIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Citação</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleCode().run()} startIcon={<CodeIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Código</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => {
          const url = prompt('URL da imagem:')
          if (url) editor?.chain().focus().setImage({ src: url }).run()
        }} startIcon={<ImageIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Imagem</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setTextAlign('left').run()} startIcon={<FormatAlignLeftIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Esquerda</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setTextAlign('center').run()} startIcon={<FormatAlignCenterIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Centro</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setTextAlign('right').run()} startIcon={<FormatAlignRightIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Direita</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()} startIcon={<FormatClearIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Limpar</Button>
      </Stack>

      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          border: '1px solid #e2e8f0',
          p: 2,
          '& .tiptap-editor': {
            minHeight,
            outline: 'none',
            fontSize: '1rem',
            lineHeight: 1.8,
          },
          '& .tiptap-editor p': { margin: '0.8em 0' },
          '& .tiptap-editor h2': { margin: '1.2em 0 0.6em', fontWeight: 700, fontSize: '1.25rem' },
          '& .tiptap-editor h3': { margin: '1.1em 0 0.5em', fontWeight: 700, fontSize: '1.1rem' },
          '& .tiptap-editor blockquote': { borderLeft: '4px solid #e2e8f0', paddingLeft: '12px', color: '#64748b' },
          '& .tiptap-editor code': { background: '#f1f5f9', padding: '2px 6px', borderRadius: '6px' },
          '& .tiptap-editor ul, & .tiptap-editor ol': { paddingLeft: '1.2rem' },
          '& .tiptap-editor a': { color: '#2563eb', textDecoration: 'underline' },
          '& .tiptap-editor img': { maxWidth: '100%', borderRadius: '8px' },
        }}
      >
        {editor ? <EditorContent editor={editor} className="tiptap-editor" /> : <Box sx={{ minHeight, outline: 'none', fontSize: '1rem', lineHeight: 1.7 }} />}
      </Paper>
    </Box>
  )
}
