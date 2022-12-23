/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { VictoryPie } from 'victory';

import { motion } from 'framer-motion';
import { Card } from '../styles';

import NoData from '../../NoData';

export default function PerfilUsuCard({ dashboardPerfilUsuData, selectedLocTrab }) {
  return (
    <Card>
      <div className="card-title">
        <div>Perfil usuário</div>
      </div>

      {dashboardPerfilUsuData && (
      <>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2, type: 'tween', stiffness: 10000 }}
          className="card-main-graph"
        >
          <VictoryPie
            data={[
              {
                x: 1,
                y: dashboardPerfilUsuData.totFuncTitular,
                label: `Titulares: ${dashboardPerfilUsuData.totFuncTitular} %`,
              },
              {
                x: 2,
                y: dashboardPerfilUsuData.totFuncAvulso,
                label: `Avulsos: ${dashboardPerfilUsuData.totFuncAvulso} %`,
              },
              {
                x: 3,
                y: dashboardPerfilUsuData.totFuncOutros,
                label: `Livres: ${dashboardPerfilUsuData.totFuncOutros} %`,
              },
            ]}
            animate={{
              duration: 2000,
              onLoad: { duration: 5000 },
            }}
            colorScale={['#8b9a71', '#ff6361', '#ffa600']}
            innerRadius={80}
            height={187}
            padAngle={0}
            padding={0}
          />
        </motion.div>
        <div className="legend">
          <small className="titulares">
            ● Titulares:
            {' '}
            {dashboardPerfilUsuData.totFuncTitular}
            %
          </small>
          <small className="avulsos">
            ● Avulsos:
            {' '}
            {dashboardPerfilUsuData.totFuncAvulso}
            %
          </small>
          <small className="outros">
            ● Outros:
            {' '}
            {dashboardPerfilUsuData.totFuncOutros}
            %
          </small>
        </div>
      </>
      )}

      {(!dashboardPerfilUsuData) && (
      <NoData
        icon="emptyBox"
        label={(
          <>
            O local de trabalho
            {' '}
            <strong>{selectedLocTrab.label}</strong>
            {' '}
            não possui dados sobre o perfil dos usuários.
          </>
                  )}
      />
      )}
    </Card>
  );
}

PerfilUsuCard.propTypes = {
  dashboardPerfilUsuData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
