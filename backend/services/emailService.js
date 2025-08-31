import pkg from "nodemailer";
const { createTransport } = pkg;
import {
  createContactNotificationEmail,
  createContactAutoReply,
  createBookingNotificationEmail,
  createBookingAutoReply
} from '../utils/emailTemplates.js';

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

    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.CONTACT_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: (subject || "General Inquiry").charAt(0).toUpperCase() + (subject || "General Inquiry").slice(1),
      html: createContactNotificationEmail(formData),
    };

    const mailOptionsToCustomer = {
      from: `"Morbid Gene" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: "Thanks for contacting Morbid Gene",
      html: createContactAutoReply(formData),
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

    const mailOptionsToYou = {
      from: process.env.EMAIL_USER,
      to: process.env.BOOKING_EMAIL || process.env.EMAIL_USER,
      replyTo: email,
      subject: `🎤 New booking request - ${eventType} - ${venue}`,
      html: createBookingNotificationEmail(formData),
    };

    const mailOptionsToCustomer = {
      from: `"Morbid Gene Booking" <${process.env.EMAIL_USER}>`,
      to: email,
      replyTo: process.env.EMAIL_USER,
      subject: "Booking Request Received - Morbid Gene",
      html: createBookingAutoReply(formData),
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
