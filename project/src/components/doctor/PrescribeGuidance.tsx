import React, { useState } from 'react';
import { Send, FileText, Clock, User } from 'lucide-react';

interface Recommendation {
  id: number;
  patientId: string;
  patientName: string;
  type: 'medication' | 'lifestyle' | 'follow-up' | 'test';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  status: 'draft' | 'sent' | 'acknowledged';
  date: string;
}

const PrescribeGuidance: React.FC = () => {
  const [selectedPatient, setSelectedPatient] = useState('P002');
  const [recommendationType, setRecommendationType] = useState('medication');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');

  const [recommendations, setRecommendations] = useState<Recommendation[]>([
    {
      id: 1,
      patientId: 'P002',
      patientName: 'Sarah Johnson',
      type: 'medication',
      title: 'Beta-blocker therapy',
      description: 'Start low-dose beta-blocker (Metoprolol 25mg twice daily) to control irregular heartbeat.',
      priority: 'high',
      status: 'sent',
      date: '2025-01-15'
    },
    {
      id: 2,
      patientId: 'P002',
      patientName: 'Sarah Johnson',
      type: 'lifestyle',
      title: 'Caffeine reduction',
      description: 'Reduce caffeine intake to less than 200mg per day. Monitor symptoms for improvement.',
      priority: 'medium',
      status: 'acknowledged',
      date: '2025-01-14'
    }
  ]);

  const patients = [
    { id: 'P001', name: 'John Smith' },
    { id: 'P002', name: 'Sarah Johnson' },
    { id: 'P003', name: 'Michael Brown' },
    { id: 'P004', name: 'Emily Davis' },
    { id: 'P005', name: 'Robert Wilson' }
  ];

  const handleSubmitRecommendation = () => {
    if (!title.trim() || !description.trim()) return;

    const patient = patients.find(p => p.id === selectedPatient);
    if (!patient) return;

    const newRecommendation: Recommendation = {
      id: Date.now(),
      patientId: selectedPatient,
      patientName: patient.name,
      type: recommendationType as 'medication' | 'lifestyle' | 'follow-up' | 'test',
      title,
      description,
      priority,
      status: 'sent',
      date: new Date().toISOString().split('T')[0]
    };

    setRecommendations(prev => [newRecommendation, ...prev]);
    setTitle('');
    setDescription('');
  };

  const getTypeColor = (type: string) => {
    const colors = {
      medication: 'bg-blue-100 text-blue-800',
      lifestyle: 'bg-green-100 text-green-800',
      'follow-up': 'bg-purple-100 text-purple-800',
      test: 'bg-orange-100 text-orange-800'
    };
    return colors[type as keyof typeof colors] || colors.medication;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const getStatusColor = (status: string) => {
    const colors = {
      draft: 'bg-gray-100 text-gray-800',
      sent: 'bg-blue-100 text-blue-800',
      acknowledged: 'bg-green-100 text-green-800'
    };
    return colors[status as keyof typeof colors] || colors.draft;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Create New Recommendation */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Prescribe Digital Guidance</h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Patient
            </label>
            <select
              value={selectedPatient}
              onChange={(e) => setSelectedPatient(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              {patients.map(patient => (
                <option key={patient.id} value={patient.id}>
                  {patient.name} ({patient.id})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recommendation Type
            </label>
            <select
              value={recommendationType}
              onChange={(e) => setRecommendationType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="medication">Medication</option>
              <option value="lifestyle">Lifestyle Change</option>
              <option value="follow-up">Follow-up Appointment</option>
              <option value="test">Additional Testing</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Brief title for the recommendation"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description & Instructions
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed instructions and guidance for the patient"
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority Level
            </label>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>

          <button
            onClick={handleSubmitRecommendation}
            disabled={!title.trim() || !description.trim()}
            className="w-full flex items-center justify-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
          >
            <Send className="h-4 w-4 mr-2" />
            Send Recommendation
          </button>
        </div>
      </div>

      {/* Recent Recommendations */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Recent Recommendations</h3>
        
        <div className="space-y-4 max-h-96 overflow-y-auto">
          {recommendations.map((rec) => (
            <div key={rec.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-900">{rec.patientName}</span>
                  <span className="text-xs text-gray-500">({rec.patientId})</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 text-gray-400" />
                  <span className="text-xs text-gray-500">{rec.date}</span>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center space-x-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(rec.type)}`}>
                    {rec.type.charAt(0).toUpperCase() + rec.type.slice(1).replace('-', ' ')}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                    {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(rec.status)}`}>
                    {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                  </span>
                </div>
                <h4 className="font-medium text-gray-900 mb-1">{rec.title}</h4>
                <p className="text-sm text-gray-700 line-clamp-2">{rec.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PrescribeGuidance;