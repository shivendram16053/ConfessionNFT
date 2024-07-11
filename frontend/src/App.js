import React, { useEffect, useState } from "react";
import { Contract, BrowserProvider } from "ethers";
import NFT from "./abi/confessionNFT.json";
import "./App.css";
import Navigation from "./Components/Navigation";
import WelcomePage from "./Components/WelcomePage";
import ConfessionForm from "./Components/ConfessionForm";

const NFT_CONTRACT_ADDRESS = "0x7461f91C8fc9D4D2435FEaF187D79cd8bb5bd4c5";

const App = () => {
  const [installed, setInstalled] = useState(false);
  const [account, setAccount] = useState(null);
  const [isMinting, setIsMinting] = useState(false);
  const [NFTContract, setNFTContract] = useState(null);
  const [nftLink, setNftLink] = useState("");
  const [expLink, setExpLink] = useState("");
  const [tokenId, setTokenId] = useState("");

  //check if wallet installed or not
  useEffect(() => {
    if (window.ethereum) {
      setInstalled(true);
    }
  }, []);

  //for network check
  async function networkCheck() {
    const amoyChainId = "0x13882";

    const userChainId = await window.ethereum.request({
      method: "eth_chainId",
    });
    console.log(userChainId)

    if (userChainId !== amoyChainId) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: amoyChainId }],
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          try {
            await window.ethereum.request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: amoyChainId,
                  chainName: "Polygon Amoy Testnet",
                  rpcUrls: ["https://rpc-amoy.polygon.technology/"],
                  nativeCurrency: {
                    name: "Matic Token",
                    symbol: "MATIC",
                    decimals: 18,
                  },
                  blockExplorerUrls: ["https://amoy.polygonscan.com/"],
                },
              ],
            });
            await window.ethereum.request({
              method: "wallet_switchEthereumChain",
              params: [{ chainId: amoyChainId }],
            });
          } catch (addError) {
            console.error(addError);
          }
        }
      }
    }
  }

  //connect wallet function
  async function connectWallet() {
    if (!installed) {
      alert(
        "You don't have Metamask installed. Please install it from https://metamask.io/download/"
      );
      return;
    } else {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        setAccount(accounts[0]);
        networkCheck();
      } catch (error) {
        alert(error.message);
      }
    }
  }

  //for smart contract interaction
  useEffect(() => {
    async function initNFTContract() {
      if (account && window.ethereum) {
        const provider = new BrowserProvider(window.ethereum);
        try {
          const signer = await provider.getSigner();
          const contract = new Contract(NFT_CONTRACT_ADDRESS, NFT.abi, signer);
          setNFTContract(contract);
        } catch (error) {
          console.error("Error initializing contract:", error);
        }
      }
    }
    initNFTContract();
  }, [account]);

  //NFT mint function
  async function mintNFT(title, confession, type) {
    if (!confession || !type || !title) {
      alert("Please enter your confession and select a type.");
      return;
    }

    setIsMinting(true);

    try {
      await networkCheck();
      const transaction = await NFTContract.mintConfessionNFT(
        account,
        confession,
        type,
        title
      );
      await transaction.wait();

      const txHash = transaction.hash;
      setExpLink(`https://amoy.polygonscan.com/tx/${txHash}`);
    } catch (error) {
      alert(error.message);
    } finally {
      setIsMinting(false);
    }
  }

  // Listen for NFTMinted event
  useEffect(() => {
    if (NFTContract) {
      const eventListener = NFTContract.on("NFTMinted", (owner, tokenId) => {
        console.log("NFT Minted:", tokenId);
        const tokenIdNumber = Number(tokenId);
        setTokenId(tokenIdNumber);

        const openSeaUrl = `https://testnets.opensea.io/assets/amoy/${NFT_CONTRACT_ADDRESS}/${tokenIdNumber}`;
        setNftLink(openSeaUrl); // Store OpenSea URL in state to display in UI
      });

      return () => {
        NFTContract.off("NFTMinted", eventListener); // Cleanup listener
      };
    }
  }, [NFTContract]);

  const resetForm = () => {
    setNftLink("");
    setExpLink("");
    setTokenId("");
  };

  return (
    <div className="App">
      <Navigation />
      {account === null ? (
        <WelcomePage connectWallet={connectWallet} />
      ) : (
        <div className="afterLogin">
          <ConfessionForm
            mintNFT={mintNFT}
            isMinting={isMinting}
            nftLink={nftLink}
            expLink={expLink}
            resetForm={resetForm}
          />
        </div>
      )}
    </div>
  );
};

export default App;
