import React from 'react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
  onToggleSave: () => void;
  style?: React.CSSProperties;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, onToggleSave, style }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when saving
    onToggleSave();
  };

  return (
    <div 
      onClick={onSelect} 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col animate-fade-in-up"
      style={style}
    >
      <div className="relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.recipeName}
          className="w-full h-48 object-cover"
        />
        <button 
          onClick={handleSaveClick} 
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors duration-200 ${recipe.isSaved ? 'bg-red-500 text-white' : 'bg-white/80 text-gray-700 hover:bg-white'}`}
          aria-label={recipe.isSaved ? 'Unsave recipe' : 'Save recipe'}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={recipe.isSaved ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{recipe.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
            <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                {recipe.prepTime}
            </span>
            <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3.5a1 1 0 00.02 1.84L5.5 8.11V15a1 1 0 001 1h7a1 1 0 001-1V8.11l2.174-.69a1 1 0 00.02-1.84l-7-3.5zM12 14H8v-2h4v2z" />
                </svg>
                {recipe.cookTime}
            </span>
             <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zm-1.558 5.558a1 1 0 00-1.89 1.118l1.42 2.131a1 1 0 001.78-.175l.176-.352a.75.75 0 011.385 0l.176.352a1 1 0 001.78.175l1.42-2.131a1 1 0 00-1.89-1.118l-.513.77-1.162-1.742-.513.77zM15 6a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {recipe.servings}
            </span>
        </div>
      </div>
    </div>
  );
};