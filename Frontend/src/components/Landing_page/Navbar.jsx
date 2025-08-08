import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Stethoscope, Heart, Brain, Users, Phone, Clock } from 'lucide-react';

const Navbar = ({ onAuthClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  // Handle scroll effect for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMobileMenuOpen && !event.target.closest('.mobile-menu')) {
        setIsMobileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'How it Works', href: '#how-it-works' },
    {
      name: 'Services',
      href: '#services',
      dropdown: [
        { name: 'General Consultation', href: '#general', icon: Stethoscope, desc: 'Primary care and check-ups' },
        { name: 'Mental Health', href: '#mental-health', icon: Brain, desc: 'Therapy and counseling' },
        { name: 'Specialist Care', href: '#specialists', icon: Heart, desc: 'Expert medical consultations' },
        { name: 'Emergency Care', href: '#emergency', icon: Phone, desc: '24/7 urgent care support' }
      ]
    },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Testimonials', href: '#testimonials' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
<<<<<<< HEAD
      isScrolled
        ? 'bg-white/95 shadow-lg backdrop-blur-md border-b border-gray-100'
=======
      isScrolled 
        ? 'bg-white/95 shadow-lg backdrop-blur-md border-b border-gray-100' 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 lg:h-20">

          {/* Logo */}
          <div className="flex-shrink-0 cursor-pointer group" onClick={() => scrollToSection('#home')}>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 rounded-xl flex items-center justify-center transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-lg group-hover:shadow-xl">
                <span className="text-white font-bold text-lg lg:text-xl">H</span>
              </div>
              <div className="flex flex-col">
                <span className={`text-xl lg:text-2xl font-bold transition-all duration-300 ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                } group-hover:text-teal-600`}>
                  HealthCare<span className="text-teal-500">Nepal</span>
                </span>
                <span className={`text-xs transition-all duration-300 ${
                  isScrolled ? 'text-gray-600' : 'text-gray-200'
                } group-hover:text-teal-500`}>
                  Virtual Care Platform
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <button
                  onClick={() => link.dropdown ? setActiveDropdown(activeDropdown === link.name ? null : link.name) : scrollToSection(link.href)}
                  onMouseEnter={() => link.dropdown && setActiveDropdown(link.name)}
                  onMouseLeave={() => {
                    if (link.dropdown) {
                      setTimeout(() => {
                        if (!document.querySelector('.dropdown-menu:hover')) {
                          setActiveDropdown(null);
                        }
                      }, 100);
                    }
                  }}
                  className={`relative flex items-center space-x-1 px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg group cursor-pointer ${
<<<<<<< HEAD
                    isScrolled
                      ? 'text-gray-700 hover:text-teal-600'
=======
                    isScrolled 
                      ? 'text-gray-700 hover:text-teal-600' 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                      : 'text-white hover:text-teal-200'
                  }`}
                >
                  <span className="relative z-10">{link.name}</span>
                  {link.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                      activeDropdown === link.name ? 'rotate-180' : ''
                    }`} />
                  )}
<<<<<<< HEAD

=======
                  
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                  {/* Animated underline */}
                  <div className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 transition-all duration-300 ${
                    !link.dropdown ? 'w-0 group-hover:w-full' : ''
                  }`}></div>
                </button>
<<<<<<< HEAD

                {/* Enhanced Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div
=======
                
                {/* Enhanced Dropdown Menu */}
                {link.dropdown && activeDropdown === link.name && (
                  <div 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                    className="dropdown-menu absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 transform opacity-0 translate-y-2 animate-[fadeInUp_0.3s_ease-out_forwards]"
                    onMouseEnter={() => setActiveDropdown(link.name)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    {link.dropdown.map((item, index) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className="flex items-start space-x-3 w-full text-left px-4 py-3 text-gray-700 hover:text-teal-600 transition-all duration-200 group cursor-pointer"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-teal-200 group-hover:to-blue-200 transition-all duration-200">
                            <IconComponent className="w-4 h-4 text-teal-600" />
                          </div>
                          <div>
                            <div className="font-medium text-sm">{item.name}</div>
                            <div className="text-xs text-gray-500 mt-0.5">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
<<<<<<< HEAD

            <button
  onClick={onAuthClick}
  className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg group cursor-pointer ${
    isScrolled
      ? 'text-gray-700 hover:text-teal-600'
      : 'text-white hover:text-teal-200'
  }`}
>
  <span className="relative z-10">Sign In</span>
=======
            
            {/* Fixed Sign In Button */}
            <button 
              onClick={onAuthClick}
              className={`relative px-4 py-3 text-sm font-medium transition-all duration-300 rounded-lg group cursor-pointer ${
                isScrolled 
                  ? 'text-gray-700 hover:text-teal-600' 
                  : 'text-white hover:text-teal-200'
              }`}
            >
              <span className="relative z-10">Sign In</span>
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-teal-500 to-teal-600 group-hover:w-full transition-all duration-300"></div>
            </button>
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:block">
<<<<<<< HEAD
            <button className="relative bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer">
=======
            <button 
              onClick={() => window.location.href = 'AuthPage'}
              className="relative bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl overflow-hidden group cursor-pointer"
            >
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
              <span className="relative z-10 flex items-center space-x-2">
                <span>Get Care Now</span>
                <Clock className="w-4 h-4" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-teal-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`relative p-2 rounded-xl transition-all duration-300 transform hover:scale-110 ${
                isScrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white hover:bg-white/10'
              }`}
            >
              <div className="relative">
                {isMobileMenuOpen ? (
                  <X size={24} className="transform rotate-0 transition-transform duration-300" />
                ) : (
                  <Menu size={24} className="transform rotate-0 transition-transform duration-300" />
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Navigation Menu */}
      <div className={`lg:hidden mobile-menu transition-all duration-500 ease-out ${
<<<<<<< HEAD
        isMobileMenuOpen
          ? 'max-h-screen opacity-100 translate-y-0'
=======
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100 translate-y-0' 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
          : 'max-h-0 opacity-0 -translate-y-4 pointer-events-none'
      }`}>
        <div className="absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md shadow-2xl border-t border-gray-100 overflow-hidden">
          <div className="px-4 py-6 space-y-1">
            {navLinks.map((link, index) => (
<<<<<<< HEAD
              <div
                key={link.name}
                className={`transform transition-all duration-500 ${
                  isMobileMenuOpen
                    ? 'translate-x-0 opacity-100'
=======
              <div 
                key={link.name}
                className={`transform transition-all duration-500 ${
                  isMobileMenuOpen 
                    ? 'translate-x-0 opacity-100' 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                    : 'translate-x-4 opacity-0'
                }`}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => link.dropdown ? setActiveDropdown(activeDropdown === link.name ? null : link.name) : scrollToSection(link.href)}
                  className="flex items-center justify-between w-full text-left px-4 py-4 text-gray-700 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 rounded-xl transition-all duration-300 group relative overflow-hidden"
                >
                  <span className="font-medium relative z-10">{link.name}</span>
                  {link.dropdown && (
                    <ChevronDown className={`w-4 h-4 transition-all duration-300 ${
                      activeDropdown === link.name ? 'rotate-180 text-teal-600' : ''
                    }`} />
                  )}
                  <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-500 to-teal-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
                </button>
<<<<<<< HEAD

                {/* Enhanced Mobile Dropdown */}
                {link.dropdown && (
                  <div className={`ml-4 space-y-1 transition-all duration-500 ease-out overflow-hidden ${
                    activeDropdown === link.name
                      ? 'max-h-96 opacity-100 mt-2'
=======
                
                {/* Enhanced Mobile Dropdown */}
                {link.dropdown && (
                  <div className={`ml-4 space-y-1 transition-all duration-500 ease-out overflow-hidden ${
                    activeDropdown === link.name 
                      ? 'max-h-96 opacity-100 mt-2' 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                      : 'max-h-0 opacity-0 mt-0'
                  }`}>
                    {link.dropdown.map((item, itemIndex) => {
                      const IconComponent = item.icon;
                      return (
                        <button
                          key={item.name}
                          onClick={() => scrollToSection(item.href)}
                          className={`flex items-center space-x-3 w-full text-left px-4 py-3 text-gray-600 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 rounded-lg transition-all duration-300 transform ${
<<<<<<< HEAD
                            activeDropdown === link.name
                              ? 'translate-x-0 opacity-100'
=======
                            activeDropdown === link.name 
                              ? 'translate-x-0 opacity-100' 
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                              : 'translate-x-2 opacity-0'
                          }`}
                          style={{ transitionDelay: `${itemIndex * 100}ms` }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 bg-gradient-to-r from-teal-100 to-blue-100 rounded-lg flex items-center justify-center">
                            <IconComponent className="w-3 h-3 text-teal-600" />
                          </div>
                          <div>
                            <div className="text-sm font-medium">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.desc}</div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}
<<<<<<< HEAD

            <div className={`pt-4 border-t border-gray-200 space-y-3 transform transition-all duration-500 ${
              isMobileMenuOpen
                ? 'translate-x-0 opacity-100'
                : 'translate-x-4 opacity-0'
            }`} style={{ transitionDelay: `${navLinks.length * 50}ms` }}>
              <button
  onClick={onAuthClick}
  className="flex items-center w-full text-left px-4 py-4 text-gray-700 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden"
>
=======
            
            <div className={`pt-4 border-t border-gray-200 space-y-3 transform transition-all duration-500 ${
              isMobileMenuOpen 
                ? 'translate-x-0 opacity-100' 
                : 'translate-x-4 opacity-0'
            }`} style={{ transitionDelay: `${navLinks.length * 50}ms` }}>
              <button 
                onClick={onAuthClick}
                className="flex items-center w-full text-left px-4 py-4 text-gray-700 hover:text-teal-600 hover:bg-gradient-to-r hover:from-teal-50 hover:to-blue-50 rounded-xl transition-all duration-300 font-medium group relative overflow-hidden"
              >
>>>>>>> c97e4dc184b16474f4a05110501fb3682387e950
                <span className="relative z-10">Sign In</span>
                <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-teal-500 to-teal-600 transform scale-y-0 group-hover:scale-y-100 transition-transform duration-300 origin-top"></div>
              </button>
              <button className="w-full bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white px-6 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[0.98] active:scale-95 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 group">
                <span>Get Care Now</span>
                <Clock className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;
