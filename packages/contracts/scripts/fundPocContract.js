const hre = require("hardhat");
const ethers = require("ethers");
const ERC20_ABI = require("./abis/ERC20.json");

async function main() {
  const accounts = await hre.ethers.getSigners();

  const xTokenContractAddress = "";
  const pocContractAddress = "";

  const xToken = new ethers.Contract(
    xTokenContractAddress,
    ERC20_ABI,
    accounts[4]
  );

  // const approveTx = await tPoc.Approve(accounts[0], 1);
  // const approveReceipt = await approveTx.wait(3);
  // console.log("Approve Tx :", approveReceipt.transactionHash);

  const transferTx = await xToken.transferFrom(
    accounts[0].address,
    pocContractAddress,
    "1000000000000000000"
  );
  const transferReceipt = await transferTx.wait();
  console.log("Transfer Tx :", transferReceipt.transactionHash);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
