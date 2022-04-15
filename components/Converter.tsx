import React, { ReactNode } from "react";
import { Container, Button, Image, Card } from "@nextui-org/react";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    boxSizing: "content-box",
    background: "#1f1f1f",
    height: "100vh",
    width: "100vw",
    m: 0,
    p: 20,
  },
  logo: {
    maxWidth: "40vw",
    height: "auto",
  },
  card: {
    m: "$10",
    maxWidth: "40vw",
  },
};

type Props = {
  children?: ReactNode;
  title?: string;
};

const Converter = ({ children, title = "This is the default title" }: Props) => {
  return (
    <Container css={styles.root}>
      <Image
        style={styles.logo}
        src={"https://neptunemutual.com/logos/neptune-mutual-full-inverse.png"}
      />
      <Card css={styles.card}>
        <Button>Click me</Button>
      </Card>
    </Container>
  );
};

export default Converter;
