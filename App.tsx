import React, { useState, useCallback, useEffect, useMemo } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { SearchBar } from './components/SearchBar';
import { RecipeCard } from './components/RecipeCard';
import { RecipeDetail } from './components/RecipeDetail';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorDisplay } from './components/ErrorDisplay';
import { fetchRecipes } from './services/geminiService';
import type { Recipe } from './types';
import { Welcome } from './components/Welcome';
import { SearchHistory } from './components/SearchHistory';
import { FilterTabs } from './components/FilterTabs';
import { Profile } from './components/Profile';
import { CookingGame } from './components/CookingGame';

type View = 'search' | 'profile';

const App: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [savedRecipes, setSavedRecipes] = useState<Map<string, Recipe>>(new Map());
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<'all' | 'saved'>('all');
  const [currentView, setCurrentView] = useState<View>('search');
  const [viewBeforeDetail, setViewBeforeDetail] = useState<View>('search');
  const [isGameActive, setIsGameActive] = useState<boolean>(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('savedRecipes');
      if (saved) {
        setSavedRecipes(new Map(JSON.parse(saved)));
      }
      const history = localStorage.getItem('searchHistory');
      if(history) {
        setSearchHistory(JSON.parse(history));
      }
    } catch (e) {
      console.error("Failed to parse from localStorage", e);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('savedRecipes', JSON.stringify(Array.from(savedRecipes.entries())));
  }, [savedRecipes]);
  
  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setError('Please enter a search query.');
      return;
    }
    setCurrentView('search');
    setIsLoading(true);
    setError(null);
    setHasSearched(true);
    setRecipes([]);
    setSelectedRecipe(null);
    setActiveFilter('all');
    setIsGameActive(false);

    if (!searchHistory.includes(query)) {
        setSearchHistory(prev => [query, ...prev].slice(0, 5)); // Keep last 5 searches
    }

    try {
      const results = await fetchRecipes(query);
      setRecipes(results);
    } catch (err) {
      setError(err instanceof Error ? `Failed to fetch recipes: ${err.message}` : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [searchHistory]);
  
  const handleHistorySearch = (query: string) => {
    const searchInput = document.querySelector('input[type="search"]');
    if (searchInput) {
        (searchInput as HTMLInputElement).value = query;
    }
    handleSearch(query);
  };

  const clearSearchHistory = () => {
    setSearchHistory([]);
  };

  const toggleSaveRecipe = useCallback((recipeToToggle: Recipe) => {
    setSavedRecipes(prev => {
        const newSaved = new Map(prev);
        if (newSaved.has(recipeToToggle.recipeName)) {
            newSaved.delete(recipeToToggle.recipeName);
        } else {
            newSaved.set(recipeToToggle.recipeName, { ...recipeToToggle, isSaved: true });
        }
        return newSaved;
    });

    if (selectedRecipe && selectedRecipe.recipeName === recipeToToggle.recipeName) {
        setSelectedRecipe(prev => prev ? ({ ...prev, isSaved: !prev.isSaved }) : null);
    }

  }, [selectedRecipe]);

  const handleSelectRecipe = (recipe: Recipe) => {
    setViewBeforeDetail(currentView);
    setSelectedRecipe({ ...recipe, isSaved: savedRecipes.has(recipe.recipeName) });
    setIsGameActive(false);
  };

  const handleBack = useCallback(() => {
    setSelectedRecipe(null);
    setIsGameActive(false);
    setCurrentView(viewBeforeDetail);
  }, [viewBeforeDetail]);

  const handleGoHome = useCallback(() => {
    setSelectedRecipe(null);
    setIsGameActive(false);
    setCurrentView('search');
    setHasSearched(false);
    setRecipes([]);
    setError(null);
  }, []);

  const handleGlobalBack = useCallback(() => {
    if (isGameActive) {
      setIsGameActive(false);
    } else if (selectedRecipe) {
      handleBack();
    } else if (currentView === 'profile') {
      setCurrentView('search');
    } else if (hasSearched) {
      setHasSearched(false);
      setRecipes([]);
    }
  }, [isGameActive, selectedRecipe, currentView, hasSearched, handleBack]);

  const showBack = isGameActive || selectedRecipe !== null || currentView === 'profile' || hasSearched;

  const displayedRecipes = useMemo(() => {
    const allRecipes = activeFilter === 'saved' ? Array.from(savedRecipes.values()) : recipes;
    return allRecipes.map(r => ({...r, isSaved: savedRecipes.has(r.recipeName)}));
  }, [recipes, savedRecipes, activeFilter]);

  const renderContent = () => {
    if (isGameActive && selectedRecipe) {
        return (
            <motion.div key="game" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }}>
                <CookingGame recipe={selectedRecipe} onEndGame={() => setIsGameActive(false)} />
            </motion.div>
        );
    }

    if (selectedRecipe) {
        return (
            <motion.div key="detail" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
                <RecipeDetail 
                    recipe={selectedRecipe} 
                    onBack={handleBack} 
                    onToggleSave={() => toggleSaveRecipe(selectedRecipe)} 
                    onStartGame={() => setIsGameActive(true)}
                />
            </motion.div>
        );
    }

    if (currentView === 'profile') {
        return (
            <motion.div key="profile" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                <Profile 
                    savedRecipes={Array.from(savedRecipes.values())} 
                    onSelectRecipe={handleSelectRecipe}
                    onToggleSave={toggleSaveRecipe}
                    onBack={() => setCurrentView('search')}
                />
            </motion.div>
        );
    }

    // Default to search view
    return (
        <motion.div key="search" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Hero />
            <SearchBar onSearch={handleSearch} isLoading={isLoading} />
            <SearchHistory history={searchHistory} onSearch={handleHistorySearch} onClear={clearSearchHistory} />
            
            {isLoading && <LoadingSpinner />}
            {error && <ErrorDisplay message={error} />}
            
            {!hasSearched && !isLoading && <Welcome />}

            {hasSearched && !isLoading && !error && recipes.length > 0 && (
              <FilterTabs 
                activeFilter={activeFilter} 
                onFilterChange={setActiveFilter} 
                savedCount={savedRecipes.size} 
              />
            )}
            
            {hasSearched && !isLoading && displayedRecipes.length === 0 && !error && (
                <div className="text-center mt-12">
                    <h3 className="text-2xl font-semibold text-gray-700">No Recipes Found</h3>
                    <p className="text-gray-500 mt-2">
                      {activeFilter === 'saved' ? "You haven't saved any recipes yet!" : "Try searching for something else!"}
                    </p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
              {displayedRecipes.map((recipe, index) => (
                <RecipeCard 
                  key={recipe.recipeName} 
                  recipe={recipe} 
                  onSelect={() => handleSelectRecipe(recipe)}
                  onToggleSave={() => toggleSaveRecipe(recipe)}
                  index={index}
                />
              ))}
            </div>
        </motion.div>
    );
  };

  return (
    <div className="min-h-screen font-sans text-gray-800">
      <Header 
        onShowProfile={() => { setSelectedRecipe(null); setIsGameActive(false); setCurrentView('profile'); }} 
        onGoHome={handleGoHome}
        onBack={handleGlobalBack}
        showBack={showBack}
      />
      <main className="container mx-auto p-4 md:p-8">
        <AnimatePresence mode="wait">
            {renderContent()}
        </AnimatePresence>
      </main>
    </div>
  );
};

export default App;