import styled from "styled-components";
import { theme } from "../../styles/theme";

export const LoadingMessage = styled.div`
  padding: ${theme.spacing['2xl']};
  color: ${theme.colors.primaryText};
  text-align: center;
`;

export const ErrorMessage = styled(LoadingMessage)`
  color: ${theme.colors.red};
`;