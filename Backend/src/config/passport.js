// config/passport.js
import dotenv from 'dotenv';
// Ensure environment variables are loaded
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

// Serialize user

passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Google OAuth Strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/auth/google/callback'
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user already exists with this Google ID
        let existingUser = await User.findOne({ googleId: profile.id });

        if (existingUser) {
          // Update last login
          existingUser.lastLogin = new Date();
          await existingUser.save();
          return done(null, existingUser);
        }

        // Check if user exists with same email
        existingUser = await User.findOne({ email: profile.emails[0].value });

        if (existingUser) {
          // Link Google account to existing user
          existingUser.googleId = profile.id;
          existingUser.isVerified = true; // Google accounts are pre-verified
          existingUser.lastLogin = new Date();

          // Update profile picture if not set
          if (!existingUser.profilePicture && profile.photos && profile.photos.length > 0) {
            existingUser.profilePicture = profile.photos[0].value;
          }

          await existingUser.save();
          return done(null, existingUser);
        }

        // Create new user
        const newUser = await User.create({
          googleId: profile.id,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.emails[0].value,
          profilePicture: profile.photos && profile.photos.length > 0 ? profile.photos[0].value : '',
          isVerified: true, // Google accounts are pre-verified
          lastLogin: new Date(),
          phoneNumber: '0000000000', // Placeholder - will be updated in profile completion
        });

        done(null, newUser);
      } catch (error) {
        console.error('Google OAuth Error:', error);
        done(error, null);
      }
    }
  )
);

export default passport
