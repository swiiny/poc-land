import styled, { css } from 'styled-components';

export const Size = {
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
};

export const Button = styled.button`
    position: relative;
    border: none;
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.gradient};

    font-size: 18px;
    font-weight: bold;
    padding: 12px 24px;

    color: ${({ theme }) => theme.colors.typo};

    ${(props) => (props.secondary ? css`
        background: none;
        border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};
    ` : '')}

    ${(props) => (props.size === Size.xs ? css`
        padding: 8px 16px;
        font-size: 14px;
    ` : props.size === Size.s ? css`
        padding: 10px 20px;
        font-size: 14px;
    ` : props.size === Size.m ? css`
        padding: 12px 24px;
        font-size: 18px;
    ` : props.size === Size.l ? css`
        padding: 16px 32px;
        font-size: 24px;
    ` : '')}

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      ${(props) => (props.size === Size.xs ? css`
        padding: 8px 16px;
        font-size: 14px;
        ` : props.size === Size.s ? css`
            padding: 10px 20px;
            font-size: 14px;
        ` : props.size === Size.m ? css`
            padding: 12px 24px;
            font-size: 16px;
        ` : props.size === Size.l ? css`
            padding: 16px 32px;
            font-size: 20px;
        ` : '')}
    }

    ${(props) => (props.disabled ? css`
        background: none;
        color: ${({ theme }) => `${theme.colors.typo}60`};
        background-color: ${({ theme }) => `${theme.colors.typo}50`};
    ` : 'cursor: pointer;')}

    transition: all 0.4s ease-in-out;

    ${(props) => (props.tertiary ? css`
        background: none;
        border: none;

        ${props.disabled ? 'opacity: 0' : 'opacity: 1'}

    ` : '')}

    ${(props) => (props.hidden ? css`
        opacity: 0.0;
    ` : css`
        opacity: 1.0;
    `)}

    &:hover {
        transform: translateX(2px) translateY(-2px);
    }
`;

export const StyledTextButton = styled.button`
    background: none;
    border: none;

    font-size: 16px;

    color: ${({ theme }) => theme.colors.typo};

    &:hover {
        opacity: 0.9;
    }

    cursor: pointer;
`;

export const StyledHeadingOne = styled.h1`
    font-size: 48px;
    font-weight: semi-bold;
    font-weight: normal;

    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.colors.typo};

    line-height: 1.5;

    margin: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 36px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 24px;
    }
`;

export const StyledHeadingTwo = styled.h2`
    font-size: 28px;
    font-weight: bold;
    font-weight: normal;

    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.colors.typo};

    line-height: 1.5;

    margin: 0;

    ${(props) => (props.accent ? css`
        color: ${({ theme }) => theme.colors.accent};
    ` : '')}

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        font-size: 32px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 28px;
    }
`;

export const StyledHeadingThree = styled.h3`
    font-size: 36px;
    font-weight: bold;
    font-weight: normal;

    letter-spacing: -0.02em;

    color: ${({ theme }) => theme.colors.typo};

    line-height: 1.5;

    margin: 0;

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        font-size: 28px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      font-size: 22px;
    }
`;

export const StyledText = styled.p`
    font-size: 16px;
    font-weight: normal;
    letter-spacing: -0.02em;

    line-height: 1.5;

    transition: all 0.4s ease-in-out;

    ${(props) => (props.isVisible ? css`
        opacity: 1.0;
        max-height: fit-content;
    ` : css`
        opacity: 0.0;
        max-height: 0;
    `)}

    ${(props) => (props.negative ? css`
        color: ${({ theme }) => theme.colors.negative};
    ` : props.positive ? css`
        color: ${({ theme }) => theme.colors.accent};
    ` : css`
        color: ${({ theme }) => theme.colors.typo};
    `)}

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
        font-size: 16px;
    }
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        font-size: 14px;
    }

    ${(props) => (props.size === Size.s ? css`
        font-size: 14px;

        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
            font-size: 12px;
        }
        
        @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            font-size: 12px;
        }
    ` : '')}

    ${(props) => (props.size === Size.l ? css`
        font-size: 32px;

        @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
            font-size: 24px;
        }
        
        @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
            font-size: 16px;
        }
    ` : '')}
`;

export const StyledTag = styled.p`
    border-radius: 8px;
    background: ${({ theme }) => theme.colors.typo};

    font-size: 16px;
    padding: 10px 20px;

    color: ${({ theme }) => theme.colors.bg};
`;
