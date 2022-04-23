# poc-land

Project for the ETHGlobal Hackathon in Amsterdam.

DeFi enabled, censorship resistant multi chain poaps. Built with Superfluid, IPFS, Optimism and Polygon.   

## TODO 

### Frontend
- The 4 pannels : homepage, create, redeem & gallery

### Backend
- [ ] Function to mint "gas-less" pocs

### Smart contracts
- [x] Setup hardhat (Hugo)
- [x] Setup simple first version without streams : 3 contracts, factory, base poc nft contract (Hugo)
- [x] Setup streams systems, deploy the tradeable cashflow contract on Goerli and do first tests, 
- [ ] Step 2, try to do it with multiple nfts (Clem) 
- [ ] How to design registry contract/data retrieval without a db. Informations we need 
 1. given an address, get the pocs owned by the address

### Production & Contest
- Buy poc.land [done]
- Create server & deploy
- Deploy contracts on the chains
- Create slides
- Create video
- Create logo
- Register on hacker dashboard



Verification of contracts : 


npx hardhat verify --network polygon 0xbad66D5bdF1bcC0c707813309b06a53C3C9C2f5d "0xE84132Be566a83988501a1eA134DeC5992ea0aaE" "POC" "POC" "100" "https://bafybeidn3d7bl3onkyasfhdghalqmdm64mng47g4qwnp25gzt7pdcesvb4.ipfs.dweb.link/metadata.json"
npx hardhat verify --network polygon 0x473837550ceDf7f16805C15C21487d3A44f26cE5


