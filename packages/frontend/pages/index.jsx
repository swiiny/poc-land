import { ArrowRight } from 'heroicons-react';
import Link from 'next/link';
import router from 'next/router';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import LogoIpfs from '../assets/img/logo-ipfs.svg';
import LogoOptimism from '../assets/img/logo-optimism.svg';
import LogoPolygon from '../assets/img/logo-polygon.svg';
import LogoSuperfluid from '../assets/img/logo-superfluid.png';
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
            <PocItem key={p.name + p.src} poc={p} demo />
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
            <Link href="https://polygon.technology/">
              <a target="_blank" rel="noopener noreferrer">
                <StyledPoweredByLogo src={LogoPolygon.src} style={{ height: '60px' }} />
              </a>
            </Link>
            <Link href="https://www.optimism.io/">
              <a target="_blank" rel="noopener noreferrer">
                <StyledPoweredByLogo src={LogoOptimism.src} style={{ height: '25px' }} />
              </a>
            </Link>
            <Link href="https://ipfs.io/">
              <a target="_blank" rel="noopener noreferrer">
                <StyledPoweredByLogo src={LogoIpfs.src} />
              </a>
            </Link>
            <Link href="https://www.superfluid.finance/home">
              <a target="_blank" rel="noopener noreferrer">
                <StyledPoweredByLogo src={LogoSuperfluid.src} isSuperfluid />
              </a>
            </Link>
          </div>
        </StyledPowered>
      </StyledContainer>
    </Page>
  );
}

const StyledPoweredByLogo = styled.img`
  height: 50px;
  width: auto;

  ${(props) => (props.isSuperfluid ? `
    position: relative;
    height: 120px;
    left: -40px;
  ` : '')}
`;

const StyledPowered = styled.div`
  position: relative;
  top: 20px;
  
  margin-top: 36px;
  
  & > div {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    margin-top: 12px;

    right: -40px;

    &:hover > a {
      opacity: 0.6;
    }

    & > a {
      margin-left: 32px;

      transition: all 0.4s ease-in-out 0.05s;

      &:hover {
        transform: scale(1.05);
        margin-left: 40px;
        margin-right: 8px;
        opacity: 1.0;
      }

      @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
          margin-left: 0;
          margin-top: 24px;
      }
    }

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
