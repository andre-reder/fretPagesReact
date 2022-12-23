import styled from 'styled-components';

export const QrCodesGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  height: auto;
  margin: 0 auto;
  max-width: 32;
  width: 100%;
  flex-wrap: wrap;
  div {
    margin: 10px;
    h1 {
      font-size: 10px;
      text-align: center;
      margin: 0;
      color: ${({ theme }) => theme.colors.primary.main};
    }
  }
`;
