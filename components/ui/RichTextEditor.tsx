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
      <Stack direction="row" spacing={1} sx={{ mb: 2, flexWrap: 'wrap', gap: 1 }}>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().undo().run()} startIcon={<UndoIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Undo</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().redo().run()} startIcon={<RedoIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Redo</Button>
        <Box sx={{ width: '1px', bgcolor: 'divider', mx: 1, height: 30, alignSelf: 'center' }} />
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleBold().run()} startIcon={<FormatBoldIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('bold') ? 'action.selected' : 'transparent' }}>Negrito</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleItalic().run()} startIcon={<FormatItalicIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('italic') ? 'action.selected' : 'transparent' }}>Itálico</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleUnderline().run()} startIcon={<FormatUnderlinedIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('underline') ? 'action.selected' : 'transparent' }}>Sublinhado</Button>
        <Box sx={{ width: '1px', bgcolor: 'divider', mx: 1, height: 30, alignSelf: 'center' }} />
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setHeading({ level: 2 }).run()} startIcon={<TitleIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('heading', { level: 2 }) ? 'action.selected' : 'transparent' }}>H2</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().setHeading({ level: 3 }).run()} startIcon={<TitleIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('heading', { level: 3 }) ? 'action.selected' : 'transparent' }}>H3</Button>
        <Box sx={{ width: '1px', bgcolor: 'divider', mx: 1, height: 30, alignSelf: 'center' }} />
        <Button
          variant="outlined"
          size="small"
          disabled={toolbarDisabled}
          onClick={() => {
            const url = prompt('URL do link:')
            if (url) editor?.chain().focus().setLink({ href: url }).run()
          }}
          startIcon={<LinkIcon />}
          sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('link') ? 'action.selected' : 'transparent' }}
        >
          Link
        </Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().unsetLink().run()} startIcon={<LinkOffIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Remover Link</Button>
        <Box sx={{ width: '1px', bgcolor: 'divider', mx: 1, height: 30, alignSelf: 'center' }} />
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleBulletList().run()} startIcon={<FormatListBulletedIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('bulletList') ? 'action.selected' : 'transparent' }}>Lista</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleOrderedList().run()} startIcon={<FormatListNumberedIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('orderedList') ? 'action.selected' : 'transparent' }}>Numerada</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().toggleBlockquote().run()} startIcon={<FormatQuoteIcon />} sx={{ textTransform: 'none', borderRadius: 2, bgcolor: editor?.isActive('blockquote') ? 'action.selected' : 'transparent' }}>Citação</Button>
        <Box sx={{ width: '1px', bgcolor: 'divider', mx: 1, height: 30, alignSelf: 'center' }} />
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => {
          const url = prompt('URL da imagem:')
          if (url) editor?.chain().focus().setImage({ src: url }).run()
        }} startIcon={<ImageIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Imagem</Button>
        <Button variant="outlined" size="small" disabled={toolbarDisabled} onClick={() => editor?.chain().focus().clearNodes().unsetAllMarks().run()} startIcon={<FormatClearIcon />} sx={{ textTransform: 'none', borderRadius: 2 }}>Limpar</Button>
      </Stack>

      <Paper
        elevation={0}
        onClick={() => editor?.chain().focus().run()}
        sx={{
          borderRadius: 2,
          border: editor?.isFocused ? '2px solid #d9b060' : '1px solid #e2e8f0',
          transition: 'border-color 0.2s',
          p: 3,
          cursor: 'text',
          bgcolor: '#ffffff',
          '& .tiptap-editor': {
            minHeight,
            outline: 'none',
            fontSize: '1rem',
            lineHeight: 1.8,
            display: 'flex',
            flexDirection: 'column',
          },
          '& .ProseMirror': {
            flexGrow: 1,
            outline: 'none',
            minHeight: '100%',
          },
          '& .tiptap-editor p': { margin: '0.8em 0' },
          '& .tiptap-editor h2': { margin: '1.2em 0 0.6em', fontWeight: 700, fontSize: '1.5rem', color: '#1e293b' },
          '& .tiptap-editor h3': { margin: '1.1em 0 0.5em', fontWeight: 600, fontSize: '1.25rem', color: '#334155' },
          '& .tiptap-editor blockquote': { 
            borderLeft: '4px solid #d9b060', 
            paddingLeft: '16px', 
            color: '#475569',
            fontStyle: 'italic',
            my: 2,
            bgcolor: '#f8fafc',
            py: 1,
            pr: 2,
            borderRadius: '0 8px 8px 0'
          },
          '& .tiptap-editor code': { 
            background: '#f1f5f9', 
            padding: '2px 6px', 
            borderRadius: '6px',
            fontFamily: 'monospace',
            color: '#0f172a'
          },
          '& .tiptap-editor ul, & .tiptap-editor ol': { paddingLeft: '1.5rem', color: '#334155' },
          '& .tiptap-editor li': { marginBottom: '0.5em' },
          '& .tiptap-editor a': { color: '#d9b060', textDecoration: 'underline', fontWeight: 500 },
          '& .tiptap-editor img': { maxWidth: '100%', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' },
          '& .tiptap-editor .is-editor-empty:first-child::before': {
            color: '#94a3b8',
            content: 'attr(data-placeholder)',
            float: 'left',
            height: 0,
            pointerEvents: 'none',
          },
        }}
      >
        {editor ? <EditorContent editor={editor} className="tiptap-editor" /> : <Box sx={{ minHeight, outline: 'none', fontSize: '1rem', lineHeight: 1.7 }} />}
      </Paper>
    </Box>
  )
}
