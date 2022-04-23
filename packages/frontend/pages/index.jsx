import router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { LINKS } from '../components/utils/Navbar';
import Page from '../components/utils/Page';
import {
  Button, Size, StyledHeadingOne, StyledHeadingTwo,
} from '../styles/GlobalComponents';

export default function Home() {
  return (
    <Page title="Home">
      <StyledContainer>

        <StyledTextContainer>
          <StyledHeadingOne>
            Welcome to Poc.Land
          </StyledHeadingOne>

          <StyledHeadingTwo accent style={{ textAlign: 'center' }}>
            Permissionless, Defi-Enabled, Proof of Community tokens.
            <br />
            {' '}
            Powered by Optimism, Polygon & IPFS.
          </StyledHeadingTwo>

        </StyledTextContainer>

        <CTAContainer>
          <Button
            onClick={() => router.push(LINKS.create)}
            secondary
            size={Size.l}
          >
            Create PoC
          </Button>
          <Button
            onClick={() => router.push(LINKS.gallery)}
            size={Size.l}
          >
            My Gallery
          </Button>
        </CTAContainer>
      </StyledContainer>
    </Page>
  );
}

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 64px;

  & > button:nth-child(1) {
    margin-right: 16px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column;
    
    button {
      width: 100%;
      
      &:nth-child(1) {
        margin-right: 0px;
      }
      
      & + button {
        margin-top: 16px;
      }
    }
  }
`;

const StyledTextContainer = styled.div`
  text-align: center;
  max-width: 1200px;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  z-index: 2;

  min-height: 100vh;
`;
