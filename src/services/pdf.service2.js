// server/src/services/pdf.service2.js
const pdf = require('html-pdf');
const path = require("path");
const fs = require("fs").promises;
const handlebars = require("handlebars");

let compiledTemplate = null;

const getTemplate = async () => {
  if (!compiledTemplate) {
    const templatePath = path.join(
      __dirname,
      "../templates/reference-letter2.hbs"
    );
    const html = await fs.readFile(templatePath, "utf-8");
    compiledTemplate = handlebars.compile(html);
  }
  return compiledTemplate;
};

const generateReferenceLetterHTMLNew = async (data) => {
  try {
    const template = await getTemplate();
    const htmlContent = template({
      referenceNumber: data.referenceNumber,
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      recipientTitle: data.recipientTitle,
      letterTitle: data.letterTitle,
      salutation: data.salutation,
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

const generateReferenceLetterPDFNew = async (data) => {
  try {
    const htmlContent = await generateReferenceLetterHTMLNew(data);

    return new Promise((resolve, reject) => {
      pdf.create(htmlContent, {
        // ===== PAGE SETTINGS =====
        format: "A4",
        orientation: "portrait",
        type: "pdf",
        
        // ===== MARGINS =====
        border: {
          top: "15px",
          bottom: "15px",
          left: "20px",
          right: "20px"
        },
        
        // ===== HELPS FILL THE PAGE =====
        printBackground: true,
        preferCSSPageSize: true,
        scale: 0.95,
        quality: "100",
        
        // ===== TIMEOUT =====
        timeout: 30000,
        
      }).toBuffer((err, buffer) => {
        if (err) {
          reject(new Error(`PDF generation failed: ${err.message}`));
          return;
        }
        if (!buffer || buffer.length === 0) {
          reject(new Error('PDF generation failed: Empty buffer'));
          return;
        }
        resolve(buffer);
      });
    });
  } catch (error) {
    console.error("PDF generation error:", error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

module.exports = {
  generateReferenceLetterHTMLNew,
  generateReferenceLetterPDFNew,
};