export interface InvestmentPlan {
  id: string;
  name: string;
  price: number;
  dailyRevenue: number;
  duration: number;
  description?: string;
  active: boolean;
}

export interface Investment {
  id: string;
  userId: string;
  planId: string;
  amount: number;
  dailyRevenue: number;
  startDate: Date;
  endDate: Date;
  totalRevenue: number;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: 'deposit' | 'withdrawal' | 'revenue';
  amount: number;
  method?: 'mtn' | 'orange' | 'system';
  phone?: string;
  status: 'pending' | 'completed' | 'failed';
  description?: string;
  createdAt: Date;
  completedAt?: Date;
}

export interface Referral {
  id: string;
  referrerId: string;
  referreeId: string;
  bonusAmount: number;
  status: 'pending' | 'completed';
  createdAt: Date;
}

export interface AdminStats {
  totalUsers: number;
  totalDeposits: number;
  totalWithdrawals: number;
  totalRevenue: number;
  activeInvestments: number;
  pendingTransactions: number;
}
