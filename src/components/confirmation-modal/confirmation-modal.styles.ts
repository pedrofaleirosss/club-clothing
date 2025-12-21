import styled from "styled-components";
import Colors from "../../theme/theme.colors";

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(33, 37, 41, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

export const ModalCard = styled.div`
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
  margin-bottom: 28px;
`;

export const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
`;

export const CancelButton = styled.button`
  background: transparent;
  border: none;
  color: ${Colors.text.dark};
  font-weight: 500;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const ConfirmButton = styled.button<{ $variant: "danger" | "primary" }>`
  background: ${({ $variant }) =>
    $variant === "danger" ? Colors.error : Colors.primary};
  color: ${Colors.text.white};
  border: none;
  border-radius: 6px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    opacity: 0.9;
  }
`;
