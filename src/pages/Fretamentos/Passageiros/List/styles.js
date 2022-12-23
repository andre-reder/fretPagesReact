import styled from 'styled-components';

export const LtSelectButtonsContainer = styled.div`
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

export const SecondaryButton = styled.button`
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
      margin: 6px;

      @media(max-width: 500px) {
        font-size: 12px;
        height: 40px;
        padding: 2px 4px;
  }

      & + & {
        margin-left: 12px;
      }

      &:hover {
        background: ${({ theme, selected }) => (selected ? theme.colors.primary.background : theme.colors.primary.main)};
        color: ${({ theme }) => (theme.colors.lighterBackground)};
      }
`;
