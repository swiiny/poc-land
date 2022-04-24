// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const host = "0x3E14dC1b13c488a8d5D310918780c983bD5982E7";
  const DAIx = "0x1305F6B6Df9Dc47159D12Eb7aC2804d4A33173c2";

  const accounts = await hre.ethers.getSigners();
  // const provider = hre.ethers.provider;
  // const gasPrice = await provider.getGasPrice();
  const firstReceiver = accounts[0];
  console.log("Address?", firstReceiver.address);
  const name = "poc";
  const symbol = "POC";
  const baseURI = "https://google.com";

  // We get the contract to deploy
  const Poc = await hre.ethers.getContractFactory("Poc");
  const poc = await Poc.deploy(
    firstReceiver.address,
    name,
    symbol,
    baseURI,
    host,
    DAIx
  );
  console.log("Poc deployed to:", poc.address);

  // poc.safeMint(firstReceiver.address, { gasPrice, gasLimit: 210000 });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
