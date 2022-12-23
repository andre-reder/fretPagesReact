import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';

import MyModal from '../../../../components/Modal';
import AppHeader from '../../../../components/AppHeader';
import CardDelete from './components/CardDelete';
import useDeleteLinha from './useDeleteLinha';

export default function DeletarLinha() {
  const {
    isLoading,
    codLinhaF,
    sentido,
    roles,
    letreiro,
    horaSaida,
    horaChegada,
    capacidade,
    descrLocTrab,
    handleButtonClick,
    modalShow,
    success,
    apiMessage,
    history,
    setModalShow,
  } = useDeleteLinha();

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title="Tem certeza que deseja excluir esta linha?"
          link="/linhas"
        />

        <CardDelete
          codLinhaF={codLinhaF}
          sentido={sentido}
          sentidoTag={roles[sentido]}
          letreiro={letreiro}
          horaSaida={horaSaida}
          horaChegada={horaChegada}
          capacidade={capacidade}
          descrLocTrab={descrLocTrab}
          handleButtonClick={handleButtonClick}
        />

        <MyModal
          show={modalShow}
          title={success ? 'Linha Excluída!' : 'Não foi possível excluir a linha'}
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={success ? () => {
            history.push('/linhas');
          } : () => { setModalShow(false); }}
        />

      </Transitions>
    </>
  );
}
