import { GoogleGenAI, Type } from "@google/genai";
import type { Recipe } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const generateRecipeImage = async (recipeName: string, description: string): Promise<string> => {
    try {
        const prompt = `Cinematic food photography of ${recipeName}. ${description}. The dish is perfectly styled on a rustic plate, with dramatic lighting, shallow depth of field, and a slightly blurred, elegant background. Hyper-realistic, mouth-watering detail.`;
        
        const response = await ai.models.generateImages({
            model: 'imagen-4.0-generate-001',
            prompt: prompt,
            config: {
              numberOfImages: 1,
              outputMimeType: 'image/jpeg',
              aspectRatio: '4:3',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        }
        throw new Error("No image was generated.");

    } catch (error) {
        console.error(`Error generating image for ${recipeName}:`, error);
        // Fallback to a placeholder to prevent UI from breaking
        return `https://picsum.photos/seed/${encodeURIComponent(recipeName)}/600/400`;
    }
};

export const parseIngredientsFromInstruction = async (instruction: string, allIngredients: string[]): Promise<string[]> => {
    try {
        const prompt = `
        You are an expert at parsing cooking instructions.
        Here is the full list of ingredients for a recipe: ${JSON.stringify(allIngredients)}.
        Here is a single instruction from that recipe: "${instruction}".

        Your task is to identify which ingredients from the full list are mentioned or clearly implied in this single instruction.
        Return your answer as a JSON array of strings. The strings must be exact matches from the provided ingredient list.
        For example, if the instruction is "mix the flour and sugar" and the list contains "1 cup of flour" and "1/2 cup of sugar", you should return ["1 cup of flour", "1/2 cup of sugar"].
        If no ingredients are mentioned, return an empty array.
        `;
        
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            },
        });

        const jsonText = response.text.trim();
        return JSON.parse(jsonText);

    } catch (error) {
        console.error("Error parsing ingredients from instruction:", error);
        // Fallback to empty array in case of error
        return [];
    }
};


const recipeSchema = {
    type: Type.ARRAY,
    items: {
      type: Type.OBJECT,
      properties: {
        recipeName: {
          type: Type.STRING,
          description: 'The full name of the recipe.',
        },
        description: {
          type: Type.STRING,
          description: 'A brief, enticing description of the dish (2-3 sentences).',
        },
        prepTime: {
            type: Type.STRING,
            description: 'The preparation time, e.g., "15 minutes".'
        },
        cookTime: {
            type: Type.STRING,
            description: 'The cooking time, e.g., "30 minutes".'
        },
        servings: {
            type: Type.STRING,
            description: 'How many people the recipe serves, e.g., "4 servings".'
        },
        ingredients: {
          type: Type.ARRAY,
          items: {
            type: Type.STRING,
          },
          description: 'A list of all ingredients with quantities, e.g., "1 cup all-purpose flour".',
        },
        instructions: {
            type: Type.ARRAY,
            items: {
              type: Type.STRING,
            },
            description: 'A list of step-by-step instructions for preparing the dish.',
        },
      },
      required: ["recipeName", "description", "prepTime", "cookTime", "servings", "ingredients", "instructions"],
    },
};

export const fetchRecipes = async (query: string): Promise<Recipe[]> => {
    try {
        const prompt = `You are a master chef. A user is looking for recipes based on the following query: "${query}". Please provide 3 diverse and delicious recipes that match this query. Ensure the recipes are well-structured and easy to follow.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
              responseMimeType: "application/json",
              responseSchema: recipeSchema,
            },
        });

        const jsonText = response.text.trim();
        const recipesData = JSON.parse(jsonText) as Omit<Recipe, 'imageUrl'>[];

        if (!Array.isArray(recipesData)) {
            throw new Error("AI response is not in the expected format.");
        }

        const recipesWithImages = await Promise.all(
            recipesData.map(async (recipe) => {
                const imageUrl = await generateRecipeImage(recipe.recipeName, recipe.description);
                return { ...recipe, imageUrl };
            })
        );

        return recipesWithImages;
        
    } catch (error) {
        console.error("Error fetching recipes from Gemini API:", error);
        throw new Error("Could not fetch recipes. Please check your API key and try again.");
    }
};