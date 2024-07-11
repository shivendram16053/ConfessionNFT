import React from "react";

const WelcomePage = ({ connectWallet }) => {
  return (
    <div className="welcomePage">
      <h1>Welcome to ConfessNFTs</h1>
      <h2>Turn your confessions into unique NFTs</h2>
      <span style={{ width: "800px", marginTop: "30px" }}>
        ConfessNFT allows you to immortalize your thoughts and emotions as
        digital art. Whether it's a secret you've kept or a memory you
        cherish, minting an NFT here transforms your confession into a
        one-of-a-kind digital collectible.
      </span>
      <button onClick={connectWallet}>Connect Wallet</button>
    </div>
  );
};

export default WelcomePage;
