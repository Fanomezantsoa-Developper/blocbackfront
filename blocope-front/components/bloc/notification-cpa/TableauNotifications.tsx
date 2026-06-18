'use client'

import { NotificationCPA } from '@/types/bloc'

interface TableauNotificationsProps {
  notifications: any[]
  onPlanifier?: (notification: any) => void
  onVoirDossier?: (notification: any) => void
}

export default function TableauNotifications({ notifications, onPlanifier, onVoirDossier }: TableauNotificationsProps) {
  // Fonction pour extraire le nom du patient (interne ou externe)
  const getPatientNom = (n: any) => {
    if (n.patient && n.patient.nom) return n.patient.nom;
    return n.patientNom || n.patientId || 'Patient externe';
  };

  const getPatientId = (n: any) => {
    if (n.patient && n.patient.idDossier) return n.patient.idDossier;
    return n.patientId || 'ID inconnu';
  };

  const getChirurgienNom = (n: any) => {
    if (n.chirurgien && n.chirurgien.nom) return n.chirurgien.nom;
    return n.sourceServiceName || 'Service externe';
  };

  const getIntervention = (n: any) => {
    return n.intervention || n.motif || 'Notification externe';
  };

  return (
    <div className="bg-surface-container-lowest rounded-2xl shadow-sm overflow-hidden overflow-x-auto max-h-[500px] overflow-y-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-surface-dim/30">
            <th className="px-6 py-4 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Heure
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Patient
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Intervention / Motif
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Prescripteur / Source
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-widest">
              Urgent
            </th>
            <th className="px-6 py-4 text-left text-[11px] font-bold text-on-surface-variant uppercase tracking-widest text-center">
              Action
            </th>
          </tr>
        </thead>
        <tbody className="divide-y-0">
          {notifications.map((n) => (
            <tr key={n.id} className="hover:bg-surface-container-high/50 transition-colors group">
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex items-center gap-2">
                  <span className={`material-symbols-outlined text-sm ${n.estUrgent ? 'text-tertiary' : 'text-blue-400'}`}>
                    {n.estUrgent ? 'warning' : 'schedule'}
                  </span>
                  <span className={`font-bold ${n.estUrgent ? 'text-tertiary' : 'text-on-surface'}`}>
                    {n.heurePrescription || 'N/A'}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <div className="flex flex-col">
                  <span className="font-bold text-primary font-headline">
                    {getPatientNom(n)}
                  </span>
                  <span className="text-xs text-on-surface-variant font-mono">
                    {getPatientId(n)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${n.estUrgent ? 'bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold uppercase tracking-tighter' : 'bg-blue-50 text-blue-700'}`}>
                  {getIntervention(n)}
                </span>
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-on-surface">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">
                    {getChirurgienNom(n)}
                  </span>
                </div>
              </td>
              <td className="px-6 py-5 whitespace-nowrap">
                {n.estUrgent ? (
                  <span className="px-3 py-1 bg-tertiary-fixed text-on-tertiary-fixed-variant font-bold uppercase tracking-tighter rounded-full text-xs">
                    URGENT
                  </span>
                ) : (
                  <span className="text-xs text-on-surface-variant">-</span>
                )}
              </td>
              <td className="px-6 py-5 whitespace-nowrap text-center">
                <button
                  onClick={() => onPlanifier?.(n)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1 mx-auto ${n.estUrgent ? 'bg-tertiary hover:bg-tertiary-container text-white' : 'bg-primary hover:bg-primary-container text-white'}`}
                >
                  <span className="material-symbols-outlined text-sm">
                    {n.estUrgent ? 'bolt' : 'calendar_month'}
                  </span>
                  {n.estUrgent ? 'Fixer RDV IMMÉDIAT' : 'Planifier'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
