'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { signOut } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { FiLogOut, FiMenu, FiX } from 'react-icons/fi';
import { useState } from 'react';

export default function Header() {
  const router = useRouter();
  const { user } = useAuthStore();
  const { profile } = useUserStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (!user) return null;

  return (
    <header className="bg-gradient-primary text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/dashboard" className="text-2xl font-bold">
            Virtuis
          </Link>

          <button
            className="md:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          <nav className="hidden md:flex items-center gap-6">
            <Link href="/dashboard" className="hover:opacity-80">
              Dashboard
            </Link>
            <Link href="/dashboard/plans" className="hover:opacity-80">
              Plans
            </Link>
            <Link href="/dashboard/history" className="hover:opacity-80">
              Historique
            </Link>
            {profile?.isAdmin && (
              <Link href="/admin" className="hover:opacity-80 font-bold bg-accent-600 px-3 py-1 rounded">
                Admin
              </Link>
            )}
            <Link href="/dashboard/profile" className="hover:opacity-80">
              {profile?.fullName}
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600"
            >
              <FiLogOut /> Déconnexion
            </button>
          </nav>
        </div>

        {menuOpen && (
          <nav className="md:hidden mt-4 flex flex-col gap-3">
            <Link href="/dashboard" className="hover:opacity-80">
              Dashboard
            </Link>
            <Link href="/dashboard/plans" className="hover:opacity-80">
              Plans
            </Link>
            <Link href="/dashboard/history" className="hover:opacity-80">
              Historique
            </Link>
            {profile?.isAdmin && (
              <Link href="/admin" className="hover:opacity-80 font-bold">
                Admin
              </Link>
            )}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-left"
            >
              <FiLogOut /> Déconnexion
            </button>
          </nav>
        )}
      </div>
    </header>
  );
}
