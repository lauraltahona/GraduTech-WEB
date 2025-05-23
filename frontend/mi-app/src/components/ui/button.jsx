import * as React from "react";
import { buttonStyle } from "../../styles/ui/buttonStyle";

const Button = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
return (
    <button
      ref={ref}
      style={{ ...buttonStyle, ...style }}
      {...rest}
    />
  );  
});

Button.displayName = "Button"

export { Button };
