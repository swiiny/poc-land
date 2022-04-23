import { ethers } from 'ethers';
import { Upload } from 'heroicons-react';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  StyledFileInput, StyledForm, StyledFormItem, StyledInput, StyledLabel, StyledTextArea,
} from '../components/form/Form';
import Page from '../components/utils/Page';
import useWallet, { availableNetworks } from '../hooks/useWallet';
import { Button, StyledHeadingOne, StyledText } from '../styles/GlobalComponents';
import { uploadPocDataToIPFS } from '../utils/ipfs';
import pocFactoryAbi from '../utils/pocFactoryAbi';

// const { create } = pkg;

const UPLOAD_STATE = {
  unset: 'unset',
  uploadToIPFS: 'uploadToIPFS',
  waitingForMMAction: 'waitingForMMAction',
  success: 'success',
  denied: 'denied',
};

const Create = () => {
  const [pocName, setPocName] = useState('');
  const [pocImage, setPocImage] = useState('');
  const [pocFile, setPocFile] = useState({});
  const [pocDescription, setPocDescription] = useState('');
  const [pocCount, setPocCount] = useState(100);

  const [uploadState, setUploadState] = useState(UPLOAD_STATE.unset);

  const { account, isWrongNetwork, currentChainId } = useWallet();

  const isDataValid = useMemo(() => pocName?.length && pocImage?.length && pocDescription?.length,
    [pocName, pocImage, pocDescription]);

  useEffect(() => {

  }, []);

  const importImage = (e) => {
    try {
      const img = URL.createObjectURL(e.target.files[0]);

      setPocFile(e.target.files[0]);

      setPocImage(img);
    } catch (err) {
      console.error('Error importing image: ', err);
    }
  };

  async function getPocFactoryContract(ethereumProvider) {
    const contractAddress = availableNetworks.find((net) => net.chainId === currentChainId)?.contractAddress;
    const pocFactoryAddress = contractAddress;
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const dnpContract = new ethers.Contract(pocFactoryAddress, pocFactoryAbi, provider);
    return dnpContract;
  }

  async function getPocWithEventAndCreator(ethereumProvider, name) {
    const pocFactoryContract = await getPocFactoryContract(ethereumProvider);
    const pocAddress = await pocFactoryContract.getLastPocCreatedByCreator(account);
    console.log('poc address?', pocAddress);
    return pocAddress;
  }

  async function createPocContract(ethereumProvider, metadataURI, name, count) {
    console.log('Creating POC contract...', account);
    const pf = await getPocFactoryContract(ethereumProvider);
    const res = await pf.populateTransaction.createPoc(account, name, 'PoC', count, metadataURI);
    res.from = account;
    // Rinkeby : make this cleaner
    // res.chainId = parseInt(4, 4)
    const txHash = await ethereumProvider.request({
      method: 'eth_sendTransaction',
      params: [res],
    });

    return txHash;
  }

  const createPoc = async (e) => {
    e.preventDefault();

    if (!isWrongNetwork) {
      console.warn('submit poc with data');
      console.log('name: ', pocName);
      console.log('description: ', pocDescription);
      console.log('image: ', pocImage);
      console.log('count ', pocCount);

      // TODO : submit to ipfs here
      console.log('file: ', pocFile);

      setUploadState(UPLOAD_STATE.uploadToIPFS);

      const murl = await uploadPocDataToIPFS([pocFile], pocName, pocDescription);
      console.log('metadata url', murl);
      setUploadState(UPLOAD_STATE.waitingForMMAction);

      try {
        const res = await createPocContract(window.ethereum, murl, pocName, pocCount);
        const txHash = res.hash;
        const pocAddress = await getPocWithEventAndCreator(window.ethereum, pocName);
        console.log('poc address?', pocAddress);
        // TODO
        // backend : save pocAddress, accountAddress (creator address) and chainID!
        // frontend : display as a QR code
        // 0x326162D47d7274f6602e08D5860A5634B8eA4182
        // const tx = ethers.getTr

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        const tx = await provider.getTransactionReceipt(txHash);

        console.log('tx', tx);

        setUploadState(UPLOAD_STATE.success);
      } catch (err) {
        console.error('Error creating POC: ', err);
        setUploadState(UPLOAD_STATE.denied);
      }
    }
  };

  return (
    <>
      <Page title="Create">
        <StyledContainer>
          <StyledHeadingOne>
            Create POC
          </StyledHeadingOne>

          <StyledForm>
            <StyledFormItem>
              <StyledLabel>
                Select an Image
              </StyledLabel>

              <StyledImgContainer
                isVisible={pocImage?.length}
              >
                <StyledPocImage
                  src={pocImage}
                />
              </StyledImgContainer>

              <StyledFileInput
                for="input-file"
                secondary
              >
                {pocImage.length === 0 ? 'Upload Image' : 'Update Image'}

                <Upload size={20} />

                <input id="input-file" type="file" accept="image/*" onChange={importImage} />
              </StyledFileInput>
            </StyledFormItem>

            <StyledFormItem>
              <StyledLabel>
                How many PoC do you want to create?
              </StyledLabel>
              <StyledInput
                type="number"
                step="20"
                min="1"
                max="10000"
                placeholder="100"
                value={pocCount}
                onChange={(e) => setPocCount(e.target.value)}
              />
            </StyledFormItem>

            <StyledFormItem>
              <StyledLabel>
                Name your POC
              </StyledLabel>
              <StyledInput
                type="text"
                placeholder="Name"
                value={pocName}
                onChange={(e) => setPocName(e.target.value)}
              />
            </StyledFormItem>

            <StyledFormItem>
              <StyledLabel>
                Add a short description
              </StyledLabel>
              <StyledTextArea
                placeholder="My POC is..."
                value={pocDescription}
                onChange={(e) => setPocDescription(e.target.value)}
              />
            </StyledFormItem>

            <StyledText
              isVisible={uploadState !== UPLOAD_STATE.unset}
              negative={uploadState === UPLOAD_STATE.denied}
              positive={uploadState === UPLOAD_STATE.success}
            >
              {uploadState === UPLOAD_STATE.uploadToIPFS && 'Uploading to IPFS...'}
              {uploadState === UPLOAD_STATE.waitingForMMAction && 'Waiting for User Wallet Action...'}
              {uploadState === UPLOAD_STATE.success && 'PoC Successfully Created'}
              {uploadState === UPLOAD_STATE.denied && 'Wallet Action Denied'}
            </StyledText>

            <Button
              isVisible={uploadState === UPLOAD_STATE.unset || uploadState === UPLOAD_STATE.success || uploadState === UPLOAD_STATE.denied}
              style={{ width: '100%' }}
              type="submit"
              onClick={(e) => createPoc(e)}
              disabled={!isDataValid}
              id="submit-poc"
            >
              {isWrongNetwork ? 'Wrong Network' : 'Save and Continue'}
            </Button>
          </StyledForm>
        </StyledContainer>
      </Page>
    </>
  );
};

const StyledImgContainer = styled.div`
    transition: all 0.4s ease-in-out;

    overflow: hidden;

    ${(props) => (props.isVisible ? css`
        max-height: 150px;
        opacity: 1.0;
    ` : css`
        max-height: 0px;
        opacity: 0;
    `)}
`;

const StyledPocImage = styled.img`
    width: 150px;
    height: 150px;
`;

const StyledContainer = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    min-height: 100vh;

    z-index: 2;

    padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Create;
