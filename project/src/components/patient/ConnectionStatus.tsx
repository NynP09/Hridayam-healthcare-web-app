import React, { useState, useEffect } from 'react';
import { Bluetooth, Wifi, WifiOff, AlertCircle } from 'lucide-react';

const ConnectionStatus: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [deviceName, setDeviceName] = useState('ECG Monitor Pro');

  // Simulate connection status changes
  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.85) {
        setIsConnected(prev => !prev);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleConnect = async () => {
    setIsConnecting(true);
    // Simulate connection process
    setTimeout(() => {
      setIsConnected(true);
      setIsConnecting(false);
    }, 2000);
  };

  const handleDisconnect = () => {
    setIsConnected(false);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-2 rounded-full ${
            isConnected 
              ? 'bg-green-100' 
              : isConnecting 
                ? 'bg-yellow-100' 
                : 'bg-red-100'
          }`}>
            {isConnecting ? (
              <Bluetooth className="h-5 w-5 text-yellow-600 animate-pulse" />
            ) : isConnected ? (
              <Wifi className="h-5 w-5 text-green-600" />
            ) : (
              <WifiOff className="h-5 w-5 text-red-600" />
            )}
          </div>
          
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="font-semibold text-gray-900">ECG Device Status</h3>
              <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                isConnected 
                  ? 'bg-green-100 text-green-800' 
                  : isConnecting 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-red-100 text-red-800'
              }`}>
                <div className={`w-2 h-2 rounded-full mr-1 ${
                  isConnected 
                    ? 'bg-green-500 animate-pulse' 
                    : isConnecting 
                      ? 'bg-yellow-500 animate-pulse'
                      : 'bg-red-500'
                }`} />
                {isConnecting ? 'Connecting...' : isConnected ? 'Connected' : 'Disconnected'}
              </div>
            </div>
            <p className="text-sm text-gray-600">
              {isConnected 
                ? `${deviceName} - Signal strength: Strong` 
                : isConnecting 
                  ? 'Establishing connection...'
                  : 'No device connected'
              }
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {!isConnected && !isConnecting && (
            <div className="flex items-center text-orange-600 bg-orange-50 px-3 py-1 rounded-md">
              <AlertCircle className="h-4 w-4 mr-1" />
              <span className="text-sm font-medium">Action Required</span>
            </div>
          )}
          
          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className="px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200 transition-colors text-sm font-medium"
            >
              Disconnect
            </button>
          ) : (
            <button
              onClick={handleConnect}
              disabled={isConnecting}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
            >
              {isConnecting ? 'Connecting...' : 'Connect Device'}
            </button>
          )}
        </div>
      </div>

      {!isConnected && !isConnecting && (
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
          <div className="flex items-start">
            <Bluetooth className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Connection Instructions</h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• Ensure your ECG device is powered on</li>
                <li>• Enable Bluetooth on your device</li>
                <li>• Place the ECG device within 3 feet of your computer</li>
                <li>• Click "Connect Device" to establish connection</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ConnectionStatus;