import { motion } from 'framer-motion';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';

import Loader from '../../../../components/Loader/index';
import NoData from '../../../../components/NoData';
import AppHeader from '../../../../components/AppHeader';
import useLinhasList from './useLinhasList';
import InputSearch from '../../../../components/InputSearch';
import ListHeader from './components/ListHeader';
import List from './components/List';

export default function LinhasList() {
  const {
    perfilUsu,
    isLoading,
    codEmpresa,
    linhas,
    apiFetched,
    searchTerm,
    handleChangeSearchTerm,
    filteredLinhas,
    roles,
    setLinhaMapaBeingShow,
    setLinhaBeingPostedShape,
    setLinhaBeingEdited,
    setLinhaBeingDeleted,
    handleTryAgain,
  } = useLinhasList();

  const isEmpresaSelected = !!codEmpresa;
  const doesListExists = linhas && !isLoading && apiFetched;
  const hasLinhas = linhas && filteredLinhas?.length !== 0 && apiFetched;
  const isSearchEmpty = filteredLinhas?.length === 0 && apiFetched && !isLoading;
  const doesntHaveLinhas = !linhas && apiFetched && !isLoading;

  return (
    <>
      <AppHeader isEmpresaSelectDisabled={perfilUsu == 10 || perfilUsu == 11 || perfilUsu == 12} />
      <Sidebar active="Linhas" />
      <Transitions>
        <Loader isLoading={isLoading} />

        {isEmpresaSelected && (
          <>
            {doesListExists && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, type: 'tween', stiffness: 10 }}
            >
              <InputSearch
                searchTerm={searchTerm}
                handleChangeSearchTerm={handleChangeSearchTerm}
                placeholder="Pesquisar linha (codigo, letreiro, ou local de trabalho"
              />
            </motion.div>
            )}

            {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.05, type: 'tween', stiffness: 10 }}
            >
              <ListHeader
                entity={linhas}
                apiFetched={apiFetched}
                filteredEntity={filteredLinhas}
                linkPath="/linhas/novo"
                entityString={{ singular: 'linha', plural: 'linhas' }}
              />
            </motion.div>
            )}

            {hasLinhas && (
              <List
                filteredLinhas={filteredLinhas}
                roles={roles}
                setLinhaMapaBeingShow={setLinhaMapaBeingShow}
                setLinhaBeingPostedShape={setLinhaBeingPostedShape}
                setLinhaBeingEdited={setLinhaBeingEdited}
                setLinhaBeingDeleted={setLinhaBeingDeleted}
              />
            )}

            {isSearchEmpty && (
            <NoData
              icon="searchNotFound"
              label={(
                <>
                  Nenhum resultado foi encontrado para
                  {' '}
                  <strong>{searchTerm}</strong>
                </>
        )}
            />
            )}

            {doesntHaveLinhas && (
            <NoData
              icon="emptyBox"
              label={(
                <>
                  Esta empresa não tem nenhuma linha cadastrada, clique no botão
                  {' '}
                  <strong>Nova Linha</strong>
                  {' '}
                  acima para cadastrar sua primeira!
                </>
)}
            />
            )}

            {!apiFetched && (
            <NoData
              icon="sad"
              label={(
                <>
                  Ocorreu um erro ao obter as linhas.
                  <button type="button" onClick={handleTryAgain}>Tentar Novamente</button>
                </>
)}
            />
            )}
          </>
        )}

        {!isEmpresaSelected && (
          <NoData
            icon="companyInterrogation"
            label={(
              <>
                Selecione uma empresa para visualizar as linhas.
              </>
)}
          />
        )}

      </Transitions>
    </>
  );
}
