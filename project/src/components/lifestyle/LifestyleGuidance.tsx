import React from 'react';
import PersonalizedSuggestions from './PersonalizedSuggestions';
import CheckupReminders from './CheckupReminders';

const LifestyleGuidance: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Lifestyle & Wellness Guidance</h1>
          <p className="text-gray-600">Personalized recommendations for optimal heart health</p>
        </div>
        
        <PersonalizedSuggestions />
        <CheckupReminders />
      </div>
    </div>
  );
};

export default LifestyleGuidance;