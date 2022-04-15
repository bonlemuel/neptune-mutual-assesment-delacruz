import React from "react";
import { Input as NextInput, Text } from "@nextui-org/react";

type Props = {
  label?: string;
  placeholder?: string;
  value?: any;
  onChangeValue?: any;
};

const styles = {
  root: {
    display: "flex",
    flexDirection: "column" as "column",
    width: "100%",
  },
};

const Input = ({ label, placeholder, value, onChangeValue }: Props) => (
  <div style={styles.root}>
    <Text css={{ ml: "$3", mb: "$3" }} b>
      {label}
    </Text>
    <NextInput
      aria-label={"label"}
      fullWidth
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChangeValue(label, e.target.value)}
    />
  </div>
);

export default Input;
