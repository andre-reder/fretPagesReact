import styled from 'styled-components';

export const Container = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const MenuItem = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin-left: 8px;
  margin-right: 8px;
  margin-top: 2px;
  border-radius: 8px;
  &:hover {
      cursor: pointer;
  }

  label {
    font-size: 0.8rem;
    &:hover {
      cursor: pointer;
    }
  }

  img {
    margin: 8px;
    width: 7.3%;
    padding: 0;
  }

  & + & {
    margin-top: 8px !important;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.background};
    transition: ease-in-out 0.4s;
    }
  &:not(:hover) {
    transition: ease-in-out 0.3s;
    background: ${({ theme }) => theme.colors.lighterBackground};
  }
`;

export const ActiveItem = styled.div`
  background: ${({ theme }) => theme.colors.background};
  display: flex;
  align-items: center;
  margin: 0rem 0rem;
  cursor: pointer;
  border-radius: 0.375em;
  width: 100%;

    a {
      color: ${({ theme }) => theme.colors.primary.main} !important;
      width: 100%;
      div {
        background: ${({ theme }) => theme.colors.background} !important;
      }
      img {
        filter: invert(25%) sepia(98%) saturate(1729%) hue-rotate(197deg) brightness(102%) contrast(103%);
      }
    }
`;
