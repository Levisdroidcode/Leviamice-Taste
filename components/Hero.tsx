
import React from 'react';

export const Hero: React.FC = () => {
  return (
    <div className="text-center py-12 md:py-16">
      <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight">
        Find Your Next Favorite Meal
      </h2>
      <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
        Just type in an ingredient, a dish, or a craving, and let our AI chef whip up some amazing recipes for you.
      </p>
    </div>
  );
};
