'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { name: 'Meal Plans', path: '/meal-plans', requiresAuth: true },
    { name: 'Grocery List', path: '/grocery-list', requiresAuth: true },
    { name: 'Progress', path: '/progress', requiresAuth: true },
    { name: 'Health Tracker', path: '/health-tracker', requiresAuth: true },
    { name: 'Community', path: '/community', requiresAuth: true },
  ];

  return (
    <nav className="bg-gradient-to-r from-green-600 to-green-700 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-white">FitFeast</span>
              <span className="text-sm text-green-100">Health & Nutrition</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Navigation Links */}
            {navItems.map((item) => (
              (!item.requiresAuth || user) && (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    pathname === item.path
                      ? 'bg-green-800 text-white'
                      : 'text-green-100 hover:bg-green-800 hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              )
            ))}

            {/* Auth Buttons */}
            {user ? (
              <div className="flex items-center space-x-4">
                <span className="text-green-100">Welcome, {user.name}</span>
                <button
                  onClick={handleLogout}
                  className="px-3 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/signin"
                  className="px-3 py-2 text-sm font-medium text-white bg-green-800 rounded-md hover:bg-green-900 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  href="/signup"
                  className="px-3 py-2 text-sm font-medium text-green-800 bg-white rounded-md hover:bg-green-50 transition-colors"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 