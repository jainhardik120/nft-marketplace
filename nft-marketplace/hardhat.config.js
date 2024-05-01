require('dotenv').config();
require("@nomicfoundation/hardhat-toolbox");
    
module.exports = {
  solidity: "0.8.24",
  networks: {
    sepolia: {
      url: `${process.env.ALCHEMY_SEPOLIA_URL}`,
      accounts: [`0x${process.env.SEPOLIA_PRIVATE_KEY}`],
    }
  }
};