import React, { useState } from 'react';
import { Calendar, Clock, Bell, Plus, Check } from 'lucide-react';

interface Reminder {
  id: number;
  type: 'checkup' | 'medication' | 'exercise' | 'test';
  title: string;
  description: string;
  date: string;
  time: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
}

const CheckupReminders: React.FC = () => {
  const [reminders, setReminders] = useState<Reminder[]>([
    {
      id: 1,
      type: 'checkup',
      title: 'Cardiology Follow-up',
      description: 'Scheduled appointment with Dr. Johnson for ECG review',
      date: '2025-01-20',
      time: '10:00 AM',
      completed: false,
      priority: 'high'
    },
    {
      id: 2,
      type: 'medication',
      title: 'Beta-blocker Dose',
      description: 'Take Metoprolol 25mg as prescribed',
      date: '2025-01-17',
      time: '8:00 AM',
      completed: false,
      priority: 'high'
    },
    {
      id: 3,
      type: 'exercise',
      title: 'Cardio Workout',
      description: '30-minute moderate intensity exercise session',
      date: '2025-01-17',
      time: '6:00 PM',
      completed: true,
      priority: 'medium'
    },
    {
      id: 4,
      type: 'test',
      title: 'Blood Work',
      description: 'Lipid panel and cardiac enzymes',
      date: '2025-01-25',
      time: '9:00 AM',
      completed: false,
      priority: 'medium'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);

  const toggleReminder = (id: number) => {
    setReminders(prev => prev.map(reminder => 
      reminder.id === id 
        ? { ...reminder, completed: !reminder.completed }
        : reminder
    ));
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'checkup': return '🏥';
      case 'medication': return '💊';
      case 'exercise': return '🏃';
      case 'test': return '🧪';
      default: return '📋';
    }
  };

  const getTypeColor = (type: string) => {
    const colors = {
      checkup: 'bg-blue-100 text-blue-800 border-blue-200',
      medication: 'bg-red-100 text-red-800 border-red-200',
      exercise: 'bg-green-100 text-green-800 border-green-200',
      test: 'bg-purple-100 text-purple-800 border-purple-200'
    };
    return colors[type as keyof typeof colors] || colors.checkup;
  };

  const getPriorityColor = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-800',
      medium: 'bg-yellow-100 text-yellow-800',
      high: 'bg-red-100 text-red-800'
    };
    return colors[priority as keyof typeof colors] || colors.medium;
  };

  const upcomingReminders = reminders.filter(r => !r.completed && new Date(r.date) >= new Date());
  const completedReminders = reminders.filter(r => r.completed);

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-100 rounded-lg">
            <Calendar className="h-6 w-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Healthcare Schedule</h3>
            <p className="text-sm text-gray-600">{upcomingReminders.length} upcoming reminders</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center px-3 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
        >
          <Plus className="h-4 w-4 mr-1" />
          Add Reminder
        </button>
      </div>

      {showAddForm && (
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Add New Reminder</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Reminder title"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <select className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
              <option value="checkup">Checkup</option>
              <option value="medication">Medication</option>
              <option value="exercise">Exercise</option>
              <option value="test">Test</option>
            </select>
            <input
              type="date"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
            <input
              type="time"
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div className="flex items-center justify-end space-x-2 mt-3">
            <button
              onClick={() => setShowAddForm(false)}
              className="px-3 py-1 text-gray-600 hover:text-gray-800 text-sm"
            >
              Cancel
            </button>
            <button className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm">
              Save
            </button>
          </div>
        </div>
      )}

      <div className="space-y-6">
        {/* Upcoming Reminders */}
        <div>
          <h4 className="font-medium text-gray-900 mb-3 flex items-center">
            <Bell className="h-4 w-4 mr-2 text-orange-500" />
            Upcoming ({upcomingReminders.length})
          </h4>
          <div className="space-y-3">
            {upcomingReminders.map((reminder) => (
              <div key={reminder.id} className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-sm ${getTypeColor(reminder.type)}`}>
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <button
                      onClick={() => toggleReminder(reminder.id)}
                      className="mt-1 w-5 h-5 border-2 border-gray-300 rounded-full hover:border-green-500 transition-colors flex items-center justify-center"
                    >
                      {reminder.completed && <Check className="h-3 w-3 text-green-500" />}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-lg">{getTypeIcon(reminder.type)}</span>
                        <h5 className="font-medium text-gray-900">{reminder.title}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(reminder.priority)}`}>
                          {reminder.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 mb-2">{reminder.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-600">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(reminder.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {reminder.time}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Completed Reminders */}
        {completedReminders.length > 0 && (
          <div>
            <h4 className="font-medium text-gray-900 mb-3 flex items-center">
              <Check className="h-4 w-4 mr-2 text-green-500" />
              Completed ({completedReminders.length})
            </h4>
            <div className="space-y-2">
              {completedReminders.slice(0, 3).map((reminder) => (
                <div key={reminder.id} className="bg-gray-50 border border-gray-200 rounded-lg p-3 opacity-75">
                  <div className="flex items-center space-x-3">
                    <Check className="h-4 w-4 text-green-500" />
                    <span className="text-lg">{getTypeIcon(reminder.type)}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-gray-900 line-through">{reminder.title}</span>
                        <span className="text-xs text-gray-500">{new Date(reminder.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckupReminders;