import Head from 'next/head';
import React from 'react';
import { ThemeProvider } from 'styled-components';
import '../styles/globals.css';

const darkTheme = {
  defaultColors: {
    bgDark: '#161E25',
    bgWhite: '#E7EAED',
  },
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
  },
  colors: {
    typo: '#B3FCFF',
    bg: '#121923',
    accent: '#79DCEF',
    negative: '#E35656',
    gradientStart: '#79DCEF',
    gradientEnd: '#0D9BD7',
    gradient: 'linear-gradient(97.76deg, #79DCEF 0%, #0D9BD7 100%)',
    shadow: {
      normal: '0px 8px 12px rgba(131, 238, 255, 0.1), 0px 2px 4px rgba(0, 0, 0, 0.8), 0px 1px 0px #6CEEFF',
      hover: '0px 8px 22px rgba(131, 238, 255, 0.2), 0px 2px 4px rgba(0, 0, 0, 0.8), 0px 1px 0px #6CEEFF',
    },
  },
};

const MyApp = ({ Component, pageProps }) => (
  <>
    <Head>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0"
      />
    </Head>

    <ThemeProvider theme={darkTheme}>
      <Component {...pageProps} />
    </ThemeProvider>
  </>
);

export default MyApp;
