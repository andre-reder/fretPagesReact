import PropTypes from 'prop-types';
import { CardDelete as Card } from '../../../../../components/Lists';

export default function CardDelete({
  codLinhaF,
  sentido,
  sentidoTag,
  letreiro,
  horaSaida,
  horaChegada,
  capacidade,
  descrLocTrab,
  handleButtonClick,
}) {
  return (
    <Card>
      <div className="info">
        <div className="card-title">
          <strong>{codLinhaF}</strong>
          {sentido && (
            sentidoTag
          )}
        </div>
        <span>{letreiro?.replace('.kml', '')}</span>
        <span>
          {horaSaida}
          -
          {horaChegada}
        </span>
        <span>
          {capacidade}
          {' '}
          lugares
        </span>
        <span>
          {descrLocTrab}
        </span>
      </div>

      <div className="actions">
        <button type="button" onClick={handleButtonClick}>Confirmar Exclusão</button>
      </div>
    </Card>
  );
}

CardDelete.propTypes = {
  codLinhaF: PropTypes.string.isRequired,
  sentido: PropTypes.number.isRequired,
  sentidoTag: PropTypes.node.isRequired,
  letreiro: PropTypes.string.isRequired,
  horaSaida: PropTypes.string.isRequired,
  horaChegada: PropTypes.string.isRequired,
  capacidade: PropTypes.number.isRequired,
  descrLocTrab: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};
