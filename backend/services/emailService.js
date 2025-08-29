import nodemailer from 'nodemailer';

// Create email transporter
const createTransporter = () => {
  // Gmail configuration (most common)
  if (process.env.EMAIL_PROVIDER === 'gmail') {
    return nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App password, not regular password
      },
    });
  }

  // Generic SMTP configuration
  return nodemailer.createTransporter({
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
      subject: `🎵 Kontakt från ${name} - ${subject || 'Allmän förfrågan'}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Ny kontaktförfrågan från webbsidan</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Kontaktinformation:</h3>
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>E-post:</strong> ${email}</p>
            ${phone ? `<p><strong>Telefon:</strong> ${phone}</p>` : ''}
            <p><strong>Ämne:</strong> ${subject || 'Ej valt'}</p>
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Meddelande:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Detta meddelande skickades från kontaktformuläret på morbidgeneofficial.com
          </p>
        </div>
      `,
    };

    // Auto-reply to customer
    const mailOptionsToCustomer = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎵 Tack för ditt meddelande - Morbid Gene',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">Tack för ditt meddelande!</h2>
          
          <p>Hej ${name},</p>
          
          <p>Tack för att du kontaktade oss! Vi har mottagit ditt meddelande och återkommer så snart som möjligt.</p>
          
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Ditt meddelande:</h3>
            <p><strong>Ämne:</strong> ${subject || 'Allmän förfrågan'}</p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p>Vi strävar efter att svara inom 24-48 timmar.</p>
          
          <p>Med vänliga hälsningar,<br>
          <strong>Morbid Gene</strong></p>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            Detta är ett automatiskt svar från morbidgeneofficial.com
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
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎤 Bokningsförfrågan mottagen - Morbid Gene',
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