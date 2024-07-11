import React from 'react';

const Navigation = () => {
  const navStyle = {
    display: 'flex',
    margin:"20px 30px",
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    zIndex:1000,
    backdropFilter: 'blur(10px)',
    backgroundColor: 'rgba(0, 0, 0,0.2)',
    filtter:"blur",
    borderRadius:"20px",
    color: 'white',
    boxShadow: '0 0 5px white',
  };

  const logoStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
  };

  const rightNavStyle = {
    display: 'flex',
    gap: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#282c34',
    border: 'none',
    borderRadius: '5px',
    padding: '10px 20px',
    color: 'white',
    fontWeight: 'bold',
    boxShadow:"0px 0px 3px #2B2B2B",
    cursor: 'pointer',
    textDecoration: 'none',
    transition: 'transform 0.3s, box-shadow 0.3s',
  };

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit',
  };

  return (
    <div style={navStyle}>
      <h1 style={logoStyle}>ConfessedNFT</h1>
      <div style={rightNavStyle}>
        <button style={buttonStyle} className="hover3D">
          <a href="https://faucet.polygon.technology/" style={linkStyle}>
            Amoy testnet Faucet
          </a>
        </button>
        <button style={buttonStyle} className="hover3D">
          <a href="https://testnets.opensea.io/collection/confessionnfts" style={linkStyle}>
            Our Collections
          </a>
        </button>
      </div>
    </div>
  );
};

export default Navigation;
