// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  console.log("Address?", accounts[0].address);
  const name = "poc";
  const symbol = "POC";
  const maxPocAmount = 1;
  const baseURI =
    "https://upload.wikimedia.org/wikipedia/commons/c/c6/Amazing_image_of_the_Earth._Original_from_NASA._Digitally_enhanced_by_rawpixel._-_41997990765.jpg";

  // We get the contract to deploy
  const Poc = await hre.ethers.getContractFactory("Poc");
  const poc = await Poc.deploy(name, symbol, maxPocAmount, baseURI);

  console.log("Poc deployed to:", poc.address);

  await poc.safeMint(accounts[0].address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});