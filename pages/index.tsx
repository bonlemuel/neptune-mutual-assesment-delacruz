import Link from "next/link";
import { Converter, Layout } from "../components";
import { NextUIProvider } from "@nextui-org/react";

const IndexPage = () => (
  <NextUIProvider>
    <Layout title="Neptune Mutual Currency Converter">
      <Converter />
    </Layout>
  </NextUIProvider>
);

export default IndexPage;
