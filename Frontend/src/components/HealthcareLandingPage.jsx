import React from 'react';
import Navbar from './Landing_page/Navbar';
import Hero from './Landing_page/Hero';
import FeaturesSection from './Landing_page/FeaturesSection';
import HowItWorks from './Landing_page/HowItWorks';
import Testimonials from './Landing_page/Testimonials';
import Footer from './Landing_page/Footer';

const TelehealthLandingPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <FeaturesSection />

      <HowItWorks />    
      <Testimonials />
      <Footer />
    </div>
  );
};

export default TelehealthLandingPage;