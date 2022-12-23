import PropTypes from 'prop-types';
import { SecondaryButton } from './styles';

export default function ThemeRadioButton({
  children, onClick, selected,
}) {
  return (
    <SecondaryButton
      onClick={onClick}
      selected={selected}
    >
      {children}
    </SecondaryButton>
  );
}

ThemeRadioButton.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};
