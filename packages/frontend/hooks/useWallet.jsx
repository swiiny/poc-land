import detectEthereumProvider from '@metamask/detect-provider';
import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { useEffect, useState } from 'react';
import Web3 from 'web3';

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
  },
  {
    name: 'Optimism',
    chainId: '0xA',
    contractAddress: '',
  },
  {
    name: 'Rinkeby',
    chainId: '0x4',
    contractAddress: '0x22df03979C519feA7bcC1113409af40FCac12378',
  },
];

export const walletProvider = {
  metaMask: 'MetaMask',
  walletConnect: 'WalletConnect',
  unset: 'unset',
};

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
  const [preferedWallet, setPreferedWallet] = useState(walletProvider.unset);

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
    console.log('preferedWallet', preferedWallet);
    if (preferedWallet === walletProvider.metaMask) {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });

      if (chainId) {
        setCurrentChainId(chainId);
      } else {
        console.error("can't get chain id");
      }
    } else if (preferedWallet === walletProvider.walletConnect) {
      const provider = new WalletConnectProvider({
        infuraId: process.env.INFURA_KEY,
        rpc: {
          4: `https://rinkeby.infura.io/v3/${process.env.INFURA_KEY}`,
          137: 'https://polygon-mainnet.g.alchemy.com/v2/XAzYHUohbTi6mQkujk-ckZAwb9powF5e',
          10: 'https://mainnet.optimism.io',
        },
      });

      const web3 = new Web3(provider);

      try {
        const chainId = await web3.eth.getChainId();

        console.warn('chainId WC', chainId);

        setCurrentChainId(chainId);
      } catch (err) {
        console.error('err 1', err);
      }
    }
  };

  const connectToWallet = async () => {
    console.log('connectToWallet');
    try {
      if (preferedWallet === walletProvider.metaMask) {
        const res = await window.ethereum.request({ method: 'eth_requestAccounts' });

        if (res.length > 0) {
          setAccount(res[0]);
        }
      } else if (preferedWallet === walletProvider.walletConnect) {
        const provider = new WalletConnectProvider({
          infuraId: process.env.INFURA_KEY,
          rpc: {
            4: 'https://rinkeby.infura.io/v3/',
            137: 'https://polygon-mainnet.g.alchemy.com/v2/XAzYHUohbTi6mQkujk-ckZAwb9powF5e',
            10: 'https://mainnet.optimism.io',
          },
        });

        const web3 = new Web3(provider);

        const accounts = await web3.eth.getAccounts();

        setAccount(accounts[0]);
      }
    } catch (err) {
      console.error('user rejected', err);
    }
  };

  const initWeb3 = async () => {
    console.log('init web3');
    setPreferedWallet(walletProvider.metaMask);
    // this returns the provider, or null if it wasn't detected
    const provider = await detectEthereumProvider();

    console.log('init web3');

    if (provider) {
      if (provider !== window.ethereum) {
        console.error('Do you have multiple wallets installed?');
      } else {
        console.log('init web3 2');
        setProviderValid(true);
      }
    } else {
      console.log('Please install MetaMask!');
    }
  };

  const initWalletConnect = async () => {
    setPreferedWallet(walletProvider.walletConnect);
    const provider = new WalletConnectProvider({
      infuraId: process.env.INFURA_KEY,
      rpc: {
        4: 'https://rinkeby.infura.io/v3/',
        137: 'https://polygon-mainnet.g.alchemy.com/v2/XAzYHUohbTi6mQkujk-ckZAwb9powF5e',
        10: 'https://mainnet.optimism.io',
      },
    });

    try {
      const connected = await provider.enable();

      console.warn('connected', connected);

      if (connected) {
        setProviderValid(true);
      } else {
        console.error('Please install WalletConnect!');
      }
    } catch {
      //
    }
  };

  useEffect(() => {
    if (account) {
      console.log('account', account);
      connectToWallet();
    }
  }, [account]);

  useEffect(() => {
    console.log('providerValid', providerValid);
    if (providerValid) {
      console.log('get current chain id');
      getCurrentChainId();
    }
  }, [providerValid, preferedWallet]);

  useEffect(() => {
    if (availableChainIds.includes(currentChainId)) {
      setIsWrongNetwork(false);
      if (preferedWallet === walletProvider.metaMask) {
        if (window.ethereum.isConnected) {
          setAccount(window.ethereum.selectedAddress);
        }
      }
    } else if (currentChainId !== '') {
      setIsWrongNetwork(true);
    }
  }, [currentChainId, preferedWallet]);

  useEffect(() => {
    window.localStorage.setItem('preferedWallet', preferedWallet);

    /* if (preferedWallet === walletProvider.metaMask) {
      initWeb3();
    } else if (preferedWallet === walletProvider.walletConnect) {
      initWalletConnect();
    }
    */
  }, [preferedWallet]);

  useEffect(() => {
    const savedPreferedWallet = window.localStorage.getItem('preferedWallet');
    if (savedPreferedWallet) {
      setPreferedWallet(savedPreferedWallet);
    }

    if (savedPreferedWallet === walletProvider.metaMask) {
      initWeb3();
    } else if (savedPreferedWallet === walletProvider.walletConnect) {
      initWalletConnect();
    }

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
    setPreferedWallet,
    initWeb3,
    initWalletConnect,
  };
};

export default useWallet;
