import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import PocItem from '../components/gallery/PocItem';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { StyledHeadingOne } from '../styles/GlobalComponents';

const Gallery = () => {
  const { account } = useWallet();

  const [userPocs, setUserPocs] = useState([{ id: 'uehf43' }, { id: 'uehf44' }, { id: 'uehf45' }]);

  const fetchPocForAccount = (a) => {
    try {
      // TODO : fetch user's PoCs
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
