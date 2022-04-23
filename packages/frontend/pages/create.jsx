import { ethers } from 'ethers';
import { Upload } from 'heroicons-react';
import React, { useEffect, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import {
  StyledFileInput, StyledForm, StyledFormItem, StyledInput, StyledLabel, StyledTextArea,
} from '../components/form/Form';
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
    const pocFactoryAddress = '0x473837550ceDf7f16805C15C21487d3A44f26cE5';
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

    return txHash;
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
      const res = await createPocContract(window.ethereum, murl);
      console.log('res', res);
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
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-height: 100vh;

  padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Create;
