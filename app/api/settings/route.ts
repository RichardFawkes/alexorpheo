
import { auth } from "@/lib/auth/auth"
import { supabaseServer } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { data, error } = await supabaseServer
      .from("SiteSettings")
      .select("*")
      .single()

    if (error) {
      // If table doesn't exist or is empty, return default
      if (error.code === 'PGRST116') {
         return NextResponse.json({ bannerImage: '/banner.png' })
      }
      return new NextResponse("Internal Error", { status: 500 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("[SETTINGS_GET]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}

export async function PUT(req: Request) {
  try {
    const session = await auth()
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const body = await req.json()
    const { bannerImage } = body

    // Check if settings exist
    const { data: existing } = await supabaseServer
      .from("SiteSettings")
      .select("id")
      .single()

    let error;
    
    if (existing) {
        const result = await supabaseServer
        .from("SiteSettings")
        .update({ bannerImage, updatedAt: new Date().toISOString() })
        .eq("id", existing.id)
        .select()
        .single()
        error = result.error
    } else {
        const result = await supabaseServer
        .from("SiteSettings")
        .insert([{ bannerImage }])
        .select()
        .single()
        error = result.error
    }

    if (error) {
      console.error(error)
      return new NextResponse("Internal Error", { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("[SETTINGS_PUT]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
