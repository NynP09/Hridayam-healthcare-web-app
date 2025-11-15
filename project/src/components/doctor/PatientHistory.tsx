import React, { useState } from 'react';
import { Search, Filter, Download, Eye, Calendar } from 'lucide-react';

interface PatientRecord {
  id: string;
  patientName: string;
  age: number;
  gender: string;
  lastECG: string;
  diagnosis: string;
  status: 'normal' | 'abnormal' | 'critical';
  reports: number;
}

const PatientHistory: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const patients: PatientRecord[] = [
    {
      id: 'P001',
      patientName: 'John Smith',
      age: 45,
      gender: 'Male',
      lastECG: '2025-01-16',
      diagnosis: 'Normal Sinus Rhythm',
      status: 'normal',
      reports: 5
    },
    {
      id: 'P002',
      patientName: 'Sarah Johnson',
      age: 38,
      gender: 'Female',
      lastECG: '2025-01-15',
      diagnosis: 'Mild Arrhythmia',
      status: 'abnormal',
      reports: 8
    },
    {
      id: 'P003',
      patientName: 'Michael Brown',
      age: 62,
      gender: 'Male',
      lastECG: '2025-01-15',
      diagnosis: 'Atrial Fibrillation',
      status: 'critical',
      reports: 12
    },
    {
      id: 'P004',
      patientName: 'Emily Davis',
      age: 29,
      gender: 'Female',
      lastECG: '2025-01-14',
      diagnosis: 'Normal Sinus Rhythm',
      status: 'normal',
      reports: 3
    },
    {
      id: 'P005',
      patientName: 'Robert Wilson',
      age: 55,
      gender: 'Male',
      lastECG: '2025-01-13',
      diagnosis: 'PVC Episodes',
      status: 'abnormal',
      reports: 7
    }
  ];

  const getStatusBadge = (status: string) => {
    const colors = {
      normal: 'bg-green-100 text-green-800',
      abnormal: 'bg-yellow-100 text-yellow-800',
      critical: 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || colors.normal;
  };

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || patient.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
          <h3 className="text-lg font-semibold text-gray-900">Patient ECG History</h3>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 pr-4 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="normal">Normal</option>
              <option value="abnormal">Abnormal</option>
              <option value="critical">Critical</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Patient
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Demographics
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Last ECG
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Diagnosis
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reports
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredPatients.map((patient) => (
              <tr key={patient.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{patient.patientName}</div>
                    <div className="text-sm text-gray-500">ID: {patient.id}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.age} yr, {patient.gender}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center text-sm text-gray-900">
                    <Calendar className="h-4 w-4 mr-1 text-gray-400" />
                    {patient.lastECG}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.diagnosis}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadge(patient.status)}`}>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {patient.reports} reports
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                  <button className="text-blue-600 hover:text-blue-900 inline-flex items-center">
                    <Eye className="h-4 w-4 mr-1" />
                    View
                  </button>
                  <button className="text-green-600 hover:text-green-900 inline-flex items-center">
                    <Download className="h-4 w-4 mr-1" />
                    Download
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {filteredPatients.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No patients found matching your criteria</p>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;