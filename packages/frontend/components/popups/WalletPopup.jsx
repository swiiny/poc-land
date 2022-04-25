import React from 'react';
import styled from 'styled-components';
import { Button } from '../../styles/GlobalComponents';
import Portal from '../utils/gallery/Portal';

const WalletPopup = ({ onClose, isVisible = false }) => (
  <Portal selector="body">
    <StyledBg onClick={onClose} />
    <StyledPopupContainer>
      <StyledPopup isVisible={isVisible}>
        <Button>
          MetaMask
        </Button>
        <Button>
          WalletConnect
        </Button>
      </StyledPopup>
    </StyledPopupContainer>
  </Portal>
);

const StyledBg = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 200;
    background-color: rgba(0, 0, 0, 0.5);
`;

const StyledPopupContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 201;

    display: flex;
    justify-content: center;
    align-items: center;
`;

const StyledPopup = styled.div`
    position: absolute;
`;
