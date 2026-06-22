// server/src/templates/pdfTemplateHostinger.js
const React = require('react');
const { Document, Page, Text, View, StyleSheet, Image } = require('@react-pdf/renderer');

// 🚀 HOSTINGER-SPECIFIC STYLES - More compact
const styles = StyleSheet.create({
  page: {
    padding: 25,
    fontFamily: 'Helvetica',
    fontSize: 9,
    backgroundColor: 'white',
  },
  border: {
    border: '1pt solid #b8860b',
    padding: 12,
    margin: 3,
  },
  header: {
    textAlign: 'center',
    marginBottom: 8,
    paddingBottom: 6,
    borderBottom: '1.5pt solid #b8860b',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 1,
    color: '#1a1a2e',
  },
  companyNameGold: {
    color: '#b8860b',
  },
  tagline: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
    letterSpacing: 1,
  },
  companyDetails: {
    fontSize: 8,
    color: '#888888',
    marginTop: 3,
    lineHeight: 1.3,
  },
  referenceInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
    fontSize: 9,
    color: '#555555',
  },
  subject: {
    marginBottom: 6,
  },
  subjectTitle: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 1,
  },
  subjectHeading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 4,
    marginBottom: 4,
    lineHeight: 1.4,
    fontSize: 9,
  },
  salutation: {
    fontSize: 10,
    marginBottom: 3,
  },
  paragraph: {
    marginBottom: 3,
    textAlign: 'justify',
  },
  clientInfo: {
    backgroundColor: '#f9f9f9',
    padding: 6,
    marginVertical: 4,
    borderLeft: '3pt solid #b8860b',
  },
  clientInfoTitle: {
    fontSize: 9,
    fontWeight: 'bold',
    color: '#1a1a2e',
    marginBottom: 2,
    letterSpacing: 1,
  },
  clientInfoText: {
    fontSize: 8,
    marginBottom: 1,
  },
  confirmation: {
    backgroundColor: '#1a1a2e',
    color: 'white',
    padding: 6,
    marginVertical: 4,
    textAlign: 'center',
    borderRadius: 2,
  },
  confirmationText: {
    color: 'white',
    fontSize: 8,
    padding: 1,
    textAlign: 'center',
  },
  signatureSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: 8,
    paddingBottom: 4,
  },
  signatureBox: {
    flex: 1,
  },
  signatureImage: {
    marginBottom: 2,
  },
  signatureImg: {
    maxWidth: 120,
    maxHeight: 30,
  },
  signatureLine: {
    borderTop: '1pt solid #333333',
    width: '50%',
    marginTop: 2,
    marginBottom: 2,
  },
  signatureName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1a1a2e',
  },
  signatureTitle: {
    fontSize: 8,
    color: '#666666',
  },
  stamp: {
    width: 60,
    height: 60,
    border: '1.5pt solid #b8860b',
    borderRadius: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.6,
    transform: 'rotate(-15deg)',
    textAlign: 'center',
    padding: 4,
  },
  stampText: {
    fontSize: 7,
    fontWeight: 'bold',
    color: '#b8860b',
    textTransform: 'uppercase',
    textAlign: 'center',
    lineHeight: 1.2,
  },
  footer: {
    marginTop: 6,
    paddingTop: 4,
    textAlign: 'center',
    fontSize: 7,
    color: '#999999',
    borderTop: '0.5pt solid #eeeeee',
  },
  footerText: {
    textAlign: 'center',
    marginBottom: 1,
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