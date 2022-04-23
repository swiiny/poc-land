const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const PocFactory = await ethers.getContractFactory("PocFactory");
    const Poc = await ethers.getContractFactory("Poc");
    const pocfactory = await PocFactory.deploy();
    console.log("pocfactory", pocfactory.address);
    const signers = await ethers.getSigners();
    const admin = signers[0];
    const alice = signers[1];
    const bob = signers[2];
    // console.log(signers[0].address);
    await pocfactory.createPoc(
      admin.address,
      "hello",
      "hello",
      2,
      "https://www.google.com"
    );

    const index = await pocfactory.getLastPocCreatorIndex(admin.address);
    console.log("index", parseInt(index, 16));

    const address = await pocfactory.getPocWithCreatorIndex(
      admin.address,
      index - 1
    );
    console.log("address", address);

    const poc = await Poc.attach(address);
    console.log("poc", poc.address);
    await expect(poc.safeMint(alice.address)).to.not.be.reverted;
    await expect(poc.safeMint(bob.address)).to.be.revertedWith(
      "Max Poc amount reached"
    );
    // await expect(poc.safeMint(admin.address)).to.not.be.reverted;
  });
});
