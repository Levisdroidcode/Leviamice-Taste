import React from 'react';
import { X } from 'lucide-react';

interface SearchHistoryProps {
  history: string[];
  onSearch: (query: string) => void;
  onClear: () => void;
}

export const SearchHistory: React.FC<SearchHistoryProps> = ({ history, onSearch, onClear }) => {
  if (history.length === 0) {
    return null;
  }

  return (
    <div className="max-w-2xl mx-auto mt-4 text-center">
        <div className="flex items-center justify-center flex-wrap gap-2">
            <span className="text-sm font-semibold text-gray-600 mr-2">Recent:</span>
            {history.map(item => (
                <button
                key={item}
                onClick={() => onSearch(item)}
                className="px-3 py-1 text-sm bg-orange-100 text-orange-800 rounded-full hover:bg-orange-200 transition-colors"
                >
                {item}
                </button>
            ))}
            <button
                onClick={onClear}
                className="p-1 text-gray-400 hover:text-gray-600"
                aria-label="Clear search history"
                title="Clear search history"
            >
                 <X className="h-4 w-4" />
            </button>
        </div>
    </div>
  );
};
