import React from 'react';
import { Heart, Menu, X, ChevronDown } from 'lucide-react';

const Header = ({ 
  isMenuOpen, 
  setIsMenuOpen, 
  isServicesOpen, 
  setIsServicesOpen, 
  navigateTo 
}) => (
  <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 px-4 py-3">
    <div className="flex justify-between items-center">
      <div className="flex items-center space-x-2" onClick={() => navigateTo('home')}>
        <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-primary-600 rounded-lg flex items-center justify-center shadow-md">
          <Heart className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-gray-800">NepalCare</h1>
          <p className="text-xs text-gray-500">Healthcare at home</p>
        </div>
      </div>
      <button 
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
        <div className="px-4 py-2 space-y-1">
          {/* Services Dropdown */}
          <div>
            <button
              onClick={() => setIsServicesOpen(!isServicesOpen)}
              className="w-full flex items-center justify-between py-3 text-left font-medium text-gray-700 hover:text-primary-600"
            >
              Services
              <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
            </button>
            {isServicesOpen && (
              <div className="pl-4 space-y-2">
                <button onClick={() => navigateTo('general-care')} className="block py-2 text-sm text-gray-600 hover:text-primary-600">General Medical Care</button>
                <button onClick={() => navigateTo('mental-health')} className="block py-2 text-sm text-gray-600 hover:text-primary-600">Mental Health</button>
                <button onClick={() => navigateTo('emergency')} className="block py-2 text-sm text-gray-600 hover:text-primary-600">Emergency Consultation</button>
                <button onClick={() => navigateTo('specialists')} className="block py-2 text-sm text-gray-600 hover:text-primary-600">Specialist Care</button>
              </div>
            )}
          </div>
          <button onClick={() => navigateTo('how-it-works')} className="block w-full py-3 text-left font-medium text-gray-700 hover:text-primary-600">How It Works</button>
          <button onClick={() => navigateTo('doctors')} className="block w-full py-3 text-left font-medium text-gray-700 hover:text-primary-600">Find Doctors</button>
          <button onClick={() => navigateTo('about')} className="block w-full py-3 text-left font-medium text-gray-700 hover:text-primary-600">About Us</button>
          <div className="pt-2 border-t border-gray-200">
            <button onClick={() => navigateTo('login')} className="block w-full py-2 text-left text-primary-600 font-medium">Sign In</button>
            <button onClick={() => navigateTo('register')} className="block w-full py-2 text-left text-primary-600 font-medium">Sign Up</button>
          </div>
        </div>
      </div>
    )}
  </header>
);

export default Header;