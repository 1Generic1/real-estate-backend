const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const express = require("express");

// Import routes
const companyRoutes = require("./routes/company.routes");
const adminRoutes = require("./routes/admin/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminUserRoutes = require("./routes/admin/user.routes");
const adminReferenceUserRoutes = require("./routes/admin/adminuser.routes");
const propertyRoutes = require("./routes/propertyRoutes");
const testimonialRoutes = require("./routes/testimonial.routes");
const inquiryRoutes = require("./routes/inquiry.routes");
const newsletterRoutes = require("./routes/newsletter.routes");
const agentRoutes = require("./routes/agent.routes");

// Load environment variables
dotenv.config();

// Import models
const Admin = require("./models/Admin.model");
const Company = require("./models/Company.model");

// Import middleware
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

// Initialize express
const app = express();
const PORT = process.env.PORT || 5000;

// ============================================
// 🎯 SOCIAL MEDIA PREVIEW HANDLER (ADD THIS HERE - BEFORE CORS AND OTHER MIDDLEWARE)
// ============================================

app.use((req, res, next) => {
    // Check if the request is from a social media crawler/bot
    const userAgent = req.headers['user-agent'] || '';
    const isCrawler = /bot|crawler|spider|facebookexternalhit|Twitterbot|LinkedInBot|WhatsApp|Snapchat|TelegramBot|Pinterest|Slack|Discord|Slackbot|Googlebot|Bingbot/i.test(userAgent);
    
    // Only handle crawlers requesting the main page or property pages
    const isMainPage = req.path === '/' || req.path === '';
    const isPropertyPage = req.path.startsWith('/property/');
    
    if (isCrawler && (isMainPage || isPropertyPage)) {
        // For property pages, you could dynamically set the title and image
        let pageTitle = "Taye's Property & Realty Solution";
        let pageDescription = "Find your dream property with Taye's Property & Realty Solution. Browse luxury homes, apartments, and commercial spaces in prime locations.";
        let pageImage = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&h=630&fit=crop";
        
        // If it's a property detail page, you could fetch property data here
        // For now, using default values
        
        // Send pre-rendered HTML with meta tags for social media
        return res.send(`
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="utf-8">
                <title>${pageTitle}</title>
                
                <!-- Primary Meta Tags -->
                <meta name="title" content="${pageTitle}">
                <meta name="description" content="${pageDescription}">
                
                <!-- Open Graph / Facebook -->
                <meta property="og:type" content="website">
                <meta property="og:url" content="https://tayespropertyandrealtysolution.com${req.path}">
                <meta property="og:title" content="${pageTitle}">
                <meta property="og:description" content="${pageDescription}">
                <meta property="og:image" content="${pageImage}">
                <meta property="og:site_name" content="Taye's Property & Realty Solution">
                
                <!-- Twitter -->
                <meta property="twitter:card" content="summary_large_image">
                <meta property="twitter:url" content="https://tayespropertyandrealtysolution.com${req.path}">
                <meta property="twitter:title" content="${pageTitle}">
                <meta property="twitter:description" content="${pageDescription}">
                <meta property="twitter:image" content="${pageImage}">
                
                <!-- WhatsApp / iMessage / SMS Preview -->
                <meta property="og:image:width" content="1200">
                <meta property="og:image:height" content="630">
                
                <!-- Favicon (optional - prevents 404 errors) -->
                <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏠</text></svg>">
                
                <style>
                    body {
                        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
                        text-align: center;
                        padding: 50px 20px;
                        background: #f5f5f5;
                        margin: 0;
                    }
                    .container {
                        max-width: 800px;
                        margin: 0 auto;
                        background: white;
                        border-radius: 16px;
                        padding: 40px;
                        box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                    }
                    img {
                        max-width: 100%;
                        border-radius: 12px;
                        margin: 20px 0;
                    }
                    h1 {
                        color: #1a1a2e;
                        font-size: 28px;
                    }
                    p {
                        color: #666;
                        font-size: 18px;
                        line-height: 1.5;
                    }
                    .logo {
                        font-size: 48px;
                        margin-bottom: 20px;
                    }
                </style>
            </head>
            <body>
                <div class="container">
                    <div class="logo">🏠</div>
                    <h1>${pageTitle}</h1>
                    <img src="${pageImage}" alt="${pageTitle}" style="max-width: 100%; border-radius: 12px;">
                    <p>${pageDescription}</p>
                    <p style="margin-top: 20px; font-size: 14px; color: #999;">
                        Loading the full experience...
                    </p>
                </div>
            </body>
            </html>
        `);
    }
    
    // Not a crawler - continue to your normal routes
    next();
});

// ============================================
// END OF SOCIAL MEDIA PREVIEW HANDLER
// ============================================

// Middlewares - COMPLETE CORS FIX
const cors = require('cors');

// Allow multiple origins
const allowedOrigins = [
  'https://tayespropertyandrealtysolution.com',     // Your custom domain (NO www)
  'https://www.tayespropertyandrealtysolution.com', // Your custom domain (WITH www)
  'https://beige-jay-506169.hostingersite.com',
  'https://steelblue-yak-507597.hostingersite.com',
  'http://localhost:3000'
];

// Configure CORS
app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log(`Blocked CORS request from: ${origin}`);
      callback(null, true); // TEMPORARILY allow all for testing
      // callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['Content-Length', 'X-Requested-With'],
  optionsSuccessStatus: 204
}));

// Ensure preflight requests are handled
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection - SINGLE CONNECTION ONLY
mongoose
  .connect(process.env.MONGODB_URI, {
    family: 4, // Force IPv4 to avoid DNS issues
  })
  .then(async () => {
    console.log("✅ Connected to MongoDB successfully!");

    // Initialize database with default data
    await initializeDatabase();
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Initialize database with default data
async function initializeDatabase() {
  try {
    // Check and create admin if none exists
    await ensureAdminExists();

    // Check and create company info if none exists
    await ensureCompanyExists();

    console.log("✅ Database initialization complete!");
  } catch (error) {
    console.error("❌ Error initializing database:", error);
  }
}

// Create default admin if none exists
async function ensureAdminExists() {
  try {
    const adminCount = await Admin.countDocuments();

    if (adminCount === 0) {
      console.log("⚠️ No admin found. Creating default admin...");

      const defaultAdmin = {
        username: process.env.ADMIN_USERNAME || "admin",
        email: process.env.ADMIN_EMAIL || "admin@tayesproperty.com",
        password: process.env.ADMIN_PASSWORD,
        role: "superadmin",
      };

      if (!defaultAdmin.password) {
        console.error("❌ ADMIN_PASSWORD not set in environment variables!");
        console.error("Please set ADMIN_PASSWORD in your .env file");
        process.exit(1);
      }

      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(
        defaultAdmin.password,
        saltRounds,
      );

      const admin = new Admin({
        username: defaultAdmin.username,
        email: defaultAdmin.email,
        password: hashedPassword,
        role: defaultAdmin.role,
        createdAt: new Date(),
      });

      await admin.save();
      console.log("✅ Default admin created successfully!");

      console.log("📍 Username:", defaultAdmin.username);
      console.log("📍 Email:", defaultAdmin.email);
      console.log("📍 Password: [from environment variable]");
    } else {
      console.log("✅ Admin user exists");
    }
  } catch (error) {
    console.error("❌ Error ensuring admin exists:", error);
  }
}

// Create default company info if none exists
async function ensureCompanyExists() {
  try {
    const companyCount = await Company.countDocuments();

    if (companyCount === 0) {
      console.log("⚠️ No company info found. Creating default company...");

      // Create default company with empty object (will use schema defaults)
      const defaultCompany = new Company({});
      await defaultCompany.save();

      console.log("✅ Default company information created!");
    } else {
      console.log("✅ Company information exists");
    }
  } catch (error) {
    console.error("❌ Error ensuring company exists:", error);
  }
}

// Basic route for testing
app.get("/", (req, res) => {
  res.json({
    message: "TAYE'S PROPERTY API is running",
    version: "1.0.0",
    environment: process.env.NODE_ENV,
  });
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date(),
    uptime: process.uptime(),
  });
});

// TEMPORARY TEST ENDPOINT - Add this before your routes
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Server is running!',
    env: {
      NODE_ENV: process.env.NODE_ENV,
      PORT: process.env.PORT,
      hasMongoURI: !!process.env.MONGODB_URI,
      hasJWT: !!process.env.JWT_SECRET,
      hasAdminPass: !!process.env.ADMIN_PASSWORD
    }
  });
});

// ==================== ROUTES ====================

app.use("/api", companyRoutes);

// Auth routes (login, verify, etc.)
app.use("/api/auth", adminRoutes);
app.use("/api/admin/users", adminUserRoutes); // Admin user management routes
app.use("/api/admin", adminReferenceUserRoutes); // Admin user management routes (reference letters, etc.)
app.use("/api/users", userRoutes); // User routes (profile, avatar upload, etc.)

// Property routes - PUBLIC (for frontend)
app.use("/api", propertyRoutes); // This handles GET /api/poperties, etc.
app.use("/api", testimonialRoutes);
app.use("/api", inquiryRoutes);
app.use("/api", newsletterRoutes);
app.use("/api", agentRoutes);
// Property routes - ADMIN (protected) - Note the /admin prefix
// Your propertyRoutes already have /admin routes defined, so this will create:
// /api/admin/properties, /api/admin/properties/:id, etc.
//app.use("/api/admin", propertyRoutes);

// You can also create a separate admin routes file for other admin functions
// app.use("/api/admin", adminRoutes);

// ==================== ERROR HANDLING ====================

// 404 handler for undefined routes
app.use(notFound);

// Global error handler
app.use(errorHandler);
// Catch unhandled errors
process.on('uncaughtException', (err) => {
  console.error('❌ Uncaught Exception:', err);
});

process.on('unhandledRejection', (err) => {
  console.error('❌ Unhandled Rejection:', err);
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API available at http://localhost:${PORT}/api`);
  console.log(`🔍 Health check at http://localhost:${PORT}/health`);
});