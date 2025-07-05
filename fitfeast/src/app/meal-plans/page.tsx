'use client';

import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

export default function MealPlansPage() {
  const [budget, setBudget] = useState('');
  const [location, setLocation] = useState('');
  const [meals, setMeals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateMealPlan = async () => {
    if (!location) {
      setError('Please enter a location or cuisine type.');
      return;
    }
  
    setLoading(true);
    setError('');
  
    try {
      const res = await fetch(`/api/meal-plan?q=${location}`);
      if (!res.ok) throw new Error('API call failed');
  
      const data = await res.json();
      setMeals(data);
  
      const ingredients = data.map((meal: any) => ({
        name: meal.name.split(' ')[0],    
        quantity: '1 pack',
        price: parseFloat(meal.cost)
      }));
  
      localStorage.setItem('groceryItems', JSON.stringify(ingredients));
      console.log('Grocery Items Saved:', ingredients); 
    } catch (err) {
      console.error('Error:', err);
      setError('Failed to fetch meal data. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <PageLayout>
      <div className="bg-white shadow rounded-lg p-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Meal Plans</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Budget & Location Inputs */}
          <div className="bg-green-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-4">Budget & Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Weekly Budget ($)</label>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., 50"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location / Cuisine</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  placeholder="e.g., Indian, Asian, Vegetarian"
                />
              </div>
              <button
                onClick={generateMealPlan}
                className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                {loading ? 'Loading...' : 'Generate Meal Plan'}
              </button>
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          </div>

          {/* Meal Plan Result Display */}
          <div className="col-span-2">
            <h2 className="text-lg font-semibold mb-4">This Week's Plan</h2>
            {meals.length === 0 ? (
              <p className="text-gray-600">No meals yet. Enter preferences and click generate.</p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {meals.map((meal, index) => (
                  <div key={index} className="border rounded-lg p-4 flex gap-4 bg-white shadow">
                    <img
                      src={meal.image}
                      alt={meal.name}
                      className="w-24 h-24 object-cover rounded"
                    />
                    <div>
                      <h3 className="text-lg font-bold">{meal.name}</h3>
                      <p>Calories: {meal.calories} kcal</p>
                      <p>Estimated Cost: ${meal.cost}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
