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
async function sendPasswordResetEmail(userEmail, resetToken, firstName) {
  const baseUrl = process.env.CLIENT_URL || "http://localhost:3000";
  const resetLink = `${baseUrl}/reset-password/${resetToken}`;

  const mailOptions = {
    from: `"TAYE'S PROPERTY" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: "Reset Your Password",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #b8860b;">Reset Your Password</h2>
        <p>Hello ${firstName || "there"}!</p>
        <p>We received a request to reset your password. Click the link below to set a new password:</p>
        <a href="${resetLink}" style="display: inline-block; background-color: #b8860b; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin: 20px 0;">
          Reset Password
        </a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
        <hr />
        <p style="font-size: 12px; color: #666;">TAYE'S PROPERTY & REALTY SOLUTIONS</p>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Password reset email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    return { success: false, error: error.message };
  }
}

//function to send reference letter email
async function sendReferenceLetterEmail(userEmail, userName, referenceNumber, pdfUrl, purpose) {
  const mailOptions = {
    from: `"TAYE'S PROPERTY" <${process.env.EMAIL_USER}>`,
    to: userEmail,
    subject: `Your Reference Letter - ${referenceNumber}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <div style="text-align: center; border-bottom: 2px solid #b8860b; padding-bottom: 15px; margin-bottom: 20px;">
          <h1 style="color: #1a1a2e; font-size: 24px; margin: 0;">
            TAYE'S <span style="color: #b8860b;">PROPERTY</span>
          </h1>
          <p style="color: #666; font-size: 14px; margin: 5px 0 0;">& REALTY SOLUTIONS</p>
        </div>
        
        <div style="padding: 0 10px;">
          <p style="font-size: 16px; color: #333;">Dear <strong>${userName}</strong>,</p>
          
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Your reference letter has been generated successfully. Please find the details below:
          </p>
          
          <div style="background: #f9f9f9; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #b8860b;">
            <p style="margin: 5px 0; font-size: 14px;"><strong>Reference Number:</strong> ${referenceNumber}</p>
            ${purpose ? `<p style="margin: 5px 0; font-size: 14px;"><strong>Purpose:</strong> ${purpose}</p>` : ''}
            <p style="margin: 5px 0; font-size: 14px;"><strong>Generated:</strong> ${new Date().toLocaleDateString()}</p>
          </div>
          
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            You can download your reference letter using the button below:
          </p>
          
          <div style="text-align: center; margin: 25px 0;">
            <a href="${pdfUrl}" 
               style="display: inline-block; background: linear-gradient(135deg, #b8860b 0%, #9c6e0a 100%); 
                      color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; 
                      font-weight: 600; font-size: 16px;">
              📄 Download Reference Letter
            </a>
          </div>
          
          <div style="background: #fff3e0; padding: 12px 15px; border-radius: 6px; margin: 15px 0;">
            <p style="font-size: 13px; color: #666; margin: 0;">
              <strong>📌 Note:</strong> Please download and save your letter.
            </p>
          </div>
          
          <p style="font-size: 14px; color: #555; line-height: 1.6; margin-top: 15px;">
            If you have any questions, please don't hesitate to contact our office.
          </p>
          
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Best regards,<br />
            <strong style="color: #b8860b;">TAYE'S PROPERTY Team</strong>
          </p>
        </div>
        
        <div style="border-top: 1px solid #eee; padding-top: 15px; margin-top: 20px; text-align: center;">
          <p style="font-size: 12px; color: #999; margin: 0;">
            TAYE'S PROPERTY & REALTY SOLUTIONS<br />
            This is an automated email. Please do not reply.
          </p>
        </div>
      </div>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Reference letter email sent to ${userEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send reference letter email:", error);
    return { success: false, error: error.message };
  }
}

// ============================================
// NEW ADVANCED VERIFICATION FUNCTIONS
// ============================================

// NEW: Advanced Verification Email (Professional Template)
async function sendAdvancedVerificationEmail(userEmail, verificationToken, firstName) {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
  const currentYear = new Date().getFullYear();

  const mailOptions = {
    from: '"TAYE\'S PROPERTY" <support@tayespropertyandrealtysolution.com>',
    to: userEmail,
    subject: "🔐 Verify Your Email Address - TAYE'S PROPERTY",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Verify Your Email</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 0;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #b8860b 0%, #8b6914 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
          }
          .header h1 {
            color: #ffffff;
            font-size: 28px;
            margin: 0;
            font-weight: 700;
            letter-spacing: 1px;
          }
          .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin: 8px 0 0;
            font-weight: 300;
          }
          .header .shield-icon {
            font-size: 48px;
            display: block;
            margin-bottom: 10px;
          }
          .content {
            padding: 40px 35px;
            background: #ffffff;
          }
          .greeting {
            font-size: 18px;
            color: #1a1a2e;
            margin-bottom: 16px;
          }
          .greeting strong {
            color: #b8860b;
          }
          .message {
            font-size: 15px;
            color: #555;
            line-height: 1.8;
            margin-bottom: 25px;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #b8860b 0%, #8b6914 100%);
            color: #ffffff !important;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
          }
          .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(184, 134, 11, 0.4);
          }
          .link-container {
            background: #f8f9fa;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #b8860b;
            word-break: break-all;
          }
          .link-container p {
            margin: 0 0 6px 0;
            font-size: 13px;
            color: #666;
          }
          .link-container a {
            color: #b8860b;
            text-decoration: none;
            font-size: 14px;
            word-break: break-all;
          }
          .info-box {
            background: #fff8f0;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 25px 0;
            border: 1px solid #f0e6d3;
          }
          .info-box p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
          .info-box strong {
            color: #b8860b;
          }
          .divider {
            border: none;
            height: 1px;
            background: #e9ecef;
            margin: 30px 0;
          }
          .footer {
            padding: 25px 35px;
            background: #f8f9fa;
            text-align: center;
            border-top: 1px solid #e9ecef;
          }
          .footer p {
            margin: 4px 0;
            font-size: 13px;
            color: #999;
          }
          .footer .brand {
            color: #b8860b;
            font-weight: 600;
          }
          .security-badge {
            display: inline-block;
            background: #e8f5e9;
            color: #2e7d32;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            margin-top: 8px;
          }
          @media (max-width: 480px) {
            .container {
              margin: 20px 10px;
            }
            .header {
              padding: 30px 20px;
            }
            .header h1 {
              font-size: 22px;
            }
            .content {
              padding: 25px 20px;
            }
            .verify-button {
              padding: 14px 28px;
              font-size: 15px;
              display: block;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <!-- Header -->
          <div class="header">
            <span class="shield-icon">🛡️</span>
            <h1>TAYE'S PROPERTY</h1>
            <p>&amp; REALTY SOLUTIONS</p>
          </div>

          <!-- Content -->
          <div class="content">
            <div class="greeting">
              Hello <strong>${firstName || "Valued Client"}!</strong>
            </div>

            <p class="message">
              Thank you for choosing <strong>TAYE'S PROPERTY &amp; REALTY SOLUTIONS</strong>. 
              To get started and secure your account, please verify your email address.
            </p>

            <div class="button-container">
              <a href="${verificationLink}" class="verify-button">
                ✅ Verify Email Address
              </a>
            </div>

            <div class="link-container">
              <p>📋 Or copy and paste this link into your browser:</p>
              <a href="${verificationLink}">${verificationLink}</a>
            </div>

            <div class="info-box">
              <p>
                <strong>⏰ Time-Sensitive:</strong> This verification link will expire in 
                <strong>24 hours</strong> for your security.
              </p>
            </div>

            <hr class="divider" />

            <div style="font-size: 14px; color: #666; text-align: center;">
              <p style="margin: 0;">
                <span style="display: inline-block; background: #e3f2fd; color: #1565c0; padding: 2px 10px; border-radius: 12px; font-size: 12px;">
                  🔒 Secure &amp; Encrypted
                </span>
              </p>
            </div>

            <p style="font-size: 13px; color: #999; text-align: center; margin-top: 20px;">
              If you didn't create an account with us, please ignore this email.<br />
              No changes will be made to your information.
            </p>
          </div>

          <!-- Footer -->
          <div class="footer">
            <p class="brand">TAYE'S PROPERTY &amp; REALTY SOLUTIONS</p>
            <p>Building Dreams, Delivering Trust</p>
            <p style="font-size: 12px; margin-top: 8px;">
              This is an automated message. Please do not reply to this email.
            </p>
            <div class="security-badge">
              © ${currentYear} All Rights Reserved
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Advanced verification email sent to ${userEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send advanced verification email:", error);
    return { success: false, error: error.message };
  }
}

// NEW: Advanced Resend Verification Email (Professional Template)
async function sendAdvancedResendVerificationEmail(userEmail, verificationToken, firstName) {
  const verificationLink = `${process.env.CLIENT_URL}/verify-email/${verificationToken}`;
  const currentYear = new Date().getFullYear();

  const mailOptions = {
    from: '"TAYE\'S PROPERTY" <support@tayespropertyandrealtysolution.com>',
    to: userEmail,
    subject: "🔄 Resend: Verify Your Email - TAYE'S PROPERTY",
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Resend Verification Email</title>
        <style>
          body {
            font-family: 'Segoe UI', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 0;
            background-color: #f8f9fa;
          }
          .container {
            max-width: 600px;
            margin: 40px auto;
            padding: 0;
            background: #ffffff;
            border-radius: 16px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #b8860b 0%, #8b6914 100%);
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            color: #ffffff;
            font-size: 28px;
            margin: 0;
            font-weight: 700;
          }
          .header p {
            color: rgba(255, 255, 255, 0.9);
            font-size: 16px;
            margin: 8px 0 0;
          }
          .content {
            padding: 40px 35px;
            background: #ffffff;
          }
          .greeting {
            font-size: 18px;
            color: #1a1a2e;
            margin-bottom: 16px;
          }
          .greeting strong {
            color: #b8860b;
          }
          .message {
            font-size: 15px;
            color: #555;
            line-height: 1.8;
            margin-bottom: 25px;
          }
          .resend-badge {
            display: inline-block;
            background: #fff3e0;
            color: #e65100;
            padding: 6px 16px;
            border-radius: 20px;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 20px;
          }
          .button-container {
            text-align: center;
            margin: 35px 0;
          }
          .verify-button {
            display: inline-block;
            background: linear-gradient(135deg, #b8860b 0%, #8b6914 100%);
            color: #ffffff !important;
            padding: 16px 40px;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(184, 134, 11, 0.3);
          }
          .verify-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(184, 134, 11, 0.4);
          }
          .link-container {
            background: #f8f9fa;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 20px 0;
            border-left: 4px solid #b8860b;
            word-break: break-all;
          }
          .link-container a {
            color: #b8860b;
            text-decoration: none;
            font-size: 14px;
          }
          .info-box {
            background: #fff8f0;
            padding: 16px 20px;
            border-radius: 8px;
            margin: 25px 0;
            border: 1px solid #f0e6d3;
          }
          .info-box p {
            margin: 0;
            font-size: 14px;
            color: #666;
          }
          .info-box strong {
            color: #b8860b;
          }
          .divider {
            border: none;
            height: 1px;
            background: #e9ecef;
            margin: 30px 0;
          }
          .footer {
            padding: 25px 35px;
            background: #f8f9fa;
            text-align: center;
            border-top: 1px solid #e9ecef;
          }
          .footer p {
            margin: 4px 0;
            font-size: 13px;
            color: #999;
          }
          .footer .brand {
            color: #b8860b;
            font-weight: 600;
          }
          .security-badge {
            display: inline-block;
            background: #e8f5e9;
            color: #2e7d32;
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 12px;
            font-weight: 500;
            margin-top: 8px;
          }
          @media (max-width: 480px) {
            .container {
              margin: 20px 10px;
            }
            .header {
              padding: 30px 20px;
            }
            .content {
              padding: 25px 20px;
            }
            .verify-button {
              padding: 14px 28px;
              font-size: 15px;
              display: block;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>TAYE'S PROPERTY</h1>
            <p>&amp; REALTY SOLUTIONS</p>
          </div>

          <div class="content">
            <div style="text-align: center;">
              <span class="resend-badge">🔄 Resend Request</span>
            </div>

            <div class="greeting">
              Hello <strong>${firstName || "Valued Client"}!</strong>
            </div>

            <p class="message">
              We received a request to resend your verification email. 
              Please verify your email address using the link below:
            </p>

            <div class="button-container">
              <a href="${verificationLink}" class="verify-button">
                ✅ Verify Email Address
              </a>
            </div>

            <div class="link-container">
              <p>📋 Or copy and paste this link:</p>
              <a href="${verificationLink}">${verificationLink}</a>
            </div>

            <div class="info-box">
              <p>
                <strong>⏰ Time-Sensitive:</strong> This link will expire in 
                <strong>24 hours</strong>.
              </p>
            </div>

            <hr class="divider" />

            <p style="font-size: 13px; color: #999; text-align: center;">
              If you didn't request this, please ignore this email.
            </p>
          </div>

          <div class="footer">
            <p class="brand">TAYE'S PROPERTY &amp; REALTY SOLUTIONS</p>
            <p>Building Dreams, Delivering Trust</p>
            <div class="security-badge">
              © ${currentYear} All Rights Reserved
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`✅ Advanced resend verification email sent to ${userEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("❌ Failed to send advanced resend verification email:", error);
    return { success: false, error: error.message };
  }
}


module.exports = {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendReferenceLetterEmail,
  sendAdvancedVerificationEmail,
  sendAdvancedResendVerificationEmail,
};
