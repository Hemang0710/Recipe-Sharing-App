'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PageLayout from '../components/layout/PageLayout';
import { useAuth } from '@/app/context/AuthContext';

export default function ProgressPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [latestRecord, setLatestRecord] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLatestRecord = async () => {
      if (!user?._id) return;
      
      try {
        const response = await fetch('/api/health-records', {
          headers: {
            'user-data': JSON.stringify({ _id: user._id })
          }
        });
        
        if (!response.ok) throw new Error('Failed to fetch records');
        
        const records = await response.json();
        if (records.length > 0) {
          setLatestRecord(records[0]); // Get the most recent record
        }
      } catch (error) {
        console.error('Error fetching records:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRecord();
  }, [user?._id]);

  const handleHealthTrackerClick = () => {
    router.push('/health-tracker');
  };

  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Health Tracker Link */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold text-gray-900">Health Tracker</h2>
            <button
              onClick={handleHealthTrackerClick}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
            >
              View Health Tracker
            </button>
          </div>
          <p className="text-gray-600">
            Track your BMI, weight, and nutrition progress over time. Click the button above to access your detailed health records.
          </p>
        </div>

        {/* BMI Tracker Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">BMI Tracker</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Current BMI</h3>
              <p className="text-3xl font-bold text-green-600">
                {loading ? '--' : latestRecord?.bmi || '--'}
              </p>
              <p className="text-sm text-gray-600">
                Last updated: {loading ? '--' : latestRecord?.date ? new Date(latestRecord.date).toLocaleDateString() : '--'}
              </p>
            </div>
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Weight</h3>
              <p className="text-3xl font-bold text-blue-600">
                {loading ? '--' : latestRecord?.weight ? `${latestRecord.weight} kg` : '--'}
              </p>
              <p className="text-sm text-gray-600">
                Height: {loading ? '--' : latestRecord?.height ? `${latestRecord.height} cm` : '--'}
              </p>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Nutrition</h3>
              <p className="text-3xl font-bold text-purple-600">
                {loading ? '--' : latestRecord?.nutrition?.calories ? `${latestRecord.nutrition.calories} kcal` : '--'}
              </p>
              <p className="text-sm text-gray-600">
                {loading ? '--' : latestRecord?.nutrition ? 
                  `P: ${latestRecord.nutrition.protein}g | C: ${latestRecord.nutrition.carbs}g | F: ${latestRecord.nutrition.fats}g` : 
                  'No nutrition data'}
              </p>
            </div>
          </div>
        </div>

        {/* Progress Charts Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Progress Charts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Weight Progress Chart</p>
            </div>
            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <p className="text-gray-500">Nutrition Intake Chart</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 