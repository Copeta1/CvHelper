import { CVData } from "@/types/cv.types";
import { GraduationCap } from "lucide-react";

export default function EducationTab({
  data,
  onChange,
}: {
  data: CVData["education"];
  onChange: (data: CVData["education"]) => void;
}) {
  const addEducation = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        institution: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
        gpa: "",
      },
    ]);
  };

  const removeEducation = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const updateEducation = (index: number, updated: CVData["education"][0]) => {
    const newData = [...data];
    newData[index] = updated;
    onChange(newData);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-stone-800">Obrazovanje</h2>
        <button
          onClick={addEducation}
          className="text-sm bg-stone-800 text-white px-3 py-1.5 rounded-lg hover:bg-stone-700 transition-colors"
        >
          + Dodaj obrazovanje
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-stone-400">
          <GraduationCap className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <p className="text-sm">Još nije dodano obrazovanje</p>
        </div>
      )}

      <div className="space-y-6">
        {data.map((edu, index) => (
          <div key={edu.id} className="border border-stone-200 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-stone-700">
                {edu.institution || `Obrazovanje ${index + 1}`}
              </h3>
              <button
                onClick={() => removeEducation(index)}
                className="text-red-400 hover:text-red-600 text-sm transition-colors border border-red-300 hover:border-red-500 px-3 py-1 rounded-lg"
              >
                Ukloni
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Institucija
                </label>
                <input
                  type="text"
                  value={edu.institution}
                  onChange={(e) =>
                    updateEducation(index, {
                      ...edu,
                      institution: e.target.value,
                    })
                  }
                  placeholder="npr. Sveučilište u Zagrebu"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Stupanj
                </label>
                <input
                  type="text"
                  value={edu.degree}
                  onChange={(e) =>
                    updateEducation(index, { ...edu, degree: e.target.value })
                  }
                  placeholder="npr. Bachelor"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Smjer
                </label>
                <input
                  type="text"
                  value={edu.field}
                  onChange={(e) =>
                    updateEducation(index, { ...edu, field: e.target.value })
                  }
                  placeholder="npr. Računarstvo"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Početak
                </label>
                <input
                  type="text"
                  value={edu.startDate}
                  onChange={(e) =>
                    updateEducation(index, {
                      ...edu,
                      startDate: e.target.value,
                    })
                  }
                  placeholder="npr. 2018"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Kraj
                </label>
                <input
                  type="text"
                  value={edu.endDate}
                  onChange={(e) =>
                    updateEducation(index, { ...edu, endDate: e.target.value })
                  }
                  placeholder="npr. 2022"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  GPA (opcionalno)
                </label>
                <input
                  type="text"
                  value={edu.gpa ?? ""}
                  onChange={(e) =>
                    updateEducation(index, { ...edu, gpa: e.target.value })
                  }
                  placeholder="npr. 4.5"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
