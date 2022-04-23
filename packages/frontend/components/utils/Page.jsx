import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Page = ({ title = '', description = '', children }) => (
  <StyledPage className="wave-aniamtion">
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className="main-container">
      <Navbar />

      <div className="mt-16">
        {children}
      </div>

    </main>
  </StyledPage>
);

const StyledPage = styled.div`
  padding: 0 5%;

  background-color: ${({ theme }) => theme.colors.bg};

  &::before {
    content: " ";

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    ${({ theme }) => `background: radial-gradient(88.99% 94.44% at 92.31% 100%, ${`${theme.colors.gradientStart}20`} 0%,  ${`${theme.colors.gradientStart}00`} 100%);`}
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 5%;
  }
    
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 5%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 20px 10px;
  }
`;

export default Page;
