import styled from 'styled-components';

export const Container = styled.header`
  margin-bottom: 24px;
  @media(max-width: 400px){
    margin-top: 2.5em;
  };

  a {
    display: flex;
    align-items: center;
    text-decoration: none;
    width: 7%;
    background: ${({ theme }) => theme.colors.background};
    &:hover{
        opacity: 0.5;
        transition: ease-in 0.2s;
      }
      &:not(:hover) {
        opacity: 1;
        transition: ease-in 0.2s;
      }

    span {
      color: ${({ theme }) => theme.colors.primary.main};
      font-weight: bold;
    }

    img {
      margin-right: 8px;
      transform: rotate(-90deg);
    }
  }

  h1 {
    font-size: 24px;
  }
`;
