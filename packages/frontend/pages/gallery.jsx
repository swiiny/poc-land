import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PocItem from '../components/gallery/PocItem';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { StyledHeadingOne } from '../styles/GlobalComponents';
import { getPocContract } from './claim';

const Gallery = () => {
  const { account } = useWallet();

  const [userPocs, setUserPocs] = useState([{ id: 'uehf43' }, { id: 'uehf44' }, { id: 'uehf45' }]);

  const fetchPocForAccount = async (a) => {
    try {
      const url = `${process.env.SERVER_URL}/v1/server/userPocs?userAddr=${a}`;

      const res = await axios.get(url);

      const addresses = res.data;
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
          My Gallery
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
