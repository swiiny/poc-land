import axios from 'axios';
import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  StyledForm, StyledFormItem, StyledInput, StyledLabel,
} from '../components/form/Form';
import PocItem from '../components/gallery/PocItem';
import Page from '../components/utils/Page';
import useResponsive from '../hooks/useResponsive';
import useWallet from '../hooks/useWallet';
import { Button, StyledHeadingOne, StyledText } from '../styles/GlobalComponents';
import pocAbi from '../utils/pocAbi';

const CLAIM_STEP = {
  unset: 'unset',
  setAddress: 'setAddress',
  minting: 'minting',
  success: 'success',
  error: 'error',
};

const Claim = () => {
  const [recipient, setRecipient] = useState('');
  const [pocId, setPocId] = useState('');
  const [pocData, setPocData] = useState({
    name: 'PoC 1',
    description: 'This is a description for PoC 1',
    src: 'https://picsum.photos/150/150',
  });

  const [claimStep, setClaimStep] = useState(CLAIM_STEP.setAddress);

  const { account } = useWallet();
  const { isSmallerThanSm } = useResponsive();

  const isPocIdValid = useMemo(() => {
    if (!pocId) {
      return false;
    }

    // TODO : udpate when pocId will be a real id (not an address)
    return isAddress(pocId);
  }, [pocId]);

  async function getPocContract(ethereumProvider, pocAddress) {
    // const contractAddress = availableNetworks.find((net) => net.chainId === currentChainId)?.contractAddress;
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const dnpContract = new ethers.Contract(pocAddress, pocAbi, provider);
    return dnpContract;
  }

  const getPocMetadata = async (e) => {
    // TODO
    e.preventDefault();
    const pocAddress = '0x9332806d5ef48f0b350AD5b493e16955A3616df9';
    const poc = await getPocContract(window.ethereum, pocAddress);
    console.log('address is correct?', poc.address);
    const data = await poc.tokenURI(4);
    console.log(data);
  };

  const claimPoc = async (e) => {
    e.preventDefault();

    try {
      // TODO : Claim PoC
      setClaimStep(CLAIM_STEP.minting);

      const url = `${process.env.SERVER_URL}/v1/server/mint`;
      const payload = {
        pocAddress: '0xeD616c1bb22C80c5EB35c492a992f3CDFD4098b0',
        pocId,
        recipient,
      };
      const res = await axios.post(url, payload);
      console.log('res', res);

      setTimeout(() => {
        setClaimStep(CLAIM_STEP.success);
      }, 1000);
    } catch (err) {
      console.error('Error claiming PoC: ', err);
      setTimeout(() => {
        setClaimStep(CLAIM_STEP.error);
      }, 1000);
    }
  };

  useEffect(() => {
    if (account) {
      setRecipient(account);
    }
  }, [account]);

  return (
    <Page title="Claim">
      <StyledContainer>
        <StyledHeadingOne>
          Claim PoC
        </StyledHeadingOne>

        <StyledFormContainer>

          <StyledForm>
            <PocItem poc={pocData} style={{ width: '110%', margin: '40px 0', marginLeft: `${isSmallerThanSm ? '-5%' : '0'}` }} />

            <StyledFormItem isVisible normalPos>
              <StyledLabel>
                Set your Address
              </StyledLabel>
              <StyledInput
                type="text"
                placeholder="Name"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
              />
            </StyledFormItem>

            <StyledText
              isVisible={claimStep !== CLAIM_STEP.unset}
              negative={claimStep === CLAIM_STEP.error}
              positive={claimStep === CLAIM_STEP.success}
            >
              {claimStep === CLAIM_STEP.minting && 'Minting PoC...'}
              {claimStep === CLAIM_STEP.success && 'PoC successfully claimed'}
              {claimStep === CLAIM_STEP.error && 'Error claiming PoC, please try again later'}
            </StyledText>

            <StyledFormItem isVisible={claimStep === CLAIM_STEP.setAddress || claimStep === CLAIM_STEP.error} normalPos>
              <Button
                style={{ width: '100%' }}
                type="submit"
                onClick={(e) => claimPoc(e)}
                disabled={!isAddress(recipient) || (claimStep !== CLAIM_STEP.setAddress && claimStep !== CLAIM_STEP.error)}
              >
                Claim
              </Button>
            </StyledFormItem>
          </StyledForm>
        </StyledFormContainer>
      </StyledContainer>
    </Page>
  );
};

const StyledFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const StyledContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  z-index: 2;

  min-height: 100vh;

  padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Claim;
