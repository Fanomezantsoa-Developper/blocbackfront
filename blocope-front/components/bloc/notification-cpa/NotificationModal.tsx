'use client';

interface NotificationModalProps {
  isOpen: boolean;
  onClose: () => void;
  notification: any;
}

export default function NotificationModal({ isOpen, onClose, notification }: NotificationModalProps) {
  if (!isOpen || !notification) return null;

  const formatPayload = (payload: any) => {
    if (!payload) return 'Aucune donnée';
    return JSON.stringify(payload, null, 2);
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-2xl p-8 w-full max-w-2xl max-h-[80vh] overflow-y-auto shadow-2xl">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-extrabold text-primary">📬 Détails de la notification</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700 text-2xl">
            ✕
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Type</label>
              <p className="font-semibold">{notification.type || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Urgence</label>
              <p className="font-semibold">
                {notification.urgence === 3 ? '🔴 Élevée' :
                 notification.urgence === 2 ? '🟠 Moyenne' :
                 notification.urgence === 1 ? '🟢 Faible' : 'N/A'}
              </p>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-gray-500 uppercase">Motif</label>
            <p className="text-lg font-medium">{notification.motif || notification.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Patient</label>
              <p className="font-semibold">{notification.patientId || 'Inconnu'}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Reçue le</label>
              <p className="font-semibold">{new Date(notification.receivedAt).toLocaleString()}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Service source</label>
              <p className="font-semibold">{notification.sourceServiceName || notification.sourceServiceId || 'N/A'}</p>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Service cible</label>
              <p className="font-semibold">{notification.targetServiceName || notification.targetServiceId || 'N/A'}</p>
            </div>
          </div>

          {notification.channels && notification.channels.length > 0 && (
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Canaux</label>
              <div className="flex gap-2 mt-1">
                {notification.channels.map((ch: string) => (
                  <span key={ch} className="px-3 py-1 bg-gray-100 rounded-full text-xs font-medium">
                    {ch}
                  </span>
                ))}
              </div>
            </div>
          )}

          {notification.payload && (
            <div>
              <label className="text-xs font-bold text-gray-500 uppercase">Données supplémentaires</label>
              <pre className="mt-1 p-3 bg-gray-50 rounded-lg text-sm font-mono overflow-x-auto">
                {formatPayload(notification.payload)}
              </pre>
            </div>
          )}

          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-primary text-white rounded-lg text-sm font-bold hover:bg-primary/90"
            >
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
