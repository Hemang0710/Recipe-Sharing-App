'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import PageLayout from '../components/layout/PageLayout';
import axios from 'axios';

interface Post {
  _id: string;
  title: string;
  content: string;
  author: string;
  image: string | null;
  likes: number;
  comments: Array<{
    text: string;
    author: string;
    createdAt: string;
  }>;
  createdAt: string;
}

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    author: 'User',
    image: null as File | null 
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/community');
      setPosts(response.data as Post[]);
    } catch (err) {
      setError('Failed to fetch posts');
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewPost({ ...newPost, image: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append('title', newPost.title);
      formData.append('content', newPost.content);
      formData.append('author', newPost.author);
      if (newPost.image) {
        formData.append('image', newPost.image);
      }

      const response = await axios.post('/api/community', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      setPosts([response.data as Post, ...posts]);
      setNewPost({ title: '', content: '', author: 'User', image: null });
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Failed to create post');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/community/${id}`);
      setPosts(posts.filter(post => post._id !== id));
    } catch (err) {
      setError('Failed to delete post');
    }
  };

  const handleLike = async (id: string) => {
    try {
      const post = posts.find(p => p._id === id);
      if (!post) return;
      
      const response = await axios.put(`/api/community/${id}`, {
        likes: post.likes + 1
      });
      
      setPosts(posts.map(p => p._id === id ? response.data as Post : p));
    } catch (err) {
      setError('Failed to update like');
    }
  };

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
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                className="w-full p-2 border rounded-md"
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                required
              />
              <textarea
                className="w-full p-4 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                rows={3}
                placeholder="Share your progress or recipe..."
                value={newPost.content}
                onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                required
              ></textarea>
              
              {/* Image Upload */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Add Image (optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-green-50 file:text-green-700
                    hover:file:bg-green-100"
                />
                {imagePreview && (
                  <div className="mt-2 relative h-48 w-full">
                    <Image
                      src={imagePreview}
                      alt="Preview"
                      fill
                      className="object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="mt-2 flex justify-end">
                <button 
                  type="submit"
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
                  Post
                </button>
              </div>
            </form>
          </div>

          {/* Feed Posts */}
          <div className="space-y-6">
            {loading ? (
              <div>Loading posts...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              posts.map((post) => (
                <div key={post._id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div>
                      <h4 className="font-medium">{post.author}</h4>
                      <p className="text-sm text-gray-600">
                        {new Date(post.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDelete(post._id)}
                      className="ml-auto text-red-600 hover:text-red-800"
                    >
                      Delete
                    </button>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                  {post.image && (
                    <div className="relative h-64 w-full mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover rounded-lg"
                      />
                    </div>
                  )}
                  <p className="text-gray-800 mb-4">{post.content}</p>
                  <div className="flex space-x-4 text-gray-600">
                    <button 
                      onClick={() => handleLike(post._id)}
                      className="flex items-center space-x-1"
                    >
                      <span>👍</span>
                      <span>{post.likes} Likes</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <span>💬</span>
                      <span>{post.comments.length} Comments</span>
                    </button>
                    <button className="flex items-center space-x-1">
                      <span>🔄</span>
                      <span>Share</span>
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </PageLayout>
  );
}