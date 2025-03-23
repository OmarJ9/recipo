interface RecipeIngredientsProps {
  ingredients: string[];
}

export function RecipeIngredients({ ingredients }: RecipeIngredientsProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-20">
      <h2 className="text-xl font-semibold mb-6 pb-2 border-b border-gray-200 dark:border-gray-700">
        Ingredients
      </h2>
      <ul className="space-y-3 mb-8">
        {ingredients.map((ingredient, index) => (
          <li key={index} className="flex items-start">
            <div className="h-5 w-5 rounded-full border-2 border-amber-500 flex-shrink-0 mt-0.5 mr-3"></div>
            <span className="text-gray-700 dark:text-gray-300">
              {ingredient}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
