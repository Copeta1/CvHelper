"use client";

import { createClient } from "@/lib/superbase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewCVPage() {
  const [title, setTitle] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleCreate = async () => {
    if (!title.trim()) {
      setError("Naziv CV-a ne smije biti prazan.");
      return;
    }

    setLoading(true);
    setError("");

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("cvs")
      .insert({
        user_id: user.id,
        title: title.trim(),
        status: "draft",
      })
      .select()
      .single();

    if (error) {
      setError("Greška prilikom kreiranja CV-a.");
      setLoading(false);
      return;
    }
    router.push(`/cv/${data.id}`);
  };

  return (
    <div className="min-h-screen bg-stone-50 flex items-center justify-center">
      <div className="bg-white rounded-xl border border-stone-200 p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">Novi CV</h1>
        <p className="text-stone-500 mb-6">Kako želite nazvati ovaj CV</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Naziv CV-a
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="npr. Moj CV"
              className="w-full  border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              autoFocus
            />
          </div>

          <button
            onClick={handleCreate}
            disabled={loading}
            className="w-full bg-stone-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Kreiranje..." : "Kreiraj CV"}
          </button>

          <button
            onClick={() => router.push("/dashboard")}
            className="w-full text-stone-500 py-2 rounded-lg text-sm hover:text-stone-800 transition-colors"
          >
            Odustani
          </button>
        </div>
      </div>
    </div>
  );
}
