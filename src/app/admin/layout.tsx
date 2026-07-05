'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/store/userStore';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { profile } = useUserStore();

  useEffect(() => {
    if (profile && !profile.isAdmin) {
      router.push('/dashboard');
    }
  }, [profile, router]);

  if (!profile?.isAdmin) {
    return null;
  }

  return <>{children}</>;
}
