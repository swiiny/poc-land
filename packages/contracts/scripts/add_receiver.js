const hre = require("hardhat");
const ethers = require("ethers");

async function main() {
  const accounts = await hre.ethers.getSigners();

  const tPocAddress = "0x6b1dadE54396f1c7eFbab43b01615432be79012B";

  const miniAbi = ["function addReceiver(address receiver)"];

  const tPoc = new ethers.Contract(tPocAddress, miniAbi, accounts[0]);
  // const approveTx = await tPoc.Approve(accounts[0], 1);
  // const approveReceipt = await approveTx.wait(3);
  // console.log("Approve Tx :", approveReceipt.transactionHash);

  const addTx = await tPoc.addReceiver(accounts[3].address);
  const addReceipt = await addTx.wait();
  console.log("AddUser Tx :", addReceipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
