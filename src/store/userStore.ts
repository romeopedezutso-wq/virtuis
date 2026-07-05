import { create } from 'zustand';

export interface UserProfile {
  uid: string;
  fullName: string;
  email: string;
  phone: string;
  referralCode?: string;
  referrer?: string;
  mainBalance: number;
  totalRevenue: number;
  todayRevenue: number;
  totalDeposits: number;
  totalWithdrawals: number;
  referrals: number;
  createdAt: Date;
  updatedAt: Date;
  isBlocked: boolean;
  isAdmin?: boolean;
}

interface UserStoreState {
  profile: UserProfile | null;
  setProfile: (profile: UserProfile | null) => void;
  updateBalance: (amount: number) => void;
}

export const useUserStore = create<UserStoreState>((set) => ({
  profile: null,
  setProfile: (profile) => set({ profile }),
  updateBalance: (amount) =>
    set((state) => {
      if (state.profile) {
        return {
          profile: {
            ...state.profile,
            mainBalance: state.profile.mainBalance + amount,
          },
        };
      }
      return state;
    }),
}));
