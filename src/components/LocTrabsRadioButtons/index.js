import PropTypes, { shape } from 'prop-types';
import FilterRadioButton from '../FilterRadioButtons';
import { FilterRadioButtonsContainer } from '../FilterRadioButtonsContainer';
import Loader from '../Loader';
import NoData from '../NoData';

export default function LocTrabsRadioButtons({
  isLoading,
  doesListLtExists,
  apiLtFetched,
  handleLocTrabChange,
  handleTryGetLocTrabsAgain,
  selectedLocTrab,
  locTrabs,
  showAllButton,
}) {
  const isListEmpty = !doesListLtExists && apiLtFetched && !isLoading;
  const hasError = !apiLtFetched && !isLoading;

  return (
    <>
      <Loader isLoading={isLoading} />
      {(!isListEmpty) && (
      <FilterRadioButtonsContainer>
        {showAllButton && (
          <FilterRadioButton
            key={0}
            onClick={() => {
              handleLocTrabChange({
                value: 0,
                label: 'Todos',
              });
            }}
            selected={selectedLocTrab.value == 0}
          >
            Todos
          </FilterRadioButton>
        )}
        {locTrabs?.map((locTrab) => (
          <FilterRadioButton
            key={locTrab.value}
            onClick={() => {
              handleLocTrabChange({ value: locTrab.value, label: locTrab.label });
            }}
            selected={locTrab.value == selectedLocTrab.value}
          >
            {locTrab.label}
          </FilterRadioButton>
        ))}
      </FilterRadioButtonsContainer>
      )}

      {isListEmpty && (
      <NoData icon="emptyBox" label={<>Esta empresa não possui locais de trabalho cadastrados. Para existirem dados do sistema de fretamento, a empresa precisa ser previamente configurada para o serviço. </>} />
      )}

      {hasError && (
      <NoData
        icon="sad"
        label={(
          <>
            Ocorreu um erro ao obter os locais de trabalho para exibir o Dashboard.
            <button type="button" onClick={handleTryGetLocTrabsAgain}>Tentar Novamente</button>
          </>
)}
      />
      )}
    </>
  );
}

LocTrabsRadioButtons.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  doesListLtExists: PropTypes.bool.isRequired,
  apiLtFetched: PropTypes.bool.isRequired,
  handleLocTrabChange: PropTypes.func.isRequired,
  selectedLocTrab: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  locTrabs: PropTypes.arrayOf(shape).isRequired,
  handleTryGetLocTrabsAgain: PropTypes.func.isRequired,
  showAllButton: PropTypes.bool,
};

LocTrabsRadioButtons.defaultProps = {
  showAllButton: true,
};
