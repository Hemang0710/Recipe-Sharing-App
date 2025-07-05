"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../context/AuthContext';
import PageLayout from '../components/layout/PageLayout';

export default function Dashboard() {
  const { user, signOut } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        console.log('Dashboard: Verifying authentication');
        const res = await fetch('/api/auth/me');
        
        if (!res.ok) {
          console.log('Dashboard: Auth verification failed, redirecting to signin');
          // Clear any invalid token
          await fetch('/api/auth/signout', { method: 'POST' });
          router.push('/signin?from=/dashboard');
          return;
        }

        const userData = await res.json();
        console.log('Dashboard: Auth verified, user data:', userData);
        setIsLoading(false);
      } catch (err) {
        console.error('Dashboard: Auth verification error:', err);
        setError('Failed to verify authentication');
        // Clear any invalid token
        await fetch('/api/auth/signout', { method: 'POST' });
        router.push('/signin?from=/dashboard');
      }
    };

    if (user) {
      verifyAuth();
    } else {
      console.log('Dashboard: No user in context, redirecting to signin');
      router.push('/signin?from=/dashboard');
    }
  }, [router, user]);

  if (isLoading) {
    return (
      <PageLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      </PageLayout>
    );
  }

  if (error) {
    return (
      <PageLayout>
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center">
          <div className="text-red-500">{error}</div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <div className="container mx-auto p-4 space-y-6">
        {/* Welcome Section */}
        <div className="bg-white p-6 rounded-lg shadow">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">Welcome, {user?.name}!</h1>
              <p className="text-gray-600">Your email: {user?.email}</p>
            </div>
            <button
              onClick={signOut}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>

        {/* Quick Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Meal Plans</h2>
            <p className="text-gray-600">View and manage your meal plans</p>
            <button
              onClick={() => router.push('/meal-plans')}
              className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
            >
              View Meal Plans
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Health Tracker</h2>
            <p className="text-gray-600">Track your health and fitness progress</p>
            <button
              onClick={() => router.push('/progress')}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              View Progress
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">Grocery List</h2>
            <p className="text-gray-600">Manage your shopping list</p>
            <button
              onClick={() => router.push('/grocery-list')}
              className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
            >
              View Grocery List
            </button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 