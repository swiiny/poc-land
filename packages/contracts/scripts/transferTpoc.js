const hre = require("hardhat");
const ethers = require("ethers");
const ERC721_ABI = require("./abis/ERC721.json");

async function main() {
  const accounts = await hre.ethers.getSigners();

  const tPoc = new ethers.Contract(
    "0x71f9B8B9FD6A3D2e1d67fc6B419190BFdFa9AB0F",
    ERC721_ABI,
    accounts[0]
  );
  // const approveTx = await tPoc.Approve(accounts[0], 1);
  // const approveReceipt = await approveTx.wait(3);
  // console.log("Approve Tx :", approveReceipt.transactionHash);

  const transferTx = await tPoc.transferFrom(
    accounts[0].address,
    accounts[1].address,
    1
  );
  const transferReceipt = await transferTx.wait();
  console.log("Transfer Tx :", transferReceipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
