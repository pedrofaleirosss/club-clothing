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

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(33, 37, 41, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: ${Colors.background.white};
  width: 420px;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.18);

  animation: fadeIn 0.2s ease-out;

  @media (max-width: 768px) {
    width: 90%;
    padding: 24px;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(6px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ModalTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${Colors.text.dark};
  margin-bottom: 12px;
`;

export const ModalDescription = styled.p`
  font-size: 0.95rem;
  color: ${Colors.text.dark};
  line-height: 1.4;
  margin-bottom: 20px;

  strong {
    color: ${Colors.error};
  }
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  margin-top: 24px;
`;
