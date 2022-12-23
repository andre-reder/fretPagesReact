/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Card } from '../styles';

import NoData from '../../NoData';

export default function LinhasCard({ dashboardLinhasData, selectedLocTrab }) {
  return (
    <Card>
      <div className="card-title">
        <div>Linhas</div>
      </div>

      {dashboardLinhasData && (
      <>
        <div className="card-main">
          <div>
            {dashboardLinhasData.qtdLinhas}
          </div>
          <small>
            {(dashboardLinhasData.qtdLinhas > 1 ? 'Linhas' : 'Linha')}
          </small>
        </div>

        <footer>
          {(!dashboardLinhasData.linBaixou) && (
          <>
            <div className="porcentagem-negativa">
              +
              {' '}
              {dashboardLinhasData.percLinha}
              %
            </div>
            <div>
              Em relação ao início da operação
            </div>
          </>
          )}
          {(dashboardLinhasData.linBaixou) && (
          <>
            <div className="porcentagem-positiva">
              -
              {' '}
              {dashboardLinhasData.percLinha}
              %
            </div>
            <div>
              Em relação ao início da operação
            </div>
          </>
          )}
        </footer>
      </>
      )}

      {(!dashboardLinhasData) && (
      <NoData
        icon="emptyBox"
        label={(
          <>
            O local de trabalho
            {' '}
            <strong>{selectedLocTrab.label}</strong>
            {' '}
            não possui dados de linhas.
          </>
                  )}
      />
      )}

    </Card>
  );
}

LinhasCard.propTypes = {
  dashboardLinhasData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
