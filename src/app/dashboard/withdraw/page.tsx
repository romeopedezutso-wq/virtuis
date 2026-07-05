'use client';

import { useState } from 'react';
import { useUserStore } from '@/store/userStore';
import { PAYMENT_METHODS } from '@/utils/constants';
import { doc, updateDoc, collection, addDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import toast from 'react-hot-toast';
import { formatCurrency } from '@/utils/helpers';

export default function WithdrawPage() {
  const { profile, updateBalance } = useUserStore();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    amount: '',
    method: 'mtn',
    phone: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    setLoading(true);
    try {
      const amount = parseFloat(formData.amount);
      if (amount <= 0) {
        toast.error('Montant invalide');
        setLoading(false);
        return;
      }

      if (amount > profile.mainBalance) {
        toast.error('Solde insuffisant');
        setLoading(false);
        return;
      }

      const newBalance = profile.mainBalance - amount;
      await updateDoc(doc(db, 'users', profile.uid), {
        mainBalance: newBalance,
        totalWithdrawals: profile.totalWithdrawals + amount,
      });

      await addDoc(collection(db, 'transactions'), {
        userId: profile.uid,
        type: 'withdrawal',
        amount,
        method: formData.method,
        phone: formData.phone,
        status: 'pending',
        description: `Retrait via ${formData.method}`,
        createdAt: new Date(),
      });

      updateBalance(-amount);
      toast.success(`Demande de retrait de ${formatCurrency(amount)} créée!`);
      setFormData({ amount: '', method: 'mtn', phone: '' });
    } catch (error) {
      toast.error('Erreur lors du retrait');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-3xl font-bold mb-8">Effectuer un Retrait</h1>

      <div className="bg-white rounded-lg shadow-md p-8 border border-gray-100">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Montant (FCFA)
            </label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              required
              min="1000"
              step="500"
              max={profile?.mainBalance}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="Exemple: 10000"
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Méthode de Paiement
            </label>
            <select
              name="method"
              value={formData.method}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
            >
              {PAYMENT_METHODS.map((method) => (
                <option key={method.id} value={method.id}>
                  {method.icon} {method.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Numéro Mobile Money
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
              placeholder="+225 00 00 00 00"
            />
          </div>

          <button
            type="submit"
            disabled={loading || !profile || profile.mainBalance <= 0}
            className="w-full bg-gradient-primary text-white py-3 rounded-lg font-bold hover:opacity-90 disabled:opacity-50"
          >
            {loading ? 'Traitement...' : 'Confirmer le Retrait'}
          </button>
        </form>
      </div>

      <div className="mt-8 bg-accent-50 border-l-4 border-accent-600 p-6 rounded">
        <h3 className="font-bold text-accent-900 mb-2">💡 Solde disponible</h3>
        <p className="text-accent-800">{profile ? formatCurrency(profile.mainBalance) : '0 FCFA'}</p>
      </div>
    </div>
  );
}
