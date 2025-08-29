import pkg from 'nodemailer';
const { createTransport } = pkg;

// Create email transporter
const createTransporter = () => {
  // Gmail configuration (most common)
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password, not regular password
      },
    });
  }

  // Generic SMTP configuration
  return createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT || 587,
    secure: process.env.SMTP_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send contact form email
export const sendContactEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    const { name, email, phone, subject, message } = formData;

    // Email to you (notification)
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      replyTo: email, // När du svarar går det till kundens email
      subject: `🎵 ${name} - ${subject || 'Allmän förfrågan'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New contact request from the website</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
            <p><strong>Subject:</strong> ${subject || 'Not specified'}</p>
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the contact form on morbidgeneofficial.com
          </p>
        </div>
      `,
    };

    // Auto-reply to customer
    const mailOptionsToCustomer = {
      from: `"Morbid Gene" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: 'Thanks for contacting Morbid Gene',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Thanks for your message!</h2>

          <p>Hi ${name},</p>

          <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>We strive to respond to you asap otherwise within 24-48 hours.</p>

          <p>Best regards,<br>
          <strong>Morbid Gene</strong></p>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This is an automated response from morbidgeneofficial.com
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToCustomer);

    console.log('✅ Contact emails sent successfully');
    return { success: true };

  } catch (error) {
    console.error('❌ Email sending failed:', error);
    throw error;
  }
};

// Send booking form email
export const sendBookingEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    const { name, email, phone, eventType, eventDate, venue, message } = formData;

    // Email to you (booking notification)
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.BOOKING_EMAIL || process.env.EMAIL_USER,
      replyTo: email, // När du svarar går det till kundens email
      subject: `🎤 NY BOKNINGSFÖRFRÅGAN - ${eventType} - ${venue}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Ny bokningsförfrågan!</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Evenemangsinformation:</h3>
            <p><strong>Event typ:</strong> ${eventType}</p>
            <p><strong>Datum:</strong> ${eventDate}</p>
            <p><strong>Plats:</strong> ${venue}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Kontaktinformation:</h3>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>E-post:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Meddelande:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: white;">🔥 VIKTIGT: Svara snabbt!</h3>
            <p style="margin: 5px 0 0 0;">Detta kan vara en betalande spelning. Kontakta kunden snarast.</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Detta meddelande skickades från bokningsformuläret på morbidgeneofficial.com
          </p>
        </div>
      `,
    };

    // Auto-reply to customer
    const mailOptionsToCustomer = {
      from: `"Morbid Gene Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: 'Booking Request Received - Morbid Gene',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Tack för din bokningsförfrågan!</h2>
          
          <p>Hej ${name},</p>
          
          <p>Vi har mottagit din bokningsförfrågan för <strong>${eventType}</strong> den <strong>${eventDate}</strong> i <strong>${venue}</strong>.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Din förfrågan:</h3>
            <p><strong>Event:</strong> ${eventType}</p>
            <p><strong>Datum:</strong> ${eventDate}</p>
            <p><strong>Plats:</strong> ${venue}</p>
            <p><strong>Meddelande:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: white;">Nästa steg:</h3>
            <p style="margin: 5px 0 0 0;">Vi återkommer inom 24-48 timmar med mer information om tillgänglighet, pris och tekniska krav.</p>
          </div>
          
          <p>Tack för ditt intresse för Morbid Gene!</p>
          
          <p>Med vänliga hälsningar,<br>
          <strong>Morbid Gene Management</strong></p>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Detta är ett automatiskt svar från morbidgeneofficial.com
          </p>
        </div>
      `,
    };

    // Send both emails
    await transporter.sendMail(mailOptionsToYou);
    await transporter.sendMail(mailOptionsToCustomer);

    console.log('✅ Booking emails sent successfully');
    return { success: true };

  } catch (error) {
    console.error('❌ Booking email sending failed:', error);
    throw error;
  }
};