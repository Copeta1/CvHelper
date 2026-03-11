import { CVData } from "@/types/cv.types";

export default function PersonalInfoTab({
  data,
  onChange,
}: {
  data: CVData["personalInfo"];
  onChange: (data: CVData["personalInfo"]) => void;
}) {
  const fields = [
    { key: "firstName", label: "Ime", placeholder: "Ivan", type: "text" },
    { key: "lastName", label: "Prezime", placeholder: "Horvat", type: "text" },
    {
      key: "email",
      label: "Email",
      placeholder: "ivan@email.com",
      type: "email",
    },
    {
      key: "phone",
      label: "Telefon",
      placeholder: "+385 91 234 5678",
      type: "text",
    },
    {
      key: "location",
      label: "Lokacija",
      placeholder: "Zagreb, Hrvatska",
      type: "text",
    },
    {
      key: "linkedin",
      label: "LinkedIn",
      placeholder: "linkedin.com/in/ivan",
      type: "text",
    },
    {
      key: "github",
      label: "GitHub",
      placeholder: "github.com/ivan",
      type: "text",
    },
    {
      key: "website",
      label: "Website",
      placeholder: "ivanhorvat.com",
      type: "text",
    },
  ];

  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-800 mb-4">
        Osobni podaci
      </h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {fields.map((field) => (
          <div key={field.key}>
            <label className="block text-sm font-medium text-stone-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              value={data[field.key as keyof typeof data] ?? ""}
              onChange={(e) =>
                onChange({ ...data, [field.key]: e.target.value })
              }
              placeholder={field.placeholder}
              className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
            />
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-medium text-stone-700 mb-1">
          Profesionalni summary
        </label>
        <textarea
          value={data.summary ?? ""}
          onChange={(e) => onChange({ ...data, summary: e.target.value })}
          placeholder="Kratki opis vaše profesionalne karijere..."
          rows={4}
          className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400 resize-none"
        />
      </div>
    </div>
  );
}
