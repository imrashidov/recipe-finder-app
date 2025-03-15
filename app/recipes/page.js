import Link from 'next/link';
import Image from 'next/image';
import { Suspense } from 'react';
import RecipesList from '../components/RecipesList';
import Loading from '../components/Loading';

export const revalidate = 60;

export default function RecipesPage({ searchParams }) {
  const { query, cuisine, maxReadyTime } = searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-amber-800">Recipe Results</h1>
          <Link
            href="/"
            className="px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
          >
            Back to Search
          </Link>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md mb-6 border border-amber-200">
          <h2 className="text-lg font-semibold mb-2 text-amber-700">Search Criteria:</h2>
          <ul className="list-disc pl-5 text-amber-800">
            {query && (
              <li>
                Recipe Name: <span className="font-medium">{query}</span>
              </li>
            )}
            {cuisine && (
              <li>
                Cuisine: <span className="font-medium">{cuisine}</span>
              </li>
            )}
            {maxReadyTime && (
              <li>
                Max Preparation Time: <span className="font-medium">{maxReadyTime} minutes</span>
              </li>
            )}
          </ul>
        </div>

        <Suspense fallback={<Loading />}>
          <RecipesList query={query} cuisine={cuisine} maxReadyTime={maxReadyTime} />
        </Suspense>
      </div>
    </main>
  );
}
