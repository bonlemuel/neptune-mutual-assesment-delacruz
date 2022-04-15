import React from "react";
import { Image as NextImage } from "@nextui-org/react";

type Props = {
  src?: string;
  style?: object;
};

const Image = ({ src, style }: Props) => (
  <NextImage style={style} src={src} alt="Default Image" objectFit="cover" />
);

export default Image;
