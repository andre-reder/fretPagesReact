import Sidebar from '../../../components/Sidebar';
import Transitions from '../../../components/Transition';
import PageHeader from '../../../components/PageHeader';
import Loader from '../../../components/Loader';

import MyModal from '../../../components/Modal';
import AppHeader from '../../../components/AppHeader';
import useDeleteUsuario from './useDeleteUsuario';
import CardDelete from './components/CardDelete';

export default function DeletarUsuario() {
  const {
    isLoading,
    nome,
    perfilUsuCad,
    roles,
    cpf,
    email,
    handleButtonClick,
    modalShow,
    success,
    apiMessage,
    history,
    setModalShow,
  } = useDeleteUsuario();

  return (
    <>
      <Sidebar active="Usuarios" />
      <AppHeader isEmpresaSelectDisabled />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title="Tem certeza que deseja excluir este usuário?"
          link="/usuarios"
        />

        <CardDelete
          nome={nome}
          perfilUsuCad={perfilUsuCad}
          roles={roles}
          cpf={cpf}
          email={email}
          handleButtonClick={handleButtonClick}
        />

        <MyModal
          show={modalShow}
          title={success ? 'Usuário Excluído!' : 'Não foi possível excluir o usuário'}
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={success ? () => {
            history.push('/usuarios');
          } : () => { setModalShow(false); }}
        />

      </Transitions>
    </>
  );
}
