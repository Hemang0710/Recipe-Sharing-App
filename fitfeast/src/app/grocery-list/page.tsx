'use client';

import { useState } from 'react';
import PageLayout from '../components/layout/PageLayout';

export default function GroceryListPage() {
  const [items, setItems] = useState<any[]>([]);
  const [showList, setShowList] = useState(false);

  const generateList = () => {
    const stored = localStorage.getItem('groceryItems');
    if (stored) {
      setItems(JSON.parse(stored));
      setShowList(true);
    } else {
      alert('No grocery items found. Please generate a meal plan first!');
    }
  };

  const removeItem = (index: number) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

  const total = items.reduce((sum, item) => sum + item.price, 0).toFixed(2);

  return (
    <PageLayout>
      <div className="space-y-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Grocery List</h1>
            <div className="flex space-x-4">
              <button
                onClick={generateList}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Generate List
              </button>
              <button
                onClick={() => alert('Export feature coming soon!')}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Export List
              </button>
            </div>
          </div>

          {showList && (
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Estimated Total</h3>
                  <p className="text-2xl font-bold text-green-600">${total}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Items Count</h3>
                  <p className="text-2xl font-bold text-green-600">{items.length}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium text-gray-600">Savings</h3>
                  <p className="text-2xl font-bold text-green-600">$--</p>
                </div>
              </div>
            </div>
          )}

          {/* Grocery List Table */}
          <div className="space-y-4">
            <div className="grid grid-cols-12 gap-4 font-medium text-gray-600 border-b pb-2">
              <div className="col-span-6">Item</div>
              <div className="col-span-2">Quantity</div>
              <div className="col-span-2">Price</div>
              <div className="col-span-2">Actions</div>
            </div>

            {items.length > 0 ? (
              items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 items-center py-2 border-b">
                  <div className="col-span-6 flex items-center gap-3">
                    <input type="checkbox" className="h-4 w-4 text-green-600" />
                    <span>{item.name}</span>
                  </div>
                  <div className="col-span-2">{item.quantity}</div>
                  <div className="col-span-2">${item.price.toFixed(2)}</div>
                  <div className="col-span-2">
                    <button
                      onClick={() => removeItem(index)}
                      className="text-red-600 hover:text-red-800"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                Your grocery list is empty. Generate a meal plan first.
              </div>
            )}
          </div>
        </div>

        {/* Store Recommendations */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Store Recommendations</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">Walmart</h3>
              <p className="text-sm text-gray-600">Estimated Savings: $3.50</p>
              <p className="text-sm text-gray-600">Distance: 2.3 km</p>
            </div>
            <div className="border rounded-lg p-4">
              <h3 className="font-semibold mb-2">No Frills</h3>
              <p className="text-sm text-gray-600">Estimated Savings: $2.10</p>
              <p className="text-sm text-gray-600">Distance: 1.8 km</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
