"use client";

import { CVData } from "@/types/cv.types";
import { X } from "lucide-react";
import { useState } from "react";

export default function SkillsTab({
  data,
  onChange,
}: {
  data: CVData["skills"];
  onChange: (data: CVData["skills"]) => void;
}) {
  const [newTechnical, setNewTechnical] = useState("");
  const [newSoft, setNewSoft] = useState("");
  const [newLanguage, setNewLanguage] = useState("");

  const sections = [
    {
      key: "technical" as const,
      label: "Tehničke vještine",
      placeholder: "npr. React, TypeScript...",
      value: newTechnical,
      setValue: setNewTechnical,
    },
    {
      key: "soft" as const,
      label: "Soft skills",
      placeholder: "npr. Timski rad, Komunikacija...",
      value: newSoft,
      setValue: setNewSoft,
    },
    {
      key: "languages" as const,
      label: "Jezici",
      placeholder: "npr. Engleski (C1)...",
      value: newLanguage,
      setValue: setNewLanguage,
    },
  ];

  const addSkill = (
    category: keyof CVData["skills"],
    value: string,
    setValue: (v: string) => void,
  ) => {
    if (!value.trim()) return;
    onChange({ ...data, [category]: [...data[category], value.trim()] });
    setValue("");
  };

  const removeSkill = (category: keyof CVData["skills"], index: number) => {
    onChange({
      ...data,
      [category]: data[category].filter((_, i) => i !== index),
    });
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-stone-800 mb-4">Vještine</h2>

      <div className="space-y-6">
        {sections.map((sections) => (
          <div
            key={sections.key}
            className="border border-stone-200 rounded-xl p-5"
          >
            <h3 className="font-medium text-stone-700 mb-3">
              {sections.label}
            </h3>

            <div className="flex flex-wrap gap-2 mb-3">
              {data[sections.key].map((skill, index) => (
                <span
                  key={index}
                  className="flex items-center gap-1 bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                  <button
                    onClick={() => removeSkill(sections.key, index)}
                    className="text-stone-400 hover:text-red-500 transition-colors hover:border hover:rounded-full hover:border-red-500"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              {data[sections.key].length === 0 && (
                <p className="text-sm text-stone-400">Još nama vještina</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={sections.value}
                onChange={(e) => sections.setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter")
                    addSkill(sections.key, sections.value, sections.setValue);
                }}
                placeholder={sections.placeholder}
                className="flex-1 border border-stone-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              />
              <button
                onClick={() =>
                  addSkill(sections.key, sections.value, sections.setValue)
                }
                className="bg-stone-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-stone-700 transition-colors"
              >
                Dodaj
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
