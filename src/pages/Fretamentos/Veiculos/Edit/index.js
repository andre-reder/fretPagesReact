import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import VeiculoForm from '../../../../components/VeiculoForm';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';

export default function EditarVeiculo() {
  const [veiculoBeingEdited] = useLocalState('veiculoBeingEdited');
  const { codVeiculoSis } = veiculoBeingEdited;
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Veiculos" />
      <Transitions>
        <PageHeader
          title="Editar Veículo"
          link="/veiculos"
        />
        <VeiculoForm page="EditarVeiculo" buttonLabel="Editar" codVeiculoSis={codVeiculoSis} />
      </Transitions>
    </>
  );
}
