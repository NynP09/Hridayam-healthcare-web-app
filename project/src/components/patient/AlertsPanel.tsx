import React, { useState, useEffect } from 'react';
import { AlertTriangle, X, Bell } from 'lucide-react';

interface Alert {
  id: number;
  type: 'warning' | 'critical';
  message: string;
  timestamp: string;
  dismissed: boolean;
}

const AlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: 1,
      type: 'warning',
      message: 'Irregular heartbeat detected - monitoring continues',
      timestamp: '2 minutes ago',
      dismissed: false
    }
  ]);

  const dismissAlert = (id: number) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, dismissed: true } : alert
    ));
  };

  // Simulate random alerts
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        const newAlert: Alert = {
          id: Date.now(),
          type: Math.random() > 0.7 ? 'critical' : 'warning',
          message: Math.random() > 0.5 
            ? 'Heart rate spike detected - please remain calm'
            : 'Minor ECG anomaly detected - continuing monitoring',
          timestamp: 'Just now',
          dismissed: false
        };
        setAlerts(prev => [newAlert, ...prev.slice(0, 4)]);
      }
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const activeAlerts = alerts.filter(alert => !alert.dismissed);

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Bell className="h-5 w-5 text-orange-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Instant Alerts</h3>
        </div>
        {activeAlerts.length > 0 && (
          <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">
            {activeAlerts.length} Active
          </span>
        )}
      </div>

      {activeAlerts.length === 0 ? (
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <Bell className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-gray-600">No active alerts</p>
          <p className="text-sm text-gray-500 mt-1">All vitals are within normal ranges</p>
        </div>
      ) : (
        <div className="space-y-3">
          {activeAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 p-4 rounded-r-lg ${
                alert.type === 'critical'
                  ? 'border-red-500 bg-red-50'
                  : 'border-orange-500 bg-orange-50'
              } animate-pulse`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start">
                  <AlertTriangle
                    className={`h-5 w-5 mt-0.5 mr-3 ${
                      alert.type === 'critical' ? 'text-red-600' : 'text-orange-600'
                    }`}
                  />
                  <div>
                    <p className={`font-medium ${
                      alert.type === 'critical' ? 'text-red-900' : 'text-orange-900'
                    }`}>
                      {alert.message}
                    </p>
                    <p className={`text-sm mt-1 ${
                      alert.type === 'critical' ? 'text-red-700' : 'text-orange-700'
                    }`}>
                      {alert.timestamp}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => dismissAlert(alert.id)}
                  className={`p-1 rounded-full transition-colors ${
                    alert.type === 'critical'
                      ? 'hover:bg-red-200 text-red-600'
                      : 'hover:bg-orange-200 text-orange-600'
                  }`}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AlertsPanel;