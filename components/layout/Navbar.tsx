"use client";

import { createClient } from "@/lib/superbase/client";
import { useRouter } from "next/navigation";

interface NavbarProps {
  firstName: string;
  lastName: string;
}

export default function Navbar({ firstName, lastName }: NavbarProps) {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className="bg-white border-b border-stone-200 px-6 py-4">
      <div className="max-w-5xl mx-auto flex items-center justify-between">
        <span className="text-lg font-bold text-stone-800">CvHelper</span>

        <div className="flex items-center gap-4">
          <span className="text-sm text-stone-600">
            {firstName} {lastName}
          </span>
          <button
            onClick={handleLogout}
            className="text-sm text-stone-500 border border-stone-300 px-3 py-1.5 rounded-lg hover:bg-stone-50 hover:text-stone-800 transition-colors"
          >
            Odjava
          </button>
        </div>
      </div>
    </nav>
  );
}
