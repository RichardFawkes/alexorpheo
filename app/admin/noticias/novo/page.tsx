import { Metadata } from "next"
import MuiNoticiaForm from "@/components/admin/MuiNoticiaForm"

export const metadata: Metadata = {
  title: "Nova Notícia | Admin",
}

export default function NovaNoticiaPage() {
  return <MuiNoticiaForm />
}
