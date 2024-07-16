import { InputHTMLAttributes } from "react";

// Styles
import { CustomInputContainer } from "./CustomInput.styles";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput = ({ hasError, ...rest }: CustomInputProps) => {
  return <CustomInputContainer $hasError={hasError} {...rest} />;
};

export default CustomInput;
