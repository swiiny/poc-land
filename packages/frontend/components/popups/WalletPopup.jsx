import React, { useEffect } from 'react';
import styled from 'styled-components';
import useWallet, { walletProvider } from '../../hooks/useWallet';
import { Button } from '../../styles/GlobalComponents';
import Portal from '../utils/Portal';

const WalletPopup = ({ onClose, isVisible = false }) => {
  const {
    setPreferedWallet, preferedWallet, initWeb3, initWalletConnect,
  } = useWallet();

  useEffect(() => {
    if (preferedWallet !== walletProvider.unset) {
      onClose();
    }
  }, [preferedWallet]);

  if (!isVisible) {
    return <></>;
  }

  return (
    <Portal selector="body">
      <StyledBg onClick={onClose} />
      <StyledPopupContainer>
        <StyledPopup isVisible={isVisible}>
          <StyledButtonContainer>
            <Button
              onClick={() => initWeb3()}
            >
              MetaMask
            </Button>
            <Button
              onClick={() => initWalletConnect()}
            >
              WalletConnect
            </Button>
          </StyledButtonContainer>
        </StyledPopup>
      </StyledPopupContainer>
    </Portal>
  );
};

const StyledButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-top: 32px;

    background-color: ${({ theme }) => theme.colors.typo};

    padding: 16px;
    border-radius: 8px;

    border: 1px solid ${({ theme }) => theme.colors.gradient};

    & > button {
        width: 100%;
    }
    
    & > button + button {
        margin-top: 12px;
    }
`;

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

export default WalletPopup;
