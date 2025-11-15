import React, { useState } from 'react';
import LoginPage from './components/auth/LoginPage';
import Navigation from './components/Navigation';
import PatientDashboard from './components/patient/PatientDashboard';
import DoctorDashboard from './components/doctor/DoctorDashboard';
import LifestyleGuidance from './components/lifestyle/LifestyleGuidance';
import UserProfile from './components/profile/UserProfile';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('patient');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setActiveTab('patient');
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'patient':
        return <PatientDashboard />;
      case 'doctor':
        return <DoctorDashboard />;
      case 'lifestyle':
        return <LifestyleGuidance />;
      case 'profile':
        return <UserProfile />;
      default:
        return <PatientDashboard />;
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} onLogout={handleLogout} />
      {renderActiveTab()}
    </div>
  );
}

export default App;