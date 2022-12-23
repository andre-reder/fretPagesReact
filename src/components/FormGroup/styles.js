import styled from 'styled-components';

export const Container = styled.div`
  & + & {
    margin-top: 16px;
  }

  small {
    color: ${({ theme }) => theme.colors.danger.main};
    font-size: 12px;
    display: block;
    margin-top: 8px;
  }

  label {
    font-size: 12px;
    display: block;
    margin-bottom: 8px;
  }

  label.form-check-label {
    margin: 0;
  }

  span {
    font-size: 12px;
  }
`;
