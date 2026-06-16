// server/src/services/emailService.js
const nodemailer = require("nodemailer");

// Create transporter with Zoho SMTP settings
const transporter = nodemailer.createTransport({
  host: "smtppro.zoho.com",
  port: 465,
  secure: true, // true for port 465
  auth: {
    user: process.env.EMAIL_USER, // Your Zoho email address
    pass: process.env.EMAIL_PASS, // The password for this mailbox
  },
});

// Function to send verification email
async function sendVerificationEmail(userEmail, verificationToken, firstName) {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;

  const mailOptions = {
    from: '"TAYE\'S PROPERTY" <support@tayespropertyandrealtysolution.com>',
    to: userEmail,
    subject: "Verify Your Email Address",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b8860b;">Hello ${firstName || "there"}!</h2>
        <p>Welcome to TAYE'S PROPERTY AND REALTY SOLUTION!</p>
        <p>Please verify your email address by clicking the link below:</p>
        <a href="${verificationLink}" style="display: inline-block; background-color: #b8860b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Verify Email
        </a>
        <p>Or copy and paste this link into your browser:</p>
        <p style="word-break: break-all;">${verificationLink}</p>
        <p>This link will expire in 24 hours.</p>
        <hr />
        <p style="font-size: 12px; color: #666;">TAYE'S PROPERTY & REALTY SOLUTIONS</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Verification email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: error.message };
  }
}

// Function to send password reset email
async function sendPasswordResetEmail(userEmail, resetToken) {
  const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  const mailOptions = {
    from: '"TAYE\'S PROPERTY" <support@tayespropertyandrealtysolution.com>',
    to: userEmail,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b8860b;">Password Reset Request</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #b8860b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    return { success: false, error: error.message };
  }
}

module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
};
