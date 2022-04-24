const hre = require("hardhat");
const ethers = require("ethers");

// Only call from contract's gasLessMinter address
async function main() {
  const accounts = await hre.ethers.getSigners();

  const pocContractAddress = "";

  const miniAbi = ["function safeMint(address to)"];

  const tPoc = new ethers.Contract(pocContractAddress, miniAbi, accounts[0]);

  const addTx = await tPoc.safeMint(accounts[4].address);
  const addReceipt = await addTx.wait();
  console.log("AddUser Tx :", addReceipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
