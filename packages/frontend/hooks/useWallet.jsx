import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';

export const getContract = async (tokenAddress, abi, ethereumProvider) => {
  const provider = new ethers.providers.Web3Provider(ethereumProvider);
  const contract = new ethers.Contract(tokenAddress, abi, provider);
  return contract;
};

const availableChainIds = [
  '0x89', // polygon
  '0xA', // optimism
  '0x4', // rinkeby
];

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
  };
};

export default useWallet;
