import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import VeiculoForm from '../../../../components/VeiculoForm';
import AppHeader from '../../../../components/AppHeader';

export default function NovoVeiculo() {
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Veiculos" />
      <Transitions>
        <PageHeader
          title="Novo Veículo"
          link="/veiculos"
        />
        <VeiculoForm page="NovoVeiculo" buttonLabel="Cadastrar" />
      </Transitions>
    </>
  );
}
