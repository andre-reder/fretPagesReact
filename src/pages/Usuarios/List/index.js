import Sidebar from '../../../components/Sidebar';
import Transitions from '../../../components/Transition';

import Loader from '../../../components/Loader/index';
import NoData from '../../../components/NoData';
import AppHeader from '../../../components/AppHeader';
import InputSearch from '../../../components/InputSearch';
import ListHeader from './components/ListHeader';
import useUsuariosList from './useUsuariosList';
import List from './components/List';

export default function UsuariosList() {
  const {
    perfilUsu,
    isLoading,
    codEmpresa,
    Usuarios,
    apiFetched,
    searchTerm,
    handleChangeSearchTerm,
    filteredUsuarios,
    setUserBeingEdited,
    roles2,
    setUserBeingDeleted,
    handleTryAgain,
    roles,
  } = useUsuariosList();

  const isEmpresaSelected = !!codEmpresa;
  const hasUsuarios = Usuarios && apiFetched;
  const hasFilteredUsuarios = Usuarios && apiFetched && filteredUsuarios?.length !== 0;
  const isSearchEmpty = filteredUsuarios?.length === 0 && apiFetched && !isLoading;
  const hasNoUsuarios = !Usuarios && apiFetched;

  return (
    <>
      <AppHeader isEmpresaSelectDisabled={perfilUsu == 10 || perfilUsu == 11 || perfilUsu == 12} />
      <Sidebar active="Usuarios" />
      <Transitions>
        <Loader isLoading={isLoading} />

        {isEmpresaSelected && (
        <>
          {hasUsuarios && (
          <InputSearch
            searchTerm={searchTerm}
            handleChangeSearchTerm={handleChangeSearchTerm}
            placeholder="Pesquisar usuário"
          />
          )}

          <ListHeader
            entity={Usuarios}
            apiFetched={apiFetched}
            filteredEntity={filteredUsuarios}
            linkPath="/usuarios/novo"
            entityString={{ singular: 'usuário', plural: 'usuários' }}
          />

          {hasFilteredUsuarios && (
            <List
              filteredUsuarios={filteredUsuarios}
              roles={roles}
              setUserBeingEdited={setUserBeingEdited}
              roles2={roles2}
              setUserBeingDeleted={setUserBeingDeleted}
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

          {hasNoUsuarios && (
          <NoData
            icon="emptyBox"
            label={(
              <>
                Esta empresa não tem nenhum usuário cadastrado, clique no botão
                {' '}
                <strong>Novo Usuário</strong>
                {' '}
                acima para cadastrar seu primeiro!
              </>
)}
          />
          )}

          {(!apiFetched) && (
          <NoData
            icon="sad"
            label={(
              <>
                Ocorreu um erro ao obter os usuários.
                <button type="button" onClick={handleTryAgain}>Tentar Novamente</button>
                .
              </>
)}
          />
          )}
        </>
        )}

        {(!codEmpresa) && (
        <NoData
          icon="companyInterrogation"
          label={(
            <>
              Selecione uma empresa para visualizar os usuários.
            </>
)}
        />
        )}

      </Transitions>
    </>
  );
}
