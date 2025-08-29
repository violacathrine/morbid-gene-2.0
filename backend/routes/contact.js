import express from 'express';
import { sendContactEmail, sendBookingEmail } from '../services/emailService.js';

const router = express.Router();

// Contact form endpoint
router.post('/contact', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    // Log the contact form submission
    console.log('📧 Contact form submission:', {
      name,
      email,
      phone,
      subject,
      message,
      timestamp: new Date().toISOString()
    });

    // Send email notifications
    await sendContactEmail({ name, email, phone, subject, message });

    res.json({ 
      success: true, 
      message: 'Contact form submitted successfully' 
    });

  } catch (error) {
    console.error('❌ Contact form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// Booking form endpoint
router.post('/booking', async (req, res) => {
  try {
    const { name, email, phone, eventType, eventDate, venue, message } = req.body;

    // Validate required fields
    if (!name || !email || !eventType || !eventDate || !venue || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'All required fields must be filled' 
      });
    }

    // Log the booking form submission
    console.log('🎵 Booking form submission:', {
      name,
      email,
      phone,
      eventType,
      eventDate,
      venue,
      message,
      timestamp: new Date().toISOString()
    });

    // Send booking email notifications
    await sendBookingEmail({ name, email, phone, eventType, eventDate, venue, message });

    res.json({ 
      success: true, 
      message: 'Booking request submitted successfully' 
    });

  } catch (error) {
    console.error('❌ Booking form error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

export default router;