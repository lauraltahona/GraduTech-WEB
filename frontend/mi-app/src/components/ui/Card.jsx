import * as React from "react";
import { cardStyle, cardHeaderStyle, cardTitleStyle, cardDescriptionStyle, CardContentStyle } from "../../styles/ui/cardStyle.js";

const Card = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;

  return (
    <div
      ref={ref}
      style={{ ...cardStyle, ...style }} // fusiona estilos predefinidos con personalizados
      {...rest}
    />
  );
});

Card.displayName = "Card";

const CardHeader = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
  return (
    <div
      ref={ref}
      style={{ ...cardHeaderStyle, ...style }}
      {...rest}
    />
  );
});

CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef((props, ref)  => {
  const { style, ...rest } = props;
  return (
    <div
      ref={ref}
      style={{ ...cardTitleStyle, ...style }}
      {...rest}
    />
  );
});

CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
return (
    <div
      ref={ref}
      style={{ ...cardDescriptionStyle, ...style }}
      {...rest}
    />
  );
});

CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef((props, ref) => {
  const { style, ...rest } = props;
return (
    <div
      ref={ref}
      style={{ ...CardContentStyle, ...style }}
      {...rest}
    />
  );  
});

CardContent.displayName = "CardContent"

export { Card, CardHeader, CardTitle, CardDescription, CardContent };
