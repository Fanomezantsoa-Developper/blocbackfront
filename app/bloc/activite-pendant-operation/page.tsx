"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { patientActif } from "@/lib/mock/patient-actif";

type ActiveTab = "operateur" | "anesthesiste" | "aide" | "chirurgien";
type EtatArrivee = "CALME" | "DETENDU" | "ANXIEUX" | "AGITE" | "";

interface PeriOperationData {
  perfusions: string;
  transfusions: string;
  sorties: string;
  constantes: {
    fc: string;
    ta: string;
    spo2: string;
    spo3: string;
    score: string;
    capnie: string;
    temperature: string;
  };
  ventilation: {
    intubOT: boolean;
    intubOTNotes: string;
    sArmee: boolean;
    sArmeeNotes: string;
    mLarynx: boolean;
    mLarynxNotes: string;
  };
  optionsVentilation: {
    spontanee: string;
    assistee: string;
    controlee: string;
    peep: string;
    circuitFerme: string;
  };
  etatArrivee: EtatArrivee;
}

const PATIENT_STORAGE_ID = "PAT-982-CH-2024";

const initialPeriData: PeriOperationData = {
  perfusions: "",
  transfusions: "",
  sorties: "",
  constantes: {
    fc: "",
    ta: "",
    spo2: "",
    spo3: "",
    score: "",
    capnie: "",
    temperature: "",
  },
  ventilation: {
    intubOT: false,
    intubOTNotes: "",
    sArmee: false,
    sArmeeNotes: "",
    mLarynx: false,
    mLarynxNotes: "",
  },
  optionsVentilation: {
    spontanee: "",
    assistee: "",
    controlee: "",
    peep: "",
    circuitFerme: "",
  },
  etatArrivee: "",
};

const tabs: { id: ActiveTab; label: string }[] = [
  { id: "operateur", label: "Opérateur" },
  { id: "anesthesiste", label: "Anesthésiste" },
  { id: "aide", label: "Aide" },
  { id: "chirurgien", label: "Chirurgien" },
];

const storageKey = `activite_per_op_patient_${PATIENT_STORAGE_ID}`;

export default function ActivitePendantOperationPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>("operateur");
  const [periData, setPeriData] =
    useState<PeriOperationData>(initialPeriData);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        setPeriData(JSON.parse(savedData) as PeriOperationData);
      } catch {
        localStorage.removeItem(storageKey);
      }
    }
  }, []);

  const updateField = <K extends keyof PeriOperationData>(
    key: K,
    value: PeriOperationData[K],
  ) => {
    setPeriData((current) => ({ ...current, [key]: value }));
  };

  const handleSave = () => {
    localStorage.setItem(storageKey, JSON.stringify(periData));
    setSaveMessage("Activité per-opératoire enregistrée avec succès.");

    window.setTimeout(() => {
      router.push("/bloc/apres-operation");
    }, 900);
  };

  return (
    <main>
      <div className="flex h-screen flex-col overflow-hidden bg-background">
        <header className="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-6 border-b border-surface-container-highest bg-white/90 px-6 py-3 shadow-sm backdrop-blur">
          <div className="flex min-w-0 flex-1 items-center gap-6">
            <div className="shrink-0">
              <p className="text-[10px] font-bold uppercase tracking-widest text-primary">
                Patient en cours
              </p>
              <h1 className="font-headline text-lg font-bold text-on-surface">
                {patientActif.nom}
              </h1>
            </div>

            <div className="h-10 w-px bg-outline-variant/40" />

            <div className="grid min-w-0 flex-1 grid-cols-2 gap-4 lg:grid-cols-4">
              {[
                ["ID / MRN", patientActif.id],
                ["Âge", `${patientActif.age} ans`],
                ["Opération", patientActif.intervention],
                ["Chirurgien", patientActif.chirurgien],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0">
                  <p className="text-[9px] font-semibold uppercase tracking-wide text-on-surface-variant">
                    {label}
                  </p>
                  <p className="truncate text-xs font-bold text-on-surface">
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-tertiary/20 bg-tertiary/10 px-3 py-1.5 text-tertiary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-tertiary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-tertiary" />
              </span>
              <span className="text-[10px] font-extrabold tracking-wider">
                PROCÉDURE EN COURS
              </span>
            </div>
            <div className="flex size-10 items-center justify-center overflow-hidden rounded-full border-2 border-primary-container bg-primary-fixed text-sm font-extrabold text-primary">
              DR
            </div>
          </div>
        </header>

        <nav className="flex shrink-0 gap-8 border-b border-surface-container-highest bg-white px-6">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`border-b-2 py-4 text-sm transition-colors ${
                  isActive
                    ? "border-primary font-bold text-primary"
                    : "border-transparent font-semibold text-on-surface-variant hover:text-primary"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </nav>

        <div className="flex-1 space-y-6 overflow-y-auto p-6 pb-24">
          {activeTab !== "operateur" ? (
            <div className="rounded-xl border border-outline-variant/10 bg-white p-8 text-center font-semibold text-on-surface-variant shadow-sm">
              Contenu à venir
            </div>
          ) : (
            <>
              <ClinicalSection icon="input" iconClassName="text-primary" title="APPORTS (ENTRÉES)">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <TextareaField
                    label="PERFUSIONS"
                    value={periData.perfusions}
                    onChange={(value) => updateField("perfusions", value)}
                    placeholder="Saisir les détails des perfusions..."
                    rows={3}
                  />
                  <TextareaField
                    label="TRANSFUSIONS"
                    value={periData.transfusions}
                    onChange={(value) => updateField("transfusions", value)}
                    placeholder="Saisir les détails des transfusions..."
                    rows={3}
                  />
                </div>
              </ClinicalSection>

              <ClinicalSection icon="output" iconClassName="text-tertiary" title="SORTIES">
                <TextareaField
                  label="JOURNAL DES SORTIES"
                  value={periData.sorties}
                  onChange={(value) => updateField("sorties", value)}
                  placeholder="Quantifier et décrire les sorties (urines, aspirations, etc.)..."
                  rows={4}
                />
              </ClinicalSection>

              <ClinicalSection icon="monitoring" iconClassName="text-secondary" title="SURVEILLANCE DES CONSTANTES">
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-7">
                  {[
                    ["fc", "FC (BPM)", ""],
                    ["ta", "TA (MMHG)", "00/00"],
                    ["spo2", "SPO2 (%)", ""],
                    ["spo3", "SPO3 (%)", ""],
                    ["score", "SCORE", ""],
                    ["capnie", "CAPNIE", ""],
                    ["temperature", "TEMPÉRATURE (°C)", ""],
                  ].map(([key, label, placeholder]) => (
                    <div key={key} className="space-y-1.5">
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={periData.constantes[key as keyof PeriOperationData["constantes"]]}
                        onChange={(event) =>
                          updateField("constantes", {
                            ...periData.constantes,
                            [key]: event.target.value,
                          })
                        }
                        placeholder={placeholder}
                        className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-center text-sm font-bold outline-none transition focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </ClinicalSection>

              <ClinicalSection icon="ventilator" iconClassName="text-primary" title="VENTILATION">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                  {[
                    ["intubOT", "intubOTNotes", "INTUB - OT"],
                    ["sArmee", "sArmeeNotes", "S.ARMEE"],
                    ["mLarynx", "mLarynxNotes", "M.LARYNCE"],
                  ].map(([checkedKey, notesKey, label]) => (
                    <div key={label} className="space-y-2">
                      <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-on-surface">
                        <input
                          type="checkbox"
                          checked={Boolean(
                            periData.ventilation[
                              checkedKey as keyof PeriOperationData["ventilation"]
                            ],
                          )}
                          onChange={(event) =>
                            updateField("ventilation", {
                              ...periData.ventilation,
                              [checkedKey]: event.target.checked,
                            })
                          }
                          className="size-5 accent-primary"
                        />
                        {label}
                      </label>
                      <input
                        type="text"
                        value={String(
                          periData.ventilation[
                            notesKey as keyof PeriOperationData["ventilation"]
                          ],
                        )}
                        onChange={(event) =>
                          updateField("ventilation", {
                            ...periData.ventilation,
                            [notesKey]: event.target.value,
                          })
                        }
                        placeholder="Notes..."
                        className="h-8 w-full rounded border border-outline-variant bg-white px-2 text-xs outline-none focus:ring-1 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </ClinicalSection>

              <ClinicalSection icon="settings_input_component" iconClassName="text-primary" title="OPTIONS DE VENTILATION">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
                  {[
                    ["spontanee", "Spontanée"],
                    ["assistee", "Assistée"],
                    ["controlee", "Controlée"],
                    ["peep", "PEEP"],
                    ["circuitFerme", "Circuit fermé"],
                  ].map(([key, label]) => (
                    <div key={key} className="space-y-1.5">
                      <label className="block text-[9px] font-bold uppercase tracking-widest text-on-surface-variant">
                        {label}
                      </label>
                      <input
                        type="text"
                        value={
                          periData.optionsVentilation[
                            key as keyof PeriOperationData["optionsVentilation"]
                          ]
                        }
                        onChange={(event) =>
                          updateField("optionsVentilation", {
                            ...periData.optionsVentilation,
                            [key]: event.target.value,
                          })
                        }
                        placeholder="Détails..."
                        className="h-10 w-full rounded-lg border border-outline-variant bg-surface-container-lowest px-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
                      />
                    </div>
                  ))}
                </div>
              </ClinicalSection>

              <ClinicalSection icon="psychology" iconClassName="text-secondary" title="PATIENT À L’ARRIVÉE">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
                  {(["CALME", "DETENDU", "ANXIEUX", "AGITE"] as const).map(
                    (etat) => {
                      const isSelected = periData.etatArrivee === etat;

                      return (
                        <label
                          key={etat}
                          className={`flex cursor-pointer items-center gap-3 rounded-xl border-2 bg-background p-5 transition hover:border-primary ${
                            isSelected ? "border-primary" : "border-transparent"
                          }`}
                        >
                          <input
                            type="radio"
                            name="etatArrivee"
                            value={etat}
                            checked={isSelected}
                            onChange={() => updateField("etatArrivee", etat)}
                            className="size-6 accent-primary"
                          />
                          <span className="font-bold text-on-surface">{etat}</span>
                        </label>
                      );
                    },
                  )}
                </div>
              </ClinicalSection>

              <div className="flex flex-col items-end gap-3 pt-4 pb-8">
                {saveMessage && (
                  <p className="rounded-lg border border-secondary/20 bg-secondary/10 px-4 py-2 text-sm font-bold text-secondary">
                    {saveMessage}
                  </p>
                )}
                <button
                  type="button"
                  onClick={handleSave}
                  className="rounded-xl bg-primary px-8 py-4 font-headline font-extrabold text-white shadow-lg transition hover:bg-primary-container"
                >
                  VALIDER ET ENREGISTRER
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function ClinicalSection({
  icon,
  iconClassName,
  title,
  children,
}: {
  icon: string;
  iconClassName: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-xl border border-surface-container-highest bg-white shadow-sm">
      <div className="flex items-center gap-2 border-b border-surface-container-highest bg-surface-container-low px-6 py-3">
        <span className={`material-symbols-outlined text-xl ${iconClassName}`}>
          {icon}
        </span>
        <h2 className="font-headline text-sm font-bold uppercase tracking-wide text-on-surface">
          {title}
        </h2>
      </div>
      <div className="p-6">{children}</div>
    </section>
  );
}

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
  rows,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  rows: number;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-bold uppercase tracking-widest text-on-surface-variant">
        {label}
      </label>
      <textarea
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-lg border border-outline-variant bg-surface-container-lowest p-3 text-sm outline-none transition focus:ring-2 focus:ring-primary"
      />
    </div>
  );
}
