import { createClient } from "@/lib/superbase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          Dobrodošli! 👋
        </h1>
        <p className="text-stone-500">{user.email}</p>
      </div>
    </div>
  );
}
