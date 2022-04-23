import axios from 'axios';
import { ethers } from 'ethers';
import { isAddress } from 'ethers/lib/utils';
import router, { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import {
  StyledForm, StyledFormItem, StyledInput, StyledLabel,
} from '../components/form/Form';
import PocItem from '../components/gallery/PocItem';
import { LINKS } from '../components/utils/Navbar';
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
  const [pocData, setPocData] = useState({});

  const [claimStep, setClaimStep] = useState(CLAIM_STEP.setAddress);

  const { account } = useWallet();
  const { isSmallerThanSm } = useResponsive();

  const Router = useRouter();
  const { poc } = Router.query;

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

  const getPocMetadata = async (pocAddress) => {
    // const pocAddress = '0xE6BC298FF03054D0Fe27532388522BA1e0E43Ca3';
    const pocContract = await getPocContract(window.ethereum, pocAddress);
    console.log('address is correct?', pocContract.address);
    const data = await pocContract.tokenURI(4);
    console.log(data);
    axios.get(data).then((res) => {
      console.log(res.data);
      console.log(res.data.description);
      console.log(res.data.name);
      let imageLinkIpfs = res.data.image;
      imageLinkIpfs = imageLinkIpfs.replace('ipfs://', 'https://ipfs.io/ipfs/');
      console.log(imageLinkIpfs);

      setPocData({
        name: res.data.name,
        description: res.data.description,
        src: imageLinkIpfs,
      });
      // setPocData(res.data);
    });
  };

  const claimPoc = async (e) => {
    e.preventDefault();

    try {
      // TODO : Claim PoC
      setClaimStep(CLAIM_STEP.minting);

      const url = `${process.env.SERVER_URL}/v1/server/mint`;
      const payload = {
        pocAddress: poc,
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

  useEffect(() => {
    if (poc) {
      getPocMetadata(poc);
    }
  }, [poc]);

  return (
    <Page title="Claim">
      <StyledContainer>
        <StyledHeadingOne>
          Claim PoC
        </StyledHeadingOne>

        <StyledFormContainer>

          <StyledForm>
            <StyledMargin isVisible={pocData.name}>
              <PocItem
                poc={pocData}
                style={{ width: '110%', marginLeft: `${isSmallerThanSm ? '-5%' : '0'}` }}
              />
            </StyledMargin>

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

            <StyledFormItem isVisible={claimStep === CLAIM_STEP.setAddress || claimStep === CLAIM_STEP.error || claimStep === CLAIM_STEP.success} normalPos>
              <Button
                style={{ width: '100%' }}
                type="submit"
                onClick={claimStep === CLAIM_STEP.success ? () => router.push(LINKS.gallery) : (e) => claimPoc(e)}
                disabled={(!isAddress(recipient) || (claimStep !== CLAIM_STEP.setAddress && claimStep !== CLAIM_STEP.error) || !pocData.name) && !claimStep === CLAIM_STEP.success}
              >
                {claimStep === CLAIM_STEP.success ? 'See my Gallery' : 'Claim'}
              </Button>
            </StyledFormItem>
          </StyledForm>
        </StyledFormContainer>
      </StyledContainer>
    </Page>
  );
};

const StyledMargin = styled.div`
  width: 90%;
  margin: 40px 0;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    margin: 0 auto;
  }
`;

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
