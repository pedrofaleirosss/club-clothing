import Colors from "../../theme/theme.colors";
import CustomButton from "../custom-button/custom-button.component";
import {
  Overlay,
  ModalCard,
  ModalTitle,
  ModalDescription,
  ModalActions,
} from "./message-modal.styles";

interface MessageModalProps {
  isOpen: boolean;
  title: string;
  description: string;
  variant?: "error" | "success" | "info";
  onClose: () => void;
}

const MessageModal = ({
  isOpen,
  title,
  description,
  variant = "info",
  onClose,
}: MessageModalProps) => {
  if (!isOpen) return null;

  const backgroundButtonColor =
    variant === "error"
      ? Colors.error
      : variant === "success"
        ? Colors.success
        : Colors.primary;

  return (
    <Overlay>
      <ModalCard $variant={variant}>
        <ModalTitle>{title}</ModalTitle>

        <ModalDescription>{description}</ModalDescription>

        <ModalActions>
          <CustomButton
            onClick={onClose}
            style={{
              backgroundColor: backgroundButtonColor,
              color: Colors.text.white,
            }}
          >
            Entendi
          </CustomButton>
        </ModalActions>
      </ModalCard>
    </Overlay>
  );
};

export default MessageModal;
