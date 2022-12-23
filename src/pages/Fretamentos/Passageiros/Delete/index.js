import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { CardDelete } from '../../../../components/Lists';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import Loader from '../../../../components/Loader';

import MyModal from '../../../../components/Modal';

import check from '../../../../assets/images/icons/check.svg';
import exclamation from '../../../../assets/images/icons/exclamation.svg';
import PassageirosService from '../../../../services/PassageirosService';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';
import { useAppContext } from '../../../../contexts/auth';

export default function DeletarPassageiro() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const history = useHistory();
  const { data, token, signOut } = useAppContext();
  const { usuario } = data;
  const { codUsu, perfilUsu } = usuario;
  const codEmpresa = data.selectedEmpresa.value;
  const [passageiroBeingDeleted] = useLocalState('passageiroBeingDeleted');
  const [currentLocTrabAtPassageirosPage] = useLocalState('currentLocTrabAtPassageirosPage');
  const codLocTrab = currentLocTrabAtPassageirosPage;
  const { codFuncionario } = passageiroBeingDeleted;
  const passageiro = passageiroBeingDeleted;

  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  function handleButtonClick() {
    async function handlePassageiroDelete() {
      try {
        setIsLoading(true);

        const bodyDeletedPassageiro = await PassageirosService.editPassageiro({
          codFuncionario,
          ativado: false,
          provisorio: false,
          dataInativoAte: currentDate,
          codEmpresa,
          codUsu,
          perfilUsu,
          token: encodeURIComponent(token),
        });
        setIsLoading(false);
        if (!bodyDeletedPassageiro.validado) {
          signOut();
          return;
        }
        setApiMessage(bodyDeletedPassageiro.msg);
        if (bodyDeletedPassageiro.codigo === 1) {
          setSuccess(true);
        }
        setModalShow(true);
      } catch (error) {
        setIsLoading(false);
        setApiMessage(error);
        setModalShow(true);
      }
    }
    handlePassageiroDelete();
  }

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title={`Remover passageiro ${passageiro.nome}`}
          link="/passageiros"
        />
        <CardDelete justifyContent="flex-start">
          <div className="info">
            <div className="card-title">
              <strong>{passageiro.nome}</strong>
              {passageiro.statusCad === 'Ativo'
                ? <small className="green">Ativo</small>
                : (
                  <small className="orange">
                    {passageiro.dataInativoAte
                      ? `Inativo até ${new Date(passageiro.dataInativoAte.replace(/-/g, '\/')).toLocaleDateString()}`
                      : 'Inativo'}
                  </small>
                )}
            </div>
            <span>
              {passageiro.valorVT == 0
                ? <>Não usa VT</>
                : passageiro.valorVT.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
            </span>
            <span>
              <div>
                <strong>Ida:</strong>
                {' '}
                {passageiro.linhaIda.replace('.kml', '').toLowerCase()}
              </div>
              {passageiro.StatusLinIda === 'Titular'
                ? <img src={check} alt="titular" />
                : (
                  <img src={exclamation} alt="perdeu titularidade" />
                )}
            </span>
            <span>
              <div>
                <strong>Volta:</strong>
                {' '}
                {passageiro.linhaVolta.replace('.kml', '').toLowerCase()}
              </div>
              {passageiro.StatusLinVolta === 'Titular'
                ? <img src={check} alt="titular" />
                : (
                  <img src={exclamation} alt="perdeu titularidade" />
                )}
            </span>
            <span>
              <div>
                <strong>CPF:</strong>
                {passageiro.cpf}
              </div>
            </span>
            <span>
              <div>
                <strong>Matrícula:</strong>
                {passageiro.matricula ? passageiro.matricula : 'Não cadastrada'}
              </div>
            </span>
            <span>
              <div>
                <strong>Horário:</strong>
                {`Das ${passageiro.horaEntrada} às ${passageiro.horaSaida}`}
              </div>
            </span>
            <span>
              <div>
                <strong>Endereço:</strong>
                {`${passageiro.logradouro}, ${passageiro.numero} - ${passageiro.bairro}`}
              </div>
            </span>
            <span>
              <div>
                {`${passageiro.cidade}, ${passageiro.uf}`}
              </div>
            </span>
          </div>

          <div className="actions">
            <button type="button" onClick={handleButtonClick}>Confirmar Exclusão</button>
          </div>
        </CardDelete>

        <MyModal
          show={modalShow}
          title={success ? 'Passageiro removido do sistema de fretamento!' : 'Não foi possível remover o passageiro'}
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={success ? () => {
            history.push(`/passageiros?&codLocTrab=${codLocTrab}`);
          } : () => { setModalShow(false); }}
        />
      </Transitions>
    </>
  );
}
