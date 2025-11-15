import React from 'react';
import PatientHistory from './PatientHistory';
import ECGViewer from './ECGViewer';
import PrescribeGuidance from './PrescribeGuidance';

const DoctorDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Doctor Dashboard</h1>
          <p className="text-slate-600">Professional ECG analysis and patient management</p>
        </div>
        
        <div className="space-y-6">
          <PatientHistory />
          <ECGViewer />
          <PrescribeGuidance />
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;