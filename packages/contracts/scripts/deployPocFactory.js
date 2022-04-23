// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const accounts = await hre.ethers.getSigners();
  console.log("Address", accounts[0].address);
  const name = "poc";
  const symbol = "POC";
  const maxPocAmount = 1;
  const baseURI =
    "https://bafybeieugrn6dfxm64yfk7qk5no6qsjxtourvn7i7ky6pzufnebaszdaxu.ipfs.dweb.link/metadata.json";
  // const baseURI =
  // ("https://bafybeihpjhkeuiq3k6nqa3fkgeigeri7iebtrsuyuey5y6vy36n345xmbi.ipfs.dweb.link/1256");

  // We get the contract to deploy
  const PocFactory = await hre.ethers.getContractFactory("PocFactory");
  const popfactory = await PocFactory.deploy();

  console.log("Poc deployed to:", popfactory.address);

  popfactory.createPoc(
    accounts[0].address,
    name,
    symbol,
    maxPocAmount,
    baseURI
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
