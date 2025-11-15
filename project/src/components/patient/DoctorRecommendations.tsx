import React, { useState } from 'react';
import { User, Star, Calendar, Clock, MapPin, Phone, Award } from 'lucide-react';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  availability: string;
  location: string;
  consultationFee: number;
  image: string;
  qualifications: string[];
  nextAvailable: string;
}

const DoctorRecommendations: React.FC = () => {
  const [selectedDoctor, setSelectedDoctor] = useState<number | null>(null);

  const doctors: Doctor[] = [
    {
      id: 1,
      name: 'Dr. Rajesh Kumar',
      specialization: 'Cardiologist',
      experience: 15,
      rating: 4.8,
      availability: 'Available Today',
      location: 'Mumbai, Maharashtra',
      consultationFee: 800,
      image: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      qualifications: ['MBBS', 'MD Cardiology', 'DM Interventional Cardiology'],
      nextAvailable: '2:00 PM Today'
    },
    {
      id: 2,
      name: 'Dr. Priya Sharma',
      specialization: 'Cardiac Electrophysiologist',
      experience: 12,
      rating: 4.9,
      availability: 'Available Tomorrow',
      location: 'Pune, Maharashtra',
      consultationFee: 1200,
      image: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      qualifications: ['MBBS', 'MD Internal Medicine', 'DM Cardiology', 'Fellowship EP'],
      nextAvailable: '10:00 AM Tomorrow'
    },
    {
      id: 3,
      name: 'Dr. Amit Patel',
      specialization: 'Interventional Cardiologist',
      experience: 18,
      rating: 4.7,
      availability: 'Available in 2 days',
      location: 'Nashik, Maharashtra',
      consultationFee: 1000,
      image: 'https://images.pexels.com/photos/6749778/pexels-photo-6749778.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      qualifications: ['MBBS', 'MD Cardiology', 'Fellowship Interventional Cardiology'],
      nextAvailable: '11:00 AM, Jan 19'
    }
  ];

  const handleTakeAppointment = (doctorId: number) => {
    setSelectedDoctor(doctorId);
    // Here you would typically open a booking modal or navigate to booking page
    alert(`Booking appointment with ${doctors.find(d => d.id === doctorId)?.name}`);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`h-4 w-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : index < rating 
              ? 'text-yellow-400 fill-current opacity-50'
              : 'text-gray-300'
        }`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <User className="h-5 w-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900">Recommended Doctors</h3>
        </div>
        <span className="text-sm text-gray-600">Based on your ECG report</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {doctors.map((doctor) => (
          <div
            key={doctor.id}
            className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 hover:border-blue-300"
          >
            <div className="flex items-center mb-4">
              <img
                src={doctor.image}
                alt={doctor.name}
                className="w-16 h-16 rounded-full object-cover mr-4"
              />
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-1">{doctor.name}</h4>
                <p className="text-sm text-blue-600 font-medium">{doctor.specialization}</p>
                <div className="flex items-center mt-1">
                  {renderStars(doctor.rating)}
                  <span className="text-sm text-gray-600 ml-1">({doctor.rating})</span>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <Award className="h-4 w-4 mr-2 text-green-600" />
                <span>{doctor.experience} years experience</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <MapPin className="h-4 w-4 mr-2 text-red-500" />
                <span>{doctor.location}</span>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="h-4 w-4 mr-2 text-orange-500" />
                <span>{doctor.nextAvailable}</span>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {doctor.qualifications.slice(0, 2).map((qual, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                  >
                    {qual}
                  </span>
                ))}
                {doctor.qualifications.length > 2 && (
                  <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded-full">
                    +{doctor.qualifications.length - 2} more
                  </span>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-lg font-bold text-gray-900">₹{doctor.consultationFee}</span>
                <span className="text-sm text-gray-600 ml-1">consultation</span>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                doctor.availability.includes('Today') 
                  ? 'bg-green-100 text-green-800'
                  : doctor.availability.includes('Tomorrow')
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
              }`}>
                {doctor.availability}
              </span>
            </div>

            <button
              onClick={() => handleTakeAppointment(doctor.id)}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 text-white py-2 px-4 rounded-lg font-medium hover:from-blue-700 hover:to-teal-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-105"
            >
              <Calendar className="h-4 w-4 inline mr-2" />
              Take Appointment
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 text-center">
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm">
          View All Cardiologists in Your Area →
        </button>
      </div>
    </div>
  );
};

export default DoctorRecommendations;