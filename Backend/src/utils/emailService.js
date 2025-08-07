// utils/emailService.js
import dotenv from 'dotenv';
// Ensure environment variables are loaded
dotenv.config();

import nodemailer from 'nodemailer';

const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

const sendEmail = async (options) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `Telemedicine Nepal <${process.env.EMAIL_USER}>`,
      to: options.email,
      subject: options.subject,
      text: options.message,
      html: options.html,
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('There was an error sending the email. Try again later.');
  }
};

const sendWelcomeEmail = async (user, verificationToken) => {
  const verificationURL = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Telemedicine Nepal</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #2c5aa0; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to Telemedicine Nepal!</h1>
            </div>
            <div class="content">
                <h2>नमस्कार ${user.firstName} ${user.lastName}!</h2>
                <p>Thank you for joining Telemedicine Nepal - connecting patients with qualified doctors across Nepal.</p>
                <p>To complete your registration and start accessing our services, please verify your email address by clicking the button below:</p>
                <div style="text-align: center;">
                    <a href="${verificationURL}" class="button">Verify Email Address</a>
                </div>
                <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background-color: #f0f0f0; padding: 10px; border-radius: 3px;">
                    ${verificationURL}
                </p>
                <p><strong>This verification link will expire in 24 hours.</strong></p>
                <p>If you didn't create an account with us, please ignore this email.</p>
                <p>Best regards,<br>The Telemedicine Nepal Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Telemedicine Nepal. All rights reserved.</p>
                <p>स्वास्थ्य सेवामा नेपालको पहिलो डिजिटल प्लेटफर्म</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const message = `Welcome to Telemedicine Nepal!

Hello ${user.firstName} ${user.lastName},

Thank you for joining Telemedicine Nepal. To complete your registration, please verify your email address by visiting:

${verificationURL}

This link will expire in 24 hours.

If you didn't create an account with us, please ignore this email.

Best regards,
The Telemedicine Nepal Team`;

  await sendEmail({
    email: user.email,
    subject: 'Welcome to Telemedicine Nepal - Please verify your email',
    message,
    html,
  });
};

const sendPasswordResetEmail = async (user, resetToken) => {
  const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;

  const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Password Reset - Telemedicine Nepal</title>
        <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc3545; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background-color: #f9f9f9; }
            .button { display: inline-block; background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; padding: 20px; font-size: 12px; color: #666; }
            .warning { background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Password Reset Request</h1>
            </div>
            <div class="content">
                <h2>Hello ${user.firstName},</h2>
                <p>We received a request to reset your password for your Telemedicine Nepal account.</p>
                <div class="warning">
                    <strong>⚠️ Important Security Notice:</strong>
                    <p>If you did not request this password reset, please ignore this email and ensure your account is secure.</p>
                </div>
                <p>To reset your password, click the button below:</p>
                <div style="text-align: center;">
                    <a href="${resetURL}" class="button">Reset My Password</a>
                </div>
                <p>If the button doesn't work, you can also copy and paste this link into your browser:</p>
                <p style="word-break: break-all; background-color: #f0f0f0; padding: 10px; border-radius: 3px;">
                    ${resetURL}
                </p>
                <p><strong>This password reset link will expire in 10 minutes for security reasons.</strong></p>
                <p>Best regards,<br>The Telemedicine Nepal Team</p>
            </div>
            <div class="footer">
                <p>&copy; 2025 Telemedicine Nepal. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
  `;

  const message = `Password Reset Request - Telemedicine Nepal

Hello ${user.firstName},

We received a request to reset your password. If you did not request this, please ignore this email.

To reset your password, visit: ${resetURL}

This link will expire in 10 minutes.

Best regards,
The Telemedicine Nepal Team`;

  await sendEmail({
    email: user.email,
    subject: 'Password Reset Request - Telemedicine Nepal',
    message,
    html,
  });
};

export {
  sendEmail,
  sendWelcomeEmail,
  sendPasswordResetEmail,
};
