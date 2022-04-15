import React, { ReactNode, useState, useEffect } from "react";
import { Text, Image, Card, Grid } from "@nextui-org/react";
import { Input, Recharts, Button } from "../components";
import { Swap } from "react-iconly";
import moment from "moment";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "center",
    alignItems: "center",
    background: "#01052d",
    height: "100vh",
    width: "100vw",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    padding: 20,
  },
  logo: {
    alignSelf: "center",
    width: "100%",
    height: "auto",
  },
  card: {
    m: "$10",
    p: "$5",
    width: "auto",
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
};

type Props = {
  children?: ReactNode;
  title?: string;
};

const Converter = (props) => {
  const [nep, setNep] = useState(0.0);
  const [busd, setBusd] = useState(0.0);
  const [isDefault, setIsDefault] = useState(true);

  const onChangeValue = (type, value) => {
    let stringTest = /^\d*\.?\d*$/;
    let result = 0;
    if (!stringTest.test(value) && value !== "") {
      return;
    }
    if (type === "NEP") {
      result = Math.round(parseFloat(value) * 3 * 100) / 100;
      setBusd(result);
      setNep(value);
    }
    if (type === "BUSD") {
      result = Math.round((parseFloat(value) / 3) * 100) / 100;
      setNep(result);
      setBusd(value);
    }
  };

  const _renderCardHeader = () => (
    <>
      <Text h3>{isDefault ? "3 BUSD" : "0.33 NEP"}</Text>
      <Text i color={isDefault ? "success" : "error"}>
        {isDefault ? "+0.5 (16%) ▲ today" : "-0.5 (16%) ▼ today"}
      </Text>
      <Text size={12}>{moment().format("MMM DD, HH:mm A") + " PST"}</Text>
    </>
  );

  const _renderCharts = () => <Recharts isDefault={isDefault} />;

  const _renderForm = () => (
    <Grid.Container css={styles.inputContainer} gap={1} justify="center">
      <Grid xs={12} sm={5} md={5} lg={5}>
        {isDefault ? (
          <Input
            label={"NEP"}
            placeholder="0.00"
            value={nep ? nep : ""}
            onChangeValue={onChangeValue}
          />
        ) : (
          <Input
            label={"BUSD"}
            placeholder="0.00"
            value={busd ? busd : ""}
            onChangeValue={onChangeValue}
          />
        )}
      </Grid>
      <Grid xs={12} sm={2} md={2} lg={2} alignItems={"center"} justify={"center"}>
        <Button
          auto
          icon={<Swap set="bold" primaryColor="white" />}
          onClick={() => setIsDefault(!isDefault)}
        />
      </Grid>
      <Grid xs={12} sm={5} md={5} lg={5}>
        {isDefault ? (
          <Input
            label={"BUSD"}
            placeholder="0.00"
            value={busd ? busd : ""}
            onChangeValue={onChangeValue}
          />
        ) : (
          <Input
            label={"NEP"}
            placeholder="0.00"
            value={nep ? nep : ""}
            onChangeValue={onChangeValue}
          />
        )}
      </Grid>
    </Grid.Container>
  );

  return (
    <div style={styles.root}>
      <div style={styles.logoContainer}>
        <Image
          style={styles.logo}
          src={"https://neptunemutual.com/logos/neptune-mutual-full-inverse.png"}
        />
      </div>
      <Card css={styles.card}>
        {_renderCardHeader()}
        {_renderCharts()}
        {_renderForm()}
        <Button label="Check Wallet Details" />
      </Card>
    </div>
  );
};

export default Converter;
