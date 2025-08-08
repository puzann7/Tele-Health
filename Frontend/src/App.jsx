import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import Layout from './pages/Layout';
import Home from './pages/Home';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import DoctorsList from './pages/Doctor/DoctorsList';
import Footer from './components/Landing_page/Footer';
import HealthcareLandingPage from './components/HealthcareLandingPage'
import AuthPage from './pages/auth';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userType, setUserType] = useState('patient');

  // Navigation function with authentication check
  const navigateTo = (page) => {
    const protectedPages = ['doctors', 'appointments', 'chat', 'profile', 'emergency'];
    
    if (protectedPages.includes(page) && !isAuthenticated) {
      setCurrentPage('login');
    } else {
      setCurrentPage(page);
    }
  };

  // Authentication functions
  const handleLogin = (type = 'patient') => {
    setIsAuthenticated(true);
    setUserType(type);
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType('patient');
    setCurrentPage('home');
  };

  // Render current page
  const renderPage = () => {
    switch(currentPage) {
      case 'login': 
        return <Login onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'register': 
        return <Register onLogin={handleLogin} onNavigate={navigateTo} />;
      case 'doctors': 
        return <DoctorsList onNavigate={navigateTo} />;
      case 'appointments': 
        return <div className="p-4 pb-20"><h2 className="text-xl font-bold">Appointments - Coming Soon</h2></div>;
      case 'chat': 
        return <div className="p-4 pb-20"><h2 className="text-xl font-bold">Chat - Coming Soon</h2></div>;
      case 'profile': 
        return <div className="p-4 pb-20"><h2 className="text-xl font-bold">Profile - Coming Soon</h2></div>;
      case 'emergency': 
        return <div className="p-4 pb-20"><h2 className="text-xl font-bold text-red-600">Emergency Consultation</h2></div>;
      case 'auth': 
        return <AuthPage />;
      default: 
        return <Home onNavigate={navigateTo} isAuthenticated={isAuthenticated} />;
    }
  };
  return (
    <AuthProvider value={{ isAuthenticated, userType, handleLogin, handleLogout }}>
      <div className="min-h-screen bg-gray-50">
        <Layout 
          currentPage={currentPage}
          isAuthenticated={isAuthenticated}
          userType={userType}
          onNavigate={navigateTo}
          onLogout={handleLogout}
        >
          <main className="transition-all duration-300">
            {renderPage()}
          </main>
        </Layout>
        <Footer />
      </div>
    </AuthProvider>
  );
};

export default App;