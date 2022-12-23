import PropTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { Container } from './styles';

export default function ListHeader({
  entity,
  apiFetched,
  filteredEntity,
  linkPath,
  entityString,
  showQrCodes,
}) {
  return (
    <Container doesListExists={Boolean(entity)} apiFetched={apiFetched}>
      {(entity && apiFetched) && (
      <strong>
        {filteredEntity.length}
        {' '}
        {filteredEntity.length === 1 ? entityString.singular : entityString.plural}
      </strong>
      )}
      <div className="actionButtons">
        {entity && apiFetched && (
        <button type="button" onClick={() => showQrCodes(true)}>Qr Codes</button>
        )}
        <Link to={linkPath}>Novo veículo</Link>
      </div>
    </Container>
  );
}

ListHeader.propTypes = {
  entity: PropTypes.arrayOf(shape).isRequired,
  apiFetched: PropTypes.bool.isRequired,
  filteredEntity: PropTypes.arrayOf(shape).isRequired,
  linkPath: PropTypes.string.isRequired,
  entityString: PropTypes.shape.isRequired,
  showQrCodes: PropTypes.func.isRequired,
};
