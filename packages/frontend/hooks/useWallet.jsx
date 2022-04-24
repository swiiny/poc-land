import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const getContract = async (tokenAddress, abi, ethereumProvider) => {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  return contract;
};

export const availableNetworks = [
  {
    name: 'Polygon',
    chainId: '0x89',
    contractAddress: '0xEe1bB23886524a9fa59d01871BeFA2bb6388B1dF',
    host: '0x',
    daix: '',
  },
  {
    name: 'Polygon Mumbai',
    chainId: '0x13881',
    contractAddress: '',
    host: '0xEB796bdb90fFA0f28255275e16936D25d3418603',
    daix: '0x5D8B4C2554aeB7e86F387B4d6c00Ac33499Ed01f',
  },
  {
    name: 'Optimism',
    chainId: '0xA',
    contractAddress: '',
    host: '0x567c4B141ED61923967cA25Ef4906C8781069a10',
    daix: 'tbd',
  },
  {
    name: 'Optimism Testnet',
    chainId: '0x45',
    // contractAddress: '',
    host: '0x74b57883f8ce9F2BD330286E884CfD8BB24AC4ED',
    daix: '0x04d4f73e9DE52a8fEC544087a66BBbA660A35957',
  },
  {
    name: 'Rinkeby',
    chainId: '0x4',
    contractAddress: '0xA506f89339238f0F21A33932d37FDC8BFa3a9E1e',
    host: '0xeD5B5b32110c3Ded02a07c8b8e97513FAfb883B6',
    daix: '0x745861AeD1EEe363b4AaA5F1994Be40b1e05Ff90',
  },
];

const availableChainIds = availableNetworks.map(({ chainId }) => chainId);

const useWallet = () => {
  if (typeof window === 'undefined') {
    return { noMetaMask: true, noWindow: true };
  }

  if (typeof window.ethereum === 'undefined') {
    return { noMetaMask: true };
  }

  const [account, setAccount] = useState('');
  const [currentChainId, setCurrentChainId] = useState('');
  const [isWrongNetwork, setIsWrongNetwork] = useState(false);
  const [providerValid, setProviderValid] = useState(null);

  const switchNetwork = async (chainId) => {
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId }],
      });
    } catch (err) {
      console.error(err);
    }
  };

  const getCurrentChainId = async () => {
    const chainId = await window.ethereum.request({ method: 'eth_chainId' });

    if (chainId) {
      setCurrentChainId(chainId);
    } else {
      console.error("can't get chain id");
    }
  };

  const connectToWallet = async () => {
    try {
      const res = await window.ethereum.request({ method: 'eth_requestAccounts' });

      if (res.length > 0) {
        setAccount(res[0]);
      }
    } catch (err) {
      console.error('user rejected', err);
    }
  };

  const initWeb3 = async () => {
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();

    if (provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      } else {
        setProviderValid(true);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  useEffect(() => {
    if (account) {
      //
    }
  }, [account]);

  useEffect(() => {
    if (providerValid) {
      getCurrentChainId();
    }
  }, [providerValid]);

  useEffect(() => {
    if (availableChainIds.includes(currentChainId)) {
      setIsWrongNetwork(false);
      if (window.ethereum.isConnected) {
        setAccount(window.ethereum.selectedAddress);
      }
    } else if (currentChainId !== '') {
      setIsWrongNetwork(true);
    }
  }, [currentChainId]);

  useEffect(() => {
    initWeb3();
    window.ethereum.on('chainChanged', (chainId) => {
      window.location.reload();
    });
  }, []);

  return {
    connectToWallet,
    switchNetwork,
    account,
    providerValid,
    isWrongNetwork,
    currentChainId,
  };
};

export default useWallet;
