'use client';

import { useState } from 'react';
import { INVESTMENT_PLANS } from '@/utils/constants';
import { useUserStore } from '@/store/userStore';
import { FiCheck } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatCurrency } from '@/utils/helpers';
´
export default function PlansPage() {
  const { profile, updateBalance } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [, setSelectedPlan] = useState<string | null>(null);

  const handleInvest = async (planId: string) => {
    if (!profile) return;

    setLoading(true);
    try {
      const plan = INVESTMENT_PLANS.find(p => p.id === planId);
      if (!plan) return;

      if (profile.mainBalance < plan.price) {
        toast.error('Solde insuffisant pour cet investissement');
        setLoading(false);
        return;
      }

      const newBalance = profile.mainBalance - plan.price;
      await updateDoc(doc(db, 'users', profile.uid), {
        mainBalance: newBalance,
      });

      const endDate = new Date();
      endDate.setDate(endDate.getDate() + plan.duration);

      await addDoc(collection(db, 'investments'), {
        userId: profile.uid,
        planId: plan.id,
        amount: plan.price,
        dailyRevenue: plan.dailyRevenue,
        startDate: new Date(),
        endDate,
        totalRevenue: 0,
        status: 'active',
        createdAt: new Date(),
      });

      updateBalance(-plan.price);
      toast.success(`Investissement dans le plan ${plan.name} réussi!`);
      setSelectedPlan(null);
    } catch (error) {
      toast.error('Erreur lors de l\'investissement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Plans d'Investissement</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {INVESTMENT_PLANS.map((plan) => (
          <div
            key={plan.id}
            className="bg-white rounded-lg shadow-md overflow-hidden border-l-4 border-primary-600"
          >
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
              <p className="text-3xl font-bold text-primary-600 mb-1">{formatCurrency(plan.price)}</p>
              <p className="text-accent-600 font-bold mb-4">+{formatCurrency(plan.dailyRevenue)}/jour</p>
              <p className="text-sm text-gray-600 mb-6">Durée: {plan.duration} jours</p>

              <div className="space-y-2 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <FiCheck className="text-accent-600" />
                  <span>Revenus garantis</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-accent-600" />
                  <span>Retrait flexible</span>
                </div>
                <div className="flex items-center gap-2">
                  <FiCheck className="text-accent-600" />
                  <span>Suivi en temps réel</span>
                </div>
              </div>

              <button
                onClick={() => handleInvest(plan.id)}
                disabled={loading || !profile || profile.mainBalance < plan.price}
                className="w-full bg-gradient-primary text-white py-2 rounded-lg font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Traitement...' : 'Investir'}
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-6 rounded">
        <p className="text-blue-800">
          <span className="font-bold">Solde actuel:</span> {profile ? formatCurrency(profile.mainBalance) : '0 FCFA'}
        </p>
      </div>
    </div>
  );
}
