import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  @media(max-width: 400px){
    margin-top: 2.5em;
  };

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.lighterBackground};
    color: ${({ theme }) => theme.colors.gray[900]};
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;
    margin-top: 8px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;
