import React, { FunctionComponent, InputHTMLAttributes } from "react";

// Styles
import { CustomInputContainer } from "./CustomInput.styles";

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
  (props, ref) => {
    const { hasError, ...otherProps } = props;
    return (
      <CustomInputContainer
        {...otherProps}
        $hasError={props.hasError}
        ref={ref as any}
      />
    );
  }
);

CustomInput.displayName = "CustomInput";

export default CustomInput;
