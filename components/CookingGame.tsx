import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { Recipe } from '../types';
import { parseIngredientsFromInstruction } from '../services/geminiService';
import { LoadingSpinner } from './LoadingSpinner';

interface CookingGameProps {
  recipe: Recipe;
  onEndGame: (won: boolean) => void;
}

const DISTRACTOR_INGREDIENTS = [
    '1 tbsp olive oil', '1 onion, chopped', '2 cloves garlic, minced', '1 tsp salt', '1/2 tsp black pepper', '1 lemon, juiced', '1/4 cup parsley, chopped', '1 lb potatoes', '3 carrots, sliced'
];

const GameModal: React.FC<{ title: string; message: string; onPlayAgain: () => void; onExit: () => void; }> = ({ title, message, onPlayAgain, onExit }) => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in-up">
        <div className="bg-white rounded-lg shadow-xl p-8 text-center max-w-sm">
            <h2 className="text-3xl font-bold text-orange-500 mb-4">{title}</h2>
            <p className="text-gray-700 mb-6">{message}</p>
            <div className="flex justify-center gap-4">
                <button onClick={onPlayAgain} className="px-6 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">Play Again</button>
                <button onClick={onExit} className="px-6 py-2 bg-gray-200 text-gray-800 font-semibold rounded-lg hover:bg-gray-300 transition-colors">Exit</button>
            </div>
        </div>
    </div>
);

// Helper to parse time strings like "15 minutes" into a number of minutes
const parseTimeToMinutes = (timeString: string): number => {
    if (!timeString) return 0;
    const match = timeString.match(/\d+/);
    return match ? parseInt(match[0], 10) : 0;
};

export const CookingGame: React.FC<CookingGameProps> = ({ recipe, onEndGame }) => {
    const [currentStepIndex, setCurrentStepIndex] = useState(0);
    const [requiredIngredients, setRequiredIngredients] = useState<string[]>([]);
    const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
    const [pantryOptions, setPantryOptions] = useState<string[]>([]);
    const [isLoadingStep, setIsLoadingStep] = useState(true);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [incorrectClicks, setIncorrectClicks] = useState<Set<string>>(new Set());

    const initialGameTime = useMemo(() => {
        const prepMinutes = parseTimeToMinutes(recipe.prepTime);
        const cookMinutes = parseTimeToMinutes(recipe.cookTime);
        const totalMinutes = prepMinutes + cookMinutes;
        // Game time in seconds = total recipe time in minutes. Default to 60s if no time is found.
        return totalMinutes > 0 ? totalMinutes : 60;
    }, [recipe.prepTime, recipe.cookTime]);

    const [timeLeft, setTimeLeft] = useState(initialGameTime);

    const resetGame = useCallback(() => {
        setCurrentStepIndex(0);
        setSelectedIngredients(new Set());
        setTimeLeft(initialGameTime);
        setGameState('playing');
        setIsLoadingStep(true);
    }, [initialGameTime]);

    useEffect(() => {
        // Only run the timer when the game is active and not loading a new step.
        if (gameState !== 'playing' || isLoadingStep) {
            return; // Don't start a new timer if loading or not playing.
        }

        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    setGameState('lost');
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        // Cleanup function to clear the interval when the component unmounts
        // or when the dependencies (gameState, isLoadingStep) change.
        return () => clearInterval(timer);
    }, [gameState, isLoadingStep]);

    useEffect(() => {
        const fetchStepData = async () => {
            if (currentStepIndex >= recipe.instructions.length) {
                setGameState('won');
                return;
            }

            setIsLoadingStep(true);
            setSelectedIngredients(new Set());
            const ingredientsForStep = await parseIngredientsFromInstruction(
                recipe.instructions[currentStepIndex],
                recipe.ingredients
            );
            setRequiredIngredients(ingredientsForStep);
            
            // Create pantry options
            const distractors = DISTRACTOR_INGREDIENTS
                .filter(d => !recipe.ingredients.includes(d) && !ingredientsForStep.includes(d))
                .sort(() => 0.5 - Math.random())
                .slice(0, 4);
                
            const options = [...new Set([...ingredientsForStep, ...distractors])].sort(() => 0.5 - Math.random());
            setPantryOptions(options);
            setIsLoadingStep(false);
        };

        fetchStepData();
    }, [currentStepIndex, recipe.instructions, recipe.ingredients]);

    const handleIngredientClick = (ingredient: string) => {
        if (requiredIngredients.includes(ingredient)) {
            setSelectedIngredients(prev => new Set(prev).add(ingredient));
        } else {
            setTimeLeft(prev => Math.max(0, prev - 5)); // 5-second penalty
            setIncorrectClicks(prev => {
                const newSet = new Set(prev);
                newSet.add(ingredient);
                setTimeout(() => {
                    setIncorrectClicks(oldSet => {
                        const updatedSet = new Set(oldSet);
                        updatedSet.delete(ingredient);
                        return updatedSet;
                    });
                }, 500);
                return newSet;
            });
        }
    };
    
    const allRequiredSelected = useMemo(() => {
        return requiredIngredients.length > 0 && requiredIngredients.every(ing => selectedIngredients.has(ing));
    }, [requiredIngredients, selectedIngredients]);

    const progressPercentage = (currentStepIndex / recipe.instructions.length) * 100;

    if (gameState === 'won') {
        return <GameModal title="Congratulations!" message="You completed the recipe perfectly! You're a true chef." onPlayAgain={resetGame} onExit={() => onEndGame(true)} />;
    }
    if (gameState === 'lost') {
        return <GameModal title="Time's Up!" message="You ran out of time. Better luck next time!" onPlayAgain={resetGame} onExit={() => onEndGame(false)} />;
    }

    return (
        <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 animate-fade-in-up">
            <div className="flex justify-between items-center border-b-2 pb-4 mb-4">
                <div>
                    <h2 className="text-2xl font-bold text-gray-800">Cooking Challenge!</h2>
                    <p className="text-gray-600">{recipe.recipeName}</p>
                </div>
                <div className="text-center">
                    <div className="text-sm font-semibold text-gray-500">TIME LEFT</div>
                    <div className="text-3xl font-bold text-orange-500">{`${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`}</div>
                </div>
            </div>

            <div className="text-center text-sm text-gray-500 mb-4 -mt-2">
                Your time is based on the recipe's total cook time (1 minute = 1 second)!
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-200 rounded-full h-4 mb-6">
                <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Instructions Panel */}
                <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
                    <h3 className="text-xl font-bold mb-2 text-gray-800">Step {currentStepIndex + 1} of {recipe.instructions.length}</h3>
                    <p className="text-gray-700 text-lg leading-relaxed">{recipe.instructions[currentStepIndex]}</p>
                </div>

                {/* Ingredients Panel */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-xl font-bold mb-4 text-gray-800">Select Ingredients for this Step:</h3>
                    {isLoadingStep ? <LoadingSpinner /> : (
                        <>
                            <div className="flex flex-wrap gap-3">
                                {pantryOptions.map(ing => {
                                    const isSelected = selectedIngredients.has(ing);
                                    const isRequired = requiredIngredients.includes(ing);
                                    const isIncorrectlyClicked = incorrectClicks.has(ing);

                                    let buttonClass = 'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 border-2 ';
                                    if (isSelected && isRequired) {
                                        buttonClass += 'bg-green-500 border-green-600 text-white';
                                    } else {
                                        buttonClass += 'bg-white border-gray-300 text-gray-700 hover:border-orange-400';
                                    }
                                    if (isIncorrectlyClicked) {
                                        buttonClass += ' animate-shake bg-red-500 border-red-600 text-white';
                                    }

                                    return (
                                        <button key={ing} onClick={() => handleIngredientClick(ing)} className={buttonClass} disabled={isSelected}>
                                            {ing.split(',')[0]}
                                        </button>
                                    );
                                })}
                            </div>
                            <div className="mt-4 text-sm text-gray-500">
                                {requiredIngredients.length > 0 
                                    ? `Required: ${selectedIngredients.size}/${requiredIngredients.length}`
                                    : 'No specific ingredients needed for this step. Just follow the instruction!'
                                }
                            </div>
                        </>
                    )}
                </div>
            </div>
            
            <div className="mt-8 text-center">
                <button 
                    onClick={() => setCurrentStepIndex(i => i + 1)}
                    disabled={isLoadingStep || (requiredIngredients.length > 0 && !allRequiredSelected)}
                    className="w-full lg:w-auto px-10 py-3 bg-orange-500 text-white font-bold rounded-lg hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                >
                    {currentStepIndex === recipe.instructions.length - 1 ? 'Finish Recipe!' : 'Next Step'}
                </button>
            </div>
        </div>
    );
};