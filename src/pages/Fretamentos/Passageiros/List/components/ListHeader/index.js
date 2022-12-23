import PropTypes, { shape } from 'prop-types';
import { Container } from './styles';

export default function ListHeader({
  apiFetched,
  filteredEntity,
  entityString,
  doesListExists,
}) {
  return (
    <Container doesListExists={doesListExists} apiFetched={apiFetched}>
      <strong>
        {filteredEntity?.length}
        {' '}
        {filteredEntity?.length === 1 ? entityString.singular : entityString.plural}
      </strong>
    </Container>
  );
}

ListHeader.propTypes = {
  doesListExists: PropTypes.bool.isRequired,
  apiFetched: PropTypes.bool.isRequired,
  filteredEntity: PropTypes.arrayOf(shape).isRequired,
  entityString: PropTypes.shape.isRequired,
};
