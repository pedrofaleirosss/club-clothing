import styled from "styled-components";
import Colors from "../../theme/theme.colors";

export const FooterContainer = styled.footer`
  width: 100%;
  padding: 32px 16px;
  background-color: ${Colors.background.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FooterContent = styled.div`
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
  justify-content: center;
  align-items: center;
`;

export const FooterText = styled.span`
  color: #fff;
  font-size: 14px;
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 13px;
  }
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 16px;
`;

export const FooterLink = styled.a`
  color: #fff;
  font-size: 14px;
  text-decoration: none;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 0.7;
  }
`;
