// server/src/services/pdfTemplate.js
const React = require('react');
const { Document, Page, Text, View, StyleSheet, Image } = require('@react-pdf/renderer');

// ===== STYLES =====
const styles = StyleSheet.create({
  page: {
    padding: 30,                    // Reduced from 40
    fontFamily: 'Times-Roman',
    fontSize: 10,                   // Reduced from 12
    backgroundColor: 'white',
  },
  border: {
    border: '1.5pt solid #b8860b',
    padding: 15,                    // Reduced from 20
    margin: 5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 12,               // Reduced from 20
    paddingBottom: 10,              // Reduced from 15
    borderBottom: '2pt solid #b8860b',
  },
  companyName: {
    fontSize: 22,                   // Reduced from 28
    fontWeight: 'bold',
    letterSpacing: 2,               // Reduced from 3
    color: '#1a1a2e',
  },
  companyNameGold: {
    color: '#b8860b',
  },
  tagline: {
    fontSize: 13,                   // Reduced from 16
    color: '#666666',
    marginTop: 3,                   // Reduced from 5
    letterSpacing: 1,               // Reduced from 2
  },
  companyDetails: {
    fontSize: 9,                    // Reduced from 11
    color: '#888888',
    marginTop: 5,                   // Reduced from 8
    lineHeight: 1.4,                // Reduced from 1.6
  },
  referenceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,               // Reduced from 20
    fontSize: 10,                   // Reduced from 12
    color: '#555555',
  },
  subject: {
    marginBottom: 10,               // Reduced from 15
  },
  subjectTitle: {
    fontSize: 13,                   // Reduced from 16
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,                // Reduced from 4
  },
  subjectHeading: {
    fontSize: 18,                   // Reduced from 22
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 5,                   // Reduced from 10
    marginBottom: 5,                // Reduced from 10
    lineHeight: 1.5,                // Reduced from 1.8
    fontSize: 10,                   // Reduced from 13
  },
  salutation: {
    fontSize: 12,                   // Reduced from 16
    marginBottom: 5,                // Reduced from 10
  },
  paragraph: {
    marginBottom: 5,                // Reduced from 10
    textAlign: 'justify',
  },
  clientInfo: {
    backgroundColor: '#f9f9f9',
    padding: 10,                    // Reduced from 15
    marginVertical: 8,              // Reduced from 12
    borderLeft: '4pt solid #b8860b',
  },
  clientInfoTitle: {
    fontSize: 11,                   // Reduced from 13
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,                // Reduced from 8
    letterSpacing: 1,
  },
  clientInfoText: {
    fontSize: 10,                   // Reduced from 13
    marginBottom: 2,                // Reduced from 3
  },
  confirmation: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: 10,                    // Reduced from 15
    marginVertical: 8,              // Reduced from 15
    textAlign: 'center',
    borderRadius: 4,
  },
  confirmationText: {
    color: 'white',
    fontSize: 10,                   // Reduced from 12
    padding: 1,                     // Reduced from 2
    textAlign: 'center',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 12,                  // Reduced from 20
    paddingBottom: 5,               // Reduced from 10
  },
  signatureBox: {
    flex: 1,
  },
  signatureImage: {
    marginBottom: 3,                // Reduced from 5
  },
  signatureImg: {
    maxWidth: 150,                  // Reduced from 200
    maxHeight: 40,                  // Reduced from 60
  },
  signatureLine: {
    borderTop: '1.5pt solid #333333',
    width: '60%',
    marginTop: 3,                   // Reduced from 5
    marginBottom: 3,                // Reduced from 5
  },
  signatureName: {
    fontSize: 12,                   // Reduced from 15
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  signatureTitle: {
    fontSize: 10,                   // Reduced from 12
    color: '#666666',
  },
  stamp: {
    width: 70,                      // Reduced from 90
    height: 70,                     // Reduced from 90
    border: '2pt solid #b8860b',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    transform: 'rotate(-15deg)',
    textAlign: 'center',
    padding: 5,                     // Reduced from 8
  },
  stampText: {
    fontSize: 8,                    // Reduced from 10
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  footer: {
    marginTop: 10,                  // Reduced from 15
    paddingTop: 8,                  // Reduced from 10
    textAlign: 'center',
    fontSize: 8,                    // Reduced from 10
    color: '#999999',
    borderTop: '1pt solid #eeeeee',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 1,                // Reduced from 2
  },
});

// ✅ PDF COMPONENT - Using React.createElement (NO JSX)
const ReferenceLetterPDF = ({ data }) => {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.border },
        // Header
        React.createElement(
          View,
          { style: styles.header },
          React.createElement(
            Text,
            { style: styles.companyName },
            "TAYE'S ",
            React.createElement(Text, { style: styles.companyNameGold }, "PROPERTY")
          ),
          React.createElement(Text, { style: styles.tagline }, "& REALTY SOLUTIONS"),
          React.createElement(
            Text,
            { style: styles.companyDetails },
            `${data.address?.street || ''}, ${data.address?.city || ''}, ${data.address?.state || ''}, ${data.address?.country || ''}\n`,
            `Tel: ${data.phone?.primary || 'N/A'} | Email: ${data.email?.general || 'N/A'}`
          )
        ),
        // Reference Info
        React.createElement(
          View,
          { style: styles.referenceInfo },
          React.createElement(
            Text,
            null,
            React.createElement(Text, { style: { fontWeight: 'bold' } }, "Date:"),
            " ",
            data.date
          ),
          React.createElement(
            Text,
            null,
            React.createElement(Text, { style: { fontWeight: 'bold' } }, "Ref:"),
            " ",
            data.referenceNumber
          )
        ),
        // Subject
        React.createElement(
          View,
          { style: styles.subject },
          React.createElement(Text, { style: styles.subjectTitle }, data.recipientTitle || 'TO WHOM IT MAY CONCERN'),
          React.createElement(Text, { style: styles.subjectHeading }, data.letterTitle || 'LETTER OF REFERENCE')
        ),
        // Content
        React.createElement(
          View,
          { style: styles.content },
          React.createElement(Text, { style: styles.salutation }, `${data.salutation || 'Dear Sir/Madam'},`),
          React.createElement(
            Text,
            { style: styles.paragraph },
            "This letter is to confirm that ",
            React.createElement(Text, { style: { fontWeight: 'bold' } }, data.clientName),
            " has been a valued client of TAYE'S PROPERTY & REALTY SOLUTIONS."
          ),
          // Client Info
          React.createElement(
            View,
            { style: styles.clientInfo },
            React.createElement(Text, { style: styles.clientInfoTitle }, "CLIENT INFORMATION"),
            React.createElement(
              Text,
              { style: styles.clientInfoText },
              React.createElement(Text, { style: { fontWeight: 'bold' } }, "Full Name:"),
              " ",
              data.clientName
            ),
            React.createElement(
              Text,
              { style: styles.clientInfoText },
              React.createElement(Text, { style: { fontWeight: 'bold' } }, "Email:"),
              " ",
              data.clientEmail
            ),
            React.createElement(
              Text,
              { style: styles.clientInfoText },
              React.createElement(Text, { style: { fontWeight: 'bold' } }, "Phone:"),
              " ",
              data.clientPhone || 'Not provided'
            )
          ),
          React.createElement(
            Text,
            { style: styles.paragraph },
            data.clientName,
            " has engaged with our company for professional real estate advisory and property consultation services. Throughout our professional relationship, the client has demonstrated genuine interest in legitimate real estate investments and has maintained professional conduct in all interactions."
          ),
          // Confirmation
          React.createElement(
            View,
            { style: styles.confirmation },
            React.createElement(Text, { style: styles.confirmationText }, "✓ We confirm that to the best of our knowledge, the client is a legitimate business partner"),
            React.createElement(Text, { style: styles.confirmationText }, "✓ There are no negative records associated with their dealings with our company"),
            React.createElement(Text, { style: styles.confirmationText }, "✓ The client has completed all documentation requirements in a timely manner")
          ),
          React.createElement(
            Text,
            { style: styles.paragraph },
            "Should you require any additional information, please do not hesitate to contact our office directly."
          )
        ),
        // Signature Section
        React.createElement(
          View,
          { style: styles.signatureSection },
          React.createElement(
            View,
            { style: styles.signatureBox },
            data.signature ? React.createElement(
              View,
              { style: styles.signatureImage },
              React.createElement(Image, { src: data.signature, style: styles.signatureImg })
            ) : null,
            React.createElement(View, { style: styles.signatureLine }),
            React.createElement(Text, { style: styles.signatureName }, data.signatoryName),
            React.createElement(Text, { style: styles.signatureTitle }, data.signatoryTitle)
          ),
          // Stamp
          React.createElement(
            View,
            { style: styles.stamp },
            React.createElement(Text, { style: styles.stampText }, "OFFICIAL\nDOCUMENT")
          )
        ),
        // Footer
        React.createElement(
          View,
          { style: styles.footer },
          React.createElement(Text, { style: styles.footerText }, "This is an official company document. Verification can be made by contacting our office."),
          React.createElement(Text, { style: styles.footerText }, "TAYE'S PROPERTY & REALTY SOLUTIONS - Your Trusted Real Estate Partner")
        )
      )
    )
  );
};

module.exports = ReferenceLetterPDF;