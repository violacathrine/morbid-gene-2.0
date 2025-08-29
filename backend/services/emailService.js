import pkg from "nodemailer";
const { createTransport } = pkg;

// Create email transporter
const createTransporter = () => {
  // Gmail configuration (most common)
  if (process.env.EMAIL_PROVIDER === "gmail") {
    return createTransport({
      service: "gmail",
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
    secure: process.env.SMTP_SECURE === "true", // true for 465, false for other ports
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
      subject: (subject || "General Inquiry").charAt(0).toUpperCase() + (subject || "General Inquiry").slice(1),
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New contact request from the website</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
            <p><strong>Subject:</strong> ${subject || "Not specified"}</p>
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
      subject: "Thanks for contacting Morbid Gene",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="https://morbidgeneofficial.com/assets/logo.svg" alt="Morbid Gene" style="height: 80px; width: auto;">
          </div>
          <h2 style="color: #dc2626;">Thanks for your message!</h2>

          <p>Hi ${name},</p>

          <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Message:</h3>
            <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
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

    console.log("✅ Contact emails sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Email sending failed:", error);
    throw error;
  }
};

// Send booking form email
export const sendBookingEmail = async (formData) => {
  try {
    const transporter = createTransporter();
    const { name, email, phone, eventType, eventDate, venue, message } =
      formData;

    // Email to you (booking notification)
    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.BOOKING_EMAIL || process.env.EMAIL_USER,
      replyTo: email, // När du svarar går det till kundens email
      subject: `🎤 New booking request - ${eventType} - ${venue}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #dc2626;">New booking request!</h2>

          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Event Information:</h3>
            <p><strong>Event type:</strong> ${eventType}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>City:</strong> ${venue}</p>
          </div>

          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>Contact Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ""}
          </div>

          <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
            <h3>Message:</h3>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <p style="color: #666; font-size: 12px; margin-top: 30px;">
            This message was sent from the booking form on morbidgeneofficial.com
          </p>
        </div>
      `,
    };

    // Auto-reply to customer
    const mailOptionsToCustomer = {
      from: `"Morbid Gene Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: "Booking Request Received - Morbid Gene",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="text-align: center; margin-bottom: 1.5rem;">
            <img src="https://morbidgeneofficial.com/assets/logo.svg" alt="Morbid Gene" style="height: 80px; width: auto;">
          </div>
          <h2 style="color: #dc2626;">Thank you for your booking request!</h2>

          <p>Hi ${name},</p>

          <p>We have received your booking request for a <strong>${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event</strong> on <strong>${eventDate}</strong> in <strong>${venue}</strong>.</p>

          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3>Your Request:</h3>
            <p><strong>Event Type:</strong> ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</p>
            <p><strong>Date:</strong> ${eventDate}</p>
            <p><strong>City:</strong> ${venue}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap;">${message}</p>
          </div>

          <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin: 0; color: white;">Next Steps:</h3>
            <p style="margin: 5px 0 0 0;">We will get back to you within 24-48 hours with more information about availability, pricing, and technical requirements.</p>
          </div>

          <p>Thank you for showing interest in Morbid Gene!</p>

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

    console.log("✅ Booking emails sent successfully");
    return { success: true };
  } catch (error) {
    console.error("❌ Booking email sending failed:", error);
    throw error;
  }
};
