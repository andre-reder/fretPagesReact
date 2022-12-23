import styled from 'styled-components';

export const FilterRadioButtonsContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-top: 4px;
  margin-bottom: 4px;

  @media(max-width: 500px) {
    display: flex;
  }
`;
