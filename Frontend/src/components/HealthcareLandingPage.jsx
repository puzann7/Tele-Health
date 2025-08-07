import React, { useState } from 'react';
import Navbar from './Landing_page/Navbar';
import Hero from './Landing_page/Hero';
import FeaturesSection from './Landing_page/FeaturesSection';
import HowItWorks from './Landing_page/HowItWorks';
import Testimonials from './Landing_page/Testimonials';
import Footer from './Landing_page/Footer';
import AuthPage from './Landing_page/Authpage';

const TelehealthLandingPage = () => {
  // Updated state management for auth modal
  const [authModal, setAuthModal] = useState({
    isOpen: false,
    type: null // 'signin' or 'signup'
  });

  // Enhanced auth click handler
  const handleAuthClick = (type) => {
    console.log('TelehealthLandingPage: Auth clicked with type:', type);
    setAuthModal({
      isOpen: true,
      type: type
    });
  };

  // Enhanced auth close handler
  const handleAuthClose = () => {
    console.log('TelehealthLandingPage: Auth modal closing');
    setAuthModal({
      isOpen: false,
      type: null
    });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Updated Navbar with new auth handler */}
      <Navbar onAuthClick={handleAuthClick} />

      <Hero />
      <FeaturesSection />
      <HowItWorks />
      <Testimonials />
      <Footer />

      {/* Updated AuthPage modal with type and proper state management */}
      {authModal.isOpen && (
        <AuthPage
          type={authModal.type}
          isOpen={authModal.isOpen}
          onClose={handleAuthClose}
        />
      )}
      <Footer />
    </div>
  );
};

export default TelehealthLandingPage;
