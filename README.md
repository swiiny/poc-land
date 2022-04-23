# poc.land

Project for the ETHGlobal Hackathon in Amsterdam.
DeFi enabled, censorship resistant multi chain poaps. Built with Superfluid, IPFS, Optimism and Polygon.   

# TODO 

## Frontend
### homepage 
- [ ] make it cleaner/more beautiful
### create
- [x] add count + price estimation..
- [x] create function to get the created contract address
- [ ] save in db address of poc with creator and chain id
- [ ] should display QR code for the poc
- [ ] reaccess this page?
### redeem 
- [ ] check on which network the poap is ? 
- [ ] save in db if successful server side
- [ ] fetch metadata to display poc being claimed
### gallery
- [ ] use db to get all pocs related to a user
- [ ] flow visulisation
### My Collections
- [ ] When Gallery is finished, copy past the page and change the fetch addresses endpoint url
- [ ] Add option to start Flow using Superfluid

## Backend
- [ ] Setup db connection

## Smart contracts : base
- [ ] Setup fee to mint

## Smart contracts : tradeable cashflow
- [ ] TBD
- [ ] Merge with base

## Production & Contest
- [x] Buy poc.land
- [ ] Create server & deploy
- [ ] Deploy contracts on the chains
- [ ] Create slides
- [ ] Create video
- [ ] Create logo
- [ ] Register on hacker dashboard


Verification of contracts : 

npx hardhat verify --network polygon 0xbad66D5bdF1bcC0c707813309b06a53C3C9C2f5d "0xE84132Be566a83988501a1eA134DeC5992ea0aaE" "POC" "POC" "100" "https://bafybeidn3d7bl3onkyasfhdghalqmdm64mng47g4qwnp25gzt7pdcesvb4.ipfs.dweb.link/metadata.json"
npx hardhat verify --network polygon 0x473837550ceDf7f16805C15C21487d3A44f26cE5


