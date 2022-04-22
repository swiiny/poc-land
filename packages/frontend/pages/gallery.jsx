import React, { useEffect } from 'react';
import styled from 'styled-components';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { StyledHeadingOne } from '../styles/GlobalComponents';

const Gallery = () => {
  const { account } = useWallet();

  const fetchPocForAccount = (a) => {
    try {
      const url = '';
    } catch (err) {
      console.error('Error fetching poc for account: ', err);
    }
  };

  useEffect(() => {
    if (account) {
      // TODO : fetch account

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

      </StyledContainer>
    </Page>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-height: 100vh;

  padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Gallery;
