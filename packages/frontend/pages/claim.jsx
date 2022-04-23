import axios from 'axios';
import { isAddress } from 'ethers/lib/utils';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  StyledForm, StyledFormItem, StyledInput, StyledLabel,
} from '../components/form/Form';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { Button, StyledHeadingOne } from '../styles/GlobalComponents';

const Claim = () => {
  const [recipient, setRecipient] = useState('');
  const [pocId, setPocId] = useState('');

  const { account } = useWallet();

  const isDataValid = useMemo(() => isAddress(recipient), [recipient]);
  const isPocIdValid = useMemo(() => {
    if (!pocId) {
      return false;
    }

    // TODO : udpate when pocId will be a real id (not an address)
    return isAddress(pocId);
  }, [pocId]);

  const getPocMetadata = async (e) => {
    // TODO
  };

  const claimPoc = async (e) => {
    e.preventDefault();
    console.log('whatsssupppp');

    try {
      // TODO : Claim POC
      const url = `${process.env.SERVER_URL}/v1/server/mint`;
      const payload = {
        pocAddress: '0xeD616c1bb22C80c5EB35c492a992f3CDFD4098b0',
        pocId,
        recipient,
      };
      const res = await axios.post(url, payload);
      console.log('res', res);
    } catch (err) {
      console.error('Error claiming POC: ', err);
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
          Claim POC
        </StyledHeadingOne>

        <StyledForm>

          <StyledFormItem>
            <StyledLabel>
              Set the POC Secret
            </StyledLabel>
            <StyledInput
              type="text"
              placeholder="Name"
              value={pocId}
              onChange={(e) => setPocId(e.target.value)}
            />
          </StyledFormItem>

          <StyledFormItem>
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

          <Button
            style={{ width: '100%' }}
            type="submit"
            onClick={(e) => claimPoc(e)}
          >
            {/* // disabled= {!isDataValid || !isPocIdValid} */}
            Claim
          </Button>
        </StyledForm>

      </StyledContainer>
    </Page>
  );
};

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
