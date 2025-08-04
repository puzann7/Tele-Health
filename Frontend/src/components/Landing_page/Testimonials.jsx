// Testimonials.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote, Award, TrendingUp } from 'lucide-react';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const sectionRef = useRef(null);

  // Intersection Observer
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

  // Auto-rotate testimonials
  useEffect(() => {
    if (isAutoPlay && isVisible) {
      const interval = setInterval(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlay, isVisible]);

  const testimonials = [
    {
      name: "Priya Sharma",
      location: "Kathmandu, Nepal",
      occupation: "Software Engineer",
      rating: 5,
      text: "HealthCareNepal changed how I access healthcare. The AI symptom checker helped me understand my condition before consulting with Dr. Rajesh. The entire process was seamless, and I received my prescription within hours. Highly recommend for busy professionals!",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face",
      condition: "Migraine Treatment",
      date: "2 weeks ago"
    },
    {
      name: "Rajesh Thapa",
      location: "Pokhara, Nepal", 
      occupation: "Business Owner",
      rating: 5,
      text: "As someone living outside Kathmandu, accessing quality healthcare was always challenging. This platform connected me with specialist doctors I never could have reached before. The video consultation felt just like an in-person visit. Excellent service!",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      condition: "Diabetes Management",
      date: "1 month ago"
    },
    {
      name: "Sunita Rai",
      location: "Biratnagar, Nepal",
      occupation: "Teacher",
      rating: 5,
      text: "The 24/7 availability saved my child's health during a midnight fever emergency. Dr. Sunita was incredibly patient and professional. The prescription was delivered by morning. This service is a blessing for parents across Nepal.",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
      condition: "Pediatric Emergency",
      date: "3 days ago"
    },
    {
      name: "Amit Poudel",
      location: "Lalitpur, Nepal",
      occupation: "Marketing Manager", 
      rating: 5,
      text: "The mental health support I received through this platform was life-changing. Dr. Maya understood my anxiety issues and provided excellent counseling sessions. The privacy and convenience made it easy to seek help without stigma.",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
      condition: "Mental Health Support",
      date: "1 week ago"
    }
  ];

  const trustIndicators = [
    {
      icon: Award,
      title: "50M+ Consultations",
      subtitle: "Delivered successfully",
      color: "text-teal-600"
    },
    {
      icon: TrendingUp,
      title: "98% Satisfaction",
      subtitle: "Patient approval rate",
      color: "text-blue-600"
    },
    {
      icon: Star,
      title: "4.9/5 Rating",
      subtitle: "Average user rating",
      color: "text-yellow-500"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  return (
    <section id="testimonials" ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className={`text-center mb-16 lg:mb-20 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`}>
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 text-blue-800 text-sm font-medium mb-4">
            <Star className="w-4 h-4 mr-2 text-yellow-500" />
            Patient Stories
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
            What Our Patients
            <span className="block bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
              Say About Us
            </span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Real stories from real patients across Nepal who found quality healthcare through our platform
          </p>
        </div>

        {/* Trust Indicators */}
        <div className={`grid grid-cols-3 gap-4 lg:gap-8 mb-16 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '200ms' }}>
          {trustIndicators.map((indicator, index) => {
            const IconComponent = indicator.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="bg-white rounded-2xl p-3 lg:p-4 shadow-lg">
                    <IconComponent className={`w-6 h-6 lg:w-8 lg:h-8 ${indicator.color}`} />
                  </div>
                </div>
                <div className="text-lg lg:text-2xl font-bold text-gray-900 mb-1">{indicator.title}</div>
                <div className="text-sm text-gray-600">{indicator.subtitle}</div>
              </div>
            );
          })}
        </div>

        {/* Main Testimonial Carousel */}
        <div className={`relative max-w-5xl mx-auto transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '400ms' }}>
          
          {/* Testimonial Card */}
          <div className="bg-white rounded-3xl p-8 lg:p-12 shadow-2xl border border-gray-100 relative overflow-hidden">
            
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 opacity-10">
              <Quote className="w-16 h-16 lg:w-20 lg:h-20 text-teal-600" />
            </div>

            {/* Rating Stars */}
            <div className="flex items-center mb-6">
              {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                <Star key={i} className="w-5 h-5 lg:w-6 lg:h-6 text-yellow-400 fill-current" />
              ))}
              <span className="ml-3 text-sm text-gray-500 font-medium">
                {testimonials[currentTestimonial].rating}.0
              </span>
            </div>

            {/* Testimonial Text */}
            <blockquote className="text-lg lg:text-2xl text-gray-800 mb-8 leading-relaxed font-medium relative z-10">
              "{testimonials[currentTestimonial].text}"
            </blockquote>

            {/* Patient Info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center">
                <img
                  src={testimonials[currentTestimonial].avatar}
                  alt={testimonials[currentTestimonial].name}
                  className="w-16 h-16 lg:w-20 lg:h-20 rounded-2xl object-cover mr-4 shadow-lg"
                />
                <div>
                  <div className="font-bold text-gray-900 text-lg lg:text-xl mb-1">
                    {testimonials[currentTestimonial].name}
                  </div>
                  <div className="text-gray-600 text-sm lg:text-base mb-1">
                    {testimonials[currentTestimonial].occupation}
                  </div>
                  <div className="text-gray-500 text-sm">
                    {testimonials[currentTestimonial].location}
                  </div>
                </div>
              </div>

              {/* Treatment Info */}
              <div className="text-right hidden sm:block">
                <div className="bg-teal-50 text-teal-800 px-3 py-1 rounded-full text-sm font-medium mb-2">
                  {testimonials[currentTestimonial].condition}
                </div>
                <div className="text-gray-500 text-sm">
                  {testimonials[currentTestimonial].date}
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 lg:-translate-x-6 bg-white rounded-full p-3 lg:p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group"
          >
            <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 group-hover:text-teal-600" />
          </button>
          
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 lg:translate-x-6 bg-white rounded-full p-3 lg:p-4 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 group"
          >
            <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 text-gray-600 group-hover:text-teal-600" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-8 space-x-2">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentTestimonial(index);
                setIsAutoPlay(false);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentTestimonial 
                  ? 'bg-teal-600 w-8' 
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={`text-center mt-16 transition-all duration-700 transform ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-12 opacity-0'
        }`} style={{ transitionDelay: '600ms' }}>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 inline-block">
            <h3 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4">
              Ready to Experience Quality Healthcare?
            </h3>
            <p className="text-gray-600 mb-6 max-w-md">
              Join thousands of satisfied patients who trust us with their health
            </p>
            <button className="bg-gradient-to-r from-teal-600 to-blue-600 hover:from-teal-700 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Start Your Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;