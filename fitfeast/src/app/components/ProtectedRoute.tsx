'use client';

import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    console.log('ProtectedRoute: Current auth state:', { user, isLoading });
    if (!isLoading && !user) {
      console.log('ProtectedRoute: No user found, redirecting to signin');
      router.push('/signin');
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    console.log('ProtectedRoute: Loading state');
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  if (!user) {
    console.log('ProtectedRoute: No user, returning null');
    return null;
  }

  console.log('ProtectedRoute: Rendering protected content');
  return <>{children}</>;
} 