import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET() {
  return POST()
}

export async function POST() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    console.log('🔍 Verificando configurações...')
    console.log('URL:', supabaseUrl)
    console.log('Service Key existe?', !!supabaseServiceKey)

    if (!supabaseUrl) {
      return NextResponse.json(
        { error: 'NEXT_PUBLIC_SUPABASE_URL não configurada' },
        { status: 500 }
      )
    }

    if (!supabaseServiceKey || supabaseServiceKey === 'COLE_AQUI_SUA_SERVICE_ROLE_KEY') {
      return NextResponse.json(
        {
          error: 'SUPABASE_SERVICE_ROLE_KEY não configurada corretamente no .env.local',
          help: 'Acesse https://supabase.com/dashboard/project/nnglymnadwhrskmqqkya/settings/api e copie a service_role key'
        },
        { status: 500 }
      )
    }

    console.log('✅ Configurações OK, criando cliente Supabase...')

    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })

    console.log('✅ Cliente criado, tentando criar usuário...')

    const { data, error } = await supabaseAdmin.auth.admin.createUser({
      email: 'adv.orpheo@gmail.com',
      password: 'admin@orpheo#',
      email_confirm: true,
      user_metadata: {
        name: 'Alex Orpheo',
        role: 'ADMIN'
      }
    })

    if (error) {
      console.error('❌ Erro ao criar usuário:', error)
      return NextResponse.json({
        error: error.message,
        details: error,
        help: 'Verifique se a Service Role Key está correta'
      }, { status: 400 })
    }

    console.log('✅ Usuário criado com sucesso!')

    return NextResponse.json({
      success: true,
      message: '✅ Usuário admin criado com sucesso!',
      credentials: {
        email: 'adv.orpheo@gmail.com',
        password: 'admin@orpheo#'
      },
      user: {
        id: data.user?.id,
        email: data.user?.email
      },
      nextSteps: [
        '1. Acesse http://localhost:3000/admin/login',
        '2. Use as credenciais acima para fazer login',
        '3. DELETE este arquivo app/api/setup-admin/route.ts por segurança!'
      ]
    })
  } catch (error: any) {
    console.error('❌ Erro geral:', error)
    return NextResponse.json({
      error: error.message,
      stack: error.stack
    }, { status: 500 })
  }
}

