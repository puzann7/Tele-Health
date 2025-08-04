// HowItWorks.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Search, UserCheck, Video, FileText, ArrowRight } from 'lucide-react';

const HowItWorks = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef(null);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Auto-advance steps for demo effect
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStep((prev) => (prev + 1) % steps.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  const steps = [
    {
      number: "01",
      title: "Enter Symptoms",
      description: "Use our AI-powered symptom checker to describe your health concerns and get preliminary insights about your condition.",
      icon: Search,
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      details: [
        "AI-powered symptom analysis",
        "Multilingual support (Nepali, English)",
        "Instant preliminary assessment",
        "Privacy-focused questionnaire"
      ]
    },
    {
      number: "02", 
      title: "Choose Doctor & Book",
      description: "Browse through our network of licensed doctors, check their availability, and book an appointment that fits your schedule.",
      icon: UserCheck,
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      details: [
        "Filter by specialty and location",
        "View doctor profiles and ratings",
        "Same-day appointments available",
        "Flexible scheduling options"
      ]
    },
    {
      number: "03",
      title: "Consult & Get Prescription",
      description: "Have your consultation via secure video call or chat, receive your e-prescription, and get medicines delivered to your doorstep.",
      icon: Video,
      color: "from-green-500 to-green-600", 
      bgColor: "bg-green-50",
      details: [
        "HD video consultations",
        "Digital prescriptions",
        "Medicine delivery service",
        "Follow-up appointments"
      ]
    }
  ];

  return (
    <section id="how-it-works" ref={sectionRef} className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Get Care in
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Three Simple Steps
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Our streamlined process makes healthcare accessible to everyone across Nepal
          </p>
        </div>

        {/* Steps Container */}
        <div className="relative">
          
          {/* Desktop Timeline - Hidden on mobile */}
          <div className="hidden lg:block absolute top-32 left-0 right-0 h-1 bg-gray-200">
            <div 
              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 transition-all duration-1000 ease-out"
              style={{ width: `${((activeStep + 1) / steps.length) * 100}%` }}
            ></div>
          </div>

          {/* Steps Grid */}
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              const isActive = index <= activeStep;
              
              return (
                <div
                  key={index}
                  className={`relative transition-all duration-700 transform ${
                    isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                  }`}
                  style={{ transitionDelay: `${index * 200 + 200}ms` }}
                >
                  {/* Step Card */}
                  <div className={`bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-xl transition-all duration-500 border-2 ${
                    isActive ? 'border-teal-200 shadow-teal-100' : 'border-gray-100'
                  }`}>
                    
                    {/* Step Number Badge */}
                    <div className="relative mb-6">
                      <div className={`w-16 h-16 lg:w-20 lg:h-20 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                        isActive ? step.bgColor : 'bg-gray-50'
                      }`}>
                        <IconComponent className={`w-8 h-8 lg:w-10 lg:h-10 transition-colors duration-500 ${
                          isActive ? step.color.includes('teal') ? 'text-teal-600' : step.color.includes('blue') ? 'text-blue-600' : 'text-green-600' : 'text-gray-400'
                        }`} />
                      </div>
                      
                      {/* Step Number */}
                      <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-colors duration-500 ${
                        isActive ? 'bg-gradient-to-r ' + step.color + ' text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {step.description}
                    </p>

                    {/* Feature List */}
                    <ul className="space-y-2 mb-6">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                          <div className={`w-2 h-2 rounded-full mr-3 transition-colors duration-500 ${
                            isActive ? 'bg-teal-500' : 'bg-gray-300'
                          }`}></div>
                          {detail}
                        </li>
                      ))}
                    </ul>

                    {/* Arrow - Desktop Only */}
                    {index < steps.length - 1 && (
                      <div className="hidden lg:block absolute top-1/2 -right-6 transform -translate-y-1/2">
                        <ArrowRight className={`w-6 h-6 transition-colors duration-500 ${
                          isActive ? 'text-teal-500' : 'text-gray-300'
                        }`} />
                      </div>
                    )}
                  </div>

                  {/* Mobile Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="lg:hidden flex justify-center py-4">
                      <div className={`w-1 h-8 rounded-full transition-colors duration-500 ${
                        isActive ? 'bg-teal-500' : 'bg-gray-200'
                      }`}></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Stats & CTA */}
        <div className={`mt-16 lg:mt-20 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '800ms' }}>
          
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-teal-600 mb-2">2 min</div>
              <div className="text-sm text-gray-600">Average wait time</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-blue-600 mb-2">98%</div>
              <div className="text-sm text-gray-600">Patient satisfaction</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-green-600 mb-2">24/7</div>
              <div className="text-sm text-gray-600">Always available</div>
            </div>
            <div className="text-center">
              <div className="text-2xl lg:text-3xl font-bold text-purple-600 mb-2">500+</div>
              <div className="text-sm text-gray-600">Licensed doctors</div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <button className="inline-flex items-center bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              <span>Start Your Consultation</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
            <p className="text-sm text-gray-500 mt-3">No waiting rooms. No hassle. Just quality healthcare.</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;