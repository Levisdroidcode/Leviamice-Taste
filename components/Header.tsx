import React from 'react';
import { Utensils, User, Home, ArrowLeft } from 'lucide-react';

interface HeaderProps {
  onShowProfile: () => void;
  onGoHome: () => void;
  onBack: () => void;
  showBack: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onShowProfile, onGoHome, onBack, showBack }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          {showBack && (
            <button
              onClick={onBack}
              className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          )}
          <button
            onClick={onGoHome}
            className="p-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go home"
          >
            <Home className="h-6 w-6" />
          </button>
          <div 
            className="flex items-center cursor-pointer" 
            onClick={onGoHome}
          >
            <Utensils className="h-8 w-8 text-orange-500 mr-2 hidden sm:block" />
            <h1 className="text-xl md:text-2xl font-bold text-gray-800 tracking-tight">
              Leviamice <span className="text-orange-500">Taste</span>
            </h1>
          </div>
        </div>
        <button
          onClick={onShowProfile}
          className="inline-flex items-center px-3 py-2 md:px-4 md:py-2 border border-transparent text-sm font-medium rounded-md text-orange-700 bg-orange-100 hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          <User className="h-5 w-5 md:mr-2" />
          <span className="hidden md:inline">My Recipes</span>
        </button>
      </div>
    </header>
  );
};
