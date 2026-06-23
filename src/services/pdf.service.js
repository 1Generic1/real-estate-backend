const puppeteer = require("puppeteer");
const handlebars = require("handlebars");
const fs = require("fs").promises;
const path = require("path");
const os = require("os");

// Compile Handlebars template
let compiledTemplate = null;

const getTemplate = async () => {
  if (!compiledTemplate) {
    const templatePath = path.join(
      __dirname,
      "../templates/reference-letter.hbs",
    );
    const html = await fs.readFile(templatePath, "utf-8");
    compiledTemplate = handlebars.compile(html);
  }
  return compiledTemplate;
};

// ✅ Get platform-specific executable path
const getExecutablePath = () => {
  const platform = os.platform();
  
  if (platform === 'win32') {
    // Windows - check common Chrome installation paths
    const commonPaths = [
      'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
      'C:\\Users\\' + process.env.USERNAME + '\\AppData\\Local\\Google\\Chrome\\Application\\chrome.exe',
    ];
    for (const p of commonPaths) {
      try {
        if (require('fs').existsSync(p)) {
          return p;
        }
      } catch (e) {}
    }
    return null; // Let Puppeteer find it automatically
  } else if (platform === 'linux') {
    // Linux (VPS) - use system Chromium
    return '/usr/bin/chromium-browser';
  } else if (platform === 'darwin') {
    // macOS
    return '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  }
  
  // Fallback - let Puppeteer find it
  return null;
};

const generateReferenceLetterPDF = async (data) => {
  let browser = null;

  try {
    const template = await getTemplate();

    const htmlContent = template({
      referenceNumber: data.referenceNumber,
      date: data.date,
      recipientTitle: data.recipientTitle,
      letterTitle: data.letterTitle,
      salutation: data.salutation,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone,
      signatoryName: data.signatoryName,
      signatoryTitle: data.signatoryTitle,
      signature: data.signature,
      address: data.address || {},
      phone: data.phone || {},
      email: data.email || {},
    });

    // ✅ Get platform-specific executable path
    const executablePath = getExecutablePath();
    const launchOptions = {
      headless: "new",
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    };
    
    // Only add executablePath if not on Windows (Puppeteer can find it automatically)
    if (executablePath && os.platform() !== 'win32') {
      launchOptions.executablePath = executablePath;
    }
    
    console.log(`🚀 Launching browser on ${os.platform()}${executablePath ? ` with: ${executablePath}` : ' (auto-detected)'}`);

    browser = await puppeteer.launch(launchOptions);

    const page = await browser.newPage();

    // Set content
    await page.setContent(htmlContent, {
      waitUntil: "networkidle0",
    });

    const pdfBuffer = await page.pdf({
      format: "A4",
      printBackground: true,
      margin: {
        top: "15px",
        bottom: "15px",
        left: "20px",
        right: "20px",
      },
      preferCSSPageSize: true,
      scale: 0.95,
    });

    return pdfBuffer;
  } catch (error) {
    console.error("PDF generation error:", error);
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
};

const generateReferenceLetterHTML = async (data) => {
  try {
    const template = await getTemplate();

    // Prepare data for template
    const htmlContent = template({
      referenceNumber: data.referenceNumber,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      clientPhone: data.clientPhone || "Not provided",
      signatoryName: data.signatoryName,
      signatoryTitle: data.signatoryTitle,
      signature: data.signature,
      address: data.address || {},
      phone: data.phone || {},
      email: data.email || {},
    });

    return htmlContent;
  } catch (error) {
    console.error("HTML generation error:", error);
    throw error;
  }
};

module.exports = { generateReferenceLetterPDF, generateReferenceLetterHTML };