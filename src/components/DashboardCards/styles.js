import styled from 'styled-components';

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  margin: 0px;
  background: ${({ theme }) => theme.colors.lighterBackground};
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  padding: 4px;
  border-radius: 4px;
  /* max-height: 500px;
  overflow: auto;
  overflow-x: hidden; */
  @media(max-width: 770px) {
      overflow: auto;
      overflow-x: auto;
    }

  .card-title {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px;
    font-weight: bold;
    div {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }
    img {
      width: 15px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      margin-left: 4px;
      &:hover {
        opacity: 0.7;
      }
    }
    .download{
      img{
        width: 20px;
      }
    }
  }

  .card-filter-linhasP {
    display: flex;
    flex-direction: row;
    justify-content: ${({ justifyContent }) => justifyContent};
    padding: 0px 8px;
    font-weight: bold;
    @media(max-width: 770px) {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 0px 8px;
    }
    div {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      min-width: 220px;
        @media(max-width: 990px) {
        margin: 4px;
        min-width: 0px;
      }
    }
    img {
      width: 15px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      margin-left: 4px;
      &:hover {
        opacity: 0.7;
      }
    }
    .download{
      img{
        width: 20px;
      }
      min-width: 0px;
    }
  }

  .card-title-linhasP {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 8px 8px 4px 8px;
    font-weight: bold;
    @media(max-width: 770px) {
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      padding: 8px;
    }
    div {
      font-size: 12px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
        @media(max-width: 770px) {
        margin: 4px;
      }
    }
    img {
      width: 15px;
      transition: all 0.2s ease-in-out;
      cursor: pointer;
      margin-left: 4px;
      &:hover {
        opacity: 0.7;
      }
    }
    .download{
      img{
        width: 20px;
      }
    }
  }

  .card-main {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 8px 2px;
    max-height: 400px;
    overflow: auto;
    div {
      font-weight: bold;
      font-size: 24px;
    }
    small {
      font-size: 12px;
    }
    .VictoryContainer svg text {display: none;} //Removes the labels
  }

  .card-main-graph {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0px 8px;
    div {
      font-weight: bold;
      font-size: 32px !important;
    }
    small {
      font-size: 12px;
    }
    .VictoryContainer svg text tspan {
      font-size: 5px !important;
      fill: ${({ theme }) => theme.colors.primary.main} !important;
    } //Style the charts label
    .VictoryContainer svg #pie-labels-1{
      display: none !important;
    } //Removes pie label
    .VictoryContainer svg #pie-labels-0{
      display: none !important;
    } //Removes pie label
    .VictoryContainer svg #pie-labels-2{
      display: none !important;
    } //Removes pie label
  }

  .legend {
    padding: 8px;
    padding-top: 0px;
    small {
      display: flex;
      flex-direction: row;
      justify-content: flex-start;
      align-items: flex-start;
      font-size: 11px;
      font-weight: bold;
    }
    small.titulares{
      color: #8b9a71 !important;
    }
    small.avulsos{
      color: #ff6361 !important;
    }
    small.outros{
      color: #ffa600 !important;
    }
    small.vt{
      color: #4aafff !important;
    }
    small.fretamento{
      color: #006FE6 !important;
    }
  }

  .data-filter {
    display: flex;
    flex-direction: row;
    align-items: center;
    input[type='date'] {
      color: ${({ theme, selected }) => (selected ? theme.colors.lighterBackground : theme.colors.primary.main)};
      background: ${({ theme, selected }) => (selected ? theme.colors.primary.main : theme.colors.background)};
      text-decoration: none;
      font-weight: bold;
      border: 2px solid ${({ theme }) => theme.colors.primary.main};
      padding: 4px 8px;
      border-radius: 4px;
      transition: all 0.2s ease-in;
      font-size: 14px;
      height: 30px;
      margin: 12px;
      width: fit-content !important;

      @media(max-width: 500px) {
        font-size: 12px;
        height: 30px;
        padding: 2px 4px;
      }

      &:focus {
        border-color: ${({ theme }) => theme.colors.primary.main};
        color: ${({ theme }) => theme.colors.gray[900]};
      }
    }
    button {
      padding: 4px 8px;
      height: 30px;
      border-radius: 4px;
      border: none;
      background: ${({ theme }) => theme.colors.primary.main};
      color: ${({ theme }) => theme.colors.lighterBackground};
      transition: background 0.2s ease-in;
      font-weight: bold;
      width: fit-content;
      &:hover {
          background: ${({ theme }) => theme.colors.primary.light};
        }
    }
  }

  .radio-buttons {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    /* margin-top: 4px;
    margin-bottom: 4px; */

    @media(max-width: 500px) {
      display: flex;
    }

    button {
      padding: 2px 4px !important;
      font-size: 12px !important;
      height: 30px !important;
    }
  }

  footer {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-end;
    padding: 0px 8px 8px 8px;

    .porcentagem-negativa {
      font-size: 12px;
      color: red;
    }

    .porcentagem-positiva {
      font-size: 12px;
      color: green;
    }

    div {
      font-size: 8px;
    }


  }
`;

export const MonthsGrid = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  height: auto;
  margin: 0 auto;
  max-width: 32;
  width: 100%;
  flex-wrap: wrap;
  button {
    margin: 4px;
  }
`;

export const Input = styled.input`
  width: 100%;
  background: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.gray[900]};
  border: 1px solid hsl(0deg 0% 80%);
  box-shadow: 8px 4px 10px rgba(0, 0, 0, 0.04);
  height: 30px;
  border-radius: 4px;
  outline: none;
  padding: 0 12px;
  transition: border-color 0.2s ease-in;
  appearance: none;

  &:focus {
  border-color: ${({ theme }) => theme.colors.primary.main};
  color: ${({ theme }) => theme.colors.gray[900]};
  }

  &[disabled] {
    // background: ${({ theme }) => theme.colors.background};
    cursor: default;
    color: ${({ theme }) => theme.colors.gray[900]};
    opacity: 0.5;
  }
`;

export const LinhasPerformanceCardStyled = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-top: 1px solid ${({ theme }) => theme.colors.gray[201]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[201]};
  font-size: 12px !important;
  width: 100%;
  padding: 4px 8px;
  .info-linhas {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px !important;
    margin: 8px 0px;
    width: 16%;
      @media(max-width: 780px) {
        font-size: 10px !important;
        margin: 4px 2px;
      }
    label {
      font-size: 10px;
      text-align: center;
        @media(max-width: 780px) {
          font-size: 8px;
        }
    }
  }
  .actions {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 20px;
      margin: 8px;
      cursor: pointer;
      transition: all 0.2s ease-in-out;
      &:hover {
        opacity: 0.7;
      }
    }
    .pe-green {
      background: green;
      color: #fff;
      border-radius: 8px;
      font-size: 12px;
      padding: 2px 4px;
      margin: 4px;
      @media(max-width: 780px) {
        font-size: 10px !important;
        margin: 4px 2px;
      }
    }
    .pe-orange {
      background: orange;
      color: #fff;
      border-radius: 8px;
      font-size: 12px;
      padding: 2px 4px;
      margin: 4px;
      @media(max-width: 780px) {
        font-size: 10px !important;
        margin: 4px 2px;
      }
    }
    .pe-red {
      background: red;
      color: #fff;
      border-radius: 8px;
      font-size: 12px;
      padding: 2px 4px;
      margin: 4px;
      @media(max-width: 780px) {
        font-size: 10px !important;
        margin: 4px 2px;
      }
    }
  }
`;
