import Head from 'next/head';
import React from 'react';
import styled from 'styled-components';
import Navbar from './Navbar';

const Page = ({ title = '', description = '', children }) => (
  <StyledPage>
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

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      padding: 0 5%;
  }
    
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      padding: 0 5%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      padding: 0 15px;
  }
`;

export default Page;
