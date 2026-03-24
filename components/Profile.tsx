import React from 'react';
import { Search, Heart } from 'lucide-react';
import type { Recipe } from '../types';
import { RecipeCard } from './RecipeCard';

interface ProfileProps {
  savedRecipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
  onToggleSave: (recipe: Recipe) => void;
  onBack: () => void;
}

export const Profile: React.FC<ProfileProps> = ({ savedRecipes, onSelectRecipe, onToggleSave, onBack }) => {
  return (
    <div className="animate-fade-in">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Recipe Collection</h2>
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          <Search className="h-5 w-5 mr-2" />
          Back to Search
        </button>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="text-center mt-16 bg-white p-12 rounded-lg shadow-md">
            <Heart className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-4 text-2xl font-semibold text-gray-700">Your collection is empty</h3>
            <p className="mt-2 text-gray-500">
                You haven't saved any recipes yet. Start searching to build your personal cookbook!
            </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedRecipes.map((recipe, index) => (
            <RecipeCard
              key={recipe.recipeName}
              recipe={recipe}
              onSelect={() => onSelectRecipe(recipe)}
              onToggleSave={() => onToggleSave(recipe)}
              style={{ animationDelay: `${index * 100}ms` }}
            />
          ))}
        </div>
      )}
    </div>
  );
};
