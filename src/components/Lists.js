/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

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
  justify-content: ${({ justifyContent }) => (justifyContent === 'flex-start' ? 'flex-start' : 'space-between')};
  width: 100%;

  & + & {
    margin-top: 16px;
  }

  .editStatus {
    position: relative;
    left: 25%;
    transform: translateX(-50%);

    @media(max-width: 1340px) {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    input {
      color: ${({ theme, selected }) => (selected ? theme.colors.lighterBackground : theme.colors.primary.main)};
      background: ${({ theme, selected }) => (selected ? theme.colors.primary.main : theme.colors.background)};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease-in;
      font-size: 14px;
      height: 36px;
      margin: 12px;

      @media(max-width: 500px) {
        font-size: 12px;
        height: 40px;
        padding: 2px 4px;
  }

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.gray[900]};
   }
  }

    @media(max-width: 700px){
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    button {
      margin: 12px;
    }

  }


  }

  .info {
    .card-title {
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
        font-size: 10px;
      }

      small.green {
          background: ${({ theme }) => theme.colors.green[100]};
          color: ${({ theme }) => theme.colors.green[500]};
      }

      small.orange {
          background: ${({ theme }) => theme.colors.orange[100]};
          color: ${({ theme }) => theme.colors.orange[500]};
        }

      small.gray {
        background: ${({ theme }) => theme.colors.gray[100]};
        color: ${({ theme }) => theme.colors.gray[900]};
      }
    }

    span {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: flex-start;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[201]};

      strong {
        margin-right: 5px;
      }

      img {
        margin-left: 5px;
        width: 15px;
      }

      div {
        margin-top: 4px;
      }
    }
  }

  .actions {
    display: flex;
    align-items: center;

    img {
      &:hover{
        // padding: 2px 0;
        opacity: 0.5;
        transition: ease-in 0.2s;
      }
      &:not(:hover) {
        opacity: 1;
        transition: ease-in 0.2s;
      }
    }

    a {
      background: transparent;
      border: none;
      width: 23px;
      height: 23px;
      margin-right: 8px;
      }

    a.qrCodeLink {
      padding: 0;
      width: 24px;
      margin-top: 1px;

      img {
        width: 100% !important;
      }
    }

    button {
      border: none;
      background: transparent;
      margin-right: 8px;


      img {
        padding: 0;
        width: 24px;
        margin-top: 2px
      }
    }
  }
`;

export const CardDelete = styled.div`
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
    .card-title {
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
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 14px;
      color: ${({ theme }) => theme.colors.gray[201]};

      img {
        width: 14px;
        margin-left: 5px;
      }
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
