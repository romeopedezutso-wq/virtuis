'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import StatCard from '@/components/Cards/StatCard';
import { FiDollarSign, FiTrendingUp, FiCreditCard, FiUsers } from 'react-icons/fi';
import { formatCurrency } from '@/utils/helpers';

export default function DashboardPage() {
  const { profile } = useUserStore();
  const [stats, setStats] = useState({
    mainBalance: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    referrals: 0,
  });

  useEffect(() => {
    if (profile) {
      setStats({
        mainBalance: profile.mainBalance,
        todayRevenue: profile.todayRevenue,
        totalRevenue: profile.totalRevenue,
        referrals: profile.referrals,
      });
    }
  }, [profile]);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Tableau de Bord</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Solde Principal"
          value={formatCurrency(stats.mainBalance)}
          icon={<FiDollarSign />}
          color="primary"
        />
        <StatCard
          title="Revenus du Jour"
          value={formatCurrency(stats.todayRevenue)}
          icon={<FiTrendingUp />}
          color="accent"
        />
        <StatCard
          title="Revenus Totaux"
          value={formatCurrency(stats.totalRevenue)}
          icon={<FiCreditCard />}
          color="primary"
        />
        <StatCard
          title="Filleuls"
          value={stats.referrals}
          icon={<FiUsers />}
          color="accent"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Quick Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Actions Rapides</h2>
          <div className="space-y-3">
            <a href="/dashboard/deposit" className="block bg-primary-600 text-white px-4 py-3 rounded-lg text-center font-bold hover:bg-primary-700 transition">
              Effectuer un Dépôt
            </a>
            <a href="/dashboard/plans" className="block bg-accent-600 text-white px-4 py-3 rounded-lg text-center font-bold hover:bg-accent-700 transition">
              Investir
            </a>
            <a href="/dashboard/withdraw" className="block bg-gray-600 text-white px-4 py-3 rounded-lg text-center font-bold hover:bg-gray-700 transition">
              Retirer
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-bold mb-4">Informations du Compte</h2>
          <div className="space-y-3 text-sm">
            <p><span className="font-bold">Email:</span> {profile?.email}</p>
            <p><span className="font-bold">Téléphone:</span> {profile?.phone}</p>
            <p><span className="font-bold">Code de parrainage:</span> {profile?.referralCode}</p>
            <p><span className="font-bold">Membre depuis:</span> {profile?.createdAt ? new Date(profile.createdAt).toLocaleDateString('fr-FR') : '-'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
