import React, { useEffect } from 'react';
import styled from 'styled-components';
import Page from '../components/utils/Page';
import { StyledHeadingOne } from '../styles/GlobalComponents';

const Gallery = () => {
  useEffect(() => {

  }, []);

  return (
    <Page title="My Gallery">
      <StyledContainer>
        <StyledHeadingOne>
          My Gallery
        </StyledHeadingOne>

      </StyledContainer>
    </Page>
  );
};

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-height: 100vh;

  padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Gallery;
