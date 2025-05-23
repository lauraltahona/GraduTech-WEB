import * as React from "react";
import { labelStyle } from "../../styles/ui/labelStyle.js";

const Label = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
return (
    <div
      ref={ref}
      style={{ ...labelStyle, ...style }}
      {...rest}
    />
  );  
});

Label.displayName = "Label"

export { Label };