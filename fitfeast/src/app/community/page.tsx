'use client';

import PageLayout from '../components/layout/PageLayout';

export default function CommunityPage() {
  return (
    <PageLayout>
      <div className="space-y-6">
        {/* Active Challenges Section */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-gray-900">Active Challenges</h2>
            <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
              Join New Challenge
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Challenge Card */}
            <div className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-semibold text-lg">30-Day Healthy Eating</h3>
                  <p className="text-sm text-gray-600">Started 5 days ago</p>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                  Active
                </span>
              </div>
              <div className="space-y-2">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-600 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
                <p className="text-sm text-gray-600">Progress: 30%</p>
              </div>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-sm text-gray-600">15 participants</span>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                  View Details
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Community Feed */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Community Feed</h2>
          
          {/* Post Creation */}
          <div className="mb-6">
            <textarea
              className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              rows={3}
              placeholder="Share your progress or recipe..."
            ></textarea>
            <div className="mt-2 flex justify-end">
              <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                Post
              </button>
            </div>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {/* Sample Post */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div>
                  <h4 className="font-medium">User Name</h4>
                  <p className="text-sm text-gray-600">2 hours ago</p>
                </div>
              </div>
              <p className="text-gray-800 mb-4">
                Just completed my first week of healthy eating! Feeling great and excited to continue this journey.
              </p>
              <div className="flex space-x-4 text-gray-600">
                <button className="flex items-center space-x-1">
                  <span>👍</span>
                  <span>Like</span>
                </button>
                <button className="flex items-center space-x-1">
                  <span>💬</span>
                  <span>Comment</span>
                </button>
                <button className="flex items-center space-x-1">
                  <span>🔄</span>
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Recipe Sharing */}
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Shared Recipes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Recipe Card */}
            <div className="border rounded-lg overflow-hidden">
              <div className="h-48 bg-gray-200"></div>
              <div className="p-4">
                <h3 className="font-semibold mb-2">Healthy Quinoa Bowl</h3>
                <p className="text-sm text-gray-600 mb-4">
                  A nutritious and budget-friendly meal that's perfect for meal prep.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-600">By User Name</span>
                  <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                    View Recipe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
} 