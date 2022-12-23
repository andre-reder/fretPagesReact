import styled from 'styled-components';

export const Form = styled.form`
  width: 100%;
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
`;

export const ButtonContainer = styled.div`
  margin-top: 24px;

  button {
    width: 100%;
  }
`;
