import React from 'react';

interface FilterTabsProps {
  activeFilter: 'all' | 'saved';
  onFilterChange: (filter: 'all' | 'saved') => void;
  savedCount: number;
}

export const FilterTabs: React.FC<FilterTabsProps> = ({ activeFilter, onFilterChange, savedCount }) => {
  const baseClasses = "px-4 py-2 text-sm font-semibold rounded-md transition-colors duration-200";
  const activeClasses = "bg-orange-500 text-white";
  const inactiveClasses = "bg-white text-gray-600 hover:bg-orange-100";

  return (
    <div className="flex justify-center my-8">
      <div className="flex items-center space-x-2 p-1 bg-white rounded-lg shadow-sm border">
        <button 
          onClick={() => onFilterChange('all')}
          className={`${baseClasses} ${activeFilter === 'all' ? activeClasses : inactiveClasses}`}
        >
          All Recipes
        </button>
        <button 
          onClick={() => onFilterChange('saved')}
          className={`${baseClasses} ${activeFilter === 'saved' ? activeClasses : inactiveClasses} flex items-center`}
        >
          Saved 
          <span className={`ml-2 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center ${activeFilter === 'saved' ? 'bg-white text-orange-500' : 'bg-gray-200 text-gray-700'}`}>
            {savedCount}
          </span>
        </button>
      </div>
    </div>
  );
};
