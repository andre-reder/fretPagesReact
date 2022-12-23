import styled from 'styled-components';

export const QrCodeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 75%;
  margin-left: 12.5%;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.lighterBackground};;
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;

  div {
    h1 {
      font-size: 18px;
      text-align: center;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }

  button {
    margin-top: 16px
  }
`;
