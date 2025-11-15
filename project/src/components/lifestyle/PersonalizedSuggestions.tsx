import React from 'react';
import { Apple, Dumbbell, Moon, Calendar, TrendingUp } from 'lucide-react';

interface Suggestion {
  category: 'diet' | 'exercise' | 'sleep';
  title: string;
  description: string;
  tips: string[];
  progress: number;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
}

const PersonalizedSuggestions: React.FC = () => {
  const suggestions: Suggestion[] = [
    {
      category: 'diet',
      title: 'Heart-Healthy Nutrition Plan',
      description: 'Based on your ECG results, we recommend focusing on cardiovascular health through nutrition.',
      tips: [
        'Increase omega-3 fatty acids (salmon, walnuts, flaxseed)',
        'Reduce sodium intake to less than 2,300mg per day',
        'Include potassium-rich foods (bananas, spinach, avocados)',
        'Limit processed foods and trans fats',
        'Consider adding dark leafy greens and berries'
      ],
      progress: 67,
      icon: Apple,
      color: 'emerald'
    },
    {
      category: 'exercise',
      title: 'Cardiovascular Exercise Program',
      description: 'Customized workout plan to strengthen your heart and improve rhythm regulation.',
      tips: [
        'Start with 15-20 minutes of brisk walking daily',
        'Gradually increase to 30 minutes of moderate exercise',
        'Include 2-3 strength training sessions per week',
        'Try swimming or cycling for low-impact cardio',
        'Monitor heart rate during exercise (target: 120-150 BPM)'
      ],
      progress: 43,
      icon: Dumbbell,
      color: 'blue'
    },
    {
      category: 'sleep',
      title: 'Sleep Quality Enhancement',
      description: 'Optimize your sleep patterns to support heart health and reduce arrhythmia risk.',
      tips: [
        'Maintain consistent sleep schedule (7-9 hours nightly)',
        'Create a relaxing bedtime routine',
        'Keep bedroom temperature between 60-67°F',
        'Limit screen time 1 hour before bed',
        'Consider meditation or deep breathing exercises'
      ],
      progress: 78,
      icon: Moon,
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      emerald: {
        bg: 'bg-emerald-50',
        border: 'border-emerald-200',
        text: 'text-emerald-800',
        icon: 'text-emerald-600',
        progress: 'bg-emerald-500'
      },
      blue: {
        bg: 'bg-blue-50',
        border: 'border-blue-200',
        text: 'text-blue-800',
        icon: 'text-blue-600',
        progress: 'bg-blue-500'
      },
      purple: {
        bg: 'bg-purple-50',
        border: 'border-purple-200',
        text: 'text-purple-800',
        icon: 'text-purple-600',
        progress: 'bg-purple-500'
      }
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      {suggestions.map((suggestion, index) => {
        const Icon = suggestion.icon;
        const colors = getColorClasses(suggestion.color);
        
        return (
          <div key={index} className={`border rounded-xl p-6 transition-all duration-200 hover:shadow-lg ${colors.bg} ${colors.border}`}>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg bg-white shadow-sm`}>
                  <Icon className={`h-6 w-6 ${colors.icon}`} />
                </div>
                <h3 className={`font-semibold ${colors.text}`}>{suggestion.title}</h3>
              </div>
              <div className="flex items-center space-x-1">
                <TrendingUp className={`h-4 w-4 ${colors.icon}`} />
                <span className={`text-sm font-medium ${colors.text}`}>{suggestion.progress}%</span>
              </div>
            </div>
            
            <p className={`text-sm mb-4 ${colors.text} opacity-80`}>
              {suggestion.description}
            </p>
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <span className={`text-xs font-medium ${colors.text}`}>Progress</span>
                <span className={`text-xs ${colors.text}`}>{suggestion.progress}%</span>
              </div>
              <div className="w-full bg-white rounded-full h-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-500 ${colors.progress}`}
                  style={{ width: `${suggestion.progress}%` }}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <h4 className={`text-sm font-medium ${colors.text} mb-3`}>Recommendations:</h4>
              <ul className="space-y-2">
                {suggestion.tips.slice(0, 3).map((tip, tipIndex) => (
                  <li key={tipIndex} className={`text-xs ${colors.text} opacity-75 flex items-start`}>
                    <span className="mr-2">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
              {suggestion.tips.length > 3 && (
                <button className={`text-xs font-medium mt-2 hover:underline ${colors.text}`}>
                  View all {suggestion.tips.length} recommendations →
                </button>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PersonalizedSuggestions;