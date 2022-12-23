import Sidebar from '../../../../components/Sidebar';
import LinhaForm from '../../../../components/LinhaForm';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';

export default function EditarLinha() {
  const [linhaBeingEdited] = useLocalState('linhaBeingEdited');
  const codLinhaSis = linhaBeingEdited;
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Transitions>
        <PageHeader
          title="Editar Linha"
          link="/linhas"
        />
        <LinhaForm page="EditarLinha" buttonLabel="Editar" codLinhaSis={codLinhaSis} />
      </Transitions>
    </>
  );
}
