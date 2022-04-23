// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  console.log("Address", accounts[0].address);

  // We get the contract to deploy
  const Poc = await hre.ethers.getContractFactory("Poc");
  const poc = await Poc.attach("0x13dbbde347aa430f4907d323b957ef491af7d344");
  console.log("Poc attached to:", poc.address);
  // await poc.safeMint(accounts[0].address);
  // await poc.safeMint(accounts[0].address);
  // await poc.safeMint(accounts[0].address);
  // await poc.safeMint(accounts[0].address);
  console.log("done");
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
