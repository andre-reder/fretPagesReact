import styled from 'styled-components';

export const FileInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const StepsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;

export const ChosenFileContainer = styled.div`
  width: 100%;
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  margin-top: 8px;
`;
