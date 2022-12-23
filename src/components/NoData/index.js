import PropTypes from 'prop-types';
import { NoDataContainer } from './styles';
import emptyBox from '../../assets/images/icons/emptyBox.svg';
import sad from '../../assets/images/icons/sad.svg';
import searchNotFound from '../../assets/images/icons/searchNotFound.svg';
import passenger from '../../assets/images/icons/passenger.svg';
import companyInterrogation from '../../assets/images/icons/companyInterrogation.svg';
import waitSettings from '../../assets/images/icons/waitSettings.svg';

export default function NoData({ icon, label }) {
  return (
    <NoDataContainer>
      {icon === 'emptyBox' && (
        <img src={emptyBox} alt="emptyBox" />
      )}
      {icon === 'sad' && (
        <img src={sad} alt="emptyBox" />
      )}
      {icon === 'searchNotFound' && (
        <img src={searchNotFound} alt="emptyBox" />
      )}
      {icon === 'passenger' && (
        <img src={passenger} alt="passenger" />
      )}
      {icon === 'companyInterrogation' && (
        <img src={companyInterrogation} alt="companyInterrogation" />
      )}
      {icon === 'waitSettings' && (
        <img src={waitSettings} alt="waitSettings" />
      )}
      <span>{label}</span>
    </NoDataContainer>
  );
}

NoData.propTypes = {
  icon: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
};
