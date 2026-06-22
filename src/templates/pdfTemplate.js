// server/src/services/pdfTemplate.js
const React = require('react');
const { Document, Page, Text, View, StyleSheet, Image } = require('@react-pdf/renderer');

// ===== STYLES =====
const styles = StyleSheet.create({
  page: {
    padding: 32,                    // Between 30 and 35
    fontFamily: 'Times-Roman',
    fontSize: 10.2,                 // Between 10 and 10.5
    backgroundColor: 'white',
  },
  border: {
    border: '1.5pt solid #b8860b',
    padding: 16,                    // Between 15 and 18
    margin: 5,
  },
  header: {
    textAlign: 'center',
    marginBottom: 13,               // Between 12 and 15
    paddingBottom: 11,              // Between 10 and 12
    borderBottom: '2pt solid #b8860b',
  },
  companyName: {
    fontSize: 23,                   // Between 22 and 24
    fontWeight: 'bold',
    letterSpacing: 2,
    color: '#1a1a2e',
  },
  companyNameGold: {
    color: '#b8860b',
  },
  tagline: {
    fontSize: 13.5,                 // Between 13 and 14
    color: '#666666',
    marginTop: 3,                   // Back to 3
    letterSpacing: 1,
  },
  companyDetails: {
    fontSize: 9.5,                  // Between 9 and 10
    color: '#888888',
    marginTop: 5,                   // Back to 5
    lineHeight: 1.4,                // Back to 1.4
  },
  referenceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 11,               // Between 10 and 12
    fontSize: 10.5,                 // Between 10 and 11
    color: '#555555',
  },
  subject: {
    marginBottom: 11,               // Between 10 and 12
  },
  subjectTitle: {
    fontSize: 13.5,                 // Between 13 and 14
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,                // Back to 2
  },
  subjectHeading: {
    fontSize: 19,                   // Between 18 and 20
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 6,                   // Between 5 and 8
    marginBottom: 6,                // Between 5 and 8
    lineHeight: 1.55,               // Between 1.5 and 1.6
    fontSize: 10.5,                 // Between 10 and 11
  },
  salutation: {
    fontSize: 12.5,                 // Between 12 and 13
    marginBottom: 5,                // Back to 5
  },
  paragraph: {
    marginBottom: 5,                // Back to 5
    textAlign: 'justify',
  },
  clientInfo: {
    backgroundColor: '#f9f9f9',
    padding: 11,                    // Between 10 and 12
    marginVertical: 9,              // Between 8 and 10
    borderLeft: '4pt solid #b8860b',
  },
  clientInfoTitle: {
    fontSize: 11.5,                 // Between 11 and 12
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 4,                // Between 4 and 5
    letterSpacing: 1,
  },
  clientInfoText: {
    fontSize: 10.5,                 // Between 10 and 11
    marginBottom: 2,                // Back to 2
  },
  confirmation: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: 11,                    // Between 10 and 12
    marginVertical: 9,              // Between 8 and 10
    textAlign: 'center',
    borderRadius: 4,
  },
  confirmationText: {
    color: 'white',
    fontSize: 10.5,                 // Between 10 and 11
    padding: 1.5,                   // Between 1 and 2
    textAlign: 'center',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 14,                  // Between 12 and 16
    paddingBottom: 6,               // Between 5 and 8
  },
  signatureBox: {
    flex: 1,
  },
  signatureImage: {
    marginBottom: 3,                // Back to 3
  },
  signatureImg: {
    maxWidth: 155,                  // Between 150 and 160
    maxHeight: 42,                  // Between 40 and 45
  },
  signatureLine: {
    borderTop: '1.5pt solid #333333',
    width: '60%',
    marginTop: 3,                   // Back to 3
    marginBottom: 3,                // Back to 3
  },
  signatureName: {
    fontSize: 12.5,                 // Between 12 and 13
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  signatureTitle: {
    fontSize: 10.5,                 // Between 10 and 11
    color: '#666666',
  },
  stamp: {
    width: 75,                      // Between 70 and 80
    height: 75,                     // Between 70 and 80
    border: '2pt solid #b8860b',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    transform: 'rotate(-15deg)',
    textAlign: 'center',
    padding: 5,                     // Back to 5
  },
  stampText: {
    fontSize: 8.5,                  // Between 8 and 9
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 1.25,               // Between 1.2 and 1.3
  },
  footer: {
    marginTop: 11,                  // Between 10 and 12
    paddingTop: 9,                  // Between 8 and 10
    textAlign: 'center',
    fontSize: 8.5,                  // Between 8 and 9
    color: '#999999',
    borderTop: '1pt solid #eeeeee',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 1.5,              // Between 1 and 2
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