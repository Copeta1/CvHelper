"use client";

import { useState } from "react";
import { createClient } from "@/lib/superbase/client";
import { useRouter } from "next/navigation";
import { AISuggestion, CVData } from "@/types/cv.types";
import PersonalInfoTab from "@/components/cv/tabs/PersonalInfoTab";
import ExperienceTab from "./tabs/ExperienceTab";
import { User, Briefcase, GraduationCap, Wrench } from "lucide-react";
import EducationTab from "./tabs/EducationTab";
import SkillsTab from "./tabs/SkillsTab";
import AIAnalysis from "./AIAnalysis";

interface CVEditorProps {
  cv: {
    id: string;
    title: string;
    structured_data: CVData | null;
  };
}

const emptyCV: CVData = {
  personalInfo: {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    linkedin: "",
    github: "",
    website: "",
    summary: "",
  },
  experience: [],
  education: [],
  skills: {
    technical: [],
    soft: [],
    languages: [],
  },
};

export default function CVEditor({ cv }: CVEditorProps) {
  const [data, setData] = useState<CVData>(cv.structured_data ?? emptyCV);
  const [activeTab, setActiveTab] = useState<
    "personal" | "experience" | "education" | "skills"
  >("personal");
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const supabase = createClient();
  const router = useRouter();

  const handleSave = async () => {
    setSaving(true);
    await supabase
      .from("cvs")
      .update({ structured_data: data, updated_at: new Date().toISOString() })
      .eq("id", cv.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { key: "personal", label: "Osobni podaci", icon: User },
    { key: "experience", label: "Iskustvo", icon: Briefcase },
    { key: "education", label: "Obrazovanje", icon: GraduationCap },
    { key: "skills", label: "Vještine", icon: Wrench },
  ];

  const handleAnalysisComplete = async (suggestions: AISuggestion) => {
    await supabase
      .from("cvs")
      .update({
        ai_suggestions: suggestions,
        status: "analyzed",
        updated_at: new Date().toISOString(),
      })
      .eq("id", cv.id);
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <button
            onClick={() => router.push("/dashboard")}
            className="text-sm text-stone-500 hover:text-stone-800 mb-1 flex items-center gap-1"
          >
            ← Natrag
          </button>
          <h1 className="text-2xl font-bold text-stone-800">{cv.title}</h1>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-stone-800 text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
        >
          {saving ? "Spremanje..." : saved ? "✓ Spremljeno" : "Spremi"}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-stone-200">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as typeof activeTab)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 -mb-px ${
              activeTab === tab.key
                ? "border-stone-800 text-stone-800"
                : "border-transparent text-stone-500 hover:text-stone-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl border border-stone-200 p-6">
        {activeTab === "personal" && (
          <PersonalInfoTab
            data={data.personalInfo}
            onChange={(personalInfo) => setData({ ...data, personalInfo })}
          />
        )}
        {activeTab === "experience" && (
          <ExperienceTab
            data={data.experience}
            onChange={(experience) => setData({ ...data, experience })}
          />
        )}
        {activeTab === "education" && (
          <EducationTab
            data={data.education}
            onChange={(education) => setData({ ...data, education })}
          />
        )}
        {activeTab === "skills" && (
          <SkillsTab
            data={data.skills}
            onChange={(skills) => setData({ ...data, skills })}
          />
        )}
      </div>
      <AIAnalysis cvData={data} onAnalysisComplete={handleAnalysisComplete} />
    </div>
  );
}
