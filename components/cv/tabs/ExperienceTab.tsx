import { CVData } from "@/types/cv.types";
import { GraduationCap } from "lucide-react";

export default function ExperienceTab({
  data,
  onChange,
}: {
  data: CVData["experience"];
  onChange: (data: CVData["experience"]) => void;
}) {
  const addExperience = () => {
    onChange([
      ...data,
      {
        id: crypto.randomUUID(),
        company: "",
        position: "",
        startDate: "",
        endDate: "",
        location: "",
        description: [""],
      },
    ]);
  };

  const updateExperience = (
    index: number,
    updated: CVData["experience"][0],
  ) => {
    const newData = [...data];
    newData[index] = updated;
    onChange(newData);
  };

  const removeExperience = (index: number) => {
    onChange(data.filter((_, i) => i !== index));
  };

  const addDescriptionPoint = (expIndex: number) => {
    const updated = {
      ...data[expIndex],
      description: [...data[expIndex].description, ""],
    };
    updateExperience(expIndex, updated);
  };

  const updateDescriptionPoint = (
    expIndex: number,
    pointIndex: number,
    value: string,
  ) => {
    const newDesc = [...data[expIndex].description];
    newDesc[pointIndex] = value;
    updateExperience(expIndex, { ...data[expIndex], description: newDesc });
  };

  const removeDescriptionPoint = (expIndex: number, pointIndex: number) => {
    const newDesc = data[expIndex].description.filter(
      (_, i) => i !== pointIndex,
    );
    updateExperience(expIndex, { ...data[expIndex], description: newDesc });
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-stone-800">Radno iskustvo</h2>
        <button
          onClick={addExperience}
          className="text-sm bg-stone-800 text-white px-3 py-1.5 rounded-lg hover:bg-stone-700 transition-colors"
        >
          + Dodaj iskustvo
        </button>
      </div>

      {data.length === 0 && (
        <div className="text-center py-8 text-stone-400">
          <GraduationCap className="w-10 h-10 text-stone-300 mx-auto mb-2" />
          <p className="text-sm">Još nema radnog iskustva</p>
        </div>
      )}

      <div className="space-y-6">
        {data.map((exp, expIndex) => (
          <div key={exp.id} className="border border-stone-200 rounded-xl p-5">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-medium text-stone-700">
                {exp.position || exp.company || `Iskustvo ${expIndex + 1}`}
              </h3>
              <button
                onClick={() => removeExperience(expIndex)}
                className="text-red-400 hover:text-red-600 text-sm transition-colors border border-red-300 hover:border-red-500 px-3 py-1 rounded-lg"
              >
                Ukloni
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Tvrtka
                </label>
                <input
                  type="text"
                  value={exp.company}
                  onChange={(e) =>
                    updateExperience(expIndex, {
                      ...exp,
                      company: e.target.value,
                    })
                  }
                  placeholder="npr. Google"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Pozicija
                </label>
                <input
                  type="text"
                  value={exp.position}
                  onChange={(e) =>
                    updateExperience(expIndex, {
                      ...exp,
                      position: e.target.value,
                    })
                  }
                  placeholder="npr. Frontend Developer"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Početak
                </label>
                <input
                  type="text"
                  value={exp.startDate}
                  onChange={(e) =>
                    updateExperience(expIndex, {
                      ...exp,
                      startDate: e.target.value,
                    })
                  }
                  placeholder="npr. Siječanj 2022"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Kraj
                </label>
                <input
                  type="text"
                  value={exp.endDate}
                  onChange={(e) =>
                    updateExperience(expIndex, {
                      ...exp,
                      endDate: e.target.value,
                    })
                  }
                  placeholder="npr. Danas"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
              <div className="col-span-2">
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Lokacija
                </label>
                <input
                  type="text"
                  value={exp.location ?? ""}
                  onChange={(e) =>
                    updateExperience(expIndex, {
                      ...exp,
                      location: e.target.value,
                    })
                  }
                  placeholder="npr. Zagreb, Hrvatska"
                  className="w-full border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-medium text-stone-600">
                  Opis (bullet points)
                </label>
                <button
                  onClick={() => addDescriptionPoint(expIndex)}
                  className="text-xs text-stone-500 hover:text-stone-800 transition-colors"
                >
                  + Dodaj točku
                </button>
              </div>
              <div className="space-y-2">
                {exp.description.map((point, pointIndex) => (
                  <div key={pointIndex} className="flex gap-2 items-start">
                    <span className="text-stone-400 mt-2 text-xs">•</span>
                    <input
                      type="text"
                      value={point}
                      onChange={(e) =>
                        updateDescriptionPoint(
                          expIndex,
                          pointIndex,
                          e.target.value,
                        )
                      }
                      placeholder="npr. Razvijao React aplikacije za 50k+ korisnika"
                      className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
                    />
                    <button
                      onClick={() =>
                        removeDescriptionPoint(expIndex, pointIndex)
                      }
                      className="text-red-400 hover:text-red-600 mt-2 text-xs transition-colors"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
