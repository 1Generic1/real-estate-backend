// server/src/templates/pdfTemplateHostinger.js
const React = require('react');
const { Document, Page, Text, View, StyleSheet, Image } = require('@react-pdf/renderer');

// 🚀 HOSTINGER-OPTIMIZED - SUPER COMPACT
const styles = StyleSheet.create({
  page: {
    padding: 20,
    fontFamily: 'Helvetica',
    fontSize: 8,
    backgroundColor: 'white',
  },
  border: {
    border: '1pt solid #b8860b',
    padding: 10,
    margin: 3,
  },
  header: {
    textAlign: 'center',
    marginBottom: 6,
    paddingBottom: 5,
    borderBottom: '1pt solid #b8860b',
  },
  companyName: {
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#1a1a2e',
  },
  companyNameGold: {
    color: '#b8860b',
  },
  tagline: {
    fontSize: 10,
    color: '#666666',
    marginTop: 1,
    letterSpacing: 0.5,
  },
  companyDetails: {
    fontSize: 7,
    color: '#888888',
    marginTop: 2,
    lineHeight: 1.2,
  },
  referenceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    fontSize: 8,
    color: '#555555',
  },
  subject: {
    marginBottom: 4,
  },
  subjectTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 1,
  },
  subjectHeading: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 3,
    marginBottom: 3,
    lineHeight: 1.2,
    fontSize: 8,
  },
  salutation: {
    fontSize: 9,
    marginBottom: 2,
  },
  paragraph: {
    marginBottom: 2,
    textAlign: 'justify',
  },
  clientInfo: {
    backgroundColor: '#f9f9f9',
    padding: 4,
    marginVertical: 3,
    borderLeft: '2pt solid #b8860b',
  },
  clientInfoTitle: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 1,
    letterSpacing: 0.5,
  },
  clientInfoText: {
    fontSize: 7,
    marginBottom: 0.5,
  },
  confirmation: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: 4,
    marginVertical: 3,
    textAlign: 'center',
    borderRadius: 2,
  },
  confirmationText: {
    color: 'white',
    fontSize: 7,
    padding: 0.5,
    textAlign: 'center',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 6,
    paddingBottom: 3,
  },
  signatureBox: {
    flex: 1,
  },
  signatureImage: {
    marginBottom: 1,
  },
  signatureImg: {
    maxWidth: 100,
    maxHeight: 25,
  },
  signatureLine: {
    borderTop: '0.5pt solid #333333',
    width: '40%',
    marginTop: 1,
    marginBottom: 1,
  },
  signatureName: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  signatureTitle: {
    fontSize: 7,
    color: '#666666',
  },
  stamp: {
    width: 50,
    height: 50,
    border: '1pt solid #b8860b',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    transform: 'rotate(-15deg)',
    textAlign: 'center',
    padding: 3,
  },
  stampText: {
    fontSize: 6,
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 1.1,
  },
  footer: {
    marginTop: 4,
    paddingTop: 3,
    textAlign: 'center',
    fontSize: 6,
    color: '#999999',
    borderTop: '0.5pt solid #eeeeee',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 0.5,
  },
});

// ✅ PDF COMPONENT - Using React.createElement (NO JSX)
const ReferenceLetterPDFHostinger = ({ data }) => {
  return React.createElement(
    Document,
    null,
    React.createElement(
      Page,
      { size: "A4", style: styles.page },
      React.createElement(
        View,
        { style: styles.border },
        // HEADER
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
        // REFERENCE INFO
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
        // SUBJECT
        React.createElement(
          View,
          { style: styles.subject },
          React.createElement(Text, { style: styles.subjectTitle }, data.recipientTitle || 'TO WHOM IT MAY CONCERN'),
          React.createElement(Text, { style: styles.subjectHeading }, data.letterTitle || 'LETTER OF REFERENCE')
        ),
        // CONTENT
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
          // CLIENT INFO
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
          // CONFIRMATION
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
        // SIGNATURE SECTION
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
          // STAMP
          React.createElement(
            View,
            { style: styles.stamp },
            React.createElement(Text, { style: styles.stampText }, "OFFICIAL\nDOCUMENT")
          )
        ),
        // FOOTER
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

module.exports = ReferenceLetterPDFHostinger;