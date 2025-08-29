import React, { useState } from "react";
import styled from "styled-components";
import { apiCall } from "../config/api";

const FormWrapper = styled.div`
  max-width: 100%;
  margin: 0;
  padding: 0;

  @media (min-width: 768px) {
    max-width: 600px;
  }

  @media (min-width: 1024px) {
    max-width: 700px;
  }

  @media (min-width: 1200px) {
    max-width: 750px;
  }

  @media (min-width: 1400px) {
    max-width: 800px;
  }
`;

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: 480px) {
    gap: 1.2rem;
  }

  @media (min-width: 768px) {
    gap: 1.5rem;
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
  padding: 0.6rem;
  background: #222222;
  border: 2px solid #444444;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.7rem;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    padding: 0.75rem;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  }

  &::placeholder {
    color: #666666;
  }
`;

const Select = styled.select`
  padding: 0.6rem;
  background: #222222;
  border: 2px solid #444444;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.7rem;
    font-size: 1rem;
  }

  @media (min-width: 768px) {
    padding: 0.75rem;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  }

  option {
    background: #222222;
    color: #ffffff;
  }
`;

const TextArea = styled.textarea`
  padding: 0.6rem;
  background: #222222;
  border: 2px solid #444444;
  border-radius: 4px;
  color: #ffffff;
  font-size: 0.9rem;
  min-height: 100px;
  resize: vertical;
  font-family: inherit;
  transition: all 0.3s ease;
  width: 100%;
  box-sizing: border-box;

  @media (min-width: 480px) {
    padding: 0.7rem;
    font-size: 1rem;
    min-height: 110px;
  }

  @media (min-width: 768px) {
    padding: 0.75rem;
    min-height: 120px;
  }

  &:focus {
    outline: none;
    border-color: #dc2626;
    box-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
  }

  &::placeholder {
    color: #666666;
  }
`;

const SubmitButton = styled.button`
  background: linear-gradient(45deg, #dc2626, #991b1b);
  color: #ffffff;
  border: none;
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 1px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 0.5rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
  width: 100%;
  align-self: flex-start;

  @media (min-width: 480px) {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    margin-top: 1rem;
  }

  @media (min-width: 768px) {
    font-size: 1.2rem;
    width: auto;
    align-self: flex-start;
  }

  &:hover {
    background: linear-gradient(45deg, #991b1b, #dc2626);
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(220, 38, 38, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  &:disabled {
    background: #666666;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
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

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    eventDate: "",
    venue: "",
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
    if (
      !formData.name ||
      !formData.email ||
      !formData.eventType ||
      !formData.eventDate ||
      !formData.venue ||
      !formData.message
    ) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await apiCall("/api/forms/booking", {
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
      console.error("Error submitting form:", error);
      alert("Failed to send booking request. Please try again.");
    }

    setIsSubmitting(false);
  };

  const resetForm = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      eventType: "",
      eventDate: "",
      venue: "",
      message: "",
    });
  };

  if (isSubmitted) {
    return (
      <FormWrapper>
        <SuccessMessage>
          <h2>BOOKING REQUEST SENT</h2>
          <p>
            Thanks for your booking request! We will get back to you within 24-48 hours with
            more information.
          </p>
          <SubmitButton onClick={resetForm}>Send another request</SubmitButton>
        </SuccessMessage>
      </FormWrapper>
    );
  }

  return (
    <FormWrapper>
      <FormContainer>
        <FormRow>
          <FormGroup>
            <Label htmlFor="name">
              Your Name <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="email">
              Email Address <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your.email@example.com"
            />
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="+46 70 123 45 67"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="eventType">
              Event Type <RequiredStar>*</RequiredStar>
            </Label>
            <Select
              id="eventType"
              name="eventType"
              value={formData.eventType}
              onChange={handleChange}
            >
              <option value="">Select event type</option>
              <option value="festival">Festival</option>
              <option value="club">Club/Bar</option>
              <option value="private">Private Event</option>
              <option value="corporate">Corporate Event</option>
              <option value="wedding">Wedding</option>
              <option value="other">Other</option>
            </Select>
          </FormGroup>
        </FormRow>

        <FormRow>
          <FormGroup>
            <Label htmlFor="eventDate">
              Preferred Event Date <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="date"
              id="eventDate"
              name="eventDate"
              value={formData.eventDate}
              onChange={handleChange}
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="venue">
              Venue/Location <RequiredStar>*</RequiredStar>
            </Label>
            <Input
              type="text"
              id="venue"
              name="venue"
              value={formData.venue}
              onChange={handleChange}
              placeholder="Venue name and city"
            />
          </FormGroup>
        </FormRow>

        <FormGroup>
          <Label htmlFor="message">
            Additional Information <RequiredStar>*</RequiredStar>
          </Label>
          <TextArea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Tell us more about your event, special requirements, or any questions you might have..."
          />
        </FormGroup>

        <SubmitButton onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "SENDING REQUEST..." : "SEND BOOKING REQUEST"}
        </SubmitButton>
      </FormContainer>
    </FormWrapper>
  );
};

export default BookingForm;
