import { Converter, Layout } from "../components";
import { NextUIProvider } from "@nextui-org/react";
import { Web3ReactProvider } from "@web3-react/core";
import Web3 from "web3";

const IndexPage = () => {
  function getLibrary(provider) {
    return new Web3(provider);
  }

  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <NextUIProvider>
        <Layout title="Neptune Mutual Assignment">
          <Converter />
        </Layout>
      </NextUIProvider>
    </Web3ReactProvider>
  );
};

export default IndexPage;
