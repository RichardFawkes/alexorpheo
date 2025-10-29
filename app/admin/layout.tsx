import { auth } from "@/lib/auth/auth";
import MuiAdminLayout from "@/components/admin/MuiAdminLayout";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <MuiAdminLayout user={session?.user}>
      {children}
    </MuiAdminLayout>
  );
}
