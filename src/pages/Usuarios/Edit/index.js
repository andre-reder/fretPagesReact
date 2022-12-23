import Sidebar from '../../../components/Sidebar';
import UsuarioForm from '../../../components/UsuarioForm';
import Transitions from '../../../components/Transition';
import PageHeader from '../../../components/PageHeader';
import useLocalState from '../../../hooks/useLocalState';
import AppHeader from '../../../components/AppHeader';

export default function EditarUsuario() {
  const [userBeingEdited] = useLocalState('userBeingEdited');
  const { codUsuAcesso } = userBeingEdited;
  return (
    <>
      <Sidebar active="Usuarios" />
      <AppHeader isEmpresaSelectDisabled />
      <Transitions>
        <PageHeader
          title="Editar Usuário"
          link="/usuarios"
        />
        <UsuarioForm page="EditarUsuario" buttonLabel="Editar" codUsuAcesso={codUsuAcesso} />
      </Transitions>
    </>
  );
}
