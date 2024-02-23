const { ethers } = require("hardhat");

// 0x2981430609e9cf9E6Cb660b6eCD7bb3E59C0cDAe

async function main() {
  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);
  const lock = await ethers.deployContract("MarketPlace", ["0x93058c117e826828ee94b42b90391268BB10adea"]);

  console.log("Token address:", await lock.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
