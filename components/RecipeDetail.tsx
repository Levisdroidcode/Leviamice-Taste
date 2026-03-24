import React from 'react';
import { ChevronLeft, Heart, Play, Check } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
  onToggleSave: () => void;
  onStartGame: () => void;
}

export const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack, onToggleSave, onStartGame }) => {
  return (
    <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
        <button
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          <ChevronLeft className="h-5 w-5 mr-2" />
          Back to Recipes
        </button>
        <div className="flex gap-2">
            <button
            onClick={onToggleSave}
            className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md transition-colors ${recipe.isSaved ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}
            >
            <Heart className="h-5 w-5 mr-2" fill={recipe.isSaved ? 'currentColor' : 'none'} />
            {recipe.isSaved ? 'Saved' : 'Save Recipe'}
            </button>
             <button
              onClick={onStartGame}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors"
            >
                <Play className="h-5 w-5 mr-2" />
              Start Cooking Challenge
            </button>
        </div>
      </div>


      <div className="mb-8 overflow-hidden rounded-lg shadow-md">
        <img 
            src={recipe.imageUrl} 
            alt={recipe.recipeName}
            className="w-full h-auto max-h-[500px] object-cover"
        />
      </div>

      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">{recipe.recipeName}</h2>
      <p className="text-lg text-gray-600 mb-8">{recipe.description}</p>
      
      <div className="flex flex-wrap gap-4 justify-center mb-8 p-4 bg-orange-50 rounded-lg border border-orange-200">
          <div className="text-center">
              <p className="text-sm font-medium text-gray-500">PREP TIME</p>
              <p className="text-lg font-bold text-orange-600">{recipe.prepTime}</p>
          </div>
           <div className="border-l border-orange-200"></div>
          <div className="text-center">
              <p className="text-sm font-medium text-gray-500">COOK TIME</p>
              <p className="text-lg font-bold text-orange-600">{recipe.cookTime}</p>
          </div>
           <div className="border-l border-orange-200"></div>
          <div className="text-center">
              <p className="text-sm font-medium text-gray-500">SERVINGS</p>
              <p className="text-lg font-bold text-orange-600">{recipe.servings}</p>
          </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-1">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-4">Ingredients</h3>
          <ul className="space-y-3">
            {recipe.ingredients.map((ingredient, index) => (
              <li key={index} className="flex items-start">
                <Check className="h-5 w-5 text-orange-500 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-700">{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-2">
          <h3 className="text-2xl font-bold text-gray-800 border-b-2 border-orange-400 pb-2 mb-4">Instructions</h3>
          <ol className="space-y-4">
            {recipe.instructions.map((instruction, index) => (
              <li key={index} className="flex items-start">
                <div className="flex-shrink-0 bg-orange-500 text-white font-bold rounded-full h-8 w-8 flex items-center justify-center mr-4 mt-1">{index + 1}</div>
                <p className="text-gray-700 leading-relaxed">{instruction}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};