'use client';

import { ReactNode } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/store/authStore';
import { useRouter } from 'next/navigation';
import Header from '@/components/Layout/Header';
import Sidebar from '@/components/Layout/Sidebar';

export default function DashboardLayout({ children }: { children: ReactNode }) {
  useAuth();
  const { user, loading } = useAuthStore();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    router.push('/login');
    return null;
  }

  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-gray-50 min-h-[calc(100vh-64px)]">
          <div className="p-6 max-w-7xl">{children}</div>
        </main>
      </div>
    </>
  );
}
