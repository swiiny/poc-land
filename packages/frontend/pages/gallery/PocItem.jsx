import React, { useEffect } from 'react';
import styled from 'styled-components';
import { StyledHeadingThree, StyledText } from '../../styles/GlobalComponents';

const PocItem = ({ poc }) => {
  useEffect(() => {

  }, []);

  return (
    <StyledPocItem>
      <div>
        <div className="img-container">
          <img src={poc.src} alt={poc.name} />
        </div>

        <StyledHeadingThree className="name">{poc.name}</StyledHeadingThree>
        <StyledText className="description">{poc.description}</StyledText>
      </div>
    </StyledPocItem>
  );
};

const StyledPocItem = styled.li`

    padding: 2%;
    width: 32%;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 48%;
        padding: 2%;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 48%;
        padding: 2%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
        padding: 20px 0px;
    }

    & > div {
        position: relative;
        
        padding: 20px;

        padding-left: 120px;

        border-radius: 12px;
        background-color: ${({ theme }) => `${theme.colors.typo}10`};
        backdrop-filter: blur(4px);

        .img-container {
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: -10px;
            left: -10px;

            border-radius: 50%;
            overflow: hidden;

            width: 100px;
            height: 100px;

            box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.bg};

            img {
                width: 100%;
                height: auto;
            }
        }
     }
`;

export default PocItem;
