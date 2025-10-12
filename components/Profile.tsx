import React from 'react';
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
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
          Back to Search
        </button>
      </div>

      {savedRecipes.length === 0 ? (
        <div className="text-center mt-16 bg-white p-12 rounded-lg shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
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