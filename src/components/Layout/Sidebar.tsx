'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useUserStore } from '@/store/userStore';
import {
  FiHome,
  FiTrendingUp,
  FiArrowUp,
  FiArrowDown,
  FiUsers,
  FiSettings,
  FiFileText,
} from 'react-icons/fi';

export default function Sidebar() {
  const pathname = usePathname();
  const { profile } = useUserStore();

  const isActive = (path: string) => pathname === path;

  const menuItems = [
    { href: '/dashboard', label: 'Accueil', icon: FiHome },
    { href: '/dashboard/plans', label: 'Plans', icon: FiTrendingUp },
    { href: '/dashboard/deposit', label: 'Dépôt', icon: FiArrowDown },
    { href: '/dashboard/withdraw', label: 'Retrait', icon: FiArrowUp },
    { href: '/dashboard/referral', label: 'Parrainage', icon: FiUsers },
    { href: '/dashboard/history', label: 'Historique', icon: FiFileText },
    { href: '/dashboard/profile', label: 'Profil', icon: FiSettings },
  ];

  return (
    <aside className="bg-dark-900 text-white w-64 min-h-screen p-6 hidden md:block">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-primary-500">Virtuis</h1>
      </div>

      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                isActive(item.href)
                  ? 'bg-primary-600 text-white'
                  : 'text-gray-300 hover:bg-dark-800'
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {profile?.isAdmin && (
        <div className="mt-8 pt-8 border-t border-dark-700">
          <Link
            href="/admin"
            className="flex items-center gap-3 px-4 py-3 rounded-lg bg-accent-600 text-white font-bold hover:bg-accent-700 transition"
          >
            <FiSettings size={20} />
            <span>Panneau Admin</span>
          </Link>
        </div>
      )}
    </aside>
  );
}
