
import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({ onSearch, isLoading }) => {
  const [query, setQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="relative">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g., 'vegan pasta' or 'chicken and rice'"
          className="w-full px-5 py-4 text-lg text-gray-700 bg-white border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition-shadow"
          disabled={isLoading}
        />
        <button
          type="submit"
          className="absolute top-1/2 right-2.5 transform -translate-y-1/2 px-6 py-2.5 text-lg font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 disabled:bg-orange-300 disabled:cursor-not-allowed transition-colors"
          disabled={isLoading}
        >
          {isLoading ? 'Searching...' : 'Search'}
        </button>
      </div>
    </form>
  );
};
