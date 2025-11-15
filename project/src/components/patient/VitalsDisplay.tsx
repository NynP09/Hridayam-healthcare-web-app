import React from 'react';
import { Heart, Activity, BarChart3 } from 'lucide-react';

interface Vital {
  label: string;
  value: string;
  unit: string;
  icon: React.ComponentType<{ className?: string }>;
  status: 'normal' | 'warning' | 'critical';
  change: string;
}

const VitalsDisplay: React.FC = () => {
  const vitals: Vital[] = [
    {
      label: 'Heart Rate',
      value: '72',
      unit: 'BPM',
      icon: Heart,
      status: 'normal',
      change: '+2 from last reading'
    },
    {
      label: 'HRV',
      value: '45',
      unit: 'ms',
      icon: Activity,
      status: 'normal',
      change: 'Within normal range'
    },
    {
      label: 'Rhythm Classification',
      value: 'Normal Sinus',
      unit: 'Rhythm',
      icon: BarChart3,
      status: 'normal',
      change: 'Regular pattern'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'text-green-600 bg-green-50 border-green-200';
      case 'warning': return 'text-orange-600 bg-orange-50 border-orange-200';
      case 'critical': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Current Vitals</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vitals.map((vital, index) => {
          const Icon = vital.icon;
          return (
            <div
              key={index}
              className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${getStatusColor(vital.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Icon className="h-6 w-6" />
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  vital.status === 'normal' ? 'bg-green-100 text-green-800' :
                  vital.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {vital.status.toUpperCase()}
                </span>
              </div>
              <div className="mb-2">
                <div className="flex items-baseline">
                  <span className="text-2xl font-bold text-gray-900">{vital.value}</span>
                  <span className="text-sm text-gray-600 ml-1">{vital.unit}</span>
                </div>
                <p className="text-sm font-medium text-gray-700 mt-1">{vital.label}</p>
              </div>
              <p className="text-xs text-gray-600">{vital.change}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VitalsDisplay;