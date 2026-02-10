import MuiAreaAtuacaoForm from "@/components/admin/MuiAreaAtuacaoForm"
import Link from "next/link"

export default async function AreasAdminPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/practice-areas`, { cache: "no-store" }).catch(() => null)
  const areas = res?.ok ? await res.json() : []

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Áreas de Atuação</h1>
        <Link href="/admin/areas/novo" className="px-4 py-2 rounded-lg bg-[#d9b060] text-slate-950 font-bold">
          Nova Área
        </Link>
      </div>

      {areas?.length ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {areas.map((area: any) => (
            <div key={area.id} className="p-4 border rounded-xl bg-white flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-slate-900">{area.titulo}</h3>
                <p className="text-sm text-slate-500">{area.slug}</p>
              </div>
              <Link href={`/admin/areas/${area.id}`} className="px-3 py-2 rounded-md border font-medium">
                Editar
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-6 border rounded-xl bg-white">
          <p className="text-slate-600">Nenhuma área cadastrada.</p>
          <div className="mt-4">
            <Link href="/admin/areas/novo" className="px-4 py-2 rounded-lg border font-medium">
              Cadastrar primeira área
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
