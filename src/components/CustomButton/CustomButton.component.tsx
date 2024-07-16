import { FunctionComponent, ReactNode, ButtonHTMLAttributes } from "react";

// Styles
import { CustomButtonContainer, IconContainer } from "./CustomButton.styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  startIcon?: ReactNode;
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  startIcon,
}) => {
  return (
    <CustomButtonContainer>
      {startIcon && <IconContainer>{startIcon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  );
};

export default CustomButton;
