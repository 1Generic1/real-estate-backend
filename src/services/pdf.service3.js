// server/src/services/pdf.service3.js
const React = require('react');
const ReactPDF = require('@react-pdf/renderer');
const ReferenceLetterPDF = require('../templates/pdfTemplate');

/**
 * Generate PDF using @react-pdf/renderer (No Puppeteer)
 * @param {Object} data - PDF data
 * @returns {Promise<Buffer>} - PDF buffer
 */
const generateReferenceLetterPDF3 = async (data) => {
  try {
    // Generate PDF buffer using React-PDF
    const pdfBuffer = await ReactPDF.renderToBuffer(
      React.createElement(ReferenceLetterPDF, { data })
    );
    
    return pdfBuffer;
  } catch (error) {
    console.error("❌ PDF generation error (pdf.service3):", error);
    throw new Error(`PDF generation failed: ${error.message}`);
  }
};

module.exports = {
  generateReferenceLetterPDF3,
};
