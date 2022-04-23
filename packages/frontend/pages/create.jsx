import { ethers } from 'ethers';
import { Upload } from 'heroicons-react';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { Button, StyledHeadingOne } from '../styles/GlobalComponents';
import { uploadPocDataToIPFS } from '../utils/ipfs';
import pocFactoryAbi from '../utils/pocFactoryAbi';

const Create = () => {
  const [pocName, setPocName] = useState('');
  const [pocImage, setPocImage] = useState('');
  const [pocFile, setPocFile] = useState({});
  const [pocDescription, setPocDescription] = useState('');
  const [pocAddress, setPocAddress] = useState('');

  const { account, isWrongNetwork } = useWallet();

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
    const pocFactoryAddress = '0x9702224c5f09f9814cf75e04f7c1b6d103f356ae';
    const provider = new ethers.providers.Web3Provider(ethereumProvider);
    const dnpContract = new ethers.Contract(pocFactoryAddress, pocFactoryAbi, provider);
    return dnpContract;
  }

  // DNP SELF BOUNTIES STATE CHANGE CALLS
  async function createPocContract(ethereumProvider, metadataURI) {
    console.log('Creating POC contract...', account);
    const pf = await getPocFactoryContract(ethereumProvider);
    const res = await pf.populateTransaction.createPoc(account, 'POC', 'POC', 100, metadataURI);
    res.from = account;
    // Rinkeby : make this cleaner
    // res.chainId = parseInt(4, 4)
    const txHash = await ethereumProvider.request({
      method: 'eth_sendTransaction',
      params: [res],
    });
    console.log(txHash);
  }

  const createPoc = async (e) => {
    e.preventDefault();

    if (isWrongNetwork) {

    } else {
      console.warn('submit poc with data');
      console.log('name: ', pocName);
      console.log('description: ', pocDescription);
      console.log('image: ', pocImage);
      // TODO : submit to ipfs here
      console.log('file: ', pocFile);
      const murl = await uploadPocDataToIPFS([pocFile]);
      console.log('metadata url', murl);

      const res = await createPocContract(window.ethereum, account, murl);

      console.log('res', res);
    }
  };

  return (
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

          <Button
            style={{ width: '100%' }}
            type="submit"
            onClick={(e) => createPoc(e)}
            disabled={!isDataValid}
          >
            {isWrongNetwork ? 'Switch Network' : 'Save and Continue'}
          </Button>
        </StyledForm>
      </StyledContainer>
    </Page>
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

const StyledFormItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    margin-bottom: ${({ theme }) => theme.spacing.m};
`;

const StyledFileInput = styled.label`
    display: flex;
    justify-content: center;
    align-items: center;
    
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gradient};

    margin-top: 4px;

    svg {
        margin-left: 8px;
    }

    input {
        display: none;
    }

    padding: 8px 16px;
    font-size: 16px;

    color: ${({ theme }) => theme.colors.typo};

    cursor: pointer;

    ${(props) => (props.secondary ? css`
        background: none;
        border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};
    ` : '')}

`;

const StyledTextArea = styled.textarea`
    width: 100%;
    padding: 12px 8px;
    margin-top: 4px;

    max-width: 100%;

    border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};
    border-radius: 8px;

    background-color: transparent;
    color: ${({ theme }) => theme.colors.typo};
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 12px 8px;
    margin-top: 4px;

    border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};
    border-radius: 8px;

    background-color: transparent;
    color: ${({ theme }) => theme.colors.typo};
`;

const StyledLabel = styled.label`
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.02em;

    line-height: 1.5;

    color: ${({ theme }) => theme.colors.typo};
`;

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 400px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
    }
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-height: 100vh;

  padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Create;
