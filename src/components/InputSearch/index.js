import PropTypes from 'prop-types';
import { Container } from './styles';

export default function InputSearch({ searchTerm, handleChangeSearchTerm, placeholder }) {
  return (
    <Container>
      <input
        value={searchTerm}
        type="text"
        placeholder={placeholder}
        onChange={handleChangeSearchTerm}
      />
    </Container>
  );
}

InputSearch.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  handleChangeSearchTerm: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};
