import React, { useState } from 'react';
import { Heart, Phone, Clock, MapPin, Star, ArrowRight, Shield, Users, Menu, Stethoscope, Calendar, MessageCircle, Home, User, ChevronDown, X, Search, Filter, Video, FileText, CreditCard } from 'lucide-react';
import './styles/globals.css';
import HealthcareLandingPage from './components/HealthcareLandingPage'
import AuthPage from './pages/auth';

// Mock routing state (we'll implement React Router later)
function App() {
  const [showLandingPage, setShowLandingPage] = useState(true);
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

  // Bottom Navigation
  const BottomNav = () => (
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

  // Page Components
  const HomePage = () => (
    <div className="pb-20">
      {/* Hero Section */}
      <section className="px-4 py-6 bg-gradient-to-br from-primary-50 to-blue-50">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Doctor जहाँ पनि,
            <br />
            <span className="text-primary-500">जहिले पनि</span>
          </h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            Connect with qualified doctors across Nepal. Get instant consultations, prescriptions, and emergency care.
          </p>
        </div>

        {/* Emergency Button */}
        <button 
          onClick={() => navigateTo('emergency')}
          className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 mb-6"
        >
          <Phone className="w-5 h-5" />
          <span>Emergency Consultation</span>
        </button>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-3">
          <button 
            onClick={() => navigateTo('doctors')}
            className="btn-primary flex flex-col items-center space-y-2 py-4"
          >
            <Stethoscope className="w-6 h-6" />
            <span className="text-sm">Find Doctor</span>
          </button>
          <button 
            onClick={() => navigateTo('appointments')}
            className="btn-secondary flex flex-col items-center space-y-2 py-4"
          >
            <Calendar className="w-6 h-6" />
            <span className="text-sm">My Appointments</span>
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="px-4 py-6 bg-white">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary-500">500+</div>
            <div className="text-xs text-gray-600">Doctors</div>
          </div>
          <div className="space-y-1">  
            <div className="text-2xl font-bold text-primary-500">24/7</div>
            <div className="text-xs text-gray-600">Available</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary-500">10K+</div>
            <div className="text-xs text-gray-600">Patients</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-6 bg-gray-50">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Our Services</h3>
        <div className="grid grid-cols-2 gap-3">
          <button onClick={() => navigateTo('general-care')} className="card text-left hover:shadow-md transition-shadow">
            <Stethoscope className="w-8 h-8 text-primary-500 mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">General Care</h4>
            <p className="text-xs text-gray-600">Common illnesses & checkups</p>
          </button>
          <button onClick={() => navigateTo('mental-health')} className="card text-left hover:shadow-md transition-shadow">
            <Heart className="w-8 h-8 text-red-500 mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">Mental Health</h4>
            <p className="text-xs text-gray-600">Therapy & counseling</p>
          </button>
          <button onClick={() => navigateTo('specialists')} className="card text-left hover:shadow-md transition-shadow">
            <Users className="w-8 h-8 text-blue-500 mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">Specialists</h4>
            <p className="text-xs text-gray-600">Expert medical opinions</p>
          </button>
          <button onClick={() => navigateTo('emergency')} className="card text-left hover:shadow-md transition-shadow">
            <Phone className="w-8 h-8 text-red-500 mb-2" />
            <h4 className="font-medium text-gray-800 text-sm">Emergency</h4>
            <p className="text-xs text-gray-600">Urgent medical care</p>
          </button>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-8 bg-gradient-to-r from-primary-500 to-primary-600 text-white">
        <div className="text-center">
          <h3 className="text-xl font-bold mb-2">Get Started Today</h3>
          <p className="text-primary-100 text-sm mb-6">Join thousands getting better healthcare</p>
          <div className="space-y-3">
            <button 
              onClick={() => navigateTo('register')}
              className="w-full bg-white text-primary-600 font-bold py-3 px-6 rounded-xl hover:bg-gray-50 active:scale-95 transition-all duration-200"
            >
              Register as Patient
            </button>
            <button 
              onClick={() => navigateTo('doctor-register')}
              className="w-full border-2 border-white text-white font-bold py-3 px-6 rounded-xl hover:bg-white/10 active:scale-95 transition-all duration-200"
            >
              Join as Doctor
            </button>
          </div>
        </div>
      </section>
    </div>
  );

  const DoctorsPage = () => (
    <div className="pb-20">
      {/* Search Header */}
      <div className="px-4 py-4 bg-white border-b border-gray-200">
        <div className="flex space-x-2 mb-3">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input 
              type="text"
              placeholder="Search doctors, specialties..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 text-gray-600" />
          </button>
        </div>
        
        {/* Filter Tags */}
        <div className="flex space-x-2 overflow-x-auto">
          <button className="px-3 py-1 bg-primary-500 text-white text-xs rounded-full whitespace-nowrap">All</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">Available Now</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">General</button>
          <button className="px-3 py-1 bg-gray-100 text-gray-600 text-xs rounded-full whitespace-nowrap">Cardiology</button>
        </div>
      </div>

      {/* Doctors List */}
      <div className="px-4 py-4 space-y-3">
        {/* Doctor Card 1 */}
        <div className="card">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              DR
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Dr. Rajesh Sharma</h3>
                  <p className="text-sm text-gray-600">General Medicine</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.8 (120 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
                  <p className="text-xs text-green-600">Available</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">Kathmandu</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-primary-500 text-white text-xs rounded-lg">Book Now</button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Card 2 */}
        <div className="card">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-pink-400 to-pink-500 rounded-full flex items-center justify-center text-white font-bold">
              DR
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Dr. Sunita Thapa</h3>
                  <p className="text-sm text-gray-600">Pediatrics</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.9 (85 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full mb-1"></div>
                  <p className="text-xs text-yellow-600">Busy</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">Pokhara</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-gray-300 text-gray-500 text-xs rounded-lg" disabled>Busy</button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Card 3 */}
        <div className="card">
          <div className="flex items-start space-x-3">
            <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-green-500 rounded-full flex items-center justify-center text-white font-bold">
              DR
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">Dr. Amit Poudel</h3>
                  <p className="text-sm text-gray-600">Cardiology</p>
                  <div className="flex items-center space-x-1 mt-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">4.7 (95 reviews)</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="w-2 h-2 bg-green-500 rounded-full mb-1"></div>
                  <p className="text-xs text-green-600">Available</p>
                </div>
              </div>
              <div className="flex items-center justify-between mt-3">
                <div className="flex items-center space-x-1">
                  <MapPin className="w-3 h-3 text-gray-400" />
                  <span className="text-xs text-gray-600">Lalitpur</span>
                </div>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 bg-primary-500 text-white text-xs rounded-lg">Book Now</button>
                  <button className="px-3 py-1 border border-gray-300 text-gray-600 text-xs rounded-lg">View Profile</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const AppointmentsPage = () => (
    <div className="pb-20">
      <div className="px-4 py-4">
        <h2 className="text-xl font-bold text-gray-800 mb-4">My Appointments</h2>
        
        {/* Tabs */}
        <div className="flex space-x-1 mb-4 bg-gray-100 rounded-lg p-1">
          <button className="flex-1 py-2 text-sm font-medium bg-white text-primary-600 rounded-md shadow-sm">Upcoming</button>
          <button className="flex-1 py-2 text-sm font-medium text-gray-600">Past</button>
          <button className="flex-1 py-2 text-sm font-medium text-gray-600">Cancelled</button>
        </div>

        {/* Appointment Cards */}
        <div className="space-y-3">
          <div className="card border-l-4 border-l-primary-500">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Dr. Rajesh Sharma</h3>
                <p className="text-sm text-gray-600">General Consultation</p>
              </div>
              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Confirmed</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Today, 2:30 PM</span>
              </div>
              <div className="flex items-center space-x-1">
                <Video className="w-4 h-4" />
                <span>Video Call</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-primary-500 text-white py-2 rounded-lg text-sm font-medium">Join Call</button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm">Reschedule</button>
            </div>
          </div>

          <div className="card border-l-4 border-l-blue-500">
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-gray-800">Dr. Sunita Thapa</h3>
                <p className="text-sm text-gray-600">Follow-up Consultation</p>
              </div>
              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">Pending</span>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>Tomorrow, 10:00 AM</span>
              </div>
              <div className="flex items-center space-x-1">
                <Phone className="w-4 h-4" />
                <span>Phone Call</span>
              </div>
            </div>
            <div className="flex space-x-2">
              <button className="flex-1 bg-gray-300 text-gray-500 py-2 rounded-lg text-sm font-medium" disabled>Waiting Confirmation</button>
              <button className="px-4 py-2 border border-gray-300 text-gray-600 rounded-lg text-sm">Cancel</button>
            </div>
          </div>
        </div>

        {/* Book New Appointment */}
        <button 
          onClick={() => navigateTo('doctors')}
          className="w-full mt-6 bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold py-4 rounded-xl flex items-center justify-center space-x-2"
        >
          <Calendar className="w-5 h-5" />
          <span>Book New Appointment</span>
        </button>
      </div>
    </div>
  );

  const LoginPage = () => (
    <div className="pb-20 px-4 py-8">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Welcome Back</h2>
        <p className="text-gray-600">Sign in to access your healthcare</p>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email or Phone</label>
          <input 
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your email or phone number"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
          <input 
            type="password"
            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            placeholder="Enter your password"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input type="checkbox" className="rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <button className="text-sm text-primary-600 hover:text-primary-700">Forgot password?</button>
        </div>
        <button className="w-full btn-primary">Sign In</button>
        <div className="text-center">
          <span className="text-gray-600">Don't have an account? </span>
          <button 
            onClick={() => navigateTo('register')}
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            Sign up
          </button>
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
    case 'chat': return <div className="p-4 pb-20"><h2 className="text-xl font-bold">Chat - Coming Soon</h2></div>;
    case 'profile': return <div className="p-4 pb-20"><h2 className="text-xl font-bold">Profile - Coming Soon</h2></div>;
    case 'emergency': return <div className="p-4 pb-20"><h2 className="text-xl font-bold text-red-600">Emergency Consultation</h2></div>;
    case 'auth': return <AuthPage />;
    default: return <HomePage />;
  }
};

  if (showLandingPage) {
    return <HealthcareLandingPage />;
  }
  return (
    <div className="mobile-container">
      <Header />
      {renderPage()}
      <BottomNav />
    </div>
  );
}

export default App;