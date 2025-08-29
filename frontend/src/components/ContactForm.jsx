import React, { useState } from "react";
import styled from "styled-components";
import { apiCall } from "../config/api";

const FormWrapper = styled.div`
  max-width: 100%;
  margin: 0 auto;
  padding: 1rem 0.75rem;

  @media (min-width: 480px) {
    padding: 1.5rem 1rem;
  }

  @media (min-width: 768px) {
    max-width: 500px;
    padding: 2rem 1rem;
  }
  
  @media (min-width: 1024px) {
    max-width: 550px;
  }
  
  @media (min-width: 1200px) {
    max-width: 600px;
  }
  
  @media (min-width: 1400px) {
    max-width: 650px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  background: #1a1a1a;
  padding: 1.5rem;
  border-radius: 12px;
  border: 1px solid #333;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (min-width: 480px) {
    gap: 1.5rem;
    padding: 2rem;
  }

  @media (min-width: 768px) {
    gap: 1.75rem;
    padding: 2.5rem;
  }
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  @media (min-width: 480px) {
    gap: 0.5rem;
  }
`;

const FormRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 768px) {
    flex-direction: row;
    gap: 1.5rem;

    > div {
      flex: 1;
    }
  }
`;

const Label = styled.label`
  color: #ffffff;
  font-weight: bold;
  font-size: 0.95rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  @media (min-width: 480px) {
    font-size: 1rem;
    letter-spacing: 1px;
  }

  @media (min-width: 768px) {
    font-size: 1.1rem;
  }
`;

const Input = styled.input`
  padding: 0.65rem;
  background: #2a2a2a;
  border: 1px solid #444444;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.95rem;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.75rem;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    padding: 0.85rem;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    background: #333;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &::placeholder {
    color: #888;
  }

  &:hover:not(:focus) {
    border-color: #555;
  }
`;

const Select = styled.select`
  padding: 0.65rem;
  background: #2a2a2a;
  border: 1px solid #444444;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.75rem;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    padding: 0.85rem;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    background: #333;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &:hover:not(:focus) {
    border-color: #555;
  }

  option {
    background: #2a2a2a;
    color: #ffffff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.65rem;
  background: #2a2a2a;
  border: 1px solid #444444;
  border-radius: 8px;
  color: #ffffff;
  font-size: 0.95rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.2s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.75rem;
    font-size: 1rem;
    min-height: 120px;
  }

  @media (min-width: 768px) {
    padding: 0.85rem;
    min-height: 140px;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    background: #333;
    box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
  }

  &:hover:not(:focus) {
    border-color: #555;
  }

  &::placeholder {
    color: #888;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #dc2626, #991b1b);
  color: #ffffff;
  border: 1px solid #dc2626;
  padding: 0.5rem 0.9rem;
  font-size: 0.75rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  width: 100%;
  align-self: flex-start;

  @media (min-width: 480px) {
    padding: 0.6rem 1rem;
    font-size: 0.8rem;
    margin-top: 0.75rem;
  }

  @media (min-width: 768px) {
    padding: 0.65rem 1.25rem;
    font-size: 0.85rem;
    width: auto;
    align-self: flex-start;
  }

  @media (min-width: 1024px) {
    padding: 0.75rem 1.5rem;
    font-size: 0.9rem;
  }

  &:hover {
    background: linear-gradient(45deg, #991b1b, #dc2626);
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #666666;
    cursor: not-allowed;
    transform: none;
  }
`;

const RequiredStar = styled.span`
  color: #dc2626;
  margin-left: 4px;
`;

const SuccessMessage = styled.div`
  background: #1a1a1a;
  border: 1px solid #dc2626;
  color: #ffffff;
  padding: 1rem;
  border-radius: 4px;
  text-align: center;
  margin-bottom: 1rem;

  h2 {
    font-size: 1.3rem;
    margin: 0 0 1rem 0;

    @media (min-width: 480px) {
      font-size: 1.5rem;
    }
  }

  p {
    font-size: 0.9rem;
    margin: 0 0 1rem 0;

    @media (min-width: 480px) {
      font-size: 1rem;
    }
  }
`;

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.message) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiCall("/api/forms/contact", {
        method: "POST",
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setIsSubmitted(true);
      } else {
        alert("Error: " + result.error);
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      alert("Failed to send message. Please try again.");
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
  };

  if (isSubmitted) {
    return (
      <FormWrapper>
        <SuccessMessage>
          <h2>MESSAGE SENT</h2>
          <p>
            Thank you for your message! We'll get back to you as soon as possible.
          </p>
          <SubmitButton onClick={resetForm}>SEND ANOTHER MESSAGE</SubmitButton>
        </SuccessMessage>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <FormContainer>
        <FormRow>
          <FormGroup>
            <Label htmlFor="contact-name">
              Your Name <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="text"
              id="contact-name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact-email">
              Email Address <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="email"
              id="contact-email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="contact-phone">Phone Number</Label>
            <Input
              type="tel"
              id="contact-phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+46 70 123 45 67"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="contact-subject">Subject</Label>
            <Select
              id="contact-subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
            >
              <option value="">Select a subject</option>
              <option value="general">General Inquiry</option>
              <option value="collaboration">Collaboration</option>
              <option value="press">Press & Media</option>
              <option value="technical">Technical Support</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="contact-message">
            Message <RequiredStar>*</RequiredStar>
          </Label>
          <TextArea
            id="contact-message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Write your message here..."
          />
        </FormGroup>

        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "SENDING MESSAGE..." : "SEND MESSAGE"}
        </SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
};

export default ContactForm;