import router from 'next/router';
import React from 'react';
import styled from 'styled-components';
import { LINKS } from '../components/utils/Navbar';
import Page from '../components/utils/Page';
import {
  Button, Size, StyledHeadingOne, StyledHeadingTwo,
} from '../styles/GlobalComponents';

export default function Home() {
  return (
    <Page title="Home">
      <StyledContainer>

        <StyledTextContainer>
          <StyledHeadingOne>
            PoC Land
          </StyledHeadingOne>

          <StyledHeadingTwo accent style={{ textAlign: 'center' }}>
            Proof of Community, Lorem Ipsum Dolor Sit Amet Lorem Ipsum Dolor Sit Amet Lorem Ipsum
          </StyledHeadingTwo>

        </StyledTextContainer>

        <CTAContainer>
          <Button
            onClick={() => router.push(LINKS.create)}
            secondary
            style={{ marginRight: '16px' }}
            size={Size.l}
          >
            Create PoC
          </Button>
          <Button
            onClick={() => router.push(LINKS.gallery)}
            size={Size.l}
          >
            My Gallery
          </Button>
        </CTAContainer>
      </StyledContainer>
    </Page>
  );
}

const CTAContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  width: 100%;

  margin-top: 64px;
`;

const StyledTextContainer = styled.div`
  text-align: center;
  max-width: 1200px;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  min-height: 100vh;
`;
