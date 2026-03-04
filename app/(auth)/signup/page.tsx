"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/superbase/client";

export default function SignupPage() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  const handleSignup = async () => {
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Lozinke se ne podudaraju!");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Lozinka mora imati minimalno 6 znakova!");
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/check-email");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 w-full max-w-md">
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          Kreirajte account
        </h1>
        <p className="text-stone-500 mb-6">Besplatno se registrirajte</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4 text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div className="flex gap-3">
            <div className="flex-1">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Ime
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                placeholder="Ivan"
              />
            </div>
            <div className="flex-1">
              <label className="block text-sm font-medium text-stone-700 mb-1">
                Prezime
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                placeholder="Horvat"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="vas@email.com"
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
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="••••••••"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              Potvrdi lozinku
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              placeholder="••••••••"
            />
          </div>

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-stone-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Kreiranje..." : "Kreiraj account"}
          </button>
        </div>

        <p className="text-center text-sm text-stone-500 mt-6">
          Već imate account?{" "}
          <Link
            href="/login"
            className="text-stone-800 font-medium hover:underline"
          >
            Prijavite se
          </Link>
        </p>
      </div>
    </div>
  );
}
