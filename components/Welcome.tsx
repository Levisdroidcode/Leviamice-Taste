import React from 'react';

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
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    title="Quick Meals"
                    description="Find recipes that are ready in under 30 minutes. Perfect for busy weeknights."
                />
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                    title="By Ingredient"
                    description="Have some chicken and broccoli? See what delicious meals you can create."
                />
                <FeatureCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h8a2 2 0 002-2v-1a2 2 0 012-2h1.945C21.405 11 22 10.405 22 9.75V9A2.25 2.25 0 0019.75 6.75h-1.5A2.25 2.25 0 0016 9v.75c0 .655.595 1.25 1.25 1.25H19" /></svg>}
                    title="Cuisine Type"
                    description="Craving Italian pasta or a spicy Thai curry? Search by your favorite cuisine."
                />
            </div>
        </div>
    );
};