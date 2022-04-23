import { ArrowRight } from 'heroicons-react';
import router from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import LogoIpfs from '../assets/img/logo-ipfs.svg';
import LogoOptimism from '../assets/img/logo-optimism.svg';
import LogoPolygon from '../assets/img/logo-polygon.svg';
import Poc1 from '../assets/img/poc1.png';
import Poc2 from '../assets/img/poc2.png';
import Poc3 from '../assets/img/poc3.png';
import PocItem from '../components/gallery/PocItem';
import { LINKS } from '../components/utils/Navbar';
import Page from '../components/utils/Page';
import useResponsive from '../hooks/useResponsive';
import {
  Button, Size, StyledHeadingOne, StyledHeadingTwo,
} from '../styles/GlobalComponents';

const demoPocs = [
  {
    name: 'Synthwave DAO',
    description: 'This is a description for POC 1',
    src: Poc1.src,
  },
  {
    name: 'zk-PR-Creators',
    description: 'This is a description for POC 1',
    src: Poc2.src,
  },
  {
    name: 'Web3 vs UX',
    description: 'This is a description for POC 1',
    src: Poc3.src,
  },
];

export default function Home() {
  const { isSmallerThanLg, isSmallerThanSm } = useResponsive();

  const demoCardCount = useMemo(() => {
    if (isSmallerThanSm) {
      return 1;
    }

    if (isSmallerThanLg) {
      return 2;
    }

    return 3;
  }, [isSmallerThanSm, isSmallerThanLg]);
  return (
    <Page title="Home">
      <StyledContainer>

        <StyledTextContainer>
          <StyledHeadingOne>
            Welcome to Poc.Land
          </StyledHeadingOne>

          <StyledHeadingTwo accent style={{ textAlign: 'center' }}>
            Permissionless, Stream-Enabled, Proof of Community NFTs.
          </StyledHeadingTwo>

        </StyledTextContainer>

        <StyledPocList>
          {demoPocs.slice(0, demoCardCount).map((p) => (
            <PocItem key={p.name + p.src} poc={p} />
          ))}
        </StyledPocList>

        <CTAContainer>
          <Button
            onClick={() => router.push(LINKS.create)}
            size={Size.m}
          >
            Create Your First Proof of Community
          </Button>
          <Button
            onClick={() => router.push(LINKS.gallery)}
            size={Size.s}
            tertiary
          >
            <StyledFlexContainer>
              My Gallery

              <ArrowRight size={18} />
            </StyledFlexContainer>
          </Button>
        </CTAContainer>

        <StyledPowered>
          <StyledHeadingTwo style={{ textAlign: 'center', opacity: '0.5' }}>
            Powered by
          </StyledHeadingTwo>

          <div>
            <StyledPoweredByLogo src={LogoPolygon.src} style={{ height: '60px' }} />
            <StyledPoweredByLogo src={LogoOptimism.src} style={{ height: '25px' }} />
            <StyledPoweredByLogo src={LogoIpfs.src} style={isSmallerThanSm ? { marginBottom: '25px' } : {}} />
          </div>

        </StyledPowered>
      </StyledContainer>
    </Page>
  );
}

const StyledPoweredByLogo = styled.img`
  height: 50px;
  width: auto;

  & + img {
    margin-left: 32px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        margin-left: 0;
        margin-top: 24px;
    }
  }
`;

const StyledPowered = styled.div`
  position: relative;
  top: 20px;
  
  margin-top: 36px;
  
  & > div {
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 12px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        flex-direction: column;
    }
  }
`;

const StyledPocList = styled.ul`
    display: flex;
    justify-content: center;
    align-items: center;
    
    list-style: none;
    
    width: 100%;

    padding: 0;

    margin-top: 40px;
`;

const StyledFlexContainer = styled.div`
  position: relative;

  display: flex;
  align-items: center;
  justify-content: center;

  svg {
      position: absolute;
      right: -45%;

      transition: all 0.4s ease-in-out;
    }

  &:hover {
    svg {
      right: -50%;
    }
  }
`;

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  width: 100%;

  margin-top: 40px;

  & > button:nth-child(1) {
    margin-top: 32px;
  }

  & > button:nth-child(2) {
    margin-top: 32px;
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

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      margin-top: 108px;
  }

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
