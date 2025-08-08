import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Eye, 
  EyeOff, 
  Mail, 
  Lock, 
  User, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  CheckCircle,
  Star,
  Award,
  Heart,
  Stethoscope,
  Users,
  Clock,
  AlertCircle,
  Facebook,
  Apple
} from 'lucide-react';

const AuthPage = ({ onAuthSuccess, onNavigate, initialType = 'signup' }) => {
  const [isSignUp, setIsSignUp] = useState(initialType === 'signup');
  const [currentStep, setCurrentStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Form data
  const [formData, setFormData] = useState({
    // Basic Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Medical Profile
    dateOfBirth: '',
    gender: '',
    location: '',
    emergencyContact: '',
    emergencyPhone: '',
    // Preferences
    preferredLanguage: 'en',
    notifications: true,
    terms: false,
    privacy: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
      if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
      if (!formData.email.trim()) newErrors.email = 'Email is required';
      if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
      if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
      if (!formData.password) newErrors.password = 'Password is required';
      if (formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (isSignUp && formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match';
      }
    }
    
    if (step === 2 && isSignUp) {
      if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.location.trim()) newErrors.location = 'Location is required';
    }
    
    if (step === 3 && isSignUp) {
      if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
      if (!formData.privacy) newErrors.privacy = 'You must accept the privacy policy';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep(currentStep)) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock successful authentication
      const userData = {
        id: '1',
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        location: formData.location
      };
      
      onAuthSuccess(userData);
      
    } catch (error) {
      console.error('Auth error:', error);
      setErrors({ submit: 'Authentication failed. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  const trustFeatures = [
    { icon: Shield, text: "Bank-level security", desc: "256-bit SSL encryption" },
    { icon: Award, text: "Licensed doctors", desc: "Nepal Medical Council verified" },
    { icon: Users, text: "50M+ consultations", desc: "Trusted by millions" },
    { icon: Clock, text: "24/7 support", desc: "Always here to help" }
  ];

  const socialProviders = [
    { name: 'Google', icon: Google, color: 'hover:bg-red-50 border-red-200 text-red-600' },
    { name: 'Facebook', icon: Facebook, color: 'hover:bg-blue-50 border-blue-200 text-blue-600' },
    { name: 'Apple', icon: Apple, color: 'hover:bg-gray-50 border-gray-200 text-gray-800' }
  ];

  const stepTitles = {
    1: isSignUp ? 'Create your account' : 'Welcome back',
    2: 'Medical profile',
    3: 'Almost there'
  };

  const stepDescriptions = {
    1: isSignUp ? 'Join thousands of patients getting quality care' : 'Sign in to continue to your account',
    2: 'Help us provide personalized care',
    3: 'Review and confirm your details'
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 flex">
      {/* Left Side - Form */}
      <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:max-w-md">
          
          {/* Header */}
          <div className="mb-8">
            {/* Logo */}
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 via-teal-600 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <div>
                <span className="text-2xl font-bold text-gray-900">
                  HealthCare<span className="text-teal-500">Nepal</span>
                </span>
              </div>
            </div>

            {/* Progress Bar for Sign Up */}
            {isSignUp && (
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex-1">
                      <div className={`h-2 rounded-full transition-all duration-300 ${
                        step <= currentStep 
                          ? 'bg-gradient-to-r from-teal-500 to-blue-500' 
                          : 'bg-gray-200'
                      }`} />
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-500">Step {currentStep} of 3</p>
              </div>
            )}

            {/* Title */}
            <h2 className="text-3xl font-bold text-gray-900 mb-2">
              {stepTitles[currentStep]}
            </h2>
            <p className="text-gray-600">
              {stepDescriptions[currentStep]}
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <div className="space-y-4">
                
                {/* Social Login Options */}
                {!isSignUp && (
                  <div className="space-y-3 mb-6">
                    {socialProviders.map((provider) => (
                      <button
                        key={provider.name}
                        type="button"
                        className={`w-full flex items-center justify-center space-x-3 px-4 py-3 border-2 rounded-xl font-medium transition-all duration-200 ${provider.color}`}
                      >
                        <provider.icon className="w-5 h-5" />
                        <span>Continue with {provider.name}</span>
                      </button>
                    ))}
                    
                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-white text-gray-500">Or continue with email</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Name Fields */}
                {isSignUp && (
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                            errors.firstName ? 'border-red-300' : 'border-gray-300'
                          }`}
                          placeholder="John"
                        />
                      </div>
                      {errors.firstName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.firstName}</span>
                        </p>
                      )}
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Last Name *
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                          errors.lastName ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="Doe"
                      />
                      {errors.lastName && (
                        <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>{errors.lastName}</span>
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                        errors.email ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="john@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.email}</span>
                    </p>
                  )}
                </div>

                {/* Phone */}
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                          errors.phone ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="+977 98XXXXXXXX"
                      />
                    </div>
                    {errors.phone && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                        errors.password ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.password}</span>
                    </p>
                  )}
                </div>

                {/* Confirm Password */}
                {isSignUp && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                          errors.confirmPassword ? 'border-red-300' : 'border-gray-300'
                        }`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.confirmPassword}</span>
                      </p>
                    )}
                  </div>
                )}

                {/* Forgot Password Link */}
                {!isSignUp && (
                  <div className="text-right">
                    <button
                      type="button"
                      className="text-sm text-teal-600 hover:text-teal-500 font-medium"
                    >
                      Forgot password?
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Step 2: Medical Profile */}
            {currentStep === 2 && isSignUp && (
              <div className="space-y-4">
                
                {/* Date of Birth & Gender */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth *
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleInputChange}
                        className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                          errors.dateOfBirth ? 'border-red-300' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {errors.dateOfBirth && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.dateOfBirth}</span>
                      </p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Gender *
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                        errors.gender ? 'border-red-300' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                      <option value="prefer-not-to-say">Prefer not to say</option>
                    </select>
                    {errors.gender && (
                      <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                        <AlertCircle className="w-4 h-4" />
                        <span>{errors.gender}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleInputChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200 ${
                        errors.location ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Kathmandu, Nepal"
                    />
                  </div>
                  {errors.location && (
                    <p className="mt-1 text-sm text-red-600 flex items-center space-x-1">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.location}</span>
                    </p>
                  )}
                </div>

                {/* Emergency Contact */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Contact
                    </label>
                    <input
                      type="text"
                      name="emergencyContact"
                      value={formData.emergencyContact}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      placeholder="Full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Emergency Phone
                    </label>
                    <input
                      type="tel"
                      name="emergencyPhone"
                      value={formData.emergencyPhone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                      placeholder="+977 98XXXXXXXX"
                    />
                  </div>
                </div>

                {/* Preferred Language */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Language
                  </label>
                  <select
                    name="preferredLanguage"
                    value={formData.preferredLanguage}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                  >
                    <option value="en">English</option>
                    <option value="ne">Nepali</option>
                    <option value="hi">Hindi</option>
                  </select>
                </div>
              </div>
            )}

            {/* Step 3: Terms and Confirmation */}
            {currentStep === 3 && isSignUp && (
              <div className="space-y-6">
                
                {/* Account Summary */}
                <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 border border-teal-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Summary</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Name:</span> {formData.firstName} {formData.lastName}</p>
                    <p><span className="font-medium">Email:</span> {formData.email}</p>
                    <p><span className="font-medium">Phone:</span> {formData.phone}</p>
                    <p><span className="font-medium">Location:</span> {formData.location}</p>
                  </div>
                </div>

                {/* Notifications */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <div>
                      <label className="text-sm font-medium text-gray-700">
                        Email notifications
                      </label>
                      <p className="text-xs text-gray-500 mt-1">
                        Receive appointment reminders and health tips
                      </p>
                    </div>
                  </div>
                </div>

                {/* Terms and Privacy */}
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <div>
                      <label className="text-sm text-gray-700">
                        I agree to the{' '}
                        <button type="button" className="text-teal-600 hover:text-teal-500 font-medium">
                          Terms and Conditions
                        </button>
                      </label>
                    </div>
                  </div>
                  {errors.terms && (
                    <p className="text-sm text-red-600 flex items-center space-x-1 ml-7">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.terms}</span>
                    </p>
                  )}

                  <div className="flex items-start space-x-3">
                    <input
                      type="checkbox"
                      name="privacy"
                      checked={formData.privacy}
                      onChange={handleInputChange}
                      className="mt-1 w-4 h-4 text-teal-600 border-2 border-gray-300 rounded focus:ring-teal-500"
                    />
                    <div>
                      <label className="text-sm text-gray-700">
                        I agree to the{' '}
                        <button type="button" className="text-teal-600 hover:text-teal-500 font-medium">
                          Privacy Policy
                        </button>
                      </label>
                    </div>
                  </div>
                  {errors.privacy && (
                    <p className="text-sm text-red-600 flex items-center space-x-1 ml-7">
                      <AlertCircle className="w-4 h-4" />
                      <span>{errors.privacy}</span>
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="text-sm text-red-600 text-center flex items-center justify-center space-x-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errors.submit}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              {/* Back Button */}
              {currentStep > 1 && isSignUp && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back</span>
                </button>
              )}

              {/* Main Action Button */}
              <button
                type={currentStep === 3 || !isSignUp ? 'submit' : 'button'}
                onClick={currentStep === 3 || !isSignUp ? handleSubmit : handleNext}
                disabled={isLoading}
                className={`${currentStep > 1 && isSignUp ? 'flex-1' : 'w-full'} bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 disabled:from-gray-400 disabled:to-gray-500 text-white py-3 rounded-xl font-semibold transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl`}
              >
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>
                    {currentStep === 3 && isSignUp 
                      ? 'Create Account' 
                      : currentStep < 3 && isSignUp 
                        ? 'Continue' 
                        : 'Sign In'
                    }
                  </span>
                )}
              </button>
            </div>
          </form>

          {/* Toggle Auth Mode */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
              <button
                type="button"
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setCurrentStep(1);
                  setErrors({});
                  setFormData({
                    firstName: '',
                    lastName: '',
                    email: '',
                    phone: '',
                    password: '',
                    confirmPassword: '',
                    dateOfBirth: '',
                    gender: '',
                    location: '',
                    emergencyContact: '',
                    emergencyPhone: '',
                    preferredLanguage: 'en',
                    notifications: true,
                    terms: false,
                    privacy: false
                  });
                }}
                className="text-teal-600 hover:text-teal-500 font-semibold transition-colors duration-200"
              >
                {isSignUp ? 'Sign in' : 'Sign up'}
              </button>
            </p>
          </div>

          {/* Back to Home */}
          <div className="mt-6 text-center">
            <button
              onClick={() => onNavigate('landing')}
              className="inline-flex items-center space-x-2 text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to home</span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Info Panel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-gradient-to-br from-teal-500 via-blue-600 to-indigo-700">
        {/* Background Pattern */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 20% 20%, rgba(255, 255, 255, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.2) 0%, transparent 50%)`
          }}
        />
        
        {/* Medical Background Image */}
        <div 
          className="absolute inset-0 opacity-20 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=1200&fit=crop&crop=center&q=80)'
          }}
        />

        <div className="relative z-10 flex flex-col justify-center px-12 text-white">
          
          {/* Header */}
          <div className="mb-12">
            <h2 className="text-4xl font-bold mb-6 leading-tight">
              Join Nepal's #1 
              <span className="block">Healthcare Platform</span>
            </h2>
            <p className="text-xl text-blue-100 leading-relaxed">
              Connect with licensed doctors, get instant consultations, and manage your health journey - all from the comfort of your home.
            </p>
          </div>

          {/* Trust Features */}
          <div className="space-y-6 mb-12">
            {trustFeatures.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-4 p-4 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20 hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white mb-1">{feature.text}</h3>
                  <p className="text-blue-100 text-sm">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">500+</div>
              <div className="text-blue-100 text-sm">Licensed Doctors</div>
            </div>
            <div className="text-center border-l border-r border-white/30">
              <div className="text-3xl font-bold text-white mb-1">50M+</div>
              <div className="text-blue-100 text-sm">Consultations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white mb-1">24/7</div>
              <div className="text-blue-100 text-sm">Available</div>
            </div>
          </div>

          {/* Testimonial */}
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
            <div className="flex items-center space-x-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-white mb-4 italic">
              "HealthCareNepal made it so easy to connect with a specialist. I got the care I needed without leaving my village."
            </p>
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="text-white font-semibold">Sita Gurung</div>
                <div className="text-blue-100 text-sm">Patient from Pokhara</div>
              </div>
            </div>
          </div>

          {/* Medical Badges */}
          <div className="mt-8 flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-blue-100">
              <Stethoscope className="w-5 h-5" />
              <span className="text-sm font-medium">Nepal Medical Council</span>
            </div>
            <div className="flex items-center space-x-2 text-blue-100">
              <Shield className="w-5 h-5" />
              <span className="text-sm font-medium">HIPAA Compliant</span>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 right-20 w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-bounce">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <div className="absolute bottom-32 left-20 w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
          <CheckCircle className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
};

export default AuthPage;