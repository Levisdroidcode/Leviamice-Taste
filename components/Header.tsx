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
            <path d="M10 2a1 1 0 011 1v1.303A2.992 2.992 0 0113.707 6H15a1 1 0 110 2h-1.293a2.992 2.992 0 01-2.707 2.707V13a1 1 0 11-2 0v-2.293a2.992 2.992 0 01-2.707-2.707H5a1 1 0 110-2h1.293A2.992 2.992 0 019 4.303V3a1 1 0 011-1z" />
            <path d="M10 18a1 1 0 01-1-1v-2.293a2.992 2.992 0 01-2.707-2.707H5a1 1 0 110-2h1.293A2.992 2.992 0 019 7.303V6a1 1 0 112 0v1.303A2.992 2.992 0 0113.707 10H15a1 1 0 110 2h-1.293a2.992 2.992 0 01-2.707 2.707V17a1 1 0 01-1 1z" />
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