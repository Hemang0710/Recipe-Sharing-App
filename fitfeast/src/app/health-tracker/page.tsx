'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/app/components/ProtectedRoute';
import HealthRecordForm from './components/HealthRecordForm';
import HealthRecordList from './components/HealthRecordList';
import { useAuth } from '@/app/context/AuthContext';

interface HealthRecord {
  _id: string;
  date: string;
  weight: number;
  height: number;
  bmi: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  notes: string;
}

export default function HealthTracker() {
  const [records, setRecords] = useState<HealthRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchRecords = async () => {
    try {
      const response = await fetch('/api/health-records', {
        headers: {
          'user-data': JSON.stringify({ _id: user?._id })
        }
      });
      if (!response.ok) throw new Error('Failed to fetch records');
      const data = await response.json();
      setRecords(data);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddRecord = async (data: Omit<HealthRecord, '_id'>) => {
    try {
      const response = await fetch('/api/health-records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'user-data': JSON.stringify({ _id: user?._id })
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to add record');
      const newRecord = await response.json();
      setRecords([newRecord, ...records]);
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleDeleteRecord = async (id: string) => {
    try {
      const response = await fetch(`/api/health-records/${id}`, {
        method: 'DELETE',
        headers: {
          'user-data': JSON.stringify({ _id: user?._id })
        }
      });
      if (!response.ok) throw new Error('Failed to delete record');
      setRecords(records.filter(record => record._id !== id));
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleUpdateRecord = async (id: string, data: Partial<HealthRecord>) => {
    try {
      const response = await fetch(`/api/health-records/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'user-data': JSON.stringify({ _id: user?._id })
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update record');
      const updatedRecord = await response.json();
      setRecords(records.map(record => 
        record._id === id ? updatedRecord : record
      ));
    } catch (error: any) {
      setError(error.message);
    }
  };

  useEffect(() => {
    if (user?._id) {
      fetchRecords();
    }
  }, [user?._id]);

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Health Tracker</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Add New Record</h2>
            <HealthRecordForm onSubmit={handleAddRecord} />
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Your Records</h2>
            {loading ? (
              <p>Loading records...</p>
            ) : (
              <HealthRecordList
                records={records}
                onDelete={handleDeleteRecord}
                onUpdate={handleUpdateRecord}
              />
            )}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
} 