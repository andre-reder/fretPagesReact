import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  // max-width: 500px;
  background: ${({ theme }) => theme.colors.lighterBackground};
  border-radius: 0.375em;
  padding: 16px 24px 24px 24px;
  margin-top: 24px;

  header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 16px;
  }

  img {
    width: 24px;
    margin-right: 8px;
  }
`;

export const InputsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  @media(max-width: 700px){
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    // width: 200px;
  };
`;

export const InputGroup = styled.div`
 @media(min-width: 701px){
  & + & {
    margin-left: 12px;
  }
 }

 @media(max-width: 700px) {
  width: 100%;
 }

  input {
  border: 1px solid hsl(0deg 0% 80%);
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  border-radius: 4px;
  outline: none;
  padding: 0 12px;
  transition: border-color 0.2s ease-in;
  appearance: none;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.gray[900]};
      }
  }

  span {
    margin-top: 1px;
    font-size: 12px;
  }
`;
