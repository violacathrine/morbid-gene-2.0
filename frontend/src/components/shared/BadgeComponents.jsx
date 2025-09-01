import styled from "styled-components";
import { theme } from "../../styles/theme";

export const Badge = styled.span`
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: ${theme.colors.red};
  color: ${theme.colors.primaryText};
  border-radius: 50%;
  padding: 2px 4px;
  font-size: ${theme.typography.sizes.xs};
  font-weight: ${theme.typography.weights.bold};
  min-width: 16px;
  height: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1;

  @media (min-width: ${theme.breakpoints.tablet}) {
    top: -${theme.spacing.xs};
    right: -${theme.spacing.xs};
    padding: 2px 6px;
    font-size: ${theme.typography.sizes.xs};
    min-width: 18px;
    height: 18px;
  }
`;