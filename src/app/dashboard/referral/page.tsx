'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatCurrency } from '@/utils/helpers';
import { FiCopy } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ReferralPage() {
  const { profile } = useUserStore();
  const [referrals, setReferrals] = useState<any[]>([]);
  const [totalBonus, setTotalBonus] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    const fetchReferrals = async () => {
      try {
        const q = query(collection(db, 'users'), where('referrer', '==', profile.referralCode));
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => doc.data());
        setReferrals(data);

        // Calculate total bonus (10% of their deposits)
        const totalBonus = data.reduce((sum, ref) => sum + (ref.totalDeposits * 0.1), 0);
        setTotalBonus(totalBonus);
      } catch (error) {
        console.error('Error fetching referrals:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferrals();
  }, [profile]);

  const copyReferralCode = () => {
    if (profile?.referralCode) {
      navigator.clipboard.writeText(profile.referralCode);
      toast.success('Code de parrainage copié!');
    }
  };

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Programme de Parrainage</h1>

      {/* Referral Code */}
      <div className="bg-gradient-primary text-white rounded-lg shadow-md p-8 mb-8">
        <h2 className="text-xl font-bold mb-4">Votre Lien de Parrainage</h2>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-blue-100 mb-1">Code personnel:</p>
            <p className="text-2xl font-bold break-all">{profile?.referralCode}</p>
          </div>
          <button
            onClick={copyReferralCode}
            className="bg-white text-primary-600 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition flex items-center gap-2"
          >
            <FiCopy /> Copier
          </button>
        </div>
      </div>

      {/* Bonus Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-accent-600">
          <p className="text-gray-600 text-sm font-medium">Bonus Total</p>
          <p className="text-3xl font-bold text-accent-600">{formatCurrency(totalBonus)}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-primary-600">
          <p className="text-gray-600 text-sm font-medium">Filleuls</p>
          <p className="text-3xl font-bold text-primary-600">{referrals.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-blue-600">
          <p className="text-gray-600 text-sm font-medium">Taux de Commission</p>
          <p className="text-3xl font-bold text-blue-600">10%</p>
        </div>
      </div>

      {/* Referrals List */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-xl font-bold">Vos Filleuls</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Nom</th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Email</th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Dépôts</th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Votre Bonus (10%)</th>
              </tr>
            </thead>
            <tbody>
              {referrals.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Aucun filleul pour le moment
                  </td>
                </tr>
              ) : (
                referrals.map((ref) => (
                  <tr key={ref.uid} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3 font-bold">{ref.fullName}</td>
                    <td className="px-6 py-3 text-gray-600">{ref.email}</td>
                    <td className="px-6 py-3">{formatCurrency(ref.totalDeposits)}</td>
                    <td className="px-6 py-3 font-bold text-accent-600">
                      {formatCurrency(ref.totalDeposits * 0.1)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
