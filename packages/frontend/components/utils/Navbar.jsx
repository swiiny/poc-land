import { ChevronDownOutline } from 'heroicons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Logo from '../../assets/img/logo.svg';
import useResponsive from '../../hooks/useResponsive';
import useWallet from '../../hooks/useWallet';
import { Button, Size, StyledTag } from '../../styles/GlobalComponents';
import { formatAddress } from '../../utils/functions';
import Portal from './gallery/Portal';
import NetworkSelector from './NetworkSelector';

export const pages = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Create',
    url: '/create',
  },
  {
    label: 'My Gallery',
    url: '/gallery',
  },
  {
    label: 'Claim',
    url: '/claim',
    isHidden: true,
  },
  {
    label: 'My Collections',
    url: '/collections',
  },
];

export const LINKS = {
  home: pages[0].url,
  create: pages[1].url,
  gallery: pages[2].url,
  redeem: pages[3].url,
  collections: pages[4].url,
};

const Navbar = () => {
  const [isNetworksSelectorVisible, setIsNetworksSelectorVisible] = useState(false);
  const [mobileNavbarVisible, setMobileNavbarVisible] = useState(false);

  const { connectToWallet, account, isWrongNetwork } = useWallet();
  const { isSmallerThanMd } = useResponsive();

  const Router = useRouter();
  const { pathname } = Router;

  return (
    <>
      <NetworkSelector
        isVisible={isNetworksSelectorVisible}
        relativeTo={isWrongNetwork ? '#switch-button' : null}
        onClose={() => setIsNetworksSelectorVisible(false)}
      />

      {isSmallerThanMd && (
      <StyledMobileNavbar>
        <Portal>
          <StyledBackgroundButton
            isVisible={mobileNavbarVisible}
            onClick={() => setMobileNavbarVisible(false)}
          />
        </Portal>
        <StyledLogo isSmall src={Logo.src} />

        <StyledBurger
          onClick={() => setMobileNavbarVisible(!mobileNavbarVisible)}
          isActive={mobileNavbarVisible}
        >
          <span />
          <span />
          <span />
        </StyledBurger>
      </StyledMobileNavbar>
      )}

      <StyledNavbar isMobileVisible={mobileNavbarVisible}>

        {!isSmallerThanMd && (
        <StyledLogo src={Logo.src} />
        )}

        <ul className={isSmallerThanMd ? 'wave-aniamtion ' : ''}>
          {pages.filter((p) => !p.isHidden).map((p) => (
            <li>
              <Link href={p.url}>
                <StyledLink active={pathname === p.url}>
                  {p.label}
                </StyledLink>
              </Link>
            </li>
          ))}
        </ul>

        {!isSmallerThanMd && (
        <div className="wallet-connect">
          {account ? (
            <StyledTag>
              {formatAddress(account)}
            </StyledTag>
          ) : isWrongNetwork ? (
            <StyledSwitchNetwork
              size={Size.s}
              onClick={() => {}}
              onMouseEnter={() => setIsNetworksSelectorVisible(true)}
              id="switch-button"
            >
              Switch Network
              <ChevronDownOutline size={20} style={{ marginLeft: '8px' }} />
            </StyledSwitchNetwork>
          ) : (
            <Button
              size={Size.s}
              onClick={() => connectToWallet()}
            >
              Connect Wallet
            </Button>
          )}
        </div>
        )}
      </StyledNavbar>
    </>
  );
};

const StyledBackgroundButton = styled.button`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 50;
  height: 100vh;

  border: none;

  transition: all 0.4s ease-in-out;

  ${(props) => (props.isVisible ? css`
    opacity: 1.0;
    max-height: 100vh;
  ` : css`
    opacity: 0.0;
    max-height: 0px;
  `)}

  background-color: ${({ theme }) => `${theme.colors.bg}60`};
`;

const StyledMobileNavbar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  z-index: 110;

  height: 64px;

  padding: 0 16px;
`;

const StyledBurger = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;

  position: relative;
  z-index: 998;
  width: 30px;
  height: 24px;

  padding: 0;
  margin: 0;
  border: none;
  background-color: transparent;

  span {
      display: block;
      transition: all 0.4s ease-in-out;
      height: 2px;
      width: 100%;
      background-color: ${({ theme }) => theme.colors.typo};
      opacity: 1;

      &:nth-child(2) {
          margin: 8px 0;
      }
  }

  ${({ isActive }) => (isActive ? css`
      span {
          &:nth-child(1) {
              transform: rotate(-45deg) translateX(-2px) translateY(2px);
          }

          &:nth-child(2) {
              width: 0;
              margin: 0 50%;
          }

          &:nth-child(3) {
              transform: rotate(45deg);
          }
      }

      ` : '')}
  
`;

const StyledSwitchNetwork = styled.div`
    position: relative;
    border: none;
    border-radius: 8px;
    
    padding: 8px 16px;
    font-size: 16px;

    color: ${({ theme }) => theme.colors.typo};
    background: none;
    border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};

    cursor: pointer;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledLogo = styled.img`
  height: 60%;
  width: auto;
`;

const StyledLink = styled.a`
  &:hover {
    opacity: 0.9;
  }

  cursor: pointer;

  transition: all 0.4s ease-in-out;

  ${(props) => (props.active ? css`
    background: ${({ theme }) => theme.colors.gradient};
    ${() => '-webkit-background-clip: text;'}
    -webkit-text-fill-color: transparent;
  ` : css`
    color: ${({ theme }) => theme.colors.typo};
  `)}
`;

const StyledNavbar = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  z-index: 100;

  height: 84px;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 64px;
  }

  padding: 0 ${({ theme }) => theme.spacing.l};
  
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => `${theme.colors.bg}20`};
  backdrop-filter: blur(8px);

  & > img {
    position: absolute;
    left: ${({ theme }) => theme.spacing.l};
  }

  & > .wallet-connect {
    position: absolute;
    right: ${({ theme }) => theme.spacing.l};
  }

  & > ul {
    list-style: none;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 0;

    & > li + li {      
      margin-left: ${({ theme }) => theme.spacing.m};
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      position: absolute;
      z-index: 100;
      top: 0;
      left: 0;
      right: 0;

      padding-top: 64px;
      margin-top: 0;

      flex-direction: column;

      overflow: hidden;

      transition: all 0.4s ease-in-out;

      background-color: ${({ theme }) => `${theme.colors.bg}`};

      padding-bottom: ${({ theme }) => theme.spacing.l};

      & > li + li {      
        margin-left: 0;
        margin-top: 16px;
      }

      ${(props) => (props.isMobileVisible ? css`
        max-height: 200px;
        opacity: 1.0;
      ` : css`
        max-height: 0px;
        opacity: 0;
      `)};
    }

    
  }
`;

export default Navbar;
