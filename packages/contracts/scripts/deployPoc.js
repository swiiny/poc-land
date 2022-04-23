// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  const host = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";
  const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

  const accounts = await hre.ethers.getSigners();
  const firstReceiver = accounts[0];
  console.log("Address?", firstReceiver.address);
  const name = "poc";
  const symbol = "POC";
  const maxPocAmount = 1;
  const baseURI =
    "https://bafybeihpjhkeuiq3k6nqa3fkgeigeri7iebtrsuyuey5y6vy36n345xmbi.ipfs.dweb.link/1256";

  // We get the contract to deploy
  const Poc = await hre.ethers.getContractFactory("Poc");
  const poc = await Poc.deploy(
    firstReceiver.address,
    name,
    symbol,
    maxPocAmount,
    baseURI,
    host,
    fDAIx
  );

  console.log("Poc deployed to:", poc.address);

  poc.safeMint(firstReceiver.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
