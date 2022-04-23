const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const PocFactory = await ethers.getContractFactory("PocFactory");
    const pocfactory = await PocFactory.deploy();
    console.log("pocfactory", pocfactory.address);
    const signers = await ethers.getSigners();
    const admin = signers[0];
    // console.log(signers[0].address);
    await pocfactory.createPoc(
      admin.address,
      "hello",
      "hello",
      100,
      "https://www.google.com"
    );

    const index = await pocfactory.getLastPocCreatorIndex(admin.address);
    console.log("index", parseInt(index, 16));

    const address = await pocfactory.getPocWithCreatorIndex(
      admin.address,
      index - 1
    );
    console.log("address", address);
  });
});
