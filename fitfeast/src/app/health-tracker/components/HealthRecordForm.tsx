'use client';

import { useState } from 'react';

interface HealthRecordFormProps {
  onSubmit: (data: {
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
  }) => void;
}

export default function HealthRecordForm({ onSubmit }: HealthRecordFormProps) {
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    weight: '',
    height: '',
    nutrition: {
      calories: '',
      protein: '',
      carbs: '',
      fats: '',
    },
    notes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Calculate BMI
    const weight = parseFloat(formData.weight);
    const height = parseFloat(formData.height) / 100; // Convert cm to m
    const bmi = weight / (height * height);

    onSubmit({
      date: formData.date,
      weight: weight,
      height: parseFloat(formData.height),
      bmi: parseFloat(bmi.toFixed(1)),
      nutrition: {
        calories: parseFloat(formData.nutrition.calories),
        protein: parseFloat(formData.nutrition.protein),
        carbs: parseFloat(formData.nutrition.carbs),
        fats: parseFloat(formData.nutrition.fats),
      },
      notes: formData.notes,
    });

    // Reset form
    setFormData({
      date: new Date().toISOString().split('T')[0],
      weight: '',
      height: '',
      nutrition: {
        calories: '',
        protein: '',
        carbs: '',
        fats: '',
      },
      notes: '',
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (name.startsWith('nutrition.')) {
      const nutritionField = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        nutrition: {
          ...prev.nutrition,
          [nutritionField]: value,
        },
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Date
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="weight" className="block text-sm font-medium text-gray-700">
          Weight (kg)
        </label>
        <input
          type="number"
          id="weight"
          name="weight"
          value={formData.weight}
          onChange={handleChange}
          required
          min="0"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div>
        <label htmlFor="height" className="block text-sm font-medium text-gray-700">
          Height (cm)
        </label>
        <input
          type="number"
          id="height"
          name="height"
          value={formData.height}
          onChange={handleChange}
          required
          min="0"
          step="0.1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-medium text-gray-900">Nutrition</h3>
        
        <div>
          <label htmlFor="nutrition.calories" className="block text-sm font-medium text-gray-700">
            Calories
          </label>
          <input
            type="number"
            id="nutrition.calories"
            name="nutrition.calories"
            value={formData.nutrition.calories}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="nutrition.protein" className="block text-sm font-medium text-gray-700">
            Protein (g)
          </label>
          <input
            type="number"
            id="nutrition.protein"
            name="nutrition.protein"
            value={formData.nutrition.protein}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="nutrition.carbs" className="block text-sm font-medium text-gray-700">
            Carbs (g)
          </label>
          <input
            type="number"
            id="nutrition.carbs"
            name="nutrition.carbs"
            value={formData.nutrition.carbs}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="nutrition.fats" className="block text-sm font-medium text-gray-700">
            Fats (g)
          </label>
          <input
            type="number"
            id="nutrition.fats"
            name="nutrition.fats"
            value={formData.nutrition.fats}
            onChange={handleChange}
            required
            min="0"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
          Notes
        </label>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
      >
        Add Record
      </button>
    </form>
  );
} 