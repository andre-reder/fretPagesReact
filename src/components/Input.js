import styled, { css } from 'styled-components';

export default styled.input`
  width: 100%;
  background: none;
  color: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid hsl(0deg 0% 80%);
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  height: 39px;
  border-radius: 4px;
  outline: none;
  padding: 0 12px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
  border-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.gray[900]};
  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `};
  }

  &[disabled] {
    // background: ${({ theme }) => theme.colors.background};
    cursor: not-allowed;
    color: ${({ theme }) => theme.colors.gray[900]};
    opacity: 0.5;
  }

  ${({ theme, error }) => error && css`
    color: ${theme.colors.danger.main};
    border-color: ${theme.colors.danger.main} !important;
  `};
`;
