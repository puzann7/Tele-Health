// Hero.jsx
import React, { useEffect, useState } from 'react';
import { ArrowRight, Play, Shield, Award, Users } from 'lucide-react';

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger fade-up animation after component mounts
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/90 via-teal-800/85 to-blue-800/90 z-10"></div>
        <img
          src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1920&h=1080&fit=crop&crop=center"
          alt="Doctor providing virtual consultation"
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          
          {/* Trust Indicators - Mobile Hidden */}
          <div className={`hidden sm:flex justify-center space-x-8 mb-8 transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex items-center space-x-2 text-white/90">
              <Shield className="w-5 h-5 text-teal-300" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Award className="w-5 h-5 text-teal-300" />
              <span className="text-sm font-medium">Licensed Doctors</span>
            </div>
            <div className="flex items-center space-x-2 text-white/90">
              <Users className="w-5 h-5 text-teal-300" />
              <span className="text-sm font-medium">50M+ Consultations</span>
            </div>
          </div>

          {/* Main Heading */}
          <h1 className={`text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '300ms' }}>
            24/7 Virtual Doctor
            <br />
            <span className="bg-gradient-to-r from-teal-300 to-blue-300 bg-clip-text text-transparent">
              Visits in Nepal
            </span>
          </h1>

          {/* Subheading */}
          <div className={`text-xl sm:text-2xl lg:text-3xl text-gray-200 mb-8 max-w-4xl mx-auto leading-relaxed transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '500ms' }}>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-6">
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>AI Symptom Checker</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>Secure Video Consultations</span>
              </span>
              <span className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                <span>e‑Prescription Delivery</span>
              </span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '700ms' }}>
            
            {/* Primary CTA */}
            <button 
              onClick={() => scrollToSection('#services')}
              className="group bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-8 py-4 lg:px-10 lg:py-5 rounded-2xl text-lg lg:text-xl font-bold transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-3xl w-full sm:w-auto flex items-center justify-center space-x-3"
            >
              <span>Get Started</span>
              <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Secondary CTA */}
            <button 
              onClick={() => scrollToSection('#how-it-works')}
              className="group flex items-center space-x-3 text-white hover:text-teal-200 transition-all duration-300 w-full sm:w-auto justify-center"
            >
              <div className="bg-white/20 hover:bg-white/30 rounded-full p-3 lg:p-4 transition-colors group-hover:scale-110 transform duration-300">
                <Play className="text-white w-5 h-5 lg:w-6 lg:h-6" />
              </div>
              <span className="text-lg lg:text-xl font-medium">Watch Demo</span>
            </button>
          </div>

          {/* Stats Bar - Mobile Optimized */}
          <div className={`mt-12 lg:mt-16 grid grid-cols-3 gap-4 sm:gap-8 max-w-3xl mx-auto transition-all duration-700 transform ${
            isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
          }`} style={{ transitionDelay: '900ms' }}>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">500+</div>
              <div className="text-sm sm:text-base text-gray-300">Licensed Doctors</div>
            </div>
            <div className="text-center border-l border-r border-white/20">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">24/7</div>
              <div className="text-sm sm:text-base text-gray-300">Availability</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-1">50M+</div>
              <div className="text-sm sm:text-base text-gray-300">Consultations</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      {/* Floating Elements - Desktop Only */}
      <div className="hidden lg:block absolute top-1/4 left-10 animate-float z-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">500+ Doctors Online</span>
          </div>
        </div>
      </div>

      <div className="hidden lg:block absolute top-1/3 right-10 animate-float-delayed z-20">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-white text-sm font-medium">Average 2 min wait</span>
          </div>
        </div>
      </div>

      {/* Custom CSS for animations - Add to your global CSS */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 3s ease-in-out infinite 1.5s;
        }
      `}</style>
    </section>
  );
};

export default Hero;