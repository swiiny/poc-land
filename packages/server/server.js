import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import ethers from "ethers";
import dotenv from "dotenv";

function chainIDToProvider(chainID) {
    switch (chainID) {
        case '10':
        return 'https://opt-mainnet.g.alchemy.com/v2/QUwxJKOtcZZY5teOJ7EMqb2RNjG-2nXE';
        case '137':
        return 'https://polygon-mainnet.g.alchemy.com/v2/T5feScSf_Edl3Rwxel0ygxWceNyDV8kV';
        case '4':
        return 'https://rinkeby.infura.io/v3/64ccd977c19d4730b461d2de8147dd1e';
    }
}

// API v1 url prefix
const BASE_URL_V1 = "/v1/server";

const limiter = rateLimit({
	windowMs: 1000,
	max: 50,
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false // Disable the `X-RateLimit-*` headers
});

const corsOptions = {
	origin: process.env.FRONTEND_URL,
	optionsSuccessStatus: 200
};

const app = express();

app.use(cors(corsOptions));
app.use(helmet());
app.use(limiter);

app.get(`${BASE_URL_V1}/ping`, async (req, res) => {
	res.send("pong");
});



app.get(`${BASE_URL_V1}/mint`, async (req, res) => {
	// read poc address and minter address from request
	const pocAddress = req.query.pocAddress;
	const minterAddress = req.query.minterAddress;
	const chainID = req.query.chainID;
	pocAbi = `[
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "_creator",
			  "type": "address"
			},
			{
			  "internalType": "string",
			  "name": "_name",
			  "type": "string"
			},
			{
			  "internalType": "string",
			  "name": "_symbol",
			  "type": "string"
			},
			{
			  "internalType": "uint256",
			  "name": "_maxPocAmount",
			  "type": "uint256"
			},
			{
			  "internalType": "string",
			  "name": "_baseURI",
			  "type": "string"
			}
		  ],
		  "stateMutability": "nonpayable",
		  "type": "constructor"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "owner",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "approved",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "Approval",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "owner",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "operator",
			  "type": "address"
			},
			{
			  "indexed": false,
			  "internalType": "bool",
			  "name": "approved",
			  "type": "bool"
			}
		  ],
		  "name": "ApprovalForAll",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "previousOwner",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "newOwner",
			  "type": "address"
			}
		  ],
		  "name": "OwnershipTransferred",
		  "type": "event"
		},
		{
		  "anonymous": false,
		  "inputs": [
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "from",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "internalType": "address",
			  "name": "to",
			  "type": "address"
			},
			{
			  "indexed": true,
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "Transfer",
		  "type": "event"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "to",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "approve",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "owner",
			  "type": "address"
			}
		  ],
		  "name": "balanceOf",
		  "outputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "baseURI",
		  "outputs": [
			{
			  "internalType": "string",
			  "name": "",
			  "type": "string"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "creator",
		  "outputs": [
			{
			  "internalType": "address",
			  "name": "",
			  "type": "address"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "getApproved",
		  "outputs": [
			{
			  "internalType": "address",
			  "name": "",
			  "type": "address"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "owner",
			  "type": "address"
			},
			{
			  "internalType": "address",
			  "name": "operator",
			  "type": "address"
			}
		  ],
		  "name": "isApprovedForAll",
		  "outputs": [
			{
			  "internalType": "bool",
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "maxPocAmount",
		  "outputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "name",
		  "outputs": [
			{
			  "internalType": "string",
			  "name": "",
			  "type": "string"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "owner",
		  "outputs": [
			{
			  "internalType": "address",
			  "name": "",
			  "type": "address"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "ownerOf",
		  "outputs": [
			{
			  "internalType": "address",
			  "name": "",
			  "type": "address"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "renounceOwnership",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "to",
			  "type": "address"
			}
		  ],
		  "name": "safeMint",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "from",
			  "type": "address"
			},
			{
			  "internalType": "address",
			  "name": "to",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "safeTransferFrom",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "from",
			  "type": "address"
			},
			{
			  "internalType": "address",
			  "name": "to",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			},
			{
			  "internalType": "bytes",
			  "name": "_data",
			  "type": "bytes"
			}
		  ],
		  "name": "safeTransferFrom",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "operator",
			  "type": "address"
			},
			{
			  "internalType": "bool",
			  "name": "approved",
			  "type": "bool"
			}
		  ],
		  "name": "setApprovalForAll",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "bytes4",
			  "name": "interfaceId",
			  "type": "bytes4"
			}
		  ],
		  "name": "supportsInterface",
		  "outputs": [
			{
			  "internalType": "bool",
			  "name": "",
			  "type": "bool"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "symbol",
		  "outputs": [
			{
			  "internalType": "string",
			  "name": "",
			  "type": "string"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "index",
			  "type": "uint256"
			}
		  ],
		  "name": "tokenByIndex",
		  "outputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "owner",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "index",
			  "type": "uint256"
			}
		  ],
		  "name": "tokenOfOwnerByIndex",
		  "outputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "uint256",
			  "name": "_tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "tokenURI",
		  "outputs": [
			{
			  "internalType": "string",
			  "name": "",
			  "type": "string"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [],
		  "name": "totalSupply",
		  "outputs": [
			{
			  "internalType": "uint256",
			  "name": "",
			  "type": "uint256"
			}
		  ],
		  "stateMutability": "view",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "from",
			  "type": "address"
			},
			{
			  "internalType": "address",
			  "name": "to",
			  "type": "address"
			},
			{
			  "internalType": "uint256",
			  "name": "tokenId",
			  "type": "uint256"
			}
		  ],
		  "name": "transferFrom",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		},
		{
		  "inputs": [
			{
			  "internalType": "address",
			  "name": "newOwner",
			  "type": "address"
			}
		  ],
		  "name": "transferOwnership",
		  "outputs": [],
		  "stateMutability": "nonpayable",
		  "type": "function"
		}
	  ]`
	const providerURL = chainIDToProvider(chainID)
	const provider = new ethers.providers.JsonRpcProvider(providerURL)
	// now attach to the poc contract using ethers
	const pocContract = new ethers.Contract(pocAddress, pocAbi, provider);

	// instantiate signer with private key
	const signer = new ethers.Wallet(privateKey, provider);

});

// launch server on port 3000
app.listen(3000, () => {
	dotenv.config();
	console.log(`Your port is ${process.env.SERVER_PORT}`);
})


/*
app.listen(process.env.SERVER_PORT, async () => {
	console.log(`Server listening on port ${process.env.SERVER_PORT}`);

});
*/
