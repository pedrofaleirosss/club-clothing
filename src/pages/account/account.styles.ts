import styled from "styled-components";
import Colors from "../../theme/theme.colors";

export const AccountContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    min-height: calc(100vh - 114px);
  }
`;

export const AccountContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 450px;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const AccountHeadline = styled.p`
  font-weight: 600;
  font-size: 1.3rem;
  margin-bottom: 20px;
  color: ${Colors.text.dark};
  padding-bottom: 20px;
  border-bottom: 1px solid #6c757d;
  width: 100%;
  text-align: center;
`;

export const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background-color: ${Colors.primary};
  color: ${Colors.text.white};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.8rem;
  font-weight: 600;
  margin: 20px 0;
`;

export const UserInfo = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;

export const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${Colors.input.background};
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 12px;

  strong {
    font-size: 0.85rem;
    color: ${Colors.text.dark};
    margin-bottom: 4px;
  }

  span {
    color: ${Colors.text.dark};
    font-size: 0.95rem;
  }
`;
