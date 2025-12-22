import Colors from "../../theme/theme.colors";
import CustomButton from "../custom-button/custom-button.component";
import {
  Overlay,
  ModalCard,
  ModalTitle,
  ModalDescription,
  ModalActions,
  ErrorMessage,
} from "./confirmation-modal.styles";

interface ConfirmationModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  isLoading?: boolean;
  variant?: "danger" | "primary";
  onConfirm: () => void;
  onCancel: () => void;
  errorMessage?: string;
}

const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  isLoading = false,
  onConfirm,
  onCancel,
  errorMessage,
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalCard>
        <ModalTitle>{title}</ModalTitle>

        <ModalDescription>{description}</ModalDescription>

        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}

        <ModalActions>
          <CustomButton onClick={onCancel}>{cancelText}</CustomButton>

          <CustomButton
            onClick={onConfirm}
            disabled={isLoading}
            style={{ backgroundColor: Colors.error }}
          >
            {isLoading ? "Processando..." : confirmText}
          </CustomButton>
        </ModalActions>
      </ModalCard>
    </Overlay>
  );
};

export default ConfirmationModal;
