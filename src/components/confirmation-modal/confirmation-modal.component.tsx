import Colors from "../../theme/theme.colors";
import CustomButton from "../custom-button/custom-button.component";
import {
  Overlay,
  ModalCard,
  ModalTitle,
  ModalDescription,
  ModalActions,
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
}: ConfirmationModalProps) => {
  if (!isOpen) return null;

  return (
    <Overlay>
      <ModalCard>
        <ModalTitle>{title}</ModalTitle>

        <ModalDescription>{description}</ModalDescription>

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
