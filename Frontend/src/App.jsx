import React, { useState } from 'react';
import { Heart, Phone, Clock, MapPin, Star, ArrowRight, Shield, Users, Menu, Stethoscope, Calendar, MessageCircle, Home, User, ChevronDown, X, Search, Filter, Video, FileText, CreditCard } from 'lucide-react';
import { Link } from 'react-router';

// Mock routing state
function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  // Navigation function
  const navigateTo = (page) => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  // Header Component
  const Header = () => (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="flex justify-between items-center h-16 lg:h-20">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Heart className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl lg:text-2xl font-bold text-gray-800">NepalCare</h1>
              <p className="text-xs lg:text-sm text-gray-500">Healthcare at home</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center space-x-1 font-medium text-gray-700 hover:text-blue-600 transition-colors">
                <span>Services</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="p-2">
                  <button onClick={() => navigateTo('general-care')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">General Medical Care</button>
                  <button onClick={() => navigateTo('mental-health')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Mental Health</button>
                  <button onClick={() => navigateTo('emergency')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Emergency Consultation</button>
                  <button onClick={() => navigateTo('specialists')} className="w-full text-left px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 rounded-lg">Specialist Care</button>
                </div>
              </div>
            </div>
            <button onClick={() => navigateTo('how-it-works')} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">How It Works</button>
            <button onClick={() => navigateTo('doctors')} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">Find Doctors</button>
            <button onClick={() => navigateTo('about')} className="font-medium text-gray-700 hover:text-blue-600 transition-colors">About Us</button>
            <div className="flex items-center space-x-4 ml-8">
                <Link to="/register">
              <button onClick={() => navigateTo('login')} className="text-blue-600 hover:text-blue-700 font-medium">Sign In</button>
              </Link>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors">Sign Up</button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 shadow-lg">
            <div className="container mx-auto px-4 py-4 space-y-2">
              <div>
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="w-full flex items-center justify-between py-3 text-left font-medium text-gray-700 hover:text-blue-600"
                >
                  Services
                  <ChevronDown className={`w-4 h-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {isServicesOpen && (
                  <div className="pl-4 space-y-2">
                    <button onClick={() => navigateTo('general-care')} className="block py-2 text-sm text-gray-600 hover:text-blue-600">General Medical Care</button>
                    <button onClick={() => navigateTo('mental-health')} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Mental Health</button>
                    <button onClick={() => navigateTo('emergency')} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Emergency Consultation</button>
                    <button onClick={() => navigateTo('specialists')} className="block py-2 text-sm text-gray-600 hover:text-blue-600">Specialist Care</button>
                  </div>
                )}
              </div>
              <button onClick={() => navigateTo('how-it-works')} className="block w-full py-3 text-left font-medium text-gray-700 hover:text-blue-600">How It Works</button>
              <button onClick={() => navigateTo('doctors')} className="block w-full py-3 text-left font-medium text-gray-700 hover:text-blue-600">Find Doctors</button>
              <button onClick={() => navigateTo('about')} className="block w-full py-3 text-left font-medium text-gray-700 hover:text-blue-600">About Us</button>
              <div className="pt-4 border-t border-gray-200">
                <button onClick={() => navigateTo('login')} className="block w-full py-2 text-left text-blue-600 font-medium">Sign In</button>
                <button onClick={() => navigateTo('register')} className="block w-full py-2 text-left text-blue-600 font-medium">Sign Up</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // Bottom Navigation (Mobile Only)
  const BottomNav = () => (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-2 z-40">
      <div className="flex justify-around max-w-sm mx-auto">
        <button
          onClick={() => navigateTo('home')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'home' ? 'text-blue-500 bg-blue-50' : 'text-gray-400'}`}
        >
          <Home className="w-5 h-5" />
          <span className="text-xs font-medium">Home</span>
        </button>
        <button
          onClick={() => navigateTo('doctors')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'doctors' ? 'text-blue-500 bg-blue-50' : 'text-gray-400'}`}
        >
          <Stethoscope className="w-5 h-5" />
          <span className="text-xs">Doctors</span>
        </button>
        <button
          onClick={() => navigateTo('appointments')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'appointments' ? 'text-blue-500 bg-blue-50' : 'text-gray-400'}`}
        >
          <Calendar className="w-5 h-5" />
          <span className="text-xs">Appointments</span>
        </button>
        <button
          onClick={() => navigateTo('chat')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'chat' ? 'text-blue-500 bg-blue-50' : 'text-gray-400'}`}
        >
          <MessageCircle className="w-5 h-5" />
          <span className="text-xs">Chat</span>
        </button>
        <button
          onClick={() => navigateTo('profile')}
          className={`flex flex-col items-center space-y-1 py-2 px-3 rounded-lg ${currentPage === 'profile' ? 'text-blue-500 bg-blue-50' : 'text-gray-400'}`}
        >
          <User className="w-5 h-5" />
          <span className="text-xs">Profile</span>
        </button>
      </div>
    </nav>
  );

  // Page Components
  const HomePage = () => (
    <div className="pb-20 lg:pb-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:items-center lg:min-h-[500px]">
            <div className="py-8 lg:py-16 text-center lg:text-left">
              <h2 className="text-2xl lg:text-4xl xl:text-5xl font-bold text-gray-800 mb-4 lg:mb-6">
                Doctor जहाँ पनि,
                <br />
                <span className="text-blue-500">जहिले पनि</span>
              </h2>
              <p className="text-gray-600 text-sm lg:text-lg leading-relaxed mb-6 lg:mb-8 lg:max-w-xl">
                Connect with qualified doctors across Nepal. Get instant consultations, prescriptions, and emergency care.
              </p>

              {/* Emergency Button */}
              <button
                onClick={() => navigateTo('emergency')}
                className="w-full lg:w-auto mb-6 lg:mb-8 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-bold py-4 lg:py-3 px-6 lg:px-8 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2"
              >
                <Phone className="w-5 h-5" />
                <span>Emergency Consultation</span>
              </button>

              {/* Quick Actions */}
              <div className="grid grid-cols-2 gap-3 lg:flex lg:space-x-4">
                <button
                  onClick={() => navigateTo('doctors')}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 lg:py-3 px-4 lg:px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2"
                >
                  <Stethoscope className="w-6 h-6 lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">Find Doctor</span>
                </button>
                <button
                  onClick={() => navigateTo('appointments')}
                  className="bg-white hover:bg-gray-50 text-blue-600 border border-blue-200 font-medium py-4 lg:py-3 px-4 lg:px-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex flex-col lg:flex-row items-center space-y-2 lg:space-y-0 lg:space-x-2"
                >
                  <Calendar className="w-6 h-6 lg:w-5 lg:h-5" />
                  <span className="text-sm lg:text-base">My Appointments</span>
                </button>
              </div>
            </div>

            {/* Hero Image/Illustration Placeholder */}
            <div className="hidden lg:block">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Stethoscope className="w-6 h-6 text-blue-600" />
                    </div>
                    <div>
                      <div className="h-4 bg-gray-200 rounded w-32 mb-2"></div>
                      <div className="h-3 bg-gray-100 rounded w-24"></div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-3 bg-gray-100 rounded"></div>
                    <div className="h-3 bg-gray-100 rounded w-4/5"></div>
                    <div className="h-3 bg-gray-100 rounded w-3/5"></div>
                  </div>
                  <div className="flex space-x-3">
                    <div className="flex-1 h-10 bg-blue-100 rounded-lg"></div>
                    <div className="w-20 h-10 bg-gray-100 rounded-lg"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-8 lg:py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-3 lg:grid-cols-3 gap-8 text-center max-w-3xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-blue-500">500+</div>
              <div className="text-sm lg:text-base text-gray-600">Doctors</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-blue-500">24/7</div>
              <div className="text-sm lg:text-base text-gray-600">Available</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold text-blue-500">10K+</div>
              <div className="text-sm lg:text-base text-gray-600">Patients</div>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-8 lg:py-16 bg-gray-50">
        <div className="container mx-auto px-4 lg:px-6">
          <h3 className="text-xl lg:text-3xl font-bold text-gray-800 mb-6 lg:mb-10 text-center lg:text-left">Our Services</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            <button
              onClick={() => navigateTo('general-care')}
              className="bg-white p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group hover:-translate-y-1"
            >
              <Stethoscope className="w-10 h-10 lg:w-12 lg:h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-800 text-sm lg:text-base mb-2">General Care</h4>
              <p className="text-xs lg:text-sm text-gray-600">Common illnesses & checkups</p>
            </button>
            <button
              onClick={() => navigateTo('mental-health')}
              className="bg-white p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group hover:-translate-y-1"
            >
              <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-800 text-sm lg:text-base mb-2">Mental Health</h4>
              <p className="text-xs lg:text-sm text-gray-600">Therapy & counseling</p>
            </button>
            <button
              onClick={() => navigateTo('specialists')}
              className="bg-white p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group hover:-translate-y-1"
            >
              <Users className="w-10 h-10 lg:w-12 lg:h-12 text-blue-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-800 text-sm lg:text-base mb-2">Specialists</h4>
              <p className="text-xs lg:text-sm text-gray-600">Expert medical opinions</p>
            </button>
            <button
              onClick={() => navigateTo('emergency')}
              className="bg-white p-6 lg:p-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 text-left group hover:-translate-y-1"
            >
              <Phone className="w-10 h-10 lg:w-12 lg:h-12 text-red-500 mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="font-semibold text-gray-800 text-sm lg:text-base mb-2">Emergency</h4>
              <p className="text-xs lg:text-sm text-gray-600">Urgent medical care</p>
            </button>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-8 lg:py-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
        <div className="container mx-auto px-4 lg:px-6">
          <div className="text-center lg:max-w-2xl lg:mx-auto">
            <h3 className="text-xl lg:text-3xl font-bold mb-3 lg:mb-4">Get Started Today</h3>
            <p className="text-blue-100 text-sm lg:text-lg mb-6 lg:mb-8">Join thousands getting better healthcare</p>
            <div className="space-y-3 lg:flex lg:space-y-0 lg:space-x-4 lg:justify-center">
              <button
                onClick={() => navigateTo('register')}
                className="w-full lg:w-auto bg-white text-blue-600 font-bold py-4 lg:py-3 px-8 lg:px-10 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200"
              >
                Register as Patient
              </button>
              <button
                onClick={() => navigateTo('doctor-register')}
                className="w-full lg:w-auto border-2 border-white text-white font-bold py-4 lg:py-3 px-8 lg:px-10 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200"
              >
                Join as Doctor
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );

  const DoctorsPage = () => (
    <div className="pb-20 lg:pb-8">
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        {/* Search Header */}
        <div className="mb-6 lg:mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 mb-4 lg:mb-6">
            <div>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-800 mb-2">Find Doctors</h2>
              <p className="text-gray-600">Connect with qualified healthcare professionals</p>
            </div>
            <div className="flex space-x-3 lg:w-96">
              <div className="flex-1 relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search doctors, specialties..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <button className="p-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Filter Tags */}
          <div className="flex space-x-3 overflow-x-auto pb-2">
            <button className="px-4 py-2 bg-blue-500 text-white text-sm font-medium rounded-full whitespace-nowrap">All</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Available Now</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">General</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Cardiology</button>
            <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium rounded-full whitespace-nowrap transition-colors">Pediatrics</button>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
          {/* Doctor Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 lg:w-20 lg:h-20 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg lg:text-xl flex-shrink-0">
                DR
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Dr. Rajesh Sharma</h3>
                    <p className="text-gray-600 mb-2">General Medicine</p>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="w-3 h-3 bg-green-500 rounded-full mb-1"></div>
                    <p className="text-xs text-green-600 font-medium">Available</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1 mb-4">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Lalitpur</span>
                </div>
                <div className="flex space-x-2">
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium transition-colors">Book Now</button>
                  <button className="px-4 py-2 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg text-sm font-medium transition-colors">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AppointmentsPage = () => (
    <div className="pb-20 lg:pb-8">
      <div className="container mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="flex items-center justify-between mb-6 lg:mb-8">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">My Appointments</h2>
          <button
            onClick={() => navigateTo('doctors')}
            className="hidden lg:flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
          >
            <Calendar className="w-4 h-4" />
            <span>Book New</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 mb-6 bg-gray-100 rounded-xl p-1 max-w-sm lg:max-w-md mx-auto lg:mx-0">
          <button className="flex-1 py-3 text-sm font-medium bg-white text-blue-600 rounded-lg shadow-sm transition-colors">Upcoming</button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Past</button>
          <button className="flex-1 py-3 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors">Cancelled</button>
        </div>

        {/* Appointment Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Dr. Rajesh Sharma</h3>
                <p className="text-gray-600">General Consultation</p>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">Confirmed</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Today, 2:30 PM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Video Call</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3">
              <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">Join Call</button>
              <button className="lg:w-32 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors">Reschedule</button>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-l-yellow-500">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">Dr. Sunita Thapa</h3>
                <p className="text-gray-600">Follow-up Consultation</p>
              </div>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full">Pending</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center lg:space-x-6 space-y-2 lg:space-y-0 text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-4 h-4" />
                <span>Phone Call</span>
              </div>
            </div>
            <div className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-3">
              <button className="flex-1 bg-gray-300 text-gray-500 py-3 rounded-lg font-medium cursor-not-allowed" disabled>Waiting Confirmation</button>
              <button className="lg:w-32 py-3 border border-gray-300 hover:bg-gray-50 text-gray-700 rounded-lg font-medium transition-colors">Cancel</button>
            </div>
          </div>
        </div>

        {/* Book New Appointment - Mobile */}
        <button
          onClick={() => navigateTo('doctors')}
          className="lg:hidden w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2 transition-all duration-200"
        >
          <Calendar className="w-5 h-5" />
          <span>Book New Appointment</span>
        </button>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="pb-20 lg:pb-8 min-h-screen flex items-center justify-center">
      <div className="container mx-auto px-4 lg:px-6">
        <div className="max-w-md mx-auto lg:max-w-lg">
          <div className="text-center mb-8 lg:mb-10">
            <div className="w-20 h-20 lg:w-24 lg:h-24 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
              <Heart className="w-10 h-10 lg:w-12 lg:h-12 text-white" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-3">Welcome Back</h2>
            <p className="text-gray-600 lg:text-lg">Sign in to access your healthcare</p>
          </div>

          <div className="bg-white p-6 lg:p-8 rounded-2xl shadow-xl space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Email or Phone</label>
              <input
                type="text"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                placeholder="Enter your email or phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-3">Password</label>
              <input
                type="password"
                className="w-full px-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors text-lg"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 w-4 h-4" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">Forgot password?</button>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-colors text-lg">
              Sign In
            </button>
            <div className="text-center">
              <span className="text-gray-600">Don't have an account? </span>
              <button
                onClick={() => navigateTo('register')}
                className="text-blue-600 hover:text-blue-700 font-semibold"
              >
                Sign up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'doctors': return <DoctorsPage />;
      case 'appointments': return <AppointmentsPage />;
      case 'login': return <LoginPage />;
      case 'chat': return <div className="container mx-auto px-4 lg:px-6 py-8 pb-20 lg:pb-8"><h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Chat - Coming Soon</h2></div>;
      case 'profile': return <div className="container mx-auto px-4 lg:px-6 py-8 pb-20 lg:pb-8"><h2 className="text-2xl lg:text-3xl font-bold text-gray-800">Profile - Coming Soon</h2></div>;
      case 'emergency': return <div className="container mx-auto px-4 lg:px-6 py-8 pb-20 lg:pb-8"><h2 className="text-2xl lg:text-3xl font-bold text-red-600">Emergency Consultation</h2></div>;
      default: return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {renderPage()}
      <BottomNav />
    </div>
  );
}

export default App;
