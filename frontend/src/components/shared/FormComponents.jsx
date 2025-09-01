import styled from "styled-components";
import { theme } from "../../styles/theme";

export const SelectionContainer = styled.div`
  margin-bottom: ${theme.spacing.xl};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.base};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    flex-direction: row;
    gap: ${theme.spacing.base};
    align-items: center;
  }
`;

export const Select = styled.select`
  padding: ${theme.spacing.md};
  background-color: ${theme.colors.inputBg};
  border: 2px solid ${theme.colors.borderLight};
  border-radius: 4px;
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.sizes.base};
  width: 100%;
  cursor: pointer;
  transition: border-color ${theme.transitions.normal};

  &:focus {
    outline: none;
    border-color: ${theme.colors.borderRed};
  }

  option {
    background-color: ${theme.colors.inputBg};
    color: ${theme.colors.primaryText};
  }
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: 0.85rem;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.md};
  margin-bottom: ${theme.spacing.xl};
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    gap: ${theme.spacing.base};
  }
`;

export const QuantityLabel = styled.label`
  color: ${theme.colors.primaryText};
  font-weight: ${theme.typography.weights.bold};
  font-size: ${theme.typography.sizes.base};
  min-width: 80px;
`;

export const QuantityInput = styled.input`
  padding: ${theme.spacing.sm};
  width: 80px;
  background-color: ${theme.colors.inputBg};
  border: 2px solid ${theme.colors.borderLight};
  border-radius: 4px;
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.sizes.base};
  text-align: center;

  &:focus {
    outline: none;
    border-color: ${theme.colors.borderRed};
  }

  /* Hide spin buttons in webkit browsers */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* Hide spin buttons in Firefox */
  &[type=number] {
    -moz-appearance: textfield;
  }
`;