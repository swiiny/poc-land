// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const host = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";
  const DAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

  const accounts = await hre.ethers.getSigners();
  const gasLessMinter = accounts[0].address;
  console.log("Address?", gasLessMinter);
  const name = "poc";
  const symbol = "POC";
  const baseURI = "https://google.com";

  // We get the contract to deploy
  const Poc = await hre.ethers.getContractFactory("Poc");
  const poc = await Poc.deploy(
    gasLessMinter,
    name,
    symbol,
    baseURI,
    host,
    DAIx
  );
  console.log("Poc deployed to:", poc.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
