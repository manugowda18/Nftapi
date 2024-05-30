/** @type import('hardhat/config').HardhatUserConfig */

const PRIVATE_KEY = "4c5a90b5c4d98af3bd2c448aaed580d36e14d668fc25c6fdb2c5029c2341f750";
const RPC_URL = "https://rpc-amoy.polygon.technology/";
module.exports = {
  defaultNetwork: "polygon_amoy",
  networks: {
    hardhat: {
      chainId: 80001,
    },
    polygon_amoy: {
      url: "https://rpc-amoy.polygon.technology/",
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
  solidity: {
    version: "0.8.9",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
};
