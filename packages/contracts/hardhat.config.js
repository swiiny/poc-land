require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-gas-reporter");
require("solidity-coverage");

// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.4",
      },
      {
        version: "0.8.3",
      },
      {
        version: "0.8.13",
      },
    ],
  },
  networks: {
    hardhat: {
      // initialBaseFeePerGas: 0, // workaround from https://github.com/sc-forks/solidity-coverage/issues/652#issuecomment-896330136 . Remove when that issue is closed.
      allowUnlimitedContractSize: true,
    },
    ropsten: {
      url: process.env.ROPSTEN_URL || "",
      accounts: [process.env.KEY],
    },
    goerli: {
      url: "https://eth-goerli.alchemyapi.io/v2/xvWNZCtF0QsihW1izifdIOqZrP66u_AJ",
      accounts: [
        process.env.K,
        process.env.KEY,
        process.env.KEY2,
        process.env.KEY3,
        process.env.KEY4,
      ],
    },
    testnetArbitrum: {
      url: "https://rinkeby.arbitrum.io/rpc",
      gas: 210000,
      accounts: [process.env.KEY],
    },
    mainnetArbitrum: {
      url: "https://arb-mainnet.g.alchemy.com/v2/knQIgFAnRabuP2QSmrK4uF7SzgShIL3c",
      accounts: [process.env.KEY],
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS !== undefined,
    currency: "USD",
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};
