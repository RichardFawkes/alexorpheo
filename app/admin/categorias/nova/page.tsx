
import { Metadata } from "next"
import MuiCategoriaForm from "@/components/admin/MuiCategoriaForm"

export const metadata: Metadata = {
  title: "Nova Categoria | Admin",
}

export default function NovaCategoriaPage() {
  return <MuiCategoriaForm />
}
