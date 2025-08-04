import React from 'react';
import { Home, Stethoscope, Calendar, MessageCircle, User } from 'lucide-react';

const BottomNav = ({ currentPage, navigateTo }) => (
  <nav className="sticky bottom-0 bg-white border-t border-gray-200 px-2 py-1">
    <div className="flex justify-around">
      <button 
        onClick={() => navigateTo('home')}
        className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'home' ? 'text-primary-500 bg-primary-50' : 'text-gray-400'}`}
      >
        <Home className="w-5 h-5" />
        <span className="text-xs font-medium">Home</span>
      </button>
      <button 
        onClick={() => navigateTo('doctors')}
        className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'doctors' ? 'text-primary-500 bg-primary-50' : 'text-gray-400'}`}
      >
        <Stethoscope className="w-5 h-5" />
        <span className="text-xs">Doctors</span>
      </button>
      <button 
        onClick={() => navigateTo('appointments')}
        className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'appointments' ? 'text-primary-500 bg-primary-50' : 'text-gray-400'}`}
      >
        <Calendar className="w-5 h-5" />
        <span className="text-xs">Appointments</span>
      </button>
      <button 
        onClick={() => navigateTo('chat')}
        className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'chat' ? 'text-primary-500 bg-primary-50' : 'text-gray-400'}`}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="text-xs">Chat</span>
      </button>
      <button 
        onClick={() => navigateTo('profile')}
        className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'profile' ? 'text-primary-500 bg-primary-50' : 'text-gray-400'}`}
      >
        <User className="w-5 h-5" />
        <span className="text-xs">Profile</span>
      </button>
    </div>
  </nav>
);

export default BottomNav;