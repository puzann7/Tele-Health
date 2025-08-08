const express = require('express');
const passport = require('passport');
const router = express.Router();

// Rate limiting for authentication routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 50, // Limit each IP to 5 requests per windowMs
  message: {
    status: 'error',
    message: 'Too many authentication attempts, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

const passwordResetLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 password reset requests per hour
  message: {
    status: 'error',
    message: 'Too many password reset attempts, please try again later.'
  }
});

// ============================================
// BASIC AUTHENTICATION ROUTES
// ============================================

// @route   POST /api/auth/signup
// @desc    Register a new user
// @access  Public
router.post('/signup', authLimiter, validateSignup, authController.signup);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', authLimiter, validateLogin, authController.login);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Public
router.post('/logout', authController.logout);

// ============================================
// EMAIL VERIFICATION ROUTES
// ============================================

// @route   GET /api/auth/verify-email/:token
// @desc    Verify user email
// @access  Public
router.get('/verify-email/:token', authController.verifyEmail);

// @route   POST /api/auth/resend-verification
// @desc    Resend email verification
// @access  Public
router.post('/resend-verification', passwordResetLimiter, authController.resendVerificationEmail);

// ============================================
// PASSWORD RESET ROUTES
// ============================================

// @route   POST /api/auth/forgot-password
// @desc    Send password reset email
// @access  Public
router.post('/forgot-password', passwordResetLimiter, validateForgotPassword, authController.forgotPassword);

// @route   PATCH /api/auth/reset-password/:token
// @desc    Reset password with token
// @access  Public
router.patch('/reset-password/:token', authLimiter, validateResetPassword, authController.resetPassword);

// ============================================
// PROTECTED ROUTES (require authentication)
// ============================================

// @route   GET /api/auth/me
// @desc    Get current user profile
// @access  Private
router.get('/me', protect, authController.getMe);

// @route   PATCH /api/auth/update-password
// @desc    Update password for logged in user
// @access  Private
router.patch('/update-password', protect, validateUpdatePassword, authController.updatePassword);

// ============================================
// GOOGLE OAUTH ROUTES
// ============================================

// @route   GET /api/auth/google
// @desc    Start Google OAuth flow
// @access  Public
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, redirect to frontend
    res.redirect('http://localhost:3000/dashboard');
  }
);

// Get current user
router.get('/current_user', (req, res) => {
  res.json(req.user);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.redirect('http://localhost:3000');
  });
});

module.exports = router;