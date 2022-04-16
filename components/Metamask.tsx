import React, { ReactNode, useState, useEffect } from "react";
import { Wallet } from "react-iconly";
import { Modal, Text, Table, Button as NextButton } from "@nextui-org/react";
import { CloseSquare, ShieldDone } from "react-iconly";
import {
  InjectedConnector,
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "@ethersproject/units";

const styles = {
  cellKey: {
    fontWeight: "bold",
  },
  cellValue: {
    textAlign: "right",
  },
  error: {
    mt: 10,
    color: "red",
    textAlign: "center",
  },
};

type Props = {
  label?: string;
  style?: object;
  auto?: boolean;
  icon?: ReactNode;
  onClick?: any;
  onCheckWalletHandler?: any;
};

const INJECTED = new InjectedConnector({
  supportedChainIds: [1, 3, 4, 5, 42, 97],
});

const Metamask = ({ auto }: Props) => {
  const { active, account, library, connector, activate, deactivate, chainId, error } =
    useWeb3React();

  const [showModal, setShowModal] = useState(false);
  const [accountAddress, setAccountAddress] = useState("-");
  const [connectedChainId, setConnectedChainId] = useState(0);
  const [walletBalance, setWalletBalance] = useState("-");

  useEffect(() => {
    if (active && library) {
      setAccountAddress(account);
      setConnectedChainId(chainId);
      /**
       * * Get Account Balance
       */
      handleGetBalance();
    }
  }, [active]);

  const handleFormatAddress = (address) => {
    return (
      address.substring(0, 5) +
      "...." +
      address.substring(address.length - 4, address.length)
    );
  };

  const handleGetBalance = () => {
    library?.eth
      .getBalance(account)
      .then((balance: any) => {
        console.debug("balance => ", balance);
        setWalletBalance(parseFloat(formatEther(balance)).toPrecision(2));
      })
      .catch(() => {
        setWalletBalance("-");
      });
  };

  const handleError = (error: Error) => {
    if (error instanceof NoEthereumProviderError) {
      return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
    } else {
      return "An unknown error occurred. Check the console for more details.";
    }
  };

  async function connectWallet() {
    console.debug("---- Connect Wallet ----");
    try {
      await activate(INJECTED).then((value) => {});
    } catch (ex) {
      console.log(ex);
    }
  }

  async function disconnectWallet() {
    console.debug("---- Disconnect Wallet ----");
    try {
      await deactivate();
    } catch (ex) {
      console.log(ex);
    }
  }

  const handleModal = (state) => {
    setShowModal(state);
  };

  const _renderWalletDetailsModal = () => {
    return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showModal}
        onClose={() => handleModal(false)}
      >
        <Modal.Header>
          <Text b size={18}>
            Wallet Details
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Table shadow={false} aria-label="wallet-details-table">
            <Table.Header>
              <Table.Column>Key</Table.Column>
              <Table.Column align={"end"}>Value</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row key="1">
                <Table.Cell css={styles.cellKey}>Account</Table.Cell>
                <Table.Cell css={styles.cellValue}>
                  {handleFormatAddress(accountAddress)}
                </Table.Cell>
              </Table.Row>
              <Table.Row key="2">
                <Table.Cell css={styles.cellKey}>Chain ID</Table.Cell>
                <Table.Cell css={styles.cellValue}>{connectedChainId}</Table.Cell>
              </Table.Row>
              <Table.Row key="3">
                <Table.Cell css={styles.cellKey}>Balance</Table.Cell>
                <Table.Cell css={styles.cellValue}>Ξ{walletBalance}</Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
          <NextButton
            auto
            color={"error"}
            icon={<CloseSquare set="bold" primaryColor="white" />}
            onClick={() => disconnectWallet()}
          >
            Disconnect Wallet
          </NextButton>
        </Modal.Body>
      </Modal>
    );
  };

  const _renderConnectWalletModal = () => {
    return (
      <Modal
        closeButton
        aria-labelledby="modal-title"
        open={showModal}
        onClose={() => handleModal(false)}
      >
        <Modal.Header>
          <Text b size={18}>
            Wallet Details
          </Text>
        </Modal.Header>
        <Modal.Body>
          <Text>
            Wallet is not connected. To connect your wallet, please select the{" "}
            <b>Connect Wallet</b> button.
          </Text>
        </Modal.Body>
        <Modal.Footer>
          <NextButton auto flat color="error" onClick={() => handleModal(false)}>
            Close
          </NextButton>
          <NextButton
            auto
            icon={<ShieldDone set="bold" primaryColor="white" />}
            onClick={() => connectWallet()}
          >
            Connect Wallet
          </NextButton>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <>
      {!active ? _renderConnectWalletModal() : _renderWalletDetailsModal()}
      <NextButton
        auto={auto}
        color={!active ? "default" : "success"}
        icon={<Wallet set="bold" primaryColor="white" />}
        onClick={() => handleModal(true)}
      >
        {!active ? "Check Wallet Details" : "View Wallet Details"}
      </NextButton>
      {!!error && <Text css={styles.error}>{handleError(error)}</Text>}
    </>
  );
};

export default Metamask;
