import PropTypes from 'prop-types';
import Select from 'react-select';
import { CustomStyle } from '../CustomSelectStyle';

import useLocalState from '../../hooks/useLocalState';
import { useAppContext } from '../../contexts/auth';

export default function AppHeader({ isEmpresaSelectDisabled }) {
  const [empresaData] = useLocalState('empresaData');
  const { data } = useAppContext();
  const { changeEmpresa } = useAppContext();
  const { empresasList } = data;
  const codEmpresa = data.selectedEmpresa.value || empresaData.value;
  const empF = data.selectedEmpresa.label || empresaData.label;

  return (
    <div className="empresaTitle">
      <Select
        value={{ value: codEmpresa || 0, label: empF || 'Selecione uma empresa' }}
        options={empresasList}
        onChange={(opt) => {
          changeEmpresa({ value: opt.value, label: opt.label });
        }}
        placeholder="Selecione uma empresa"
        styles={CustomStyle}
        isDisabled={isEmpresaSelectDisabled}
        classNamePrefix="react-select"
        className="react-select-container"
      />
    </div>
  );
}

AppHeader.propTypes = {
  isEmpresaSelectDisabled: PropTypes.bool.isRequired,
};
