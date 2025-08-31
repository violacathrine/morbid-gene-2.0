import styled from "styled-components";
import { theme } from "../../styles/theme";

export const ConfirmationOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

export const ConfirmationDialog = styled.div`
  background-color: ${theme.colors.sectionBg};
  padding: ${theme.spacing['2xl']};
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  
  h3 {
    color: ${theme.colors.primaryText};
    margin-bottom: ${theme.spacing.base};
    font-size: ${theme.typography.sizes.xl};
  }
  
  p {
    color: ${theme.colors.mutedText};
    margin-bottom: ${theme.spacing.xl};
    font-size: ${theme.typography.sizes.base};
  }
`;

export const ConfirmationButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.base};
  justify-content: flex-end;
`;

export const ConfirmButton = styled.button`
  background-color: ${theme.colors.red};
  color: ${theme.colors.primaryText};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: 4px;
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};
  
  &:hover {
    background-color: ${theme.colors.darkRed};
  }
`;

export const CancelButton = styled.button`
  background-color: ${theme.colors.charcoal};
  color: ${theme.colors.primaryText};
  border: none;
  padding: ${theme.spacing.sm} ${theme.spacing.xl};
  border-radius: 4px;
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: background-color ${theme.transitions.fast};
  
  &:hover {
    background-color: ${theme.colors.darkCharcoal};
  }
`;