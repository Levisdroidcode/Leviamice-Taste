import React from 'react';
import { Clock, Search, Globe } from 'lucide-react';

// Fix: Changed prop type from JSX.Element to React.ReactNode to resolve "Cannot find namespace 'JSX'" error.
const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex flex-col items-center text-center p-6 bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-3 bg-orange-100 rounded-full mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-semibold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

export const Welcome: React.FC = () => {
    return (
        <div className="mt-12 text-center">
            <h3 className="text-2xl font-semibold text-gray-700 mb-8">What can you search for?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                <FeatureCard 
                    icon={<Clock className="h-6 w-6 text-orange-600" />}
                    title="Quick Meals"
                    description="Find recipes that are ready in under 30 minutes. Perfect for busy weeknights."
                />
                <FeatureCard 
                    icon={<Search className="h-6 w-6 text-orange-600" />}
                    title="By Ingredient"
                    description="Have some chicken and broccoli? See what delicious meals you can create."
                />
                <FeatureCard 
                    icon={<Globe className="h-6 w-6 text-orange-600" />}
                    title="Cuisine Type"
                    description="Craving Italian pasta or a spicy Thai curry? Search by your favorite cuisine."
                />
            </div>
        </div>
    );
};
