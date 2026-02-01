import { screen } from "@testing-library/react";
import PaymentConfirmationPage from "./payment-confirmation.page";
import { useNavigate, useSearchParams } from "react-router-dom";
import { renderWithRedux } from "../../helpers/test.helpers";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useSearchParams: jest.fn(),
  useNavigate: jest.fn(),
}));

describe("Payment Confirmation", () => {
  it("should render payment confirmation page correctly when status is success", () => {
    const mockSetSearchParams = jest.fn();
    const mockSearchParams = new URLSearchParams("?success=true");

    (useSearchParams as any).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    renderWithRedux(<PaymentConfirmationPage />, {});

    screen.getByText("Sua compra foi finalizada com sucesso!");
    screen.getByText(/ir para a página inicial/i);
  });

  it("should render payment confirmation page correctly when status is false", () => {
    const mockSetSearchParams = jest.fn();
    const mockSearchParams = new URLSearchParams("?success=false");

    (useSearchParams as any).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    renderWithRedux(<PaymentConfirmationPage />, {});

    screen.getByText(
      "Ocorreu um erro ao finalizar sua compra. Por favor, tente novamente.",
    );
    screen.getByText(/ir para a página inicial/i);
  });

  it("should render payment confirmation page correctly when purchase is canceled", () => {
    const mockSetSearchParams = jest.fn();
    const mockSearchParams = new URLSearchParams("?canceled=true");

    (useSearchParams as any).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    renderWithRedux(<PaymentConfirmationPage />, {});

    screen.getByText(
      "Ocorreu um erro ao finalizar sua compra. Por favor, tente novamente.",
    );
    screen.getByText(/ir para a página inicial/i);
  });

  it("should check if button redirects to home page on click", () => {
    const mockSetSearchParams = jest.fn();
    const mockSearchParams = new URLSearchParams("?success=true");

    (useSearchParams as any).mockReturnValue([
      mockSearchParams,
      mockSetSearchParams,
    ]);

    const mockNavigate = jest.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    renderWithRedux(<PaymentConfirmationPage />, {});

    const homeButton = screen.getByText(/ir para a página inicial/i);
    homeButton.click();

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });
});
