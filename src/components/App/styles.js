import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  margin: 0 auto;
`;

export const PageContainer = styled.div`
  display: flex;
  flex: 1 1 auto;
  align-items: stretch;
  padding: 0;
  width: 100%;

  @media(min-width: 1200px){
    padding-left: 16.25rem;
  }
`;

export const RouteContainer = styled.div`
  margin: 2.5em 3em 3em 3em;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;

  @media(max-width: 400px){
    margin: 1em;
  }
`;

export const ThemeRadioButtonsContainer = styled.div`
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
