const hre = require("hardhat");
const ethers = require("ethers");
const ERC721_ABI = require("./abis/ERC721.json");

async function main() {
  const accounts = await hre.ethers.getSigners();
  const sender = accounts[4];

  const pocContractAddress = "";

  const poc = new ethers.Contract(pocContractAddress, ERC721_ABI, sender);

  // const approveTx = await tPoc.Approve(accounts[0], 1);
  // const approveReceipt = await approveTx.wait(3);
  // console.log("Approve Tx :", approveReceipt.transactionHash);

  const transferTx = await poc.transferFrom(
    sender,
    accounts[2].address,
    1 // tokenId
  );
  const transferReceipt = await transferTx.wait();
  console.log("Transfer Tx :", transferReceipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
