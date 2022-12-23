/* eslint-disable no-nested-ternary */
/* eslint-disable max-len */
import { motion } from 'framer-motion';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import Loader from '../../../../components/Loader';
import LocTrabsRadioButtons from '../../../../components/LocTrabsRadioButtons';
import NoData from '../../../../components/NoData';

import AppHeader from '../../../../components/AppHeader';
import ListHeader from './components/ListHeader';
import usePassageirosList from './usePassageirosList';
import Filters from './components/Filters';
import List from './components/List';

export default function PassageirosList() {
  const {
    isLoading,
    locTrabs,
    selectedLocTrab,
    doesListLtExists,
    doesPassageirosListExists,
    apiLtFetched,
    apiPassageirosFetched,
    setCurrentLocTrabAtPassageirosPage,
    setPassageiroRotBeingShow,
    setPassageiroBeingEdited,
    setPassageiroBeingDeleted,
    filteredPassageiros,
    handleLocTrabChange,
    handleChangeSearchNomeTerm,
    handleChangeSearchCpfTerm,
    handleChangeSearchConsultaTerm,
    handleChangeSearchLinhaIdaTerm,
    handleChangeSearchLinhaVoltaTerm,
    handleChangeSearchStatusTerm,
    handleTryGetLocTrabsAgain,
    handleTryGetPassageirosAgain,
    perfilUsu,
    codEmpresa,
    searchNomeTerm,
    searchCpfTerm,
    searchConsultaTerm,
    searchLinhaIdaTerm,
    searchLinhaVoltaTerm,
    searchStatusTerm,
  } = usePassageirosList();

  const isEmpresaSelected = !!codEmpresa;
  const empresaHasLocTrab = doesListLtExists && apiLtFetched;
  const passageirosApiHasError = selectedLocTrab && !apiPassageirosFetched && !isLoading;
  const locTrabHasNoPassageiros = selectedLocTrab && apiPassageirosFetched && !doesPassageirosListExists && !isLoading;
  const hasPassageiros = selectedLocTrab && apiPassageirosFetched && doesPassageirosListExists && !isLoading;
  const isFilteredListEmpty = filteredPassageiros?.length === 0;
  const locTrabApiHasError = !apiLtFetched && !isLoading;

  return (
    <>
      <AppHeader isEmpresaSelectDisabled={perfilUsu == 10 || perfilUsu == 11 || perfilUsu == 12} />
      <Sidebar active="Passageiros" />
      <Transitions>
        <Loader isLoading={isLoading} />

        {isEmpresaSelected && (
          <>
            {empresaHasLocTrab && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'tween', stiffness: 10 }}
            >
              <LocTrabsRadioButtons
                apiLtFetched={apiLtFetched}
                doesListLtExists={doesListLtExists}
                handleLocTrabChange={handleLocTrabChange}
                handleTryGetLocTrabsAgain={handleTryGetLocTrabsAgain}
                isLoading={isLoading}
                locTrabs={locTrabs}
                selectedLocTrab={selectedLocTrab}
                showAllButton={false}
              />
              {!selectedLocTrab && (
              <NoData icon="passenger" label={<>Selecione um local de trabalho acima para exibir a lista de passageiros do sistema de fretamento do mesmo</>} />
              )}

              {passageirosApiHasError && (
              <NoData
                icon="sad"
                label={(
                  <>
                    Ocorreu um erro ao carregar os passageiros.
                    <button type="button" onClick={handleTryGetPassageirosAgain(selectedLocTrab.value)}>Tentar Novamente</button>
                  </>
    )}
              />
              )}

              {locTrabHasNoPassageiros && (
                <NoData
                  icon="emptyBox"
                  label={(
                    <>
                      Este local de trabalho não tem nenhum passageiro,
                      tente selecionar outro local de trabalho acima!
                    </>
   )}
                />
              )}

              {hasPassageiros && (
              <>
                <Filters
                  searchNomeTerm={searchNomeTerm}
                  handleChangeSearchNomeTerm={handleChangeSearchNomeTerm}
                  searchCpfTerm={searchCpfTerm}
                  handleChangeSearchCpfTerm={handleChangeSearchCpfTerm}
                  searchConsultaTerm={searchConsultaTerm}
                  handleChangeSearchConsultaTerm={handleChangeSearchConsultaTerm}
                  searchLinhaIdaTerm={searchLinhaIdaTerm}
                  handleChangeSearchLinhaIdaTerm={handleChangeSearchLinhaIdaTerm}
                  searchLinhaVoltaTerm={searchLinhaVoltaTerm}
                  handleChangeSearchLinhaVoltaTerm={handleChangeSearchLinhaVoltaTerm}
                  searchStatusTerm={searchStatusTerm}
                  handleChangeSearchStatusTerm={handleChangeSearchStatusTerm}
                />

                <ListHeader
                  apiFetched={apiPassageirosFetched}
                  doesListExists={doesPassageirosListExists}
                  filteredEntity={filteredPassageiros}
                  entityString={{ singular: 'passageiro', plural: 'passageiros' }}
                />

                {!isFilteredListEmpty && (
                <List
                  filteredPassageiros={filteredPassageiros}
                  setPassageiroRotBeingShow={setPassageiroRotBeingShow}
                  setCurrentLocTrabAtPassageirosPage={setCurrentLocTrabAtPassageirosPage}
                  setPassageiroBeingEdited={setPassageiroBeingEdited}
                  setPassageiroBeingDeleted={setPassageiroBeingDeleted}
                  selectedLocTrab={selectedLocTrab}
                />
                )}

                {isFilteredListEmpty && (
                <NoData
                  icon="searchNotFound"
                  label={(
                    <>
                      Nenhum passageiro foi encontrado conforme campos de filtros preenchidos.
                    </>
      )}
                />
                )}

              </>
              )}
            </motion.div>
            )}

            {!empresaHasLocTrab && (
            <NoData icon="emptyBox" label={<>Esta empresa não possui locais de trabalho cadastrados. Para visualizar os passageiros do sistema de fretamento, a empresa precisa ter pelo menos um local de trabalho cadastrado. </>} />
            )}

            {locTrabApiHasError && (
            <NoData
              icon="sad"
              label={(
                <>
                  Ocorreu um erro ao obter os locais de trabalho para exibir os passageiros.
                  <button type="button" onClick={handleTryGetLocTrabsAgain}>Tentar Novamente</button>
                </>
)}
            />
            )}
          </>
        )}

        {!codEmpresa && (
          <NoData
            icon="companyInterrogation"
            label={(
              <>
                Selecione uma empresa para visualizar os passageiros.
              </>
)}
          />
        )}

      </Transitions>
    </>
  );
}
