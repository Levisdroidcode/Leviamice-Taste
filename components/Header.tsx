import React from 'react';

interface HeaderProps {
  onShowProfile: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onShowProfile }) => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-500 mr-3" viewBox="0 0 20 20" fill="currentColor">
              {/* Plate */}
              <path d="M10 18a8 8 0 100-16 8 8 0 000 16z" opacity="0.1"/>
              
              {/* Utensils on the plate */}
              <g transform="rotate(45 10 10)">
                {/* Knife */}
                <path d="M10.5 6h-1v8h1a1 1 0 001-1V7a1 1 0 00-1-1z" />
                {/* Fork */}
                <path d="M8.5 6a1 1 0 00-1 1v1H6V7a1 1 0 00-1-1h-.5v8H5v-1h.5v-1H6v-1h.5v-1H7v-1h.5v-1H8v-1h.5z" />
              </g>

              {/* Pan */}
              <path fillRule="evenodd" d="M15.03 8.78a5.5 5.5 0 00-10.06 0H2v1h2.97a5.5 5.5 0 0010.06 0H18v-1h-2.97z" clipRule="evenodd"/>

              {/* Fire */}
              <path d="M10 1c-1.5 1.5-1.5 3 .1 4.5.6.6 1.4.9 2.2.9s1.6-.3 2.2-.9c1.6-1.5 1.6-3 .1-4.5-.8-.7-1.8-.7-2.3-.1l-.1.1c-.5-.6-1.5-.6-2.3.1z"/>
            </svg>
            <h1 className="text-2xl font-bold text-gray-800 tracking-tight">
            Leviamice <span className="text-orange-500">Taste</span>
            </h1>
        </div>
        <button
            onClick={onShowProfile}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            My Recipes
        </button>
      </div>
    </header>
  );
};
