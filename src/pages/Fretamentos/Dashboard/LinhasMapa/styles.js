import styled from 'styled-components';

export const MapaContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  flex-direction: column;
  background: ${({ theme }) => theme.colors.lighterBackground};;
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  // padding: 16px;
  // border-radius: 4px;

// div {
//   h1 {
//     font-size: 18px;
//     text-align: center;
//   }
// }
//
// button {
//   margin-top: 16px
// }
`;
