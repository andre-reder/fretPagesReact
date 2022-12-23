/* eslint-disable no-nested-ternary */
import styled from 'styled-components';

export const Container = styled.header`
  display: flex;
  align-items: center;
  justify-content: ${({ doesListExists, apiFetched }) => (
    doesListExists && apiFetched
      ? 'space-between'
      : (
        apiFetched
          ? 'center'
          : 'flex-end')
  )};
  margin-top: 2em;
  margin-bottom: 0.5em;
  width: 100%;
  border-bottom: 2px solid ${({ theme }) => theme.colors.gray[75]};
  padding-bottom: 16px;

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
      background: ${({ theme }) => theme.colors.background};

      &:hover {
        background: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.lighterBackground};
      }
    }

    button {
      color: ${({ theme }) => theme.colors.primary.main};
      background: ${({ theme }) => theme.colors.background};
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

  .actionButtons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
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

    button {
      color: ${({ theme }) => theme.colors.primary.main};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 8px 16px;
      border-radius: 4px;
      transition: all 0.2s ease-in;
      margin-right: 8px;

      &:hover {
        background: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.lighterBackground};
      }
    }
  }
`;
