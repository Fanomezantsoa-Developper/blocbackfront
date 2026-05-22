"use client";

import { useState } from "react";
import CPATabContent from "@/components/bloc/avant-operation/CPATabContent";
import VPATabContent from "@/components/bloc/avant-operation/VPATabContent";

export default function AvantOperationPage() {
  const [activeTab, setActiveTab] = useState<"cpa" | "vpa">("cpa");

  return (
    <main>
      <div className="p-8 space-y-8">
        <div>
          <h1 className="font-extrabold text-3xl text-on-surface tracking-tight" style={{ fontFamily: "var(--font-manrope, Manrope, sans-serif)" }}>
            Activité avant opération
          </h1>
          <p className="text-on-surface-variant">
            Consultation Pré‑Anesthésique (CPA) et Visite Pré‑Anesthésique (VPA)
          </p>
        </div>

        <div className="flex border-b border-outline-variant/30">
          <button
            onClick={() => setActiveTab("cpa")}
            className={
              activeTab === "cpa"
                ? "px-6 py-3 text-sm font-bold text-primary border-b-2 border-primary"
                : "px-6 py-3 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            }
          >
            Consultation Pré‑Anesthésique (CPA)
          </button>
          <button
            onClick={() => setActiveTab("vpa")}
            className={
              activeTab === "vpa"
                ? "px-6 py-3 text-sm font-bold text-primary border-b-2 border-primary"
                : "px-6 py-3 text-sm font-semibold text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
            }
          >
            Visite Pré‑Anesthésique (VPA)
          </button>
        </div>

        <div>
          {activeTab === "cpa" && <CPATabContent />}
          {activeTab === "vpa" && <VPATabContent />}
        </div>
      </div>
    </main>
  );
}
