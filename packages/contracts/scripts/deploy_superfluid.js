const hre = require("hardhat");

async function main() {
  const host = "0x22ff293e14F1EC3A09B137e9e06084AFd63adDF9";
  const fDAIx = "0xF2d68898557cCb2Cf4C10c3Ef2B034b2a69DAD00";

  const TC = await hre.ethers.getContractFactory("TradeableCashflow");
  const tc = await TC.deploy(
    "0xc932734fE9a913FE7B78aDE076549e574295b21e",
    "Test Poc",
    "tPOC",
    host,
    fDAIx
  );

  console.log("Tradeable Cashflow deployed to:", tc.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
