import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { StyledHeadingOne } from '../styles/GlobalComponents';
import PocItem from './gallery/PocItem';

const DEV_DATA = [
  {
    name: 'POC 1',
    description: 'This is a description for POC 1',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 2',
    description: 'This is a description for POC *',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 3',
    description: 'This is a description for POC 3',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 4',
    description: 'This is a description for POC 4',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 5',
    description: 'This is a description for POC 5',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 6',
    description: 'This is a description for POC 6',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 7',
    description: 'This is a description for POC 7',
    src: 'https://picsum.photos/150/150',
  },
];

const Gallery = () => {
  const { account } = useWallet();

  const [userPocs, setUserPocs] = useState(DEV_DATA);

  const fetchPocForAccount = (a) => {
    try {
      // TODO : fetch user's POCs
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
            <PocItem key={p.name + p.src} poc={p} />
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
    padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Gallery;
