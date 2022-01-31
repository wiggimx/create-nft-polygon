const { utils } = require("ethers");
const hre = require("hardhat");

async function main() {
  const baseTokenURI = "https://gateway.pinata.cloud/ipfs/QmRY2NXeRwE5KGTaEHNKFLp1gL7p5S4Z6Hg86MiJpeW5gY/";
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  const Greeter = await hre.ethers.getContractFactory("CryptoLucha");
  const greeter = await Greeter.deploy(baseTokenURI);

  await greeter.deployed();

  console.log("Greeter deployed to:", greeter.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
