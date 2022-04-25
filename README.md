# poc.land

Project for the ETHGlobal Hackathon in Amsterdam.
DeFi enabled, censorship resistant multi chain poaps. Built with Superfluid, IPFS, Optimism and Polygon.   
Hack time : 36H

# TODO 

## Frontend

### Global
- [ ] Add network Selector
- [ ] Display current network
- [ ] DevOps

### homepage 
- [x] make it cleaner

### create
- [ ] add price estimation
- [ ] set Max to 50 according to the smart contract
- [ ] fix IPFS upload error on prod

### gallery
- [x] use db to get all pocs related to a user
- [ ] flow visulisation
- [ ] add placeholder and CTA to conenct wallet when it isn't

### My Collections
- [ ] Add option to start Flow using Superfluid
- [ ] add placeholder and CTA to conenct wallet when it isn't

## Smart contracts : base
- [ ] Setup fee to mint

## Smart contracts : tradeable cashflow
- [ ] TBD
- [ ] Merge with base


Verification of contracts : 

npx hardhat verify --network polygon 0xbad66D5bdF1bcC0c707813309b06a53C3C9C2f5d "0xE84132Be566a83988501a1eA134DeC5992ea0aaE" "POC" "POC" "100" "https://bafybeidn3d7bl3onkyasfhdghalqmdm64mng47g4qwnp25gzt7pdcesvb4.ipfs.dweb.link/metadata.json"
npx hardhat verify --network polygon 0x473837550ceDf7f16805C15C21487d3A44f26cE5


