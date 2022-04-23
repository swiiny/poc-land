import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';
import '../styles/waves.css';

const darkTheme = {
  radius: {
    s: '3px',
    m: '5px',
    l: '7px',
  },
  spacing: {
    '7xs': '1px',
    '6xs': '2px',
    '5xs': '4px',
    '4xs': '8px',
    '3xs': '12px',
    '2xs': '16px',
    xs: '20px',
    s: '24px',
    m: '32px',
    l: '40px',
    xl: '48px',
    '2xl': '64px',
    '3xl': '80px',
    '4xl': '100px',
    '5xl': '128px',
  },
  breakpoints: {
    sm: '600px',
    md: '900px',
    lg: '1200px',
    xl: '1600px',
  },
  colors: {
    typo: '#ecf6f7',
    bg: '#121923',
    accent: '#79DCEF',
    negative: '#E35656',
    gradientStart: '#E73C7E',
    gradientEnd: '#EE7752',
    gradient: 'linear-gradient(97.76deg, #E73C7E 0%, #EE7752 100%)',
  },
};

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />

      <link rel="stylesheet" href="https://use.typekit.net/ghs1jtd.css" />
    </Head>

    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
