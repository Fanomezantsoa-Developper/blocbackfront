'use client';

import { useState, useEffect } from 'react';
import { notificationService } from '@/lib/api/notification.service';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

export default function TopBar() {
  const [unreadCount, setUnreadCount] = useState(0);
  const pathname = usePathname();
  const router = useRouter();

  const fetchUnreadCount = async () => {
    try {
      const res = await notificationService.getUnreadCount();
      setUnreadCount(res.unread);
    } catch (err) {
      console.error('Erreur compteur notifications:', err);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
    const interval = setInterval(fetchUnreadCount, 10000);
    return () => clearInterval(interval);
  }, []);

  // Ne pas afficher le TopBar sur la page de login
  if (pathname === '/login') return null;

  // Fonction pour rediriger vers la page des notifications
  const handleClocheClick = () => {
    router.push('/bloc/notification-cpa');
  };

  return (
    <header className="fixed top-0 right-0 left-64 z-40 bg-white/80 backdrop-blur-md border-b border-outline-variant/30 px-8 py-4 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <Image src="/images/chu-logo.svg" alt="CHU" width={24} height={24} />
        </div>
        <div>
          <h1 className="text-lg font-extrabold text-primary font-headline tracking-tight">CHU Bloc Opératoire</h1>
          <p className="text-[10px] text-on-surface-variant font-medium">Service d'Anesthésie-Réanimation</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {/* 🔔 Cloche transformée en bouton cliquable */}
        <button
          onClick={handleClocheClick}
          className="relative p-2 hover:bg-surface-container rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary/50"
          aria-label="Voir les notifications"
        >
          <span className="material-symbols-outlined text-primary text-xl">notifications</span>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {unreadCount > 99 ? '99+' : unreadCount}
            </span>
          )}
        </button>

        {/* ⚙️ Paramètres */}
        <button className="p-2 hover:bg-surface-container rounded-full transition-all">
          <span className="material-symbols-outlined text-primary text-xl">settings</span>
        </button>

        {/* 👤 Profil */}
        <div className="flex items-center gap-3 pl-2 border-l border-outline-variant/30">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-bold text-on-surface leading-tight">Dr. A. Durand</p>
            <p className="text-[9px] text-on-surface-variant font-bold uppercase tracking-tighter">Anesthésiste-Réanimateur</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-primary-container overflow-hidden ring-2 ring-primary/10">
            <Image src="/images/avatar-default.png" alt="Avatar" width={40} height={40} className="object-cover" />
          </div>
        </div>
      </div>
    </header>
  );
}
