'use client';

import { useState, useEffect } from 'react';
import { useUserStore } from '@/store/userStore';
import { collection, query, where, getDocs, QueryConstraint } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { formatCurrency, formatDate } from '@/utils/helpers';

export default function HistoryPage() {
  const { profile } = useUserStore();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile) return;

    const fetchTransactions = async () => {
      try {
        const constraints: QueryConstraint[] = [
          where('userId', '==', profile.uid),
        ];
        const q = query(collection(db, 'transactions'), ...constraints);
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setTransactions(data.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [profile]);

  if (loading) {
    return <div className="text-center py-8">Chargement...</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8">Historique des Transactions</h1>

      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Type</th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Montant</th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Statut</th>
                <th className="px-6 py-3 text-left font-bold text-gray-700">Date</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    Aucune transaction
                  </td>
                </tr>
              ) : (
                transactions.map((tx) => (
                  <tr key={tx.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-6 py-3">
                      <span className="font-bold capitalize">
                        {tx.type === 'deposit' && '📥 Dépôt'}
                        {tx.type === 'withdrawal' && '📤 Retrait'}
                        {tx.type === 'revenue' && '📈 Revenu'}
                      </span>
                    </td>
                    <td className="px-6 py-3 font-bold text-primary-600">
                      {formatCurrency(tx.amount)}
                    </td>
                    <td className="px-6 py-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        tx.status === 'completed' ? 'bg-accent-100 text-accent-800' :
                        tx.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {tx.status === 'completed' && '✓ Complété'}
                        {tx.status === 'pending' && '⏳ En attente'}
                        {tx.status === 'failed' && '✗ Échoué'}
                      </span>
                    </td>
                    <td className="px-6 py-3 text-gray-600">
                      {formatDate(tx.createdAt)}
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
