import { ChevronDownOutline } from 'heroicons-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Logo from '../../assets/img/logo.svg';
import useWallet from '../../hooks/useWallet';
import { Button, Size, StyledTag } from '../../styles/GlobalComponents';
import { formatAddress } from '../../utils/functions';
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
  },
];

export const LINKS = {
  home: pages[0].url,
  create: pages[1].url,
  gallery: pages[2].url,
  redeem: pages[3].url,
};

const Navbar = () => {
  const [isNetworksSelectorVisible, setIsNetworksSelectorVisible] = useState(false);

  const { connectToWallet, account, isWrongNetwork } = useWallet();

  const Router = useRouter();
  const { pathname } = Router;

  return (
    <>
      <NetworkSelector
        isVisible={isNetworksSelectorVisible}
        relativeTo={isWrongNetwork ? '#switch-button' : null}
        onClose={() => setIsNetworksSelectorVisible(false)}
      />

      <StyledNavbar>

        <StyledLogo src={Logo.src} />

        <ul>
          {pages.map((p) => (
            <li>
              <Link href={p.url}>
                <StyledLink active={pathname === p.url}>
                  {p.label}
                </StyledLink>
              </Link>
            </li>
          ))}
        </ul>

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
      </StyledNavbar>
    </>
  );
};

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

  height: 84px;

  padding: 0 ${({ theme }) => theme.spacing.l};
  
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: ${({ theme }) => `${theme.colors.bg}80`};
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
  }
`;

export default Navbar;
