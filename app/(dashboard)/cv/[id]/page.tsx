import CVEditor from "@/components/cv/CVEditor";
import Navbar from "@/components/layout/Navbar";
import { createClient } from "@/lib/superbase/server";
import { redirect } from "next/navigation";

export default async function CVPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: cv } = await supabase
    .from("cvs")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!cv) redirect("/dashboard");

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        firstName={profile?.first_name ?? ""}
        lastName={profile?.last_name ?? ""}
      />
      <CVEditor cv={cv} />
    </div>
  );
}
