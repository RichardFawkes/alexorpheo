import { NextResponse } from "next/server"
import { supabaseServer } from "@/lib/supabase/server"

export async function GET() {
  try {
    const { data: news, error } = await supabaseServer
      .from('News')
      .select('*')
      .order('createdAt', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message, details: error },
        { status: 500 }
      )
    }

    return NextResponse.json({
      count: news?.length || 0,
      items: news || []
    })
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    )
  }
}
