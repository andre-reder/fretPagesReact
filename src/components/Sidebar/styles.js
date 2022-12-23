import styled from 'styled-components';

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  width: 16.25rem;
  min-height: 1px;
  flex: 1 0 auto;
  background: ${({ theme }) => theme.colors.lighterBackground};
  color: ${({ theme }) => theme.colors.gray[900]};
  box-shadow: 0 0.125rem 0.375rem 0 rgb(161 172 184 / 12%);

  @media(min-width: 1200px) {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    margin-right: 0 !important;
    margin-left: 0 !important;
  }

  @media(max-width: 1199px) {
    display: none !important;
  }
`;

export const OffcanvasStyle = styled.div`
  background: ${({ theme }) => theme.colors.lighterBackground};
`;

export const LogoContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  width: 100%;

  img {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 75%;
    margin-left: 1em;
  }
`;
