const { ethers } = require("hardhat");

async function main() {
  const Confession = await ethers.deployContract("contracts/ConfessionNFT.sol:ConfessionNFT");
  const confession = await Confession.waitForDeployment();
  console.log("Deploying Contract...")
  console.log("Contract deployed to address:",  await confession.getAddress());
}
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
