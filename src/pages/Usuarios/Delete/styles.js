import styled from 'styled-components';

export const InputSearchContainer = styled.div`
  width: 100%;

  input {
    width: 100%;
    background: ${({ theme }) => theme.colors.lighterBackground};;
    border: none;
    border-radius: 25px;
    height: 50px;
    box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
    outline: 0;
    padding: 0 16px;

    &::placeholder {
      color: #BCBCBC;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2em;
  margin-bottom: 0.5em;
  width: 100%;

  strong {
    font-size: 24px;
  }

  a {
    color: ${({ theme }) => theme.colors.primary.main};
    text-decoration: none;
    font-weight: bold;
    border: 2px solid ${({ theme }) => theme.colors.primary.main};
    padding: 8px 16px;
    border-radius: 4px;
    transition: all 0.2s ease-in;

    &:hover {
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.lighterBackground};
    }
  }
`;

export const ListHeader = styled.header`
  margin-top: 24px;
  margin-bottom: 8px;
    button {
      background: transparent;
      border: none;
      display: flex;
      align-items: center;

      span {
        margin-right: 8px;
        font-weight: bold;
        color: ${({ theme }) => theme.colors.primary.main};
      }

      img {
        transform: ${({ orderBy }) => (orderBy === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)')};
        transition: transform 0.2s ease-in
      }
    }
`;

export const Card = styled.div`
  background: ${({ theme }) => theme.colors.lighterBackground};;
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 16px;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 75%;
  margin-left: 12.5%;
  margin-top: 2.5%;

  @media(max-width: 400px){
    margin-left: 0em;
    width: 100%;
  };

  & + & {
    margin-top: 16px;
  }

  .info {
    .usuario-name {
      display: flex;
      align-items: center;

      small {
        background: ${({ theme }) => theme.colors.primary.lighter};
        color: ${({ theme }) => theme.colors.primary.main};
        font-weight: bold;
        text-transform: uppercase;
        padding: 4px;
        border-radius: 4px;
        margin-left: 8px;
      }

      small.green {
          background: ${({ theme }) => theme.colors.green[100]};
          color: ${({ theme }) => theme.colors.green[500]};
      }

      small.orange {
          background: ${({ theme }) => theme.colors.orange[100]};
          color: ${({ theme }) => theme.colors.orange[500]};
        }
    }

    span {
      display: block;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[200]};
    }
  }

  .actions {
    display: flex;
    align-items: center;

    a {
      background: transparent;
      border: none;
      width: 23px;
      height: 23px;
    }

    button {
      background: ${({ theme }) => theme.colors.danger.main};
      border: none;
      transition: ease-in 0.2s;
      padding: 8px;
      border-radius: 0.375em;
      color: ${({ theme }) => theme.colors.lighterBackground};

      @media(max-width: 400px){
        font-size: 0.85em;
        padding: 4px;
      };

      &:hover {
        background: ${({ theme }) => theme.colors.danger.dark};
        transition: ease-in 0.2s;
      }
    }
  }
`;
