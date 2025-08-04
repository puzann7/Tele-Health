// Features.jsx
import React, { useEffect, useRef, useState } from 'react';
import { MessageCircle, Brain, MapPin, Clock, Shield, Smartphone } from 'lucide-react';

const FeaturesSection = () => {
  const [isVisible, setIsVisible] = useState(false);
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

  const features = [
    {
      icon: MessageCircle,
      title: "Fast Online Consultations",
      description: "Connect with licensed doctors within minutes through secure video calls or chat. Available 24/7 for non-emergency consultations with instant booking.",
      color: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      iconColor: "text-teal-600",
      delay: "100ms"
    },
    {
      icon: Brain,
      title: "AI Symptom Checker",
      description: "Get preliminary insights about your symptoms using our advanced AI-powered diagnostic tool. Receive personalized health recommendations before consulting a doctor.",
      color: "from-blue-500 to-blue-600",
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
      delay: "300ms"
    },
    {
      icon: MapPin,
      title: "Nearby Doctor Matching",
      description: "Find qualified healthcare providers in your area or opt for virtual consultations. Filter by specialty, language, experience, and patient ratings.",
      color: "from-green-500 to-green-600",
      bgColor: "bg-green-50",
      iconColor: "text-green-600",
      delay: "500ms"
    }
  ];

  const additionalFeatures = [
    {
      icon: Clock,
      title: "24/7 Availability",
      description: "Round-the-clock access to healthcare professionals",
      iconColor: "text-orange-600"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Your medical data is secure and private",
      iconColor: "text-purple-600"
    },
    {
      icon: Smartphone,
      title: "Mobile Optimized",
      description: "Seamless experience across all devices",
      iconColor: "text-pink-600"
    }
  ];

  return (
    <section id="services" ref={sectionRef} className="py-16 lg:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-teal-100 text-teal-800 text-sm font-medium mb-4">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            Our Services
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            Healthcare Made
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Simple & Accessible
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Experience the future of healthcare with our comprehensive telemedicine platform designed specifically for Nepal's diverse healthcare needs.
          </p>
        </div>

        {/* Main Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mb-16">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className={`group bg-white rounded-3xl p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-100 ${
                  isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
                }`}
                style={{ transitionDelay: feature.delay }}
              >
                {/* Icon Container */}
                <div className={`${feature.bgColor} rounded-2xl p-4 w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className={`${feature.iconColor} w-8 h-8 lg:w-10 lg:h-10`} />
                </div>

                {/* Content */}
                <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* CTA Link */}
                <button className={`inline-flex items-center text-sm font-semibold bg-gradient-to-r ${feature.color} bg-clip-text text-transparent hover:underline group-hover:translate-x-1 transition-transform`}>
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        {/* Additional Features Bar */}
        <div className={`bg-white rounded-2xl p-8 shadow-lg border border-gray-100 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '700ms' }}>
          <div className="grid sm:grid-cols-3 gap-6 lg:gap-8">
            {additionalFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="flex items-center space-x-4 group">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-50 rounded-xl flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                      <IconComponent className={`w-6 h-6 ${feature.iconColor}`} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-12 lg:mt-16 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '900ms' }}>
          <button className="inline-flex items-center bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
            <span>Explore All Services</span>
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
export default FeaturesSection;