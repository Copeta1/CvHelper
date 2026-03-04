import Link from "next/link";

export default function CheckEmailPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50">
      <div className="bg-white p-8 rounded-xl shadow-sm border border-stone-200 w-full max-w-md text-center">
        <div className="text-5xl mb-4">📧</div>
        <h1 className="text-2xl font-bold text-stone-800 mb-2">
          Provjerite vaš email!
        </h1>
        <p className="text-stone-500 mb-6">
          Poslali smo vam link za potvrdu na vaš email. Kliknite na link kako
          biste aktivirali vaš account.
        </p>
        <p className="text-sm text-stone-400 mb-6">
          Niste dobili email? Provjerite spam folder.
        </p>
        <Link
          href="/login"
          className="text-stone-800 font-medium hover:underline text-sm"
        >
          Natrag na prijavu
        </Link>
      </div>
    </div>
  );
}
