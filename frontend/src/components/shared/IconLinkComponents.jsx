import styled from "styled-components";
import { Link } from "react-router-dom";
import { theme } from "../../styles/theme";

export const IconLink = styled(Link)`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 10px;
  margin: 0;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  transition: all 0.2s ease;
  line-height: 1;
  vertical-align: middle;
  font-size: 16px;
  height: 38px;
  width: 38px;
  box-sizing: border-box;
  
  &:hover {
    color: #dc2626;
    background: rgba(220, 38, 38, 0.1);
  }
  
  @media (min-width: 768px) {
    padding: 12px;
    font-size: 20px;
    height: 44px;
    width: 44px;
    position: relative;
    
    &:hover::after {
      content: attr(aria-label);
      position: absolute;
      top: 100%;
      left: 50%;
      transform: translateX(-50%);
      margin-top: 5px;
      background: #333;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      white-space: nowrap;
      z-index: 1000;
    }
  }
`;

export const IconButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primaryText};
  font-size: ${theme.typography.sizes.lg};
  cursor: pointer;
  transition: color ${theme.transitions.fast};
  padding: 0;
  display: inline-flex;
  align-items: center;
  
  &:hover {
    color: ${theme.colors.mutedText};
  }
  
  @media (min-width: ${theme.breakpoints.tablet}) {
    font-size: ${theme.typography.sizes.lg};
  }
`;