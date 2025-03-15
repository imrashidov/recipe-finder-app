import Link from 'next/link';
import Image from 'next/image';

async function getRecipes(query, cuisine, maxReadyTime) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;

  const params = new URLSearchParams();
  if (query) params.append('query', query);
  if (cuisine) params.append('cuisine', cuisine);
  if (maxReadyTime) params.append('maxReadyTime', maxReadyTime);
  params.append('apiKey', apiKey);

  const response = await fetch(
    `https://api.spoonacular.com/recipes/complexSearch?${params.toString()}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipes');
  }

  return response.json();
}

export default async function RecipesList({ query, cuisine, maxReadyTime }) {
  const data = await getRecipes(query, cuisine, maxReadyTime);

  if (data.results.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-medium text-amber-700">No recipes found</h2>
        <p className="mt-2 text-amber-600">Try adjusting your search criteria</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.results.map((recipe) => (
        <Link
          key={recipe.id}
          href={`/recipes/${recipe.id}`}
          className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-amber-200"
        >
          <div className="relative h-48 w-full">
            <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
          </div>
          <div className="p-4">
            <h2 className="text-lg font-semibold line-clamp-2 text-amber-800">{recipe.title}</h2>
          </div>
        </Link>
      ))}
    </div>
  );
}
