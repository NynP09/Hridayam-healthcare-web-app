import React from 'react';
import ConnectionStatus from './ConnectionStatus';
import LiveECGGraph from './LiveECGGraph';
import VitalsDisplay from './VitalsDisplay';
import AlertsPanel from './AlertsPanel';
import ReportSection from './ReportSection';
import DoctorRecommendations from './DoctorRecommendations';

const PatientDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-teal-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Patient Dashboard</h1>
          <p className="text-gray-600">Real-time ECG monitoring and health insights</p>
        </div>
        
        <ConnectionStatus />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mb-6">
          <div className="xl:col-span-2">
            <LiveECGGraph />
          </div>
          <div>
            <AlertsPanel />
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-6 mb-6">
          <VitalsDisplay />
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <ReportSection />
          <DoctorRecommendations />
        </div>
      </div>
    </div>
  );
};

export default PatientDashboard;