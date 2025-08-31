import styled from "styled-components";
import { theme } from "../../styles/theme";

export const PopupOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  padding: ${theme.spacing.base};
`;

export const PopupBox = styled.div`
  background-color: ${theme.colors.sectionBg};
  padding: ${theme.spacing['2xl']};
  border-radius: 8px;
  border: 1px solid ${theme.colors.borderLight};
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    padding: ${theme.spacing['3xl']};
  }
`;

export const PopupMessage = styled.p`
  color: ${theme.colors.primaryText};
  margin-bottom: ${theme.spacing.xl};
  font-size: ${theme.typography.sizes.base};
  line-height: 1.5;
  
  @media (min-width: ${theme.breakpoints.mobile}) {
    font-size: ${theme.typography.sizes.lg};
    margin-bottom: ${theme.spacing['2xl']};
  }
`;

export const PopupButtons = styled.div`
  display: flex;
  gap: ${theme.spacing.base};
  justify-content: center;
  flex-wrap: wrap;
`;

export const ContinueButton = styled.button`
  background-color: ${theme.colors.buttonSecondary};
  color: ${theme.colors.primaryText};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: 4px;
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: background-color ${theme.transitions.normal};
  
  &:hover {
    background-color: ${theme.colors.buttonSecondaryHover};
  }
`;

export const CartButton = styled.button`
  background-color: ${theme.colors.buttonPrimary};
  color: ${theme.colors.primaryText};
  border: none;
  padding: ${theme.spacing.md} ${theme.spacing.xl};
  border-radius: 4px;
  font-weight: ${theme.typography.weights.bold};
  cursor: pointer;
  transition: background-color ${theme.transitions.normal};
  
  &:hover {
    background-color: ${theme.colors.buttonPrimaryHover};
  }
`;