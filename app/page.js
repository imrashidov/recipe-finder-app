'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [cuisine, setCuisine] = useState('');
  const [maxReadyTime, setMaxReadyTime] = useState('');

  const isFormValid = query || cuisine || maxReadyTime;

  const handleSubmit = (e) => {
    e.preventDefault();

    const params = new URLSearchParams();
    if (query) params.append('query', query);
    if (cuisine) params.append('cuisine', cuisine);
    if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);

    router.push(`/recipes?${params.toString()}`);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 to-orange-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md border border-amber-200">
        <h1 className="text-3xl font-bold text-center mb-6 text-amber-700">Recipe Finder</h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="query" className="block text-sm font-medium text-amber-800 mb-1">
              Recipe Search
            </label>
            <input
              id="query"
              type="text"
              placeholder="Search for pasta, chicken, etc."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 placeholder:text-amber-400 text-amber-800"
            />
          </div>

          <div>
            <label htmlFor="cuisine" className="block text-sm font-medium text-amber-800 mb-1">
              Cuisine
            </label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={(e) => setCuisine(e.target.value)}
              className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 text-amber-800"
            >
              <option value="" className="text-amber-400">
                Select a cuisine
              </option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
              <option value="Indian">Indian</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>

          <div>
            <label htmlFor="maxReadyTime" className="block text-sm font-medium text-amber-800 mb-1">
              Maximum Preparation Time (minutes)
            </label>
            <input
              id="maxReadyTime"
              type="number"
              min="0"
              placeholder="30"
              value={maxReadyTime}
              onChange={(e) => setMaxReadyTime(e.target.value)}
              className="w-full px-4 py-2 border border-amber-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 bg-amber-50 placeholder:text-amber-400 text-amber-800"
            />
          </div>

          <button
            type="submit"
            disabled={!isFormValid}
            className={`w-full py-3 px-4 rounded-md text-white font-bold shadow-md transition-all duration-300 
              ${
                isFormValid
                  ? 'bg-amber-600 hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transform hover:-translate-y-1'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
          >
            Find Recipes
          </button>
        </form>
      </div>
    </main>
  );
}
