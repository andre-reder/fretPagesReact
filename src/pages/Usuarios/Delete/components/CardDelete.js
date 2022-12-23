import PropTypes from 'prop-types';
import { CardDelete as Container } from '../../../../components/Lists';

export default function CardDelete({
  nome,
  perfilUsuCad,
  roles,
  cpf,
  email,
  handleButtonClick,
}) {
  return (
    <Container>
      <div className="info">
        <div className="card-title">
          <strong>{nome}</strong>
          {!!perfilUsuCad && (
            roles[perfilUsuCad]
          )}
        </div>
        <span>
          CPF:
          {' '}
          {cpf}
        </span>
        <span>{email}</span>
      </div>
      <div className="actions">
        <button type="button" onClick={handleButtonClick}>Confirmar Exclusão</button>
      </div>
    </Container>
  );
}

CardDelete.propTypes = {
  nome: PropTypes.string.isRequired,
  perfilUsuCad: PropTypes.number.isRequired,
  roles: PropTypes.shape.isRequired,
  cpf: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  handleButtonClick: PropTypes.func.isRequired,
};
