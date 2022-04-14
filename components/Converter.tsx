import React, { ReactNode } from "react";
import Link from "next/link";
import Head from "next/head";

type Props = {
  children?: ReactNode;
  title?: string;
};

const Converter = ({ children, title = "This is the default title" }: Props) => (
  <div>
    <h3>Hello Next.js 👋</h3>
  </div>
);

export default Converter;
