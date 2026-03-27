"use client";

import { createClient } from "@/lib/superbase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supaBase = createClient();

  const handleLogin = async () => {
    setLoading(true);
    setError("");

    const { error } = await supaBase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }
    router.push("/dashboard");
  };

  return (
    <>
      <div className="bg-stone-50 border border-stone-200 rounded-xl p-4 mb-6">
        <p className="text-xs font-semibold text-stone-500 uppercase tracking-wide mb-2">
          Demo account
        </p>
        <div className="space-y-1 mb-3">
          <p className="text-sm text-stone-700">
            <span className="font-medium">Email:</span> demo@cvhelper.com
          </p>
          <p className="text-sm text-stone-700">
            <span className="font-medium">Lozinka:</span> demo123456
          </p>
        </div>
        <div className="border-t border-stone-200 pt-3">
          <p className="text-xs text-stone-500">
            Za AI analizu potreban je besplatni{" "}
            <a
              href="https://puter.com"
              target="_blank"
              className="text-stone-700 font-medium underline"
            >
              Puter.com account
            </a>{" "}
            — registracija traje 30 sekundi.
          </p>
        </div>
      </div>

      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 w-full max-w-md">
          <h1 className="text-2xl font-bold text-stone-800 mb-2">Dobrodošli</h1>
          <p className="text-stone-500 mb-6">Prijavite se u vaš account</p>

          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vas@email.com"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Lozinka
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleLogin();
                }}
              />
            </div>

            <button
              onClick={handleLogin}
              disabled={loading}
              className="w-full bg-stone-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
            >
              {loading ? "Prijava..." : "Prijavi se"}
            </button>
          </div>
          <p className="text-center text-sm text-stone-500 mt-6">
            Nemate account?{" "}
            <Link
              href="/signup"
              className="text-stone-800 font-medium hover:underline"
            >
              Registrirajte se
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}
