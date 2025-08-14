import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Settings as SettingsIcon, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun, 
  Smartphone, 
  Lock, 
  Eye, 
  EyeOff,
  CreditCard,
  HelpCircle,
  LogOut,
  Check,
  Edit,
  Camera,
  Save,
  X,
  ArrowLeft,
  ChevronRight,
  Menu,
  Calendar,
  Home,
  Stethoscope,
  AlertCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

// Sidebar Component
const Sidebar = ({ isOpen, toggleSidebar }) => {
  const location = useLocation();
  const { logout, user } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const links = [
    { label: "Home", to: "/home/PatientDashboard", icon: Home },
    { label: "Appointments", to: "/home/PatientDashboard/Appointment", icon: Calendar },
    { label: "Find Doctors", to: "/home/PatientDashboard/FindDoctors", icon: Stethoscope },
    { label: "Settings", to: "/home/PatientDashboard/Settings", icon: SettingsIcon },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 h-full w-64 bg-white border-r border-gray-200 shadow-lg transform transition-transform duration-300 z-50
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      lg:translate-x-0 lg:static lg:shadow-none`}
    >
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-blue-700">HealthApp</h2>
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-1 rounded-md hover:bg-gray-100"
          aria-label="Close sidebar"
        >
          <X className="w-6 h-6 text-gray-700" />
        </button>
      </div>
      <nav className="mt-6">
        <ul className="flex flex-col space-y-2 px-4">
          {links.map(({ label, to, icon: Icon }) => (
            <li key={to}>
              <Link
                to={to}
                className={`flex items-center px-4 py-2 rounded-lg ${
                  location.pathname === to
                    ? "bg-blue-100 text-blue-700 font-semibold"
                    : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
                }`}
                onClick={toggleSidebar}
              >
                <Icon className="w-5 h-5 mr-3" /> {label}
              </Link>
            </li>
          ))}
          {/* Logout button */}
          <li>
            <button
              onClick={handleLogout}
              className="w-full flex items-center px-4 py-2 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors"
            >
              <LogOut className="w-5 h-5 mr-3" /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

// Header Component
const Header = ({ toggleSidebar }) => {
  const { user } = useAuth();
  
  return (
    <header className="flex items-center justify-between bg-white shadow-sm px-6 py-4 sticky top-0 z-40">
      <button
        onClick={toggleSidebar}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
        aria-label="Open sidebar"
      >
        <Menu className="w-6 h-6 text-gray-700" />
      </button>
      <h1 className="text-xl font-bold text-blue-700">Settings</h1>
      <div className="flex items-center space-x-4">
        <Bell className="w-6 h-6 text-gray-600 cursor-pointer hover:text-blue-600" />
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold">
            {user?.firstName?.charAt(0) || user?.email?.charAt(0) || 'U'}
          </div>
          <span className="font-medium text-gray-700">
            {user?.firstName || user?.email?.split('@')[0] || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};

// Mobile Bottom Navigation
const MobileBottomNav = () => {
  const location = useLocation();

  const navItems = [
    { label: "Home", to: "/home/PatientDashboard", icon: Home },
    { label: "Appointments", to: "/home/PatientDashboard/Appointment", icon: Calendar },
    { label: "Doctors", to: "/home/PatientDashboard/FindDoctors", icon: Stethoscope },
    { label: "Settings", to: "/home/PatientDashboard/Settings", icon: SettingsIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-inner flex justify-around items-center lg:hidden z-50">
      {navItems.map(({ label, to, icon: Icon }) => {
        const active = location.pathname === to;
        return (
          <Link
            key={to}
            to={to}
            className={`flex flex-col items-center justify-center py-2 px-1 text-xs font-medium ${
              active ? "text-blue-700" : "text-gray-600 hover:text-blue-700"
            }`}
          >
            <Icon
              className={`w-6 h-6 mb-1 ${active ? "text-blue-700" : "text-gray-600"}`}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
};

const SettingCard = ({ title, description, children, className = "" }) => (
  <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-4 md:p-6 ${className}`}>
    <div className="mb-4 md:mb-6">
      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1 md:mb-2">{title}</h3>
      {description && <p className="text-sm md:text-base text-gray-600">{description}</p>}
    </div>
    {children}
  </div>
);

const ToggleSwitch = ({ enabled, onChange, label, description }) => (
  <div className="flex items-center justify-between py-3">
    <div className="flex-1 pr-4">
      <p className="font-medium text-gray-900 text-sm md:text-base">{label}</p>
      {description && <p className="text-xs md:text-sm text-gray-600 mt-1">{description}</p>}
    </div>
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
        enabled ? 'bg-blue-600' : 'bg-gray-200'
      }`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const Settings = () => {
  const navigate = useNavigate();
  const { user, logout, updateUser } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  
  const [notifications, setNotifications] = useState({
    appointments: true,
    medications: true,
    promotions: false,
    security: true
  });
  
  const [privacy, setPrivacy] = useState({
    dataSharing: false,
    analytics: true,
    marketing: false
  });

  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    dateOfBirth: '',
    gender: 'male',
    address: '',
    bloodGroup: 'O+',
    emergencyContact: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Initialize profile data from user context
  useEffect(() => {
    if (user) {
      setProfile({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        dateOfBirth: user.dateOfBirth ? user.dateOfBirth.split('T')[0] : '',
        gender: user.gender || 'male',
        address: user.address || '',
        bloodGroup: user.bloodGroup || 'O+',
        emergencyContact: user.emergencyContact || ''
      });
    }
  }, [user]);

  const showMessage = (type, text) => {
    setMessage({ type, text });
    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  const tabs = [
    { key: 'profile', label: 'Profile', icon: User, desc: 'Personal information' },
    { key: 'notifications', label: 'Notifications', icon: Bell, desc: 'Alert preferences' },
    { key: 'privacy', label: 'Privacy & Security', icon: Shield, desc: 'Data protection' },
    { key: 'preferences', label: 'Preferences', icon: SettingsIcon, desc: 'App settings' },
    { key: 'billing', label: 'Billing', icon: CreditCard, desc: 'Payment methods' },
    { key: 'support', label: 'Help & Support', icon: HelpCircle, desc: 'Get assistance' }
  ];

  const handleProfileSave = async () => {
    setLoading(true);
    try {
      // Here you would typically call an API to update the profile
      // For now, we'll just update the local context
      await updateUser(profile);
      setEditingProfile(false);
      showMessage('success', 'Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      showMessage('error', 'Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordUpdate = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showMessage('error', 'New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      // Here you would call your password update API
      console.log('Updating password...');
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      showMessage('success', 'Password updated successfully!');
    } catch (error) {
      console.error('Password update error:', error);
      showMessage('error', 'Failed to update password. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
      showMessage('error', 'Logout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderDesktopNavigation = () => (
    <div className="w-80 bg-white rounded-2xl shadow-sm border border-gray-100 p-6 h-fit sticky top-6">
      <nav className="space-y-2">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 text-left group ${
              activeTab === tab.key
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <div className="flex items-center space-x-3">
              <tab.icon className="w-5 h-5" />
              <div>
                <span className="font-medium">{tab.label}</span>
                <p className={`text-xs mt-1 ${
                  activeTab === tab.key ? 'text-blue-100' : 'text-gray-400'
                }`}>{tab.desc}</p>
              </div>
            </div>
            <ChevronRight className={`w-4 h-4 transition-transform ${
              activeTab === tab.key ? 'rotate-90' : 'group-hover:translate-x-1'
            }`} />
          </button>
        ))}
        
        <div className="pt-4 mt-6 border-t border-gray-200">
          <button
            onClick={handleLogout}
            disabled={loading}
            className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200 text-left disabled:opacity-50"
          >
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </nav>
    </div>
  );

  const renderTabContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-4 md:space-y-6">
            {/* Success/Error Messages */}
            {message.text && (
              <div className={`p-4 rounded-xl flex items-center space-x-3 ${
                message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' :
                'bg-red-50 text-red-700 border border-red-200'
              }`}>
                {message.type === 'success' ? 
                  <Check className="w-5 h-5" /> : 
                  <AlertCircle className="w-5 h-5" />
                }
                <span>{message.text}</span>
              </div>
            )}

            <SettingCard title="Profile Information" description="Manage your personal information">
              <div className="space-y-4 md:space-y-6">
                {/* Profile Picture */}
                <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6">
                  <div className="relative">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl md:text-3xl font-bold shadow-lg border-4 border-white">
                      {profile.firstName.charAt(0) || 'U'}
                    </div>
                    <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-1.5 md:p-2 rounded-full hover:bg-blue-700 transition-colors shadow-lg">
                      <Camera className="w-3 h-3 md:w-4 md:h-4" />
                    </button>
                  </div>
                  <div className="text-center md:text-left">
                    <h4 className="text-lg font-semibold text-gray-900">
                      {profile.firstName} {profile.lastName}
                    </h4>
                    <p className="text-gray-600 text-sm">Patient ID: #{user?.id || 'N/A'}</p>
                    <p className="text-gray-600 text-sm">User Type: {user?.userType || 'Patient'}</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Change Photo
                    </button>
                  </div>
                </div>

                {/* Profile Form */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                    <input
                      type="text"
                      value={profile.firstName}
                      onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                    <input
                      type="text"
                      value={profile.lastName}
                      onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({...profile, email: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profile.phoneNumber}
                      onChange={(e) => setProfile({...profile, phoneNumber: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={profile.dateOfBirth}
                      onChange={(e) => setProfile({...profile, dateOfBirth: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                    <select
                      value={profile.gender}
                      onChange={(e) => setProfile({...profile, gender: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Blood Group</label>
                    <select
                      value={profile.bloodGroup}
                      onChange={(e) => setProfile({...profile, bloodGroup: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Emergency Contact</label>
                    <input
                      type="tel"
                      value={profile.emergencyContact}
                      onChange={(e) => setProfile({...profile, emergencyContact: e.target.value})}
                      disabled={!editingProfile}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-50 text-sm md:text-base"
                    />
                  </div>
                </div>

                <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4 pt-4">
                  {editingProfile ? (
                    <>
                      <button
                        onClick={handleProfileSave}
                        disabled={loading}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
                      >
                        <Save className="w-4 h-4" />
                        <span>{loading ? 'Saving...' : 'Save Changes'}</span>
                      </button>
                      <button
                        onClick={() => setEditingProfile(false)}
                        disabled={loading}
                        className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors disabled:opacity-50"
                      >
                        <X className="w-4 h-4" />
                        <span>Cancel</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setEditingProfile(true)}
                      className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200"
                    >
                      <Edit className="w-4 h-4" />
                      <span>Edit Profile</span>
                    </button>
                  )}
                </div>
              </div>
            </SettingCard>

            <SettingCard title="Change Password" description="Update your account password">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={passwordData.currentPassword}
                      onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-12 text-sm md:text-base"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Enter new password"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm md:text-base"
                    placeholder="Confirm new password"
                  />
                </div>
                
                <button 
                  onClick={handlePasswordUpdate}
                  disabled={loading || !passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                  className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-medium hover:from-blue-700 hover:to-blue-800 transition-all duration-200 disabled:opacity-50"
                >
                  {loading ? 'Updating...' : 'Update Password'}
                </button>
              </div>
            </SettingCard>
          </div>
        );

      case 'notifications':
        return (
          <SettingCard title="Notification Preferences" description="Manage how you receive notifications">
            <div className="space-y-4">
              <ToggleSwitch
                enabled={notifications.appointments}
                onChange={(value) => setNotifications({...notifications, appointments: value})}
                label="Appointment Reminders"
                description="Get notified about upcoming appointments"
              />
              
              <ToggleSwitch
                enabled={notifications.medications}
                onChange={(value) => setNotifications({...notifications, medications: value})}
                label="Medication Reminders"
                description="Reminders to take your prescribed medications"
              />
              
              <ToggleSwitch
                enabled={notifications.promotions}
                onChange={(value) => setNotifications({...notifications, promotions: value})}
                label="Promotional Updates"
                description="Receive updates about new features and offers"
              />
              
              <ToggleSwitch
                enabled={notifications.security}
                onChange={(value) => setNotifications({...notifications, security: value})}
                label="Security Alerts"
                description="Important security and account notifications"
              />
            </div>
          </SettingCard>
        );

      case 'privacy':
        return (
          <div className="space-y-4 md:space-y-6">
            <SettingCard title="Privacy Settings" description="Control your data privacy and security">
              <div className="space-y-4">
                <ToggleSwitch
                  enabled={privacy.dataSharing}
                  onChange={(value) => setPrivacy({...privacy, dataSharing: value})}
                  label="Data Sharing"
                  description="Allow sharing anonymized data for research"
                />
                
                <ToggleSwitch
                  enabled={privacy.analytics}
                  onChange={(value) => setPrivacy({...privacy, analytics: value})}
                  label="Usage Analytics"
                  description="Help improve our services with usage data"
                />
                
                <ToggleSwitch
                  enabled={privacy.marketing}
                  onChange={(value) => setPrivacy({...privacy, marketing: value})}
                  label="Marketing Communications"
                  description="Receive personalized marketing content"
                />
              </div>
            </SettingCard>

            <SettingCard title="Security Settings" description="Manage your account security">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 space-y-3 md:space-y-0">
                  <div>
                    <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                    <p className="text-sm text-gray-600">Add an extra layer of security</p>
                  </div>
                  <button className="w-full md:w-auto px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors text-sm">
                    Enable 2FA
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 space-y-3 md:space-y-0">
                  <div>
                    <p className="font-medium text-gray-900">Login History</p>
                    <p className="text-sm text-gray-600">View recent login activity</p>
                  </div>
                  <button className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                    View History
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row md:items-center justify-between py-3 space-y-3 md:space-y-0">
                  <div>
                    <p className="font-medium text-gray-900">Active Sessions</p>
                    <p className="text-sm text-gray-600">Manage logged in devices</p>
                  </div>
                  <button className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm">
                    Manage Sessions
                  </button>
                </div>
              </div>
            </SettingCard>
          </div>
        );

      case 'preferences':
        return (  
          <SettingCard title="App Preferences" description="Customize your app experience">
            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div className="flex-1 pr-4">
                  <p className="font-medium text-gray-900">Dark Mode</p>
                  <p className="text-sm text-gray-600">Switch to dark theme</p>
                </div>
                <div className="flex items-center space-x-3">
                  <Sun className="w-4 h-4 text-gray-500" />
                  <button
                    onClick={() => setIsDarkMode(!isDarkMode)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                      isDarkMode ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform shadow-lg ${
                        isDarkMode ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                  <Moon className="w-4 h-4 text-gray-500" />
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between py-3 space-y-3 md:space-y-0">
                <div>
                  <p className="font-medium text-gray-900">Language</p>
                  <p className="text-sm text-gray-600">Choose your preferred language</p>
                </div>
                <select className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="en">English</option>
                  <option value="ne">नेपाली</option>
                  <option value="hi">हिंदी</option>
                </select>
              </div>
              
              <div className="flex flex-col md:flex-row md:items-center justify-between py-3 space-y-3 md:space-y-0">
                <div>
                  <p className="font-medium text-gray-900">Time Zone</p>
                  <p className="text-sm text-gray-600">Set your local time zone</p>
                </div>
                <select className="w-full md:w-auto px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm">
                  <option value="Asia/Kathmandu">Asia/Kathmandu</option>
                  <option value="Asia/Kolkata">Asia/Kolkata</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>
          </SettingCard>
        );

      case 'billing':
        return (
          <div className="space-y-4 md:space-y-6">
            <SettingCard title="Payment Methods" description="Manage your payment information">
              <div className="space-y-4">
                <div className="border border-gray-200 rounded-xl p-4 bg-gradient-to-r from-blue-50 to-blue-100">
                  <div className="flex flex-col md:flex-row md:items-center justify-between space-y-3 md:space-y-0">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-8 h-8 text-blue-600" />
                      <div>
                        <p className="font-semibold text-gray-900">**** **** **** 1234</p>
                        <p className="text-sm text-gray-600">Expires 12/26</p>
                      </div>
                    </div>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium self-start md:self-center">
                      Primary
                    </span>
                  </div>
                </div>
                
                <button className="w-full p-4 border-2 border-dashed border-gray-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 text-center">
                  <CreditCard className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                  <span className="text-sm font-medium text-gray-600">Add New Payment Method</span>
                </button>
              </div>
            </SettingCard>

            <SettingCard title="Billing History" description="View your past transactions">
              <div className="space-y-3">
                {[
                  { date: 'Dec 15, 2024', description: 'Video Consultation - Dr. Rajesh Sharma', amount: '₹800', status: 'Completed' },
                  { date: 'Dec 10, 2024', description: 'Prescription Medicine Order', amount: '₹450', status: 'Completed' },
                  { date: 'Dec 5, 2024', description: 'Lab Tests - Complete Blood Count', amount: '₹1,200', status: 'Completed' }
                ].map((transaction, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-gray-50 rounded-xl space-y-2 md:space-y-0">
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm md:text-base">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.date}</p>
                    </div>
                    <div className="flex items-center justify-between md:block md:text-right">
                      <p className="font-semibold text-gray-900">{transaction.amount}</p>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full ml-2 md:ml-0 md:mt-1">
                        {transaction.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </SettingCard>
          </div>
        );

      case 'support':
        return (
          <div className="space-y-4 md:space-y-6">
            <SettingCard title="Help Center" description="Get help and support">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { title: 'FAQ', description: 'Common questions and answers', icon: HelpCircle },
                  { title: 'Contact Support', description: '24/7 customer support', icon: Smartphone },
                  { title: 'Video Tutorials', description: 'Learn how to use the app', icon: Globe },
                  { title: 'Community Forum', description: 'Connect with other users', icon: User }
                ].map((item, idx) => (
                  <button
                    key={idx}
                    className="p-4 md:p-6 border border-gray-200 rounded-xl hover:shadow-lg transition-all duration-200 text-left group"
                  >
                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-2 md:space-y-3">
                      <item.icon className="w-8 h-8 text-blue-600 mb-1 md:mb-0 group-hover:scale-110 transition-transform" />
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1 md:mb-2">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </SettingCard>

            <SettingCard title="App Information" description="Version and legal information">
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm md:text-base">App Version</span>
                  <span className="font-medium text-gray-900">2.1.0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 text-sm md:text-base">Last Updated</span>
                  <span className="font-medium text-gray-900">Aug 13, 2025</span>
                </div>
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium p-2 hover:bg-blue-50 rounded-lg transition-colors text-center md:text-left">
                      Terms of Service
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium p-2 hover:bg-blue-50 rounded-lg transition-colors text-center md:text-left">
                      Privacy Policy
                    </button>
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium p-2 hover:bg-blue-50 rounded-lg transition-colors text-center md:text-left">
                      Licenses
                    </button>
                  </div>
                </div>
              </div>
            </SettingCard>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      
      {/* Main content area */}
      <div className="flex flex-col flex-1 overflow-auto pb-16">
        <Header toggleSidebar={toggleSidebar} />

        <main className="p-6 space-y-8 overflow-auto">
          {/* Desktop Layout */}
          <div className="hidden lg:flex gap-6">
            {renderDesktopNavigation()}
            
            <div className="flex-1">
              {renderTabContent()}
            </div>
          </div>

          {/* Mobile/Tablet Layout */}
          <div className="lg:hidden space-y-6">
            {/* Mobile Tab Navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
              <div className="grid grid-cols-2 gap-3">
                {tabs.map((tab) => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`p-4 rounded-xl border transition-all duration-200 text-left ${
                      activeTab === tab.key
                        ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white border-blue-600 shadow-lg'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }`}
                  >
                    <div className="flex flex-col items-center text-center space-y-2">
                      <div className={`p-3 rounded-xl transition-all ${
                        activeTab === tab.key 
                          ? 'bg-white/20' 
                          : 'bg-gradient-to-br from-blue-50 to-blue-100'
                      }`}>
                        <tab.icon className={`w-6 h-6 ${
                          activeTab === tab.key ? 'text-white' : 'text-blue-600'
                        }`} />
                      </div>
                      <div>
                        <h3 className={`font-semibold text-sm ${
                          activeTab === tab.key ? 'text-white' : 'text-gray-900'
                        }`}>{tab.label}</h3>
                        <p className={`text-xs mt-1 ${
                          activeTab === tab.key ? 'text-blue-100' : 'text-gray-500'
                        }`}>{tab.desc}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Mobile Tab Content */}
            <div>
              {renderTabContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile bottom nav */}
      <MobileBottomNav />
    </div>
  );
};

export default Settings;  