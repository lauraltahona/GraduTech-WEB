import * as React from "react";
import { InputStyle } from "../../styles/ui/inputStyle";

const Input = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
return (
    <input
      ref={ref}
      style={{ ...InputStyle, ...style }}
      {...rest}
    />
  );  
});

Input.displayName = "Input"

export { Input };
