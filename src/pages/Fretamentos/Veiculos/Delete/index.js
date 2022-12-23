import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';

import MyModal from '../../../../components/Modal';
import AppHeader from '../../../../components/AppHeader';
import useDeleteVeiculo from './useDeleteVeiculo';
import CardDelete from './components/CardDelete';

export default function DeletarVeiculo() {
  const {
    isLoading,
    codVeiculo,
    tipoTransporte,
    roles,
    marca,
    modelo,
    capacidade,
    consumo,
    handleButtonClick,
    modalShow,
    success,
    apiMessage,
    setModalShow,
    history,
  } = useDeleteVeiculo();

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Veiculos" />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title="Tem certeza que deseja excluir este veículo?"
          link="/veiculos"
        />

        <CardDelete
          codVeiculo={codVeiculo}
          tipoTransporte={tipoTransporte}
          roles={roles}
          marca={marca}
          modelo={modelo}
          capacidade={capacidade}
          consumo={consumo}
          handleButtonClick={handleButtonClick}
        />

        <MyModal
          show={modalShow}
          title={success ? 'Veículo Excluído!' : 'Não foi possível excluir o veículo'}
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={success ? () => {
            history.push('/veiculos');
          } : () => { setModalShow(false); }}
        />

      </Transitions>
    </>
  );
}
