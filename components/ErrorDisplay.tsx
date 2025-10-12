
import React from 'react';

interface ErrorDisplayProps {
  message: string;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ message }) => {
  return (
    <div className="max-w-2xl mx-auto my-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg" role="alert">
      <p className="font-bold">Oops! Something went wrong.</p>
      <p>{message}</p>
    </div>
  );
};
