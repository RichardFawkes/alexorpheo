import { ImageResponse } from 'next/og'

// Configuração do ícone
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Gerador de ícone
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a1628',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}
      >
        {/* Circle */}
        <div
          style={{
            width: '24px',
            height: '24px',
            border: '2px solid #d4af37',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Letter A */}
          <div
            style={{
              fontSize: 16,
              color: '#d4af37',
              fontFamily: 'serif',
              fontWeight: 700,
            }}
          >
            A
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

