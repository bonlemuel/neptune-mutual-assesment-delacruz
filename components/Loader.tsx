import React, { ReactNode } from "react";
import { Loading as NextLoader, Modal, Text } from "@nextui-org/react";

type Props = {
  show?: boolean;
};

const Loader = ({ show }: Props) => (
  <Modal
    css={{ background: "transparent", boxShadow: "none" }}
    preventClose
    aria-labelledby="loader-modal"
    open={show}
    onClose={() => ""}
  >
    <NextLoader size={"lg"} color={"white"}>
      <Text b size={"16px"} color={"white"}>
        Please wait..
      </Text>
    </NextLoader>
  </Modal>
);

export default Loader;
