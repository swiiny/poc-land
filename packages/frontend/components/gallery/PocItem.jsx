import { Skeleton } from '@mui/material';
import { ClipboardCopy } from 'heroicons-react';
import React, { useMemo } from 'react';
import Tilt from 'react-parallax-tilt';
import styled from 'styled-components';
import { StyledHeadingThree, StyledText } from '../../styles/GlobalComponents';
import { copyToClipboard } from '../../utils/functions';

const PocItem = ({
  poc, isVisible = true, demo = false, ...otherProps
}) => {
  const isLoading = useMemo(() => {
    if (!poc?.name) {
      return true;
    }

    return false;
  }, [poc]);

  const customStyle = {
    maxWidth: '95%',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
  };

  return (

    <StyledPocItem {...otherProps} isVisible={isVisible}>
      <Tilt
        tiltMaxAngleX={6}
        tiltMaxAngleY={6}
        perspective={1500}
        scale={1}
        transitionSpeed={1000}
        transitionTimingFunction="ease-in-out"
        glareEnable
        glareMaxOpacity={0.07}
        style={{ borderRadius: '8px' }}
      >
        <div>
          <div className="img-container">
            {isLoading ? (
              <Skeleton sx={{ backgroundColor: '#12192350', borderRadius: '50%' }} variant="circular" animation="wave" width="100%" height={150} />
            ) : (
              <img
                src={poc.src}
                alt={poc.name}
                style={{
                  objectFit: 'cover', height: '100%', width: 'auto', zIndex: '10',
                }}
              />
            )}
          </div>

          {isLoading ? (
            <>
              <Skeleton sx={{ backgroundColor: '#12192350', borderRadius: '5px' }} variant="rectangular" animation="wave" width="100%" height={36} style={{ marginBottom: '8px' }} />
              <Skeleton sx={{ backgroundColor: '#12192350', borderRadius: '5px' }} variant="rectangular" animation="wave" width="100%" height={12} style={{ marginBottom: '4px' }} />
              <Skeleton sx={{ backgroundColor: '#12192350', borderRadius: '5px' }} variant="rectangular" animation="wave" width="100%" height={12} />
            </>
          ) : (
            <>
              <StyledHeadingThree className="name" style={customStyle}>{poc.name}</StyledHeadingThree>
              <StyledText isVisible className="description">{poc.description}</StyledText>
            </>
          )}

          {!demo && !isLoading && (
          <>
            <StyledAddressBtn
              onClick={() => copyToClipboard(poc.address)}
            >
              <ClipboardCopy size={20} />
            </StyledAddressBtn>

            <StyledSuperfluidLink href="https://app.superfluid.finance/" target="_blank" rel="noreferrer">
              Stream now
            </StyledSuperfluidLink>
          </>
          )}
        </div>
      </Tilt>
    </StyledPocItem>
  );
};

const StyledAddressBtn = styled.button`
  position: absolute;
  bottom: 15px;
  left: 15px;

  background-color: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.typo};

  cursor: pointer;
`;

const StyledSuperfluidLink = styled.a`
  position: absolute;
  bottom: 15px;
  right: 15px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${({ theme }) => theme.colors.gradient};

  border-radius: 15px;

  height: 30px;
  width: 120px;

  color: ${({ theme }) => theme.colors.typo};

  font-size: 14px;
  font-weight: bold;
`;

const StyledPocItem = styled.li`
    list-style: none;
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
            top: -20px;
            left: -20px;

            border-radius: 50%;
            overflow: hidden;

            width: 100px;
            height: 100px;

            box-shadow: 0 0 0 4px ${({ theme }) => `${theme.colors.bg}30`};

            img {
                width: 100%;
                height: auto;
            }
        }
     }
`;

export default PocItem;
