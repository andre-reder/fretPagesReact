/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import {
  VictoryChart, VictoryVoronoiContainer, VictoryTooltip, VictoryLine,
} from 'victory';
import { Card } from '../styles';

import NoData from '../../NoData';

export default function EvolucaoVtFretaCard({
  dashboardEvolucaoVtData,
  dashboardEvolucaoFretaData,
  selectedLocTrab,
}) {
  const monthsAbvMap = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez',
  };

  const isFirstMonth = dashboardEvolucaoVtData?.length === 1
  && dashboardEvolucaoFretaData?.length === 1;

  const hasInfo = dashboardEvolucaoVtData || dashboardEvolucaoFretaData;

  const showChart = !isFirstMonth && hasInfo;

  return (
    <Card>
      <div className="card-title">
        <div>Evolução das despesas VT x Fretamento</div>
      </div>

      {showChart && (
      <>
        <div className="card-main-graph">
          <VictoryChart
            style={{
              labels: { fontSize: 0.8 },
            }}
            height={150}
            width={300}
            padding={{
              top: 15, bottom: 30, left: 30, right: 30,
            }}
            containerComponent={(
              <VictoryVoronoiContainer
                labels={({ datum }) => `${datum.x}, ${datum.y}`}
                labelComponent={
                  <VictoryTooltip dy={0} constrainToVisibleArea />
                              }
              />
                          )}
          >
            {dashboardEvolucaoVtData && (
            <VictoryLine
              style={{
                data: { stroke: '#4aafff' },
                parent: { border: 'none' },
              }}
              data={dashboardEvolucaoVtData.map((data) => (
                { x: `${monthsAbvMap[data.mes]}/${String(data.ano).replace('20', '')}`, y: data.custoVT }
              ))}
              interpolation="natural"
              animate={{
                duration: 3000,
                onLoad: { duration: 5000 },
              }}
            />
            )}

            {dashboardEvolucaoFretaData && (
            <VictoryLine
              style={{
                data: { stroke: '#006FE6' },
                parent: { border: 'none' },
              }}
              data={dashboardEvolucaoFretaData.map((data) => (
                { x: `${monthsAbvMap[data.mes]}/${String(data.ano).replace('20', '')}`, y: data.custoFreta }
              ))}
              interpolation="natural"
              animate={{
                duration: 4000,
                onLoad: { duration: 6000 },
              }}
            />
            )}

          </VictoryChart>
        </div>
        <div className="legend">
          <small className="vt">
            ● VT
          </small>
          <small className="fretamento">
            ● Fretamento
          </small>
        </div>
      </>
      )}

      {!hasInfo && (
      <NoData
        icon="emptyBox"
        label={(
          <>
            O local de trabalho
            {' '}
            <strong>{selectedLocTrab.label}</strong>
            {' '}
            não possui dados
            sobre a evolução das despesas de fretamento e VT.
          </>
                  )}
      />
      )}

      {isFirstMonth && (
        <NoData
          icon="emptyBox"
          label={(
            <>
              São necessários pelo menos
              {' '}
              <strong>2 meses de serviço</strong>
              {' '}
              para exibir o gráfico
              de evolução das despesas de fretamento e VT.
            </>
                  )}
        />
      )}
    </Card>
  );
}

EvolucaoVtFretaCard.propTypes = {
  dashboardEvolucaoVtData: PropTypes.any.isRequired,
  dashboardEvolucaoFretaData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
