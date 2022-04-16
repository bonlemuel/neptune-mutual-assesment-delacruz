import React, { ReactNode, useState, useEffect } from "react";
import { Text, Image, Card, Grid } from "@nextui-org/react";
import { Input, Recharts, Button, Metamask, Loader } from "../components";
import { Swap } from "react-iconly";
import moment from "moment";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column" as "column",
    justifyContent: "flex-start",
    alignItems: "center",
    background: "#01052d",
    height: "100vh",
    width: "100vw",
    paddingTop: "4vh",
  },
  logoContainer: {
    display: "flex",
    flexDirection: "row" as "row",
    justifyContent: "center",
    alignItems: "center",
    maxWidth: 350,
    padding: 10,
    cursor: "pointer",
  },
  logo: {
    alignSelf: "center",
    width: "100%",
    height: "auto",
  },
  card: {
    m: "$5",
    p: "$5",
    width: "auto",
  },
  inputContainer: {
    marginTop: 10,
    marginBottom: 10,
  },
  footer: {
    position: "absolute" as "absolute",
    bottom: 20,
    right: 20,
  },
  disclaimerContainer: {
    marginTop: 10,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  disclaimerText: { textAlign: "right", width: "60%" },
};

type Props = {
  children?: ReactNode;
};

const Converter = (props) => {
  const [nep, setNep] = useState("");
  const [busd, setBusd] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDefault, setIsDefault] = useState(true);

  const onChangeValue = (type, value) => {
    /**
     * * Validation: Don't allow alpha characters
     * */
    let stringTest = /^\d*\.?\d*$/;
    if (!stringTest.test(value) && value !== "") {
      return;
    }

    /**
     * * Converter Computation
     */
    let result = "";
    if (type === "NEP") {
      result = ((Math.round(parseFloat(value) * 3) * 100) / 100).toFixed(2);
      setBusd(result);
      setNep(value);
    }
    if (type === "BUSD") {
      result = (Math.round((parseFloat(value) / 3) * 100) / 100).toFixed(2);
      setNep(result);
      setBusd(value);
    }
  };

  const _renderLogo = () => (
    <div
      style={styles.logoContainer}
      onClick={() => window.open("https://neptunemutual.com/")}
    >
      <Image
        style={styles.logo}
        src={"https://neptunemutual.com/logos/neptune-mutual-full-inverse.png"}
      />
    </div>
  );

  const _renderCardHeader = () => (
    <>
      <Text h3>{isDefault ? "3 BUSD" : "0.33 NEP"}</Text>
      <Text i color={isDefault ? "success" : "error"}>
        {isDefault ? "+0.5 (16%) ▲ today" : "-0.5 (16%) ▼ today"}
      </Text>
      <Text size={12}>{moment().format("MMM DD, hh:mm A") + " PST"}</Text>
    </>
  );

  const _renderCharts = () => <Recharts isDefault={isDefault} />;

  const _renderForm = () => (
    <Grid.Container css={styles.inputContainer} gap={1} justify="center">
      <Grid xs={12} sm={5} md={5} lg={5}>
        <Input
          label={isDefault ? "NEP" : "BUSD"}
          placeholder="0.00"
          value={nep && busd ? (isDefault ? nep : busd) : ""}
          onChangeValue={onChangeValue}
        />
      </Grid>
      <Grid
        xs={12}
        sm={2}
        md={2}
        lg={2}
        style={{ marginTop: 27 }}
        alignItems={"center"}
        justify={"center"}
      >
        <Button
          auto
          icon={<Swap set="bold" primaryColor="white" />}
          onClick={() => setIsDefault(!isDefault)}
        />
      </Grid>
      <Grid xs={12} sm={5} md={5} lg={5}>
        <Input
          label={isDefault ? "BUSD" : "NEP"}
          placeholder="0.00"
          value={nep && busd ? (isDefault ? busd : nep) : ""}
          onChangeValue={onChangeValue}
        />
      </Grid>
    </Grid.Container>
  );

  const _renderDisclaimer = () => (
    <div style={styles.disclaimerContainer}>
      <Text css={styles.disclaimerText} size={10}>
        <b>Developer Remarks:</b> NEP-BUSD rates and chart values are randomly generated
        for this assignment
      </Text>
    </div>
  );

  const _renderFooter = () => (
    <div style={styles.footer}>
      <Text
        css={{ cursor: "pointer" }}
        color="white"
        onClick={() => window.open("https://linktr.ee/bonlemuel")}
      >
        {"Developed by "}
        <b>{"Bon Lemuel Dela Cruz"}</b>
      </Text>
    </div>
  );

  return (
    <div style={styles.root}>
      <Loader show={isLoading} />
      {_renderLogo()}
      <Card css={styles.card}>
        {_renderCardHeader()}
        {_renderCharts()}
        {_renderDisclaimer()}
        {_renderForm()}
        <Metamask setIsLoading={setIsLoading} />
      </Card>
      {_renderFooter()}
    </div>
  );
};

export default Converter;
