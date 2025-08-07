// controllers/authController.js
import crypto from 'crypto';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { createSendToken } from '../middlewares/auth.js';
import { sendWelcomeEmail, sendPasswordResetEmail } from '../utils/emailService.js';

// Error handling wrapper
const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

// Sign up new user
const signup = catchAsync(async (req, res, next) => {
  const { firstName, lastName, email, phoneNumber, password, role } = req.body;

  // Create new user
  const newUser = await User.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    role: role || 'patient'
  });

  // Generate email verification token
  const verifyToken = newUser.createEmailVerificationToken();
  await newUser.save({ validateBeforeSave: false });

  try {
    // Send welcome email with verification link
    await sendWelcomeEmail(newUser, verifyToken);

    res.status(201).json({
      status: 'success',
      message: 'User registered successfully! Please check your email to verify your account.',
      data: {
        user: {
          id: newUser._id,
          firstName: newUser.firstName,
          lastName: newUser.lastName,
          email: newUser.email,
          role: newUser.role,
          isVerified: newUser.isVerified
        }
      }
    });
  } catch (err) {
    // If email fails, delete the user and reset tokens
    newUser.emailVerificationToken = undefined;
    newUser.emailVerificationExpires = undefined;
    await newUser.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: 'error',
      message: 'There was an error sending the verification email. Please try again.'
    });
  }
});

// Login user
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password'
    });
  }

  // Check if user is active
  if (!user.isActive) {
    return res.status(401).json({
      status: 'fail',
      message: 'Your account has been deactivated. Please contact support.'
    });
  }

  // Update last login
  user.lastLogin = new Date();
  await user.save({ validateBeforeSave: false });

  // If everything ok, send token to client
  createSendToken(user, 200, res);
});

// Logout user
const logout = (req, res) => {
  res.cookie('jwt', 'loggedout', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true
  });

  res.status(200).json({
    status: 'success',
    message: 'Logged out successfully'
  });
};

// Verify email
const verifyEmail = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken: hashedToken,
    emailVerificationExpires: { $gt: Date.now() }
  });

  // If token has not expired, and there is a user, verify the email
  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'Token is invalid or has expired'
    });
  }

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  res.status(200).json({
    status: 'success',
    message: 'Email verified successfully! You can now access all features.'
  });
});

// Forgot password
const forgotPassword = catchAsync(async (req, res, next) => {
  // Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'There is no user with that email address.'
    });
  }

  // Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendPasswordResetEmail(user, resetToken);

    res.status(200).json({
      status: 'success',
      message: 'Password reset link sent to your email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: 'error',
      message: 'There was an error sending the email. Try again later.'
    });
  }
});

// Reset password
const resetPassword = catchAsync(async (req, res, next) => {
  // Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // If token has not expired, and there is a user, set the new password
  if (!user) {
    return res.status(400).json({
      status: 'fail',
      message: 'Token is invalid or has expired'
    });
  }

  user.password = req.body.password;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // Log the user in, send JWT
  createSendToken(user, 200, res);
});

// Update password (for logged in users)
const updatePassword = catchAsync(async (req, res, next) => {
  // Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.currentPassword, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Your current password is incorrect.'
    });
  }

  // If so, update password
  user.password = req.body.newPassword;
  await user.save();

  // Log user in, send JWT
  createSendToken(user, 200, res);
});

// Get current user
const getMe = catchAsync(async (req, res, next) => {
  res.status(200).json({
    status: 'success',
    data: {
      user: req.user
    }
  });
});

// Resend verification email
const resendVerificationEmail = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).json({
      status: 'fail',
      message: 'No user found with that email address.'
    });
  }

  if (user.isVerified) {
    return res.status(400).json({
      status: 'fail',
      message: 'This account is already verified.'
    });
  }

  // Generate new verification token
  const verifyToken = user.createEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  try {
    await sendWelcomeEmail(user, verifyToken);

    res.status(200).json({
      status: 'success',
      message: 'Verification email sent successfully!'
    });
  } catch (err) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return res.status(500).json({
      status: 'error',
      message: 'There was an error sending the email. Try again later.'
    });
  }
});

// Google OAuth success callback
const googleSuccess = catchAsync(async (req, res) => {
  // Check if user needs to complete their profile
  const needsProfileCompletion = !req.user.phoneNumber || req.user.phoneNumber === '0000000000';

  // Generate JWT token
  createSendToken(req.user, 200, res);
});

// Google OAuth failure callback
const googleFailure = (req, res) => {
  res.status(401).json({
    status: 'fail',
    message: 'Google authentication failed'
  });
};

export default {
  signup,
  login,
  logout,
  verifyEmail,
  forgotPassword,
  resetPassword,
  updatePassword,
  getMe,
  resendVerificationEmail,
  googleSuccess,
  googleFailure
};
