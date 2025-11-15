import React from 'react';
import { FileText, Download, Clock, AlertCircle } from 'lucide-react';

const ReportSection: React.FC = () => {
  const reports = [
    {
      id: 1,
      date: '2025-01-16',
      time: '14:30',
      diagnosis: 'Normal Sinus Rhythm',
      issues: ['None detected'],
      doctorNotes: 'Regular cardiac rhythm observed. Continue current lifestyle.',
      status: 'reviewed'
    },
    {
      id: 2,
      date: '2025-01-15',
      time: '09:15',
      diagnosis: 'Mild Arrhythmia',
      issues: ['Occasional irregular beats', 'Slight heart rate variability'],
      doctorNotes: 'Monitor for 24 hours. Consider reducing caffeine intake.',
      status: 'reviewed'
    },
    {
      id: 3,
      date: '2025-01-15',
      time: '08:45',
      diagnosis: 'Processing...',
      issues: ['Analysis in progress'],
      doctorNotes: 'Pending review',
      status: 'pending'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <FileText className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">ECG Reports</h3>
        </div>
        <span className="text-sm text-gray-600">{reports.length} reports available</span>
      </div>

      <div className="space-y-4">
        {reports.map((report) => (
          <div
            key={report.id}
            className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Clock className="h-4 w-4 mr-1" />
                  {report.date} at {report.time}
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  report.status === 'reviewed' 
                    ? 'bg-green-100 text-green-800'
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status === 'reviewed' ? 'Reviewed' : 'Pending'}
                </span>
              </div>
              {report.status === 'reviewed' && (
                <button className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors text-sm">
                  <Download className="h-4 w-4 mr-1" />
                  Download PDF
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Diagnosis Summary</h4>
                <p className={`text-sm ${
                  report.diagnosis === 'Processing...' ? 'text-yellow-600' : 'text-gray-700'
                }`}>
                  {report.diagnosis}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Detected Issues</h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  {report.issues.map((issue, index) => (
                    <li key={index} className="flex items-start">
                      {issue === 'None detected' ? (
                        <span className="text-green-600">✓ {issue}</span>
                      ) : (
                        <span className="flex items-start">
                          <AlertCircle className="h-3 w-3 text-orange-500 mr-1 mt-0.5 flex-shrink-0" />
                          {issue}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Doctor's Notes</h4>
                <p className={`text-sm ${
                  report.doctorNotes === 'Pending review' ? 'text-yellow-600 italic' : 'text-gray-700'
                }`}>
                  {report.doctorNotes}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReportSection;