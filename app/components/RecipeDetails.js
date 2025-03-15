import Image from 'next/image';

async function getRecipeDetails(id) {
  const apiKey = process.env.NEXT_PUBLIC_SPOONACULAR_API_KEY;
  const response = await fetch(
    `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,
    { next: { revalidate: 60 } }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch recipe details');
  }

  return response.json();
}

export default async function RecipeDetails({ id }) {
  const recipe = await getRecipeDetails(id);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-amber-200">
      <div className="relative h-80 w-full">
        <Image src={recipe.image} alt={recipe.title} fill className="object-cover" />
      </div>

      <div className="p-6">
        <h1 className="text-3xl font-bold mb-4 text-amber-800">{recipe.title}</h1>

        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800">
            <span className="font-medium">Ready in: </span>
            {recipe.readyInMinutes} minutes
          </div>
          <div className="bg-amber-100 px-3 py-1 rounded-full text-amber-800">
            <span className="font-medium">Servings: </span>
            {recipe.servings}
          </div>
          {recipe.vegetarian && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Vegetarian</div>
          )}
          {recipe.vegan && (
            <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full">Vegan</div>
          )}
        </div>

        <h2 className="text-xl font-semibold mb-3 text-amber-700">Ingredients</h2>
        <ul className="list-disc pl-6 mb-6 space-y-1 text-amber-900">
          {recipe.extendedIngredients.map((ingredient) => (
            <li key={ingredient.id}>{ingredient.original}</li>
          ))}
        </ul>

        {recipe.summary && (
          <>
            <h2 className="text-xl font-semibold mb-3 text-amber-700">Summary</h2>
            <div
              className="prose max-w-none text-amber-900"
              dangerouslySetInnerHTML={{ __html: recipe.summary }}
            />
          </>
        )}
      </div>
    </div>
  );
}
