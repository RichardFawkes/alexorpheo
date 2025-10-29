import { ImageResponse } from 'next/og'

// Configuração do ícone Apple
export const size = {
  width: 180,
  height: 180,
}
export const contentType = 'image/png'

// Gerador de ícone Apple
export default function AppleIcon() {
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
            width: '140px',
            height: '140px',
            border: '8px solid #d4af37',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Letter A */}
          <div
            style={{
              fontSize: 90,
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

