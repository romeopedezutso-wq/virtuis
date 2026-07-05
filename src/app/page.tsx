'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useEffect } from 'react';
import { FiArrowRight, FiCheck } from 'react-icons/fi';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuthStore();

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
          <p className="mt-4 text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Navigation */}
      <nav className="bg-dark-900 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary-400">Virtuis</h1>
          <div className="flex gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded hover:bg-dark-800 transition"
            >
              Connexion
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-primary-600 rounded hover:bg-primary-700 transition"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-primary text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6">Investissez Intelligemment</h1>
          <p className="text-xl mb-8 text-blue-100">
            Virtuis offre une plateforme d'investissement sécurisée avec des rendements
            quotidiens garantis. Commencez votre voyage vers la liberté financière.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/register"
              className="bg-accent-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-accent-600 transition flex items-center gap-2"
            >
              S'inscrire Maintenant <FiArrowRight />
            </Link>
            <Link
              href="/login"
              className="bg-white text-primary-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Se connecter
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-4 max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">Pourquoi Virtuis ?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { title: 'Sécurisé', desc: 'Vos fonds sont protégés par Firebase' },
            { title: 'Rentable', desc: 'Revenus quotidiens garantis jusqu\'à 8500 FCFA' },
            { title: 'Transparent', desc: 'Suivi en temps réel de vos investissements' },
            { title: 'Facile', desc: 'Interface intuitive et mobile-friendly' },
            { title: 'Rapide', desc: 'Dépôts et retraits en quelques minutes' },
            { title: 'Social', desc: 'Gagnez avec votre réseau de parrainage' },
          ].map((feature, idx) => (
            <div key={idx} className="bg-gray-50 p-6 rounded-lg border border-gray-200">
              <FiCheck className="text-accent-500 text-3xl mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Plans Preview */}
      <section className="bg-dark-900 text-white py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">Nos Plans d'Investissement</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Starter', price: '3,500', daily: '500', duration: '30j' },
              { name: 'Pro', price: '10,000', daily: '1,500', duration: '30j' },
              { name: 'Premium', price: '25,000', daily: '4,000', duration: '30j' },
              { name: 'Elite', price: '50,000', daily: '8,500', duration: '30j' },
            ].map((plan, idx) => (
              <div key={idx} className="bg-dark-800 p-6 rounded-lg border border-primary-600">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-3xl font-bold text-accent-400 mb-2">{plan.price} FCFA</p>
                <p className="text-sm text-gray-300 mb-4">+{plan.daily} FCFA/jour</p>
                <p className="text-xs text-gray-400">{plan.duration}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 px-4 max-w-4xl mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12">Chiffres Clés</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div>
            <p className="text-5xl font-bold text-primary-600">1000+</p>
            <p className="text-gray-600 mt-2">Utilisateurs Actifs</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-accent-600">50M FCFA</p>
            <p className="text-gray-600 mt-2">Investis</p>
          </div>
          <div>
            <p className="text-5xl font-bold text-blue-600">5M FCFA</p>
            <p className="text-gray-600 mt-2">Revenus Distribués</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-dark-900 text-gray-400 py-8 px-4 text-center">
        <p>&copy; 2024 Virtuis. Tous droits réservés.</p>
      </footer>
    </div>
  );
}
