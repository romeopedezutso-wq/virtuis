'use client';

import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { useUserStore } from '@/store/userStore';
import { doc, getDoc } from 'firebase/firestore';

export const useAuth = () => {
  const { setUser, setLoading } = useAuthStore();
  const { setProfile } = useUserStore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        try {
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          if (userDoc.exists()) {
            setProfile({ uid: user.uid, ...userDoc.data() } as any);
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      } else {
        setUser(null);
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [setUser, setLoading, setProfile]);
};
