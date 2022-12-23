import PropTypes from 'prop-types';
import { SecondaryButton } from './styles';

export default function FilterRadioButton({
  children, onClick, selected, invisible,
}) {
  return (
    <SecondaryButton
      onClick={onClick}
      selected={selected}
      invisible={invisible}
    >
      {children}
    </SecondaryButton>
  );
}

FilterRadioButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
  invisible: PropTypes.bool,
};

FilterRadioButton.defaultProps = {
  invisible: false,
};
