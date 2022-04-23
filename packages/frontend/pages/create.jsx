import axios from 'axios';
import { ethers } from 'ethers';
import { ArrowLeft, ArrowRight, Upload } from 'heroicons-react';
import Link from 'next/link';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  StyledFileInput, StyledForm, StyledFormItem, StyledInput, StyledLabel, StyledTextArea,
} from '../components/form/Form';
import { LINKS } from '../components/utils/Navbar';
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
  txError: 'txError',
  txWaiting: 'txWaiting',
};

const CREATION_STATE = {
  unset: 'unset',
  setImage: 'setImage',
  setDescription: 'setDescription',
  setName: 'setName',
  setCount: 'setCount',
  validation: 'validating',
  deploying: 'deploying',
  success: 'success',
  error: 'error',
  deployingError: 'deployingError',
};

const Create = () => {
  const [pocName, setPocName] = useState('');
  const [pocImage, setPocImage] = useState('');
  const [pocFile, setPocFile] = useState({});
  const [pocDescription, setPocDescription] = useState('');
  const [pocCount, setPocCount] = useState(100);

  const [creationState, setCreationState] = useState(CREATION_STATE.setImage);

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

  async function getPocWithEventAndCreator(ethereumProvider) {
    const pocFactoryContract = await getPocFactoryContract(ethereumProvider);
    const index = await pocFactoryContract.getLastPocCreatorIndex(account);
    console.log('index', parseInt(index._hex, 16));
    const pocAddress = await pocFactoryContract.getPocWithCreatorIndex(account, index.sub(1));
    console.log('poc address?', pocAddress);
    return pocAddress;
  }

  async function createPocContract(ethereumProvider, metadataURI, name, count) {
    console.log('Creating PoC contract...', account);

    const pf = await getPocFactoryContract(ethereumProvider);
    const res = await pf.populateTransaction.createPoc(account, name, 'PoC', count, metadataURI);

    res.from = account;

    const txHash = await ethereumProvider.request({
      method: 'eth_sendTransaction',
      params: [res],
    });

    return txHash;
  }

  const createPoc = async (e) => {
    e.preventDefault();

    if (!isWrongNetwork) {
      setCreationState(CREATION_STATE.deploying);
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
        const txHash = res;
        const pocAddress = await getPocWithEventAndCreator(window.ethereum, pocName);
        console.log('poc address?', pocAddress);

        const payload = {
          chainId: currentChainId,
          userAddress: account,
          pocAddress,
        };
        await axios.post(`${process.env.SERVER_URL}/v1/server/savePoc`, payload).catch((err) => {
          throw new Error('Failed to save poc in DB :', err);
        });

        // TODO
        // backend : save pocAddress, accountAddress (creator address) and chainID!
        // frontend : display as a QR code
        // 0x326162D47d7274f6602e08D5860A5634B8eA4182
        // const tx = ethers.getTr

        const provider = new ethers.providers.Web3Provider(window.ethereum);

        setUploadState(UPLOAD_STATE.txWaiting);

        const tx = await (await provider.getTransaction(txHash)).wait();

        if (tx.status === 1) {
          setUploadState(UPLOAD_STATE.success);
        } else {
          setUploadState(UPLOAD_STATE.txError);
          setCreationState(CREATION_STATE.deployingError);
        }

        setUploadState(UPLOAD_STATE.success);
      } catch (err) {
        console.error('Error creating PoC: ', err);
        setUploadState(UPLOAD_STATE.denied);
        setCreationState(CREATION_STATE.deployingError);
      }
    }
  };

  const previousCreationState = () => {
    switch (creationState) {
      case CREATION_STATE.setDescription:
        setCreationState(CREATION_STATE.setName);
        break;
      case CREATION_STATE.setName:
        setCreationState(CREATION_STATE.setImage);
        break;
      case CREATION_STATE.setCount:
        setCreationState(CREATION_STATE.setDescription);
        break;
      case CREATION_STATE.validation:
        setCreationState(CREATION_STATE.setCount);
        break;
      case CREATION_STATE.deployingError:
        setCreationState(CREATION_STATE.setCount);
        break;
      default:
        break;
    }
  };

  const nextCreationState = () => {
    switch (creationState) {
      case CREATION_STATE.setImage:
        setCreationState(CREATION_STATE.setName);
        break;
      case CREATION_STATE.setName:
        setCreationState(CREATION_STATE.setDescription);
        break;
      case CREATION_STATE.setDescription:
        setCreationState(CREATION_STATE.setCount);
        break;
      case CREATION_STATE.setCount:
        setCreationState(CREATION_STATE.validation);
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Page title="Create">
        <StyledContainer>
          <StyledHeadingOne>
            Create PoC
          </StyledHeadingOne>

          <StyledFormContainer>
            <StyledForm>
              <StyledFormItem
                isVisible={creationState === CREATION_STATE.setImage}
              >
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

                {creationState === CREATION_STATE.setImage && (
                <StyledFileInput
                  for="input-file"
                  secondary
                >
                  {pocImage.length === 0 ? 'Upload Image' : 'Update Image'}

                  <Upload size={20} />

                  <input id="input-file" type="file" accept="image/*" onChange={importImage} />
                </StyledFileInput>
                )}
              </StyledFormItem>

              <StyledFormItem isVisible={creationState === CREATION_STATE.setCount}>
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

              <StyledFormItem isVisible={creationState === CREATION_STATE.setName}>
                <StyledLabel>
                  Name your PoC
                </StyledLabel>
                <StyledInput
                  type="text"
                  placeholder="Name"
                  value={pocName}
                  onChange={(e) => setPocName(e.target.value)}
                />
              </StyledFormItem>

              <StyledFormItem isVisible={creationState === CREATION_STATE.setDescription}>
                <StyledLabel>
                  Add a short description
                </StyledLabel>
                <StyledTextArea
                  placeholder="My PoC is..."
                  value={pocDescription}
                  onChange={(e) => setPocDescription(e.target.value)}
                />
              </StyledFormItem>

              <StyledText
                isVisible={creationState === CREATION_STATE.deploying || creationState === CREATION_STATE.deployingError || creationState === CREATION_STATE.success}
                negative={uploadState === UPLOAD_STATE.denied || uploadState === UPLOAD_STATE.txError}
                positive={uploadState === UPLOAD_STATE.success}
              >
                {uploadState === UPLOAD_STATE.uploadToIPFS && 'Uploading to IPFS...'}
                {uploadState === UPLOAD_STATE.waitingForMMAction && 'Waiting for User Wallet Action...'}
                {uploadState === UPLOAD_STATE.success && 'PoC Successfully Created'}
                {uploadState === UPLOAD_STATE.denied && 'Wallet Action Denied'}
                {uploadState === UPLOAD_STATE.txError && 'Transaction Error'}
                {uploadState === UPLOAD_STATE.txWaiting && 'Waiting for Transaction to be mined, please do not refresh the page or close the browser'}
              </StyledText>

              <StyledFormItem isVisible={creationState === CREATION_STATE.validation}>
                <StyledLabel>
                  Are you ready to create your PoC ?
                </StyledLabel>
                <Button
                  style={{ width: '100%' }}
                  type="submit"
                  onClick={(e) => createPoc(e)}
                  disabled={!isDataValid || creationState !== CREATION_STATE.validation}
                  id="submit-poc"
                >
                  {isWrongNetwork ? 'Wrong Network' : 'Save and Continue'}
                </Button>
              </StyledFormItem>
            </StyledForm>

            {uploadState === UPLOAD_STATE.success ? (
              <Link href={LINKS.collections}>
                <Button>
                  See My Collection
                </Button>
              </Link>
            ) : creationState === CREATION_STATE.deployingError ? (
              <ArrowContainer>
                <StyledButton
                  onClick={() => previousCreationState()}
                  style={{ marginRight: '32px' }}
                  disabled={creationState === CREATION_STATE.deploying || creationState === CREATION_STATE.setImage}
                >
                  <ArrowLeft size={28} />
                </StyledButton>
                <Button
                  onClick={(e) => createPoc(e)}
                >
                  Try again
                </Button>
              </ArrowContainer>
            ) : (
              <ArrowContainer>
                <StyledButton
                  onClick={() => previousCreationState()}
                  style={{ marginRight: '32px' }}
                  disabled={creationState === CREATION_STATE.deploying || creationState === CREATION_STATE.setImage}
                >
                  <ArrowLeft size={28} />
                </StyledButton>
                <StyledButton onClick={() => nextCreationState()} disabled={creationState === CREATION_STATE.deploying || creationState === CREATION_STATE.validation || creationState === CREATION_STATE.deployingError}>
                  <ArrowRight size={28} />
                </StyledButton>
              </ArrowContainer>
            )}

          </StyledFormContainer>
        </StyledContainer>
      </Page>
    </>
  );
};

const StyledButton = styled.button`
  border: none;
  background: none;
  color: ${({ theme }) => theme.colors.typo};

  width: 50px;
  height: 50px;

  border-radius: 50%;

  border: 1px solid ${({ theme }) => theme.colors.typo};

  display: flex;
  justify-content: center;
  align-items: center;

  transition: all 0.4s ease-in-out;

  ${(props) => (props.disabled ? css`
    opacity: 0.4;
    cursor: default;
  ` : css`
    opacity: 1.0;
    cursor: pointer;
  `)}
`;

const StyledFormContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  flex-direction: column;
`;

const ArrowContainer = styled.div`
  margin-top: 64px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

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
