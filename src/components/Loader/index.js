import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Overlay } from './styles';
import captaIcon from '../../assets/images/icons/capta.svg';

export default function Loader({ isLoading }) {
  if (!isLoading) {
    return null;
  }

  return ReactDOM.createPortal(
    <Overlay>
      <div className="loader" />
      <img src={captaIcon} alt="" />
    </Overlay>,
    document.getElementById('loader-root'),
  );
}

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
