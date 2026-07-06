'use client';

import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatCurrency, formatDate } from '@/utils/helpers';
import { FiUsers, FiDollarSign, FiTrendingUp, FiAlertCircle } from 'react-icons/fi';

export default function AdminPage() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalDeposits: 0,
    totalWithdrawals: 0,
    pendingWithdrawals: 0,
  });
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        // Fetch users
        const usersSnapshot = await getDocs(collection(db, 'users'));
        const usersData = usersSnapshot.docs.map(doc => doc.data());
        setUsers(usersData);

        // Fetch transactions
        const transactionsSnapshot = await getDocs(collection(db, 'transactions'));
        const transactions = transactionsSnapshot.docs.map(doc => doc.data());

        const totalDeposits = transactions
          .filter((t: any) => t.type === 'deposit' && t.status === 'completed')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const totalWithdrawals = transactions
          .filter((t: any) => t.type === 'withdrawal' && t.status === 'completed')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        const pendingWithdrawals = transactions
          .filter((t: any) => t.type === 'withdrawal' && t.status === 'pending')
          .reduce((sum: number, t: any) => sum + t.amount, 0);

        setStats({
          totalUsers: usersData.length,
          totalDeposits,
          totalWithdrawals,
          pendingWithdrawals,
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div className="min-h-screen bg-dark-900 text-white p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Panneau Administrateur</h1>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-dark-800 rounded-lg p-6 border border-primary-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Utilisateurs</p>
                <p className="text-3xl font-bold mt-2">{stats.totalUsers}</p>
              </div>
              <FiUsers className="text-4xl text-primary-500" />
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-accent-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Dépôts Totaux</p>
                <p className="text-3xl font-bold mt-2 text-accent-400">
                  {formatCurrency(stats.totalDeposits).split(' ')[0]}
                </p>
              </div>
              <FiDollarSign className="text-4xl text-accent-500" />
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Retraits Totaux</p>
                <p className="text-3xl font-bold mt-2 text-blue-400">
                  {formatCurrency(stats.totalWithdrawals).split(' ')[0]}
                </p>
              </div>
              <FiTrendingUp className="text-4xl text-blue-500" />
            </div>
          </div>

          <div className="bg-dark-800 rounded-lg p-6 border border-red-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Retraits en Attente</p>
                <p className="text-3xl font-bold mt-2 text-red-400">
                  {formatCurrency(stats.pendingWithdrawals).split(' ')[0]}
                </p>
              </div>
              <FiAlertCircle className="text-4xl text-red-500" />
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="bg-dark-800 rounded-lg shadow-lg overflow-hidden border border-gray-700">
          <div className="p-6 border-b border-gray-700">
            <h2 className="text-2xl font-bold">Utilisateurs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-dark-700 border-b border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-left font-bold">Nom</th>
                  <th className="px-6 py-4 text-left font-bold">Email</th>
                  <th className="px-6 py-4 text-left font-bold">Solde</th>
                  <th className="px-6 py-4 text-left font-bold">Inscrit</th>
                  <th className="px-6 py-4 text-left font-bold">Statut</th>
                </tr>
              </thead>
              <tbody>
                {users.slice(0, 10).map((user) => (
                  <tr key={user.uid} className="border-b border-gray-700 hover:bg-dark-700 transition">
                    <td className="px-6 py-4 font-bold">{user.fullName}</td>
                    <td className="px-6 py-4 text-gray-400">{user.email}</td>
                    <td className="px-6 py-4 text-accent-400 font-bold">
                      {formatCurrency(user.mainBalance).split(' ')[0]}
                    </td>
                    <td className="px-6 py-4 text-gray-400">
                      {formatDate(user.createdAt)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        user.isBlocked
                          ? 'bg-red-900 text-red-200'
                          : 'bg-accent-900 text-accent-200'
                      }`}>
                        {user.isBlocked ? '🚫 Bloqué' : '✓ Actif'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
