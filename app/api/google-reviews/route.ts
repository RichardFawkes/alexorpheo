import { NextResponse } from "next/server"
import fallbackData from "@/lib/data/google-reviews.json"

export const revalidate = 86400

function toPtBrDate(iso?: string) {
  try {
    if (!iso) return ""
    return new Date(iso).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }).replace(".", "")
  } catch {
    return ""
  }
}

export async function GET() {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    return NextResponse.json(fallbackData, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    })
  }

  try {
    const url = `https://places.googleapis.com/v1/places/${placeId}?fields=reviews`
    const res = await fetch(url, {
      headers: { "X-Goog-Api-Key": apiKey },
      next: { revalidate: 86400 },
    })

    if (!res.ok) {
      return NextResponse.json(fallbackData, {
        headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
      })
    }

    const data = await res.json()
    const reviews = Array.isArray(data?.reviews) ? data.reviews : []

    const cleaned = reviews.map((r: any) => ({
      name: r?.authorAttribution?.displayName || "Usuário Google",
      avatar: r?.authorAttribution?.photoUri || "",
      rating: r?.rating || 5,
      date: toPtBrDate(r?.publishTime),
      text: r?.text?.text || r?.text || "",
    }))

    return NextResponse.json(cleaned, {
      headers: { "Cache-Control": "s-maxage=86400, stale-while-revalidate=86400" },
    })
  } catch (e) {
    return NextResponse.json(fallbackData, {
      headers: { "Cache-Control": "s-maxage=3600, stale-while-revalidate=86400" },
    })
  }
}
