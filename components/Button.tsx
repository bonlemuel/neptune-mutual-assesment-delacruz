import React, { ReactNode } from "react";
import { Button as NextButton } from "@nextui-org/react";

type Props = {
  label?: string;
  style?: object;
  auto?: boolean;
  icon?: ReactNode;
  onClick?: any;
};

const Button = ({ label, auto, style, icon, onClick }: Props) => (
  <NextButton auto={auto} icon={icon} onClick={onClick}>
    {label}
  </NextButton>
);

export default Button;
