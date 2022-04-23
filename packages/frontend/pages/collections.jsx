import axios from 'axios';
import { ethers } from 'ethers';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PocItem from '../components/gallery/PocItem';
import Page from '../components/utils/Page';
import useWallet, { availableNetworks } from '../hooks/useWallet';
import { StyledHeadingOne } from '../styles/GlobalComponents';
import pocFactoryAbi from '../utils/pocFactoryAbi';
import { getPocContract } from './claim';

const Gallery = () => {
  const [userPocs, setUserPocs] = useState([{ id: 'uehf43' }, { id: 'uehf44' }, { id: 'uehf45' }]);
  const { account, isWrongNetwork, currentChainId } = useWallet();

  async function getPocFactoryContract(ethereumProvider) {
    const contractAddress = availableNetworks.find((net) => net.chainId === currentChainId)?.contractAddress;
    const pocFactoryAddress = contractAddress;
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const dnpContract = new ethers.Contract(pocFactoryAddress, pocFactoryAbi, provider);
    return dnpContract;
  }

  async function getPocWithEventAndCreator(ethereumProvider) {
    const pocFactoryContract = await getPocFactoryContract(ethereumProvider);
    const index = await pocFactoryContract.getLastPocCreatorIndex(account);
    const pocAddress = await pocFactoryContract.getPocWithCreatorIndex(account, index.sub(1));
    return pocAddress;
  }

  async function getAllPocsAddressFromUser(ethereumProvider) {
    const pocFactoryContract = await getPocFactoryContract(ethereumProvider);
    const index = await pocFactoryContract.getLastPocCreatorIndex(account);
    const pocsAddresses = [];
    for (let i = 1; i < index.sub(1); i++) {
      // eslint-disable-next-line no-await-in-loop
      const pocAddress = await pocFactoryContract.getPocWithCreatorIndex(account, index.sub(1));
      pocsAddresses.push(pocAddress);
    }
    return pocsAddresses;
  }

  const getPocMetadata = async (pocAddress) => {
    const pocContract = await getPocContract(window.ethereum, pocAddress);
    const data = await pocContract.tokenURI(4);
    axios.get(data).then((res) => {
      let imageLinkIpfs = res.data.image;
      imageLinkIpfs = imageLinkIpfs.replace('ipfs://', 'https://ipfs.io/ipfs/');
      // TODO : use this data
      /*
        name: res.data.name,
        description: res.data.description,
        src: imageLinkIpfs,
      */
    });
  };

  const fetchPocForAccount = async (a) => {
    try {
      const addresses = await getAllPocsAddressFromUser(window.ethereum);

      const promises = addresses.map(async (address) => {
        const pocContract = await getPocContract(window.ethereum, address);
        const data = await pocContract.tokenURI(4);
        return axios.get(data).then((result) => {
          let imageLinkIpfs = result.data.image;
          imageLinkIpfs = imageLinkIpfs.replace('ipfs://', 'https://ipfs.io/ipfs/');

          return {
            name: result.data.name,
            description: result.data.description,
            src: imageLinkIpfs,
          };
        });
      });

      console.log('start resolve', promises);

      const resolvedPromises = await Promise.all(promises);
      console.log('resolvedPromises', resolvedPromises);

      setUserPocs(resolvedPromises);
    } catch (err) {
      console.error('Error fetching poc for account: ', err);
    }
  };

  useEffect(() => {
    if (account) {
      fetchPocForAccount(account);
    }
  }, [account]);

  useEffect(() => {

  }, []);

  return (
    <Page title="My Gallery">
      <StyledContainer>
        <StyledHeadingOne>
          My Collections
        </StyledHeadingOne>

        <StyledPocList>
          {userPocs.map((p) => (
            <PocItem key={p.name + p.src + p.id} poc={p} />
          ))}
        </StyledPocList>

      </StyledContainer>
    </Page>
  );
};

const StyledPocList = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    list-style: none;

    width: 100%;

    padding: 0;
`;

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    z-index: 2;

    min-height: 100vh;
    
    padding-top: ${({ theme }) => theme.spacing['5xl']};

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        padding-top: ${({ theme }) => theme.spacing['3xl']};
    }
`;

export default Gallery;
