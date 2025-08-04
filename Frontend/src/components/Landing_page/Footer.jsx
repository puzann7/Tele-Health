// Footer.jsx
import React from 'react';
import { 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  ArrowRight,
  Shield,
  Award,
  Clock
} from 'lucide-react';

const Footer = () => {
  const scrollToSection = (sectionId) => {
    const element = document.querySelector(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const companyLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Our Mission', href: '#mission' },
    { name: 'Leadership Team', href: '#team' },
    { name: 'Careers', href: '#careers' },
    { name: 'Press & Media', href: '#press' },
    { name: 'Investor Relations', href: '#investors' }
  ];

  const serviceLinks = [
    { name: 'General Consultation', href: '#general' },
    { name: 'Mental Health', href: '#mental-health' },
    { name: 'Specialist Care', href: '#specialists' },
    { name: 'Emergency Consultation', href: '#emergency' },
    { name: 'Prescription Delivery', href: '#pharmacy' },
    { name: 'Health Records', href: '#records' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#privacy' },
    { name: 'Terms of Service', href: '#terms' },
    { name: 'Medical Disclaimer', href: '#disclaimer' },
    { name: 'Cookie Policy', href: '#cookies' },
    { name: 'HIPAA Compliance', href: '#hipaa' },
    { name: 'Data Security', href: '#security' }
  ];

  const helpLinks = [
    { name: 'Help Center', href: '#help' },
    { name: 'Contact Support', href: '#support' },
    { name: 'Technical Issues', href: '#tech-support' },
    { name: 'Billing Questions', href: '#billing' },
    { name: 'Insurance Claims', href: '#insurance' },
    { name: 'Doctor Portal', href: '#doctor-portal' }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com', color: 'hover:text-blue-600' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com', color: 'hover:text-blue-400' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com', color: 'hover:text-pink-600' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com', color: 'hover:text-blue-700' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com', color: 'hover:text-red-600' }
  ];

  const certifications = [
    { icon: Shield, text: 'HIPAA Compliant' },
    { icon: Award, text: 'ISO 27001 Certified' },
    { icon: Clock, text: 'SOC 2 Type II' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-teal-600 to-blue-600 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center lg:text-left lg:flex lg:items-center lg:justify-between">
            <div className="mb-8 lg:mb-0">
              <h3 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Stay Updated with Health Tips
              </h3>
              <p className="text-teal-100 text-lg">
                Get expert health advice, wellness tips, and platform updates delivered to your inbox
              </p>
            </div>
            
            <div className="lg:ml-8">
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto lg:mx-0">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-white focus:outline-none"
                />
                <button className="bg-white text-teal-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center whitespace-nowrap">
                  <span>Subscribe</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
            
            {/* Company Info - Spans 2 columns on large screens */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">
                    HealthCare<span className="text-teal-400">Nepal</span>
                  </h3>
                  <p className="text-sm text-gray-400">Virtual Care Platform</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-6 max-w-sm">
                Revolutionizing healthcare accessibility across Nepal through innovative telemedicine solutions. 
                Quality care, anytime, anywhere.
              </p>

              {/* Contact Info */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-300">+977-1-4444-5555</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-teal-400" />
                  <span className="text-gray-300">support@healthcarenepal.com</span>
                </div>
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-teal-400 mt-0.5" />
                  <span className="text-gray-300">Kathmandu, Nepal<br />Bagmati Province</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => {
                  const IconComponent = social.icon;
                  return (
                    <a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`w-10 h-10 bg-gray-800 rounded-xl flex items-center justify-center text-gray-400 ${social.color} hover:bg-gray-700 transition-all duration-200 hover:scale-110`}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Company Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Company</h4>
              <ul className="space-y-3">
                {companyLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Services</h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Legal</h4>
              <ul className="space-y-3">
                {legalLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help & Contact Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-6">Help & Contact</h4>
              <ul className="space-y-3">
                {helpLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.href)}
                      className="text-gray-400 hover:text-teal-400 transition-colors text-sm"
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Certifications & Emergency Notice */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
              
              {/* Certifications */}
              <div className="flex flex-wrap items-center space-x-6">
                {certifications.map((cert, index) => {
                  const IconComponent = cert.icon;
                  return (
                    <div key={index} className="flex items-center space-x-2">
                      <IconComponent className="w-5 h-5 text-teal-400" />
                      <span className="text-sm text-gray-400">{cert.text}</span>
                    </div>
                  );
                })}
              </div>

              {/* Emergency Notice */}
              <div className="bg-red-900/20 border border-red-800 rounded-xl px-4 py-3">
                <p className="text-red-300 text-sm font-medium text-center">
                  <span className="inline-block w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></span>
                  For medical emergencies, call 102 or visit nearest hospital
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © 2025 HealthCareNepal. All rights reserved.
            </div>

            {/* Additional Legal Links */}
            <div className="flex flex-wrap items-center space-x-6 text-sm">
              <button className="text-gray-400 hover:text-teal-400 transition-colors">
                Accessibility
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors">
                Site Map
              </button>
              <button className="text-gray-400 hover:text-teal-400 transition-colors">
                Medical Licensing
              </button>
            </div>

            {/* Language Selector */}
            <div className="flex items-center space-x-2">
              <span className="text-gray-400 text-sm">Language:</span>
              <select className="bg-gray-800 text-gray-300 text-sm rounded-lg px-3 py-1 border border-gray-700 focus:ring-2 focus:ring-teal-500 focus:outline-none">
                <option value="en">English</option>
                <option value="ne">नेपाली</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
