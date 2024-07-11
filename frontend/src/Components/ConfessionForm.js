import React, { useState } from "react";

const ConfessionForm = ({ mintNFT, isMinting, nftLink, expLink, resetForm }) => {
  const [confession, setConfession] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");

  const handleMint = () => {
    mintNFT(title, confession, type);
  };

  return (
    <div className="userSide">
      {
        !nftLink && !expLink ? (
          <>
            <h1>Enter the Title</h1>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength="50"
              style={{ marginBottom: "40px" }}
            />
            <h1>Enter Your Confession</h1>
            <textarea
              name="confession"
              id="confession"
              rows="15"
              cols="50"
              value={confession}
              onChange={(e) => setConfession(e.target.value)}
            ></textarea>
            <select
              name="emotion"
              id="emotions"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="">Type of Confession</option>
              <option value="Good">Good</option>
              <option value="Bad">Bad</option>
              <option value="Love">Love</option>
              <option value="Funny">Funny</option>
              <option value="Serious">Serious</option>
            </select>
            <button className="button" disabled={isMinting} onClick={handleMint}>
              {isMinting ? "Minting..." : "Mint"}
            </button>
          </>
        ) : (
          <div>
            {nftLink && (
              <div>
                <h2>Your NFT: <a href={nftLink} target="_blank" rel="noopener noreferrer">
                  View on OpenSea
                </a></h2>
                
              </div>
            )}
            {expLink && (
              <div>
                <h2>Transaction:  <a href={expLink} target="_blank" rel="noopener noreferrer">
                  View on Polygonscan
                </a></h2> 
                
              </div>
            )}
            <button className="button" onClick={resetForm}>Mint Another NFT</button>
          </div>
        )
      }
    </div>
  );
};

export default ConfessionForm;
