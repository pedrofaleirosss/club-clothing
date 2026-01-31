import { render, screen } from "@testing-library/react";
import MessageModal from "./message-modal.component";
import Colors from "../../theme/theme.colors";

describe("Message Modal", () => {
  it("should render correctly", () => {
    render(
      <MessageModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onClose={() => {}}
      />,
    );

    screen.getByText(/título/i);
    screen.getByText(/descrição/i);
    screen.getByText(/entendi/i);
  });

  it("should not render when isOpen is false", () => {
    const { container } = render(
      <MessageModal
        isOpen={false}
        title="Título"
        description="Descrição"
        onClose={() => {}}
      />,
    );

    expect(container).toBeEmptyDOMElement();
  });

  it("should use onClose when clicking the button", () => {
    const onCloseMock = jest.fn();

    render(
      <MessageModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onClose={onCloseMock}
      />,
    );

    const button = screen.getByText(/entendi/i);
    button.click();

    expect(onCloseMock).toHaveBeenCalled();
  });

  it("should render with correct color if variant is 'error'", () => {
    render(
      <MessageModal
        isOpen={true}
        title="Título"
        description="Descrição"
        variant="error"
        onClose={() => {}}
      />,
    );

    const button = screen.getByText(/entendi/i);

    expect(button).toHaveStyle({ backgroundColor: Colors.error });
  });

  it("should render with correct color if variant is 'success'", () => {
    render(
      <MessageModal
        isOpen={true}
        title="Título"
        description="Descrição"
        variant="success"
        onClose={() => {}}
      />,
    );

    const button = screen.getByText(/entendi/i);

    expect(button).toHaveStyle({ backgroundColor: Colors.success });
  });

  it("should render with default color if variant is not provided", () => {
    render(
      <MessageModal
        isOpen={true}
        title="Título"
        description="Descrição"
        onClose={() => {}}
      />,
    );

    const button = screen.getByText(/entendi/i);

    expect(button).toHaveStyle({ backgroundColor: Colors.primary });
  });
});
