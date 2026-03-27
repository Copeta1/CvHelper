"use client";

import { useState } from "react";
import { analyzeCV } from "@/lib/puter/ai";
import { CVData, AISuggestion } from "@/types/cv.types";
import { Sparkles, AlertCircle, CheckCircle, Info } from "lucide-react";

interface AIAnalysisProps {
  cvData: CVData;
  onAnalysisComplete: (suggestions: AISuggestion) => void;
}

export default function AIAnalysis({
  cvData,
  onAnalysisComplete,
}: AIAnalysisProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<AISuggestion | null>(null);

  const handleAnalyze = async () => {
    setLoading(true);
    setError("");

    try {
      const cvString = JSON.stringify(cvData, null, 2);
      const result = await analyzeCV(cvString);

      console.log("Puter result:", result);
      console.log("Puter result type:", typeof result);

      const parsed: AISuggestion = JSON.parse(result as string);
      setSuggestions(parsed);
      onAnalysisComplete(parsed);
    } catch (err) {
      setError("Greška pri analizi. Pokušajte ponovo.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  const priorityConfig = {
    high: {
      color: "text-red-600 bg-red-50 border-red-200",
      icon: AlertCircle,
      label: "Visoki prioritet",
    },
    medium: {
      color: "text-yellow-600 bg-yellow-50 border-yellow-200",
      icon: Info,
      label: "Srednji prioritet",
    },
    low: {
      color: "text-green-600 bg-green-50 border-green-200",
      icon: CheckCircle,
      label: "Niski prioritet",
    },
  };

  return (
    <div className="mt-6">
      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-stone-800 text-white py-3 rounded-xl text-sm font-medium hover:bg-stone-700 disabled:opacity-50 transition-colors"
      >
        <Sparkles className="w-4 h-4" />
        {loading ? "AI analizira vaš CV..." : "Analiziaj CV s AI"}
      </button>

      {error && (
        <div className="mt-4 bg-red-50 text-red-600 p-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {suggestions && (
        <div className="mt-6 space-y-4">
          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-semibold text-stone-800">Ukupni score</h3>
              <span
                className={`text-2xl font-bold ${
                  suggestions.overallScore >= 70
                    ? "text-green-600"
                    : suggestions.overallScore >= 40
                      ? "text-yellow-600"
                      : "text-red-600"
                }`}
              >
                {suggestions.overallScore}/100
              </span>
            </div>
            <div className="w-full bg-stone-100 rounded-full h-2">
              <div
                className={`h-2 rounded-full transition-all ${
                  suggestions.overallScore >= 70
                    ? "bg-green-500"
                    : suggestions.overallScore >= 40
                      ? "bg-yellow-500"
                      : "bg-red-500"
                }`}
                style={{ width: `${suggestions.overallScore}%` }}
              />
            </div>
            <p className="text-sm text-stone-600 mt-3">{suggestions.summary}</p>
          </div>

          {suggestions.optimizedSummary && (
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-800 mb-2">
                AI optimizirani summary
              </h3>
              <p className="text-sm text-stone-600">
                {suggestions.optimizedSummary}
              </p>
            </div>
          )}

          {suggestions.keywords.length > 0 && (
            <div className="bg-white border border-stone-200 rounded-xl p-5">
              <h3 className="font-semibold text-stone-800 mb-3">
                Preporučeni keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {suggestions.keywords.map((keyword, i) => (
                  <span
                    key={i}
                    className="bg-stone-100 text-stone-700 px-3 py-1 rounded-full text-sm"
                  >
                    {keyword}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="bg-white border border-stone-200 rounded-xl p-5">
            <h3 className="font-semibold text-stone-800 mb-3">
              Sugestije za poboljšanje
            </h3>
            <div className="space-y-3">
              {suggestions.improvements.map((improvement, i) => {
                const config = priorityConfig[improvement.priority];
                const Icon = config.icon;
                return (
                  <div
                    key={i}
                    className={`border rounded-lg p-4 ${config.color}`}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4" />
                      <span className="text-xs font-medium">
                        {config.label} • {improvement.section}
                      </span>
                    </div>
                    <p className="text-sm font-medium mb-1">
                      {improvement.issue}
                    </p>
                    <p className="text-sm opacity-80">
                      {improvement.suggestion}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
