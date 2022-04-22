import Link from 'next/link';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/GlobalComponents';

export const pages = [
  {
    label: 'Home',
    url: '/',
  },
  {
    label: 'Create',
    url: '/new-collection',
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
  useEffect(() => {

  }, []);

  return (
    <StyledNavbar>

      <StyledLogo src="" />

      <ul className="list-none flex align-center justify-end w-full align-center">
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
          <Button className="button">
            Connect Wallet
          </Button>
        </li>
      </ul>
    </StyledNavbar>
  );
};

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
