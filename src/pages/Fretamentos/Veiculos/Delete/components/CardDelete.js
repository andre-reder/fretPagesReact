import PropTypes from 'prop-types';
import { CardDelete as Container } from '../../../../../components/Lists';

export default function CardDelete({
  codVeiculo,
  tipoTransporte,
  roles,
  marca,
  modelo,
  capacidade,
  consumo,
  handleButtonClick,
}) {
  return (
    <Container>
      <div className="info">
        <div className="card-title">
          <strong>{codVeiculo}</strong>
          {tipoTransporte && (
            roles[tipoTransporte]
          )}
        </div>
        <span>
          {marca}
          {' '}
          {modelo}
        </span>
        <span>
          {capacidade}
          {' '}
          lugares
        </span>
        <span>
          {consumo}
          {' '}
          km/L
        </span>
      </div>

      <div className="actions">
        <button type="button" onClick={handleButtonClick}>Confirmar Exclusão</button>
      </div>
    </Container>
  );
}

CardDelete.propTypes = {
  codVeiculo: PropTypes.string.isRequired,
  tipoTransporte: PropTypes.number.isRequired,
  roles: PropTypes.shape.isRequired,
  marca: PropTypes.string.isRequired,
  modelo: PropTypes.string.isRequired,
  capacidade: PropTypes.number.isRequired,
  consumo: PropTypes.number.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};
