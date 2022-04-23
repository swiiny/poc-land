import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import ethers from "ethers";
import dotenv from "dotenv";
import pocAbi from "./pocAbi.js"

function chainIDToProvider(chainID) {
    switch (chainID) {
        case 10:
        return 'https://opt-mainnet.g.alchemy.com/v2/QUwxJKOtcZZY5teOJ7EMqb2RNjG-2nXE';
        case 137:
        return 'https://polygon-mainnet.g.alchemy.com/v2/T5feScSf_Edl3Rwxel0ygxWceNyDV8kV';
        case 4:
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
	const providerURL = chainIDToProvider(chainID)
	const provider = new ethers.providers.JsonRpcProvider(providerURL)
	// now attach to the poc contract using ethers
	const pocContract = new ethers.Contract(pocAddress, pocAbi, provider);
	// instantiate signer with private key
	const signer = new ethers.Wallet(privateKey, provider);
	await pocContract.connect(signer).safeMint(minterAddress);
});

// launch server on port 3000
app.listen(3000, () => {
	dotenv.config();
	console.log(`Your port is ${process.env.SERVER_PORT}`);
	const providerURL = chainIDToProvider(10)
	console.log(`Your provider is ${providerURL}`);
	const provider = new ethers.providers.JsonRpcProvider(providerURL)
	const signer = new ethers.Wallet(process.env.SK, provider);
	console.log(`The signer address is ${signer.address}`);
})

