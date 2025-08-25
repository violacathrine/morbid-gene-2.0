import React, { useState } from "react";
import styled from "styled-components";
import BookingForm from "../components/BookingForm";
import ContactForm from "../components/ContactForm";

const ContactContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  padding: 1rem;
  max-width: 1600px;
  margin: 0 auto;
  
  @media (min-width: 480px) {
    padding: 1.5rem;
  }
  
  @media (min-width: 768px) {
    padding: 2rem;
  }
  
  @media (min-width: 1024px) {
    padding: 3rem;
  }
  
  @media (min-width: 1400px) {
    padding: 4rem;
  }
`;

const Header = styled.div`
  text-align: left;
  margin-bottom: 1.5rem;
  padding: 0;
  
  @media (min-width: 480px) {
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    margin-bottom: 3rem;
  }
`;


const SubHeading = styled.h2`
  color: #cccccc;
  font-size: 0.9rem;
  font-style: italic;
  margin: 0.5rem 0 1.5rem 0;
  padding: 0 0.5rem;
  font-weight: 300;
  line-height: 1.5;
  
  @media (min-width: 480px) {
    font-size: 1rem;
    margin: 0.75rem 0 1.75rem 0;
    padding: 0 1rem;
  }
  
  @media (min-width: 768px) {
    font-size: 1.1rem;
    margin: 1rem 0 2rem 0;
    padding: 0;
  }
  
  @media (min-width: 1024px) {
    font-size: 1.2rem;
    margin: 1.5rem 0 2.5rem 0;
  }
`;

const ToggleSection = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 1.5rem;
  gap: 0;
  
  @media (min-width: 480px) {
    margin-bottom: 2rem;
  }
  
  @media (min-width: 768px) {
    margin-bottom: 2.5rem;
  }
  
  @media (min-width: 1024px) {
    margin-bottom: 3rem;
  }
`;

const ToggleButton = styled.button`
  background: ${(props) => 
    props.active 
      ? "linear-gradient(45deg, #dc2626, #991b1b)" 
      : "#333333"
  };
  color: ${(props) => (props.active ? "#ffffff" : "#cccccc")};
  border: 2px solid ${(props) => (props.active ? "#dc2626" : "#555555")};
  padding: 0.6rem 1rem;
  font-size: 0.8rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:first-child {
    border-radius: 4px 0 0 4px;
    border-right: none;
  }
  
  &:last-child {
    border-radius: 0 4px 4px 0;
    border-left: none;
  }

  @media (min-width: 480px) {
    padding: 0.75rem 1.25rem;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    padding: 0.875rem 1.5rem;
    font-size: 0.95rem;
    letter-spacing: 0.75px;
  }
  
  @media (min-width: 1024px) {
    padding: 1rem 2rem;
    font-size: 1rem;
    letter-spacing: 1px;
  }

  &:hover {
    background: ${(props) => 
      props.active 
        ? "linear-gradient(45deg, #991b1b, #dc2626)" 
        : "#444444"
    };
    color: #ffffff;
    border-color: ${(props) => (props.active ? "#dc2626" : "#666666")};
  }
`;

const FormDescription = styled.p`
  text-align: left;
  color: #999999;
  font-size: 0.8rem;
  margin: 0 0 1rem 0;
  line-height: 1.4;
  
  @media (min-width: 480px) {
    font-size: 0.9rem;
    margin-bottom: 1.25rem;
  }
  
  @media (min-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
    line-height: 1.5;
  }
  
  @media (min-width: 1024px) {
    font-size: 1rem;
    margin-bottom: 2rem;
  }
`;

export const Contact = () => {
  const [activeForm, setActiveForm] = useState("contact");

  const getSubHeading = () => {
    return activeForm === "booking" 
      ? "Ready to bring the darkness to your event?" 
      : "Get in touch with us";
  };

  const getDescription = () => {
    return activeForm === "booking"
      ? "Fill out the booking form below to request Morbid Gene for your event"
      : "Send us a message for general inquiries, collaboration, or any other questions";
  };

  return (
    <ContactContainer>
      <Header>
        <SubHeading>{getSubHeading()}</SubHeading>
        
        <ToggleSection>
          <ToggleButton
            active={activeForm === "contact"}
            onClick={() => setActiveForm("contact")}
          >
            General Contact
          </ToggleButton>
          <ToggleButton
            active={activeForm === "booking"}
            onClick={() => setActiveForm("booking")}
          >
            Booking Request
          </ToggleButton>
        </ToggleSection>
        
        <FormDescription>{getDescription()}</FormDescription>
      </Header>
      
      {activeForm === "booking" ? <BookingForm /> : <ContactForm />}
    </ContactContainer>
  );
};
