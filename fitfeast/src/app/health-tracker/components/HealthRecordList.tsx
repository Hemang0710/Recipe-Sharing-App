'use client';

import { useState } from 'react';

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

interface EditFormData {
  date: string;
  weight: number;
  height: number;
  nutrition: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
  };
  notes: string;
}

interface HealthRecordListProps {
  records: HealthRecord[];
  onDelete: (id: string) => void;
  onUpdate: (id: string, data: Partial<HealthRecord>) => void;
}

export default function HealthRecordList({ records, onDelete, onUpdate }: HealthRecordListProps) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditFormData | null>(null);

  const handleEdit = (record: HealthRecord) => {
    setEditingId(record._id);
    setEditForm({
      date: record.date,
      weight: record.weight,
      height: record.height,
      nutrition: { ...record.nutrition },
      notes: record.notes,
    });
  };

  const handleSave = (id: string) => {
    if (editForm) {
      onUpdate(id, editForm);
      setEditingId(null);
      setEditForm(null);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    if (!editForm) return;

    if (name.startsWith('nutrition.')) {
      const nutritionField = name.split('.')[1];
      setEditForm({
        ...editForm,
        nutrition: {
          ...editForm.nutrition,
          [nutritionField]: parseFloat(value),
        },
      });
    } else {
      setEditForm({
        ...editForm,
        [name]: name === 'date' ? value : parseFloat(value),
      });
    }
  };

  const getBMICategory = (bmi: number) => {
    if (bmi < 18.5) return 'Underweight';
    if (bmi < 25) return 'Normal weight';
    if (bmi < 30) return 'Overweight';
    return 'Obese';
  };

  if (records.length === 0) {
    return <p className="text-gray-500">No records found. Add your first record above!</p>;
  }

  return (
    <div className="space-y-4">
      {records.map(record => (
        <div key={record._id} className="bg-white p-4 rounded-lg shadow">
          {editingId === record._id && editForm ? (
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={editForm.date}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Weight (kg)</label>
                  <input
                    type="number"
                    name="weight"
                    value={editForm.weight}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Height (cm)</label>
                  <input
                    type="number"
                    name="height"
                    value={editForm.height}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Calories</label>
                  <input
                    type="number"
                    name="nutrition.calories"
                    value={editForm.nutrition.calories}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Protein (g)</label>
                  <input
                    type="number"
                    name="nutrition.protein"
                    value={editForm.nutrition.protein}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Carbs (g)</label>
                  <input
                    type="number"
                    name="nutrition.carbs"
                    value={editForm.nutrition.carbs}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Fats (g)</label>
                  <input
                    type="number"
                    name="nutrition.fats"
                    value={editForm.nutrition.fats}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Notes</label>
                <textarea
                  name="notes"
                  value={editForm.notes}
                  onChange={handleChange}
                  rows={2}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSave(record._id)}
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Save
                </button>
              </div>
            </form>
          ) : (
            <>
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {new Date(record.date).toLocaleDateString()}
                  </h3>
                  <p className="text-sm text-gray-500">
                    BMI: {record.bmi} ({getBMICategory(record.bmi)})
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(record)}
                    className="text-green-600 hover:text-green-700"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(record._id)}
                    className="text-red-600 hover:text-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Weight</p>
                  <p className="font-medium">{record.weight} kg</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Height</p>
                  <p className="font-medium">{record.height} cm</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Calories</p>
                  <p className="font-medium">{record.nutrition.calories} kcal</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Protein</p>
                  <p className="font-medium">{record.nutrition.protein}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Carbs</p>
                  <p className="font-medium">{record.nutrition.carbs}g</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Fats</p>
                  <p className="font-medium">{record.nutrition.fats}g</p>
                </div>
              </div>

              {record.notes && (
                <div>
                  <p className="text-sm text-gray-500">Notes</p>
                  <p className="text-gray-700">{record.notes}</p>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );
} 