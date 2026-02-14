const nodemailer = require('nodemailer');

// Create reusable transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT) || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send email function
const sendEmail = async (from, subject, text, html) => {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: `"${from.name}" <${process.env.SMTP_USER}>`, // sender address
      to: process.env.CONTACT_EMAIL, // your email
      replyTo: from.email, // reply to sender
      subject: subject,
      text: text,
      html: html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    return { success: false, error: error.message };
  }
};

// Email template for contact form
const createContactEmailTemplate = (data) => {
  const { name, email, subject, message } = data;
  
  const htmlTemplate = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
        }
        .container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
        }
        .header {
          background: linear-gradient(135deg, #800020 0%, #5c0017 100%);
          color: white;
          padding: 20px;
          text-align: center;
          border-radius: 5px 5px 0 0;
        }
        .content {
          background: white;
          padding: 30px;
          border-radius: 0 0 5px 5px;
        }
        .info-row {
          margin: 15px 0;
          padding: 10px;
          background: #f5f5f5;
          border-left: 3px solid #800020;
        }
        .label {
          font-weight: bold;
          color: #800020;
          margin-bottom: 5px;
        }
        .message-box {
          background: #f9f9f9;
          padding: 20px;
          border-radius: 5px;
          margin-top: 20px;
          border: 1px solid #ddd;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>New Contact Form Submission</h2>
          <p>From your Portfolio Website</p>
        </div>
        <div class="content">
          <div class="info-row">
            <div class="label">Name:</div>
            <div>${name}</div>
          </div>
          <div class="info-row">
            <div class="label">Email:</div>
            <div><a href="mailto:${email}">${email}</a></div>
          </div>
          <div class="info-row">
            <div class="label">Subject:</div>
            <div>${subject}</div>
          </div>
          <div class="message-box">
            <div class="label">Message:</div>
            <div>${message.replace(/\n/g, '<br>')}</div>
          </div>
          <div class="footer">
            <p>This email was sent from your portfolio contact form at 0xabid</p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;

  const textTemplate = `
New Contact Form Submission
----------------------------

From: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}

---
This email was sent from your portfolio contact form.
  `;

  return {
    html: htmlTemplate,
    text: textTemplate,
  };
};

module.exports = {
  sendEmail,
  createContactEmailTemplate,
};
