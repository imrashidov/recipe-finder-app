import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import RecipeDetails from '../../components/RecipeDetails';
import Loading from '../../components/Loading';

export const revalidate = 60;

export default function RecipeDetailsPage({ params }) {
  const { id } = params;

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-100 p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/recipes"
          className="inline-block mb-6 px-4 py-2 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-all duration-300 transform hover:-translate-y-1 shadow-md"
        >
          Back to Recipes
        </Link>

        <Suspense fallback={<Loading />}>
          <RecipeDetails id={id} />
        </Suspense>
      </div>
    </main>
  );
}
