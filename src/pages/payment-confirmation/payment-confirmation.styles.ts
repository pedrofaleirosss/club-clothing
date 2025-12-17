import styled from "styled-components";

export const PaymentConfirmationContainer = styled.div`
  min-height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const PaymentConfirmationContent = styled.div`
  text-align: center;
  width: 500px;

  p {
    margin-top: 15px;
    margin-bottom: 15px;
    font-size: 1.125rem;
    font-weight: 500;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;
