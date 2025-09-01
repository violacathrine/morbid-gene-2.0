const createEmailWrapper = (content) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="text-align: center; margin-bottom: 1.5rem;">
      <img src="https://morbidgeneofficial.com/assets/logo.svg" alt="Morbid Gene" style="height: 80px; width: auto;">
    </div>
    ${content}
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This is an automated response from morbidgeneofficial.com
    </p>
  </div>
`;

const createInfoSection = (title, fields) => `
  <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
    <h3>${title}:</h3>
    ${fields.map(field => `<p><strong>${field.label}:</strong> ${field.value}</p>`).join('')}
  </div>
`;

const createMessageSection = (message) => `
  <div style="background: #ffffff; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
    <h3>Message:</h3>
    <p style="white-space: pre-wrap;">${message}</p>
  </div>
`;

export const createContactNotificationEmail = (formData) => {
  const { name, email, phone, subject, message } = formData;
  
  const fields = [
    { label: 'Name', value: name },
    { label: 'Email', value: email },
    ...(phone ? [{ label: 'Phone', value: phone }] : []),
    { label: 'Subject', value: subject || 'Not specified' }
  ];

  const content = `
    <h2 style="color: #dc2626;">New contact request from the website</h2>
    ${createInfoSection('Contact Information', fields)}
    ${createMessageSection(message)}
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This message was sent from the contact form on morbidgeneofficial.com
    </p>
  `;

  return createEmailWrapper(content);
};

export const createContactAutoReply = (formData) => {
  const { name, subject, message } = formData;
  
  const content = `
    <h2 style="color: #dc2626;">Thanks for your message!</h2>
    <p>Hi ${name},</p>
    <p>Thank you for contacting us! We have received your message and will get back to you as soon as possible.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3>Your Message:</h3>
      <p><strong>Subject:</strong> ${subject || "General Inquiry"}</p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>

    <p>We strive to respond to you asap otherwise within 24-48 hours.</p>
    <p>Best regards,<br><strong>Morbid Gene</strong></p>
  `;

  return createEmailWrapper(content);
};

export const createBookingNotificationEmail = (formData) => {
  const { name, email, phone, eventType, eventDate, venue, message } = formData;
  
  const eventFields = [
    { label: 'Event type', value: eventType.charAt(0).toUpperCase() + eventType.slice(1) },
    { label: 'Requested Date', value: eventDate },
    { label: 'City', value: venue }
  ];

  const contactFields = [
    { label: 'Name', value: name },
    { label: 'Email', value: email },
    ...(phone ? [{ label: 'Phone', value: phone }] : [])
  ];

  const content = `
    <h2 style="color: #dc2626;">New booking request!</h2>
    ${createInfoSection('Event Information', eventFields)}
    <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
      <h3>Contact Information:</h3>
      ${contactFields.map(field => `<p><strong>${field.label}:</strong> ${field.value}</p>`).join('')}
    </div>
    ${createMessageSection(message)}
    <p style="color: #666; font-size: 12px; margin-top: 30px;">
      This message was sent from the booking form on morbidgeneofficial.com
    </p>
  `;

  return createEmailWrapper(content);
};

export const createBookingAutoReply = (formData) => {
  const { name, eventType, eventDate, venue, message } = formData;
  
  const content = `
    <h2 style="color: #dc2626;">Thank you for your booking request!</h2>
    <p>Hi ${name},</p>
    <p>We have received your booking request for a <strong>${eventType.charAt(0).toUpperCase() + eventType.slice(1)} Event</strong> the <strong>${eventDate}</strong> in <strong>${venue}</strong>.</p>
    
    <div style="background: #f5f5f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3>Your Request:</h3>
      <p><strong>Event Type:</strong> ${eventType.charAt(0).toUpperCase() + eventType.slice(1)}</p>
      <p><strong>Requested Date:</strong> ${eventDate}</p>
      <p><strong>City:</strong> ${venue}</p>
      <p><strong>Message:</strong></p>
      <p style="white-space: pre-wrap;">${message}</p>
    </div>

    <div style="background: #dc2626; color: white; padding: 15px; border-radius: 8px; margin: 20px 0;">
      <h3 style="margin: 0; color: white;">Next Steps:</h3>
      <p style="margin: 5px 0 0 0;">We will get back to you within 24-48 hours with more information about availability, pricing, and technical requirements.</p>
    </div>

    <p>Thank you for showing interest in Morbid Gene!</p>
    <p>Best regards,<br><strong>Morbid Gene</strong></p>
  `;

  return createEmailWrapper(content);
};