import styled, { css } from 'styled-components';

export const StyledFormItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;

    margin-bottom: ${({ theme }) => theme.spacing.m};
`;

export const StyledFileInput = styled.label`
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

export const StyledTextArea = styled.textarea`
    width: 100%;
    padding: 12px 8px;
    margin-top: 4px;

    max-width: 100%;

    border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};
    border-radius: 8px;

    background-color: transparent;
    color: ${({ theme }) => theme.colors.typo};
`;

export const StyledInput = styled.input`
    width: 100%;
    padding: 12px 8px;
    margin-top: 4px;

    border: 1px solid ${({ theme }) => `${theme.colors.typo}60`};
    border-radius: 8px;

    background-color: transparent;
    color: ${({ theme }) => theme.colors.typo};
`;

export const StyledLabel = styled.label`
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    letter-spacing: -0.02em;

    line-height: 1.5;

    color: ${({ theme }) => theme.colors.typo};
`;

export const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 400px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
        width: 100%;
    }
`;
