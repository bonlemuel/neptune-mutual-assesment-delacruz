import React, { ReactNode } from "react";
import { Button as NextButton } from "@nextui-org/react";
import { Wallet } from "react-iconly";

type Props = {
  label?: string;
  style?: object;
  auto?: boolean;
  icon?: ReactNode;
  onClick?: any;
  onCheckWalletHandler?: any;
};

const Metamask = ({
  label,
  auto,
  style,
  icon,
  onClick,
  onCheckWalletHandler,
}: Props) => {
  const checkWallet = () => {
    onCheckWalletHandler();
  };

  return (
    <NextButton
      auto={auto}
      icon={<Wallet set="bold" primaryColor="white" />}
      onClick={checkWallet}
    >
      {"Check Wallet Details"}
    </NextButton>
  );
};

export default Metamask;
