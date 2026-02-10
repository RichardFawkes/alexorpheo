import { supabaseServer } from "@/lib/supabase/server"
import MuiAreaAtuacaoForm from "@/components/admin/MuiAreaAtuacaoForm"
import { notFound } from "next/navigation"

export default async function EditarAreaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const { data: area } = await supabaseServer
    .from("PracticeArea")
    .select("*")
    .eq("id", id)
    .single()

  if (!area) {
    notFound()
  }

  return <MuiAreaAtuacaoForm initialData={area} />
}
