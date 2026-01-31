import { render, screen } from "@testing-library/react";
import ConfirmationModal from "./confirmation-modal.component";

describe("Confirmation Modal", () => {
  it("should render the confirmation modal with the correct message", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onConfirm={() => {}}
        onCancel={() => {}}
        confirmText="Confirmar Ação"
        cancelText="Cancelar Ação"
      />,
    );

    screen.getByText(/título/i);
    screen.getByText(/descrição/i);
    screen.getByText(/confirmar ação/i);
    screen.getByText(/cancelar ação/i);
  });

  it("should not render the modal when isOpen is false", () => {
    render(
      <ConfirmationModal
        isOpen={false}
        title="Título"
        description="Descrição"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );

    const modalTitle = screen.queryByText(/título/i);
    expect(modalTitle).toBeNull();
  });

  it("should display the loading state when isLoading is true", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onConfirm={() => {}}
        onCancel={() => {}}
        isLoading={true}
      />,
    );

    screen.getByText(/processando.../i);
  });

  it("should display an error message when provided", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onConfirm={() => {}}
        onCancel={() => {}}
        errorMessage="Erro ao processar a ação"
      />,
    );

    screen.getByText(/erro ao processar a ação/i);
  });

  it("should use default button texts when confirmText and cancelText are not provided", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onConfirm={() => {}}
        onCancel={() => {}}
      />,
    );

    screen.getByText(/confirmar/i);
    screen.getByText(/cancelar/i);
  });

  it("should call onConfirm and onCancel callbacks when buttons are clicked", () => {
    const onConfirmMock = jest.fn();
    const onCancelMock = jest.fn();

    render(
      <ConfirmationModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onConfirm={onConfirmMock}
        onCancel={onCancelMock}
      />,
    );

    const confirmButton = screen.getByText(/confirmar/i);
    const cancelButton = screen.getByText(/cancelar/i);

    confirmButton.click();
    cancelButton.click();

    expect(onConfirmMock).toHaveBeenCalled();
    expect(onCancelMock).toHaveBeenCalled();
  });

  it("should disable confirm button when isLoading is true", () => {
    render(
      <ConfirmationModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onConfirm={() => {}}
        onCancel={() => {}}
        isLoading={true}
      />,
    );

    const confirmButton = screen.getByText(/processando.../i);
    expect(confirmButton).toBeDisabled();
  });
});
