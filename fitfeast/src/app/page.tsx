"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PageLayout from "./components/layout/PageLayout";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);

  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const handleSignIn = () => {
    router.push("/signin");
  };

  const handleGetStarted = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  const handleHealthJourney = () => {
    if (user) {
      router.push("/dashboard");
    } else {
      router.push("/signup");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/");
  };

  return (
    <PageLayout>
      <div className="space-y-12">
        {/* Hero Section */}
        <section className="text-center py-12">
          <span className="inline-block px-4 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
            Budget-Smart Nutrition Platform
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Healthy Eating for <span className="text-green-600">Every</span>{' '}
            <span className="text-blue-600">Budget</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            FitFeast creates personalized meal plans based on your income and location, making nutritious eating accessible and affordable for everyone.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={handleHealthJourney}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              🍏 Start Your Health Journey
            </button>
          </div>
        </section>

        {/* Feature Cards */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <span className="text-2xl mb-4 block">💡</span>
            <h3 className="text-xl font-semibold mb-2">Budget-First Planning</h3>
            <p className="text-gray-600">Meal plans that fit your actual budget, not just ideal nutrition goals.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <span className="text-2xl mb-4 block">🌎</span>
            <h3 className="text-xl font-semibold mb-2">Local Food Awareness</h3>
            <p className="text-gray-600">Recipes adapted to your local cuisine and regional food availability.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <span className="text-2xl mb-4 block">📈</span>
            <h3 className="text-xl font-semibold mb-2">Progress Tracking</h3>
            <p className="text-gray-600">Complete BMI monitoring and nutrition analytics to track your journey.</p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-4">
              Powerful Features
            </span>
            <h2 className="text-3xl font-bold mb-4">
              Everything You Need for <span className="text-green-600">Healthy Living</span>
            </h2>
            <p className="text-gray-600 max-w-3xl mx-auto">
              FitFeast combines cutting-edge technology with practical nutrition science to make healthy eating accessible to everyone.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">💡</span>
                <span className="font-semibold">Budget-Smart Planning</span>
              </div>
              <p className="text-gray-600">Get personalized meal plans that fit your income and local food prices</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📊</span>
                <span className="font-semibold">BMI & Progress Tracking</span>
              </div>
              <p className="text-gray-600">Monitor your health journey with detailed analytics and insights</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">🛒</span>
                <span className="font-semibold">Smart Shopping Lists</span>
              </div>
              <p className="text-gray-600">Auto-generated grocery lists with cost estimates and local availability</p>
            </div>
          </div>
        </section>

        {/* Why FitFeast Section */}
        <section className="bg-gray-50 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h3 className="text-2xl font-bold text-center mb-8">Why FitFeast Stands Out</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-3">
                  Budget-First Approach
                </span>
                <p className="text-gray-600">Unlike other apps, we prioritize affordability without compromising nutrition</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-3">
                  Cultural Awareness
                </span>
                <p className="text-gray-600">Meal suggestions that respect your local cuisine and food availability</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium mb-3">
                  Real-World Impact
                </span>
                <p className="text-gray-600">Designed specifically for underserved communities and diverse populations</p>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-white border-t py-8">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <div className="text-xl font-bold text-green-600 mb-2">FitFeast</div>
            <div className="text-gray-600 mb-4">Making healthy eating accessible for everyone</div>
            <div className="text-sm text-gray-500">
              © 2024 Webdev's Team • Dhwani • Sanket • Hemang • Devwrat
            </div>
          </div>
        </footer>
      </div>
    </PageLayout>
  );
}
