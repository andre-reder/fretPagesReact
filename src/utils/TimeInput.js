import PropTypes from 'prop-types';
import InputMask from 'react-input-mask';

export default function TimeInput({ value, onChange }) {
  const startsWithTwo = value[0] == '2';

  const mask = [
    /[0-2]/,
    startsWithTwo ? /[0-3]/ : /[0-9]/,
    ':',
    /[0-5]/,
    /[0-9]/,
  ];
  return <InputMask mask={mask} onChange={onChange} value={value} className="timeInput" />;
}

TimeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
