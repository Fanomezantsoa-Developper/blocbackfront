"use client";

import { useEffect, useState } from "react";
import PhaseAvantInduction from "@/components/bloc/checklist-oms/PhaseAvantInduction";
import PhaseAvantIntervention from "@/components/bloc/checklist-oms/PhaseAvantIntervention";
import {
  DEFAULT_CHECKLIST_DATA,
  type ChecklistData,
} from "@/components/bloc/checklist-oms/types";

const STORAGE_KEY = "chu-bloc-checklist-oms";

export default function ChecklistOmsPage() {
  const [checklistData, setChecklistData] = useState<ChecklistData>(
    DEFAULT_CHECKLIST_DATA,
  );
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const savedChecklist = localStorage.getItem(STORAGE_KEY);

    if (savedChecklist) {
      try {
        setChecklistData(JSON.parse(savedChecklist) as ChecklistData);
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      }
    }

    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    localStorage.setItem(STORAGE_KEY, JSON.stringify(checklistData));
  }, [checklistData, isLoaded]);

  return (
    <main>
      <div className="p-8 space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1
              className="font-extrabold text-4xl tracking-tight text-on-surface"
              style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)" }}
            >
              Check-list avant opération
            </h1>
            <p className="text-on-surface-variant" />
          </div>

          <button
            type="button"
            onClick={() => {
              window.location.href = "/bloc/medicaments-anesthesie";
            }}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#001b3d] px-5 py-3 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-xl" aria-hidden="true">
              medication
            </span>
            Médicament
          </button>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <PhaseAvantInduction
            data={checklistData.phase1}
            setChecklistData={setChecklistData}
          />
          <PhaseAvantIntervention
            data={checklistData.phase2}
            setChecklistData={setChecklistData}
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-8 py-3 font-bold text-white shadow-lg transition-opacity hover:opacity-90"
          >
            <span className="material-symbols-outlined text-2xl" aria-hidden="true">
              check_circle
            </span>
            Valider la check-list
          </button>
        </div>
      </div>
    </main>
  );
}


