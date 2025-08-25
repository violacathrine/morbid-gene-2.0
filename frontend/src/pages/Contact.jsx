import React, { useState } from "react";
import styled from "styled-components";
import BookingForm from "../components/BookingForm";
import ContactForm from "../components/ContactForm";

const ContactContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%);
  padding: 2rem 0;
  
  @media (min-width: 768px) {
    padding: 3rem 0;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  
  @media (min-width: 768px) {
    margin-bottom: 3rem;
    padding: 2rem;
  }
`;

const MainHeading = styled.h1`
  color: #ffffff;
  font-size: 2rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 0.5rem;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  font-weight: 800;
  
  @media (min-width: 768px) {
    font-size: 2.5rem;
    letter-spacing: 2px;
    margin-bottom: 1rem;
  }
`;

const SubHeading = styled.h2`
  color: #cccccc;
  font-size: 1rem;
  font-style: italic;
  margin: 0 0 1.5rem 0;
  font-weight: 300;
  
  @media (min-width: 768px) {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

const ToggleSection = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  gap: 0;
  
  @media (min-width: 768px) {
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
  padding: 0.75rem 1.5rem;
  font-size: 0.9rem;
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
  text-align: center;
  color: #999999;
  font-size: 0.9rem;
  margin: 0 2rem 1rem 2rem;
  
  @media (min-width: 768px) {
    font-size: 1rem;
    margin: 0 0 2rem 0;
  }
`;

export const Contact = () => {
  const [activeForm, setActiveForm] = useState("booking");

  const getHeading = () => {
    return activeForm === "booking" ? "Book Morbid Gene" : "Contact Us";
  };

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
        <MainHeading>{getHeading()}</MainHeading>
        <SubHeading>{getSubHeading()}</SubHeading>
        
        <ToggleSection>
          <ToggleButton
            active={activeForm === "booking"}
            onClick={() => setActiveForm("booking")}
          >
            Booking Request
          </ToggleButton>
          <ToggleButton
            active={activeForm === "contact"}
            onClick={() => setActiveForm("contact")}
          >
            General Contact
          </ToggleButton>
        </ToggleSection>
        
        <FormDescription>{getDescription()}</FormDescription>
      </Header>
      
      {activeForm === "booking" ? <BookingForm /> : <ContactForm />}
    </ContactContainer>
  );
};
