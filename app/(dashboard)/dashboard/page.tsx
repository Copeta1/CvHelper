import { redirect } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Link from "next/link";
import { createClient } from "@/lib/superbase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Dohvati profil
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  // Dohvati CV-ove
  const { data: cvs } = await supabase
    .from("cvs")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const totalCvs = cvs?.length ?? 0;
  const analyzedCvs =
    cvs?.filter((cv) => cv.status === "analyzed" || cv.status === "optimized")
      .length ?? 0;
  const avgScore =
    cvs && cvs.length > 0
      ? Math.round(
          cvs.reduce(
            (acc, cv) => acc + (cv.ai_suggestions?.overallScore ?? 0),
            0,
          ) / cvs.length,
        )
      : null;

  const stats = [
    { icon: "📄", value: totalCvs, label: "CV-ovi" },
    { icon: "✨", value: analyzedCvs, label: "Analizirani" },
    {
      icon: "📊",
      value: avgScore ? `${avgScore}/100` : "-",
      label: "Prosječni score",
    },
  ];

  return (
    <div className="min-h-screen bg-stone-50">
      <Navbar
        firstName={profile?.first_name ?? ""}
        lastName={profile?.last_name ?? ""}
      />

      <div className="max-w-5xl mx-auto p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-800">
            Dobrodošli, {profile?.first_name}! 👋
          </h1>
          <p className="text-stone-500 mt-1">
            Kreirajte CV koji će vas istaknuti
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white rounded-xl border border-stone-200 p-5 flex items-center gap-4"
            >
              <div className="text-4xl">{stat.icon}</div>
              <div>
                <div className="text-2xl font-bold text-stone-800">
                  {stat.value}
                </div>
                <div className="text-sm text-stone-500">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* CV Lista */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-stone-800">Moji CV-ovi</h2>
          <Link
            href="/cv/new"
            className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            + Novi CV
          </Link>
        </div>

        {/* Empty state ili lista */}
        {totalCvs === 0 ? (
          <div className="bg-white rounded-xl border border-stone-200 p-12 text-center">
            <div className="text-5xl mb-4">📄</div>
            <h3 className="text-lg font-semibold text-stone-800 mb-2">
              Još nema CV-ova
            </h3>
            <p className="text-stone-500 mb-6">
              Kreirajte svoj prvi CV i pustite AI da ga optimizira
            </p>
            <Link
              href="/cv/new"
              className="bg-stone-800 text-white px-6 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
            >
              Kreiraj CV
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {cvs?.map((cv) => (
              <div
                key={cv.id}
                className="bg-white rounded-xl border border-stone-200 p-5 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">📄</span>
                  <div>
                    <h3 className="font-medium text-stone-800">{cv.title}</h3>
                    <p className="text-sm text-stone-500">
                      Zadnja izmjena:{" "}
                      {new Date(cv.updated_at).toLocaleDateString("hr-HR")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {cv.ai_suggestions?.overallScore && (
                    <span className="text-sm font-medium text-stone-600">
                      Score: {cv.ai_suggestions.overallScore}/100
                    </span>
                  )}
                  <Link
                    href={`/cv/${cv.id}`}
                    className="text-sm text-stone-600 border border-stone-300 px-3 py-1.5 rounded-lg hover:bg-stone-50 transition-colors"
                  >
                    Uredi
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
