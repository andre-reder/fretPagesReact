import PropTypes from 'prop-types';
import { Container } from './styles';

export default function FormGroup({ children, error }) {
  return (
    <Container>
      { children }
      { error && <small>{error}</small> }
    </Container>
  );
}

FormGroup.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
};

FormGroup.defaultProps = {
  children: null,
  error: null,
};
