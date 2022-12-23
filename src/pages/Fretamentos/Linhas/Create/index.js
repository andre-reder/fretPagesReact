import Sidebar from '../../../../components/Sidebar';
import LinhaForm from '../../../../components/LinhaForm';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import AppHeader from '../../../../components/AppHeader';

export default function NovaLinha() {
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Transitions>
        <PageHeader
          title="Nova Linha"
          link="/linhas"
        />
        <LinhaForm page="NovaLinha" buttonLabel="Cadastrar" />
      </Transitions>
    </>
  );
}
