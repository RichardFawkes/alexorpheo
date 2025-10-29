import { Metadata } from "next"
import MuiArtigoForm from "@/components/admin/MuiArtigoForm"

export const metadata: Metadata = {
  title: "Novo Artigo | Admin",
}

export default function NovoArtigoPage() {
  return <MuiArtigoForm />
}
