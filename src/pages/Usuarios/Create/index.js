import Sidebar from '../../../components/Sidebar';
import UsuarioForm from '../../../components/UsuarioForm';
import Transitions from '../../../components/Transition';
import PageHeader from '../../../components/PageHeader';
import AppHeader from '../../../components/AppHeader';

export default function NovoUsuario() {
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Usuarios" />
      <Transitions>
        <PageHeader
          title="Novo Usuário"
          link="/usuarios"
        />
        <UsuarioForm page="NovoUsuario" buttonLabel="Cadastrar" />
      </Transitions>
    </>
  );
}
