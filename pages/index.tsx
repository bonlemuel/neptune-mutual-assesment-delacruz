import Link from "next/link";
import Layout from "../components/Layout";
import Converter from "../components/Converter";

const IndexPage = () => (
  <Layout title="Neptune Mutual Currency Converter">
    <Converter />
  </Layout>
);

export default IndexPage;
