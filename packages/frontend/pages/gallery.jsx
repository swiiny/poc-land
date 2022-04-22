import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Page from '../components/utils/Page';
import useWallet from '../hooks/useWallet';
import { StyledHeadingOne, StyledHeadingThree, StyledText } from '../styles/GlobalComponents';

const DEV_DATA = [
  {
    name: 'POC 1',
    description: 'This is a description for POC 1',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 2',
    description: 'This is a description for POC *',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 3',
    description: 'This is a description for POC 3',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 4',
    description: 'This is a description for POC 4',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 5',
    description: 'This is a description for POC 5',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 6',
    description: 'This is a description for POC 6',
    src: 'https://picsum.photos/150/150',
  },
  {
    name: 'POC 7',
    description: 'This is a description for POC 7',
    src: 'https://picsum.photos/150/150',
  },
];

const Gallery = () => {
  const { account } = useWallet();

  const [userPocs, setUserPocs] = useState(DEV_DATA);

  const fetchPocForAccount = (a) => {
    try {
      // TODO : fetch user's POCs
    } catch (err) {
      console.error('Error fetching poc for account: ', err);
    }
  };

  useEffect(() => {
    if (account) {
      fetchPocForAccount(account);
    }
  }, [account]);

  useEffect(() => {

  }, []);

  return (
    <Page title="My Gallery">
      <StyledContainer>
        <StyledHeadingOne>
          My Gallery
        </StyledHeadingOne>

        <StyledPocList>
          {userPocs.map((p) => (
            <StyledPocItem>
              <div>
                <div className="img-container">
                  <img src={p.src} alt={p.name} />
                </div>

                <StyledHeadingThree className="name">{p.name}</StyledHeadingThree>
                <StyledText className="description">{p.description}</StyledText>
              </div>
            </StyledPocItem>
          ))}
        </StyledPocList>

      </StyledContainer>
    </Page>
  );
};

const StyledPocItem = styled.li`

    padding: 20px;

    width: 33%;

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
        width: 50%;
        padding: 1%;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        width: 50%;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
        padding: 20px 0px;
    }

    & > div {
        position: relative;
        
        padding: 20px;

        padding-left: 120px;

        border-radius: 12px;
        background-color: ${({ theme }) => `${theme.colors.typo}10`};
        backdrop-filter: blur(4px);

        .img-container {
            display: flex;
            justify-content: center;
            align-items: center;

            position: absolute;
            top: -10px;
            left: -10px;

            border-radius: 50%;
            overflow: hidden;

            width: 100px;
            height: 100px;

            box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.bg};

            img {
                width: 100%;
                height: auto;
            }
        }
     }
`;

const StyledPocList = styled.ul`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-wrap: wrap;

    list-style: none;

    width: 100%;

    padding: 0;
`;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  min-height: 100vh;
  padding-top: ${({ theme }) => theme.spacing['3xl']};
`;

export default Gallery;
