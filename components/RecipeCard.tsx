import React from 'react';
import { motion } from 'motion/react';
import { Heart, Clock, Timer, Users } from 'lucide-react';
import type { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onSelect: () => void;
  onToggleSave: () => void;
  index: number;
}

export const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onSelect, onToggleSave, index }) => {
  const handleSaveClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when saving
    onToggleSave();
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onClick={onSelect} 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col"
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
          <Heart className="h-6 w-6" fill={recipe.isSaved ? 'currentColor' : 'none'} />
        </button>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">{recipe.recipeName}</h3>
        <p className="text-gray-600 mb-4 flex-grow">{recipe.description}</p>
        <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-4">
            <span className="flex items-center">
                <Clock className="h-5 w-5 mr-1" />
                {recipe.prepTime}
            </span>
            <span className="flex items-center">
                <Timer className="h-5 w-5 mr-1" />
                {recipe.cookTime}
            </span>
             <span className="flex items-center">
                <Users className="h-5 w-5 mr-1" />
                {recipe.servings}
            </span>
        </div>
      </div>
    </motion.div>
  );
};
