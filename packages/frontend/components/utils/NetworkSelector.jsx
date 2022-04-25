import React from 'react';
import styled, { css } from 'styled-components';
import useWallet, { availableNetworks } from '../../hooks/useWallet';
import { StyledTextButton } from '../../styles/GlobalComponents';
import Portal from './gallery/Portal';

const NetworkSelector = ({ relativeTo, isVisible = false, onClose = () => {} }) => {
  const { switchNetwork } = useWallet();

  const selectNetwork = (chainId) => {
    switchNetwork(chainId);

    onClose();
  };

  if (!relativeTo) {
    return <></>;
  }

  return (
    <Portal selector={relativeTo}>
      <StyledList isVisible={isVisible}>
        {availableNetworks.map((n) => (

          <li key={n.chainId}>
            <StyledTextButton
              onClick={() => selectNetwork(n.chainId)}
            >
              {n.name}
            </StyledTextButton>
          </li>
        ))}

      </StyledList>
    </Portal>
  );
};

const StyledList = styled.ul`
    list-style: none;

    width: auto;
    height: auto;

    position: absolute;
    top: 130%;
    right: 0px;

    border-radius: 8px;
    background-color: ${({ theme }) => `${theme.colors.typo}20`};

    padding: 20px;

    transition: all 0.4s ease-in-out;

    ${(props) => (props.isVisible ? css`
      opacity: 1.0;
      margin-top: -5px;
    ` : css`
      opacity: 0.0;
      margin-top: 0;
    `)}

    li {
      button {
        width: 100%;
        text-align: left;
        padding: 0;
      }
    }
`;

export default NetworkSelector;
