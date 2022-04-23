import { ChevronDownOutline } from 'heroicons-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useWallet from '../../hooks/useWallet';
import { Button, Size, StyledTag } from '../../styles/GlobalComponents';
import { formatAddress } from '../../utils/functions';

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
    url: '/redeem',
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

  useEffect(() => {

  }, []);

  return (
    <>
      <StyledNavbar>

        <StyledLogo src="" />

        <ul>
          {pages.map((p) => (
            <li>
              <Link href={p.url}>
                <StyledLink>
                  {p.label}
                </StyledLink>
              </Link>
            </li>
          ))}

          <li>
            {account ? (
              <StyledTag>
                {formatAddress(account)}
              </StyledTag>
            ) : isWrongNetwork ? (
              <StyledSwitchNetwork
                size={Size.s}
                onClick={() => {}}
                onMouseEnter={() => setIsNetworksSelectorVisible(true)}
                onMouseLeave={() => setIsNetworksSelectorVisible(false)}
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

          </li>
        </ul>
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
  height: 100%;
  width: auto;
`;

const StyledLink = styled.a`
  color: ${({ theme }) => theme.colors.typo};

  &:hover {
    opacity: 0.9;
  }

  cursor: pointer;
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
  justify-content: space-between;
  align-items: center;

  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    li + li {      
      margin-left: ${({ theme }) => theme.spacing.m};
    }
  }
`;

export default Navbar;
