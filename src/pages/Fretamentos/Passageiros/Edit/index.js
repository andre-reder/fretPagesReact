import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Card } from '../../../../components/Lists';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import Button from '../../../../components/Button';
import Loader from '../../../../components/Loader';

import MyModal from '../../../../components/Modal';

import isDataInativoAteValid from '../../../../utils/isDataInativoAteValid';
import useErrors from '../../../../hooks/useErrors';

import check from '../../../../assets/images/icons/check.svg';
import exclamation from '../../../../assets/images/icons/exclamation.svg';
import { SecondaryButton } from '../List/styles';
import { ButtonContainer } from '../../../../components/Form';
import PassageirosService from '../../../../services/PassageirosService';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';
import { useAppContext } from '../../../../contexts/auth';

export default function EditarPassageiro() {
  const currentDate = new Date().toJSON().slice(0, 10);
  const history = useHistory();
  const { data, token, signOut } = useAppContext();
  const { usuario } = data;
  const codEmpresa = data.selectedEmpresa.value;
  const { codUsu, perfilUsu } = usuario;
  const [passageiroBeingEdited] = useLocalState('passageiroBeingEdited');
  const { codFuncionario } = passageiroBeingEdited;
  const passageiro = passageiroBeingEdited;

  const [selectedStatus, setSelectedStatus] = useState('');
  const [dataInativarAte, setDataInativarAte] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const {
    setError, removeError, errors,
  } = useErrors();

  const isButtonDisabled = errors.length > 0;

  useEffect(() => {
    if (passageiro.statusCad === 'Ativo') {
      setSelectedStatus({ ativado: true, provisorio: false });
      setError({ field: 'passageiroAtivo', message: 'Para habilitar o botao altere o status' });
    } else {
      setSelectedStatus({ ativado: false, provisorio: false });
      setError({ field: 'passageiroInativo', message: 'Para habilitar o botao altere o status' });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passageiro.dataInativoAte, passageiro.statusCad]);

  function handleSelectedStatusChange({ ativado, provisorio }) {
    setSelectedStatus({ ativado, provisorio });
  }

  function handleDataInativarAteChange(event) {
    setDataInativarAte(event.target.value);
    setSelectedStatus({ ativado: false, provisorio: true });
    if (!event.target.value || !isDataInativoAteValid(event.target.value)) {
      setError({ field: 'dataInativoAte', message: 'Data deve ser posterior à data atual!' });
    } else {
      removeError('dataInativoAte');
      removeError('passageiroAtivo');
      removeError('passageiroInativo');
    }
  }

  function handleButtonClick() {
    async function handlePassageiroEdit() {
      try {
        setIsLoading(true);

        const bodyEditedPassageiro = await PassageirosService.editPassageiro({
          codFuncionario,
          ativado: selectedStatus.ativado,
          provisorio: selectedStatus.provisorio,
          dataInativoAte: dataInativarAte || currentDate,
          codUsu,
          perfilUsu,
          codEmpresa,
          token: encodeURIComponent(token),
        });
        setIsLoading(false);
        if (!bodyEditedPassageiro.validado) {
          signOut();
          return;
        }
        setApiMessage(bodyEditedPassageiro.msg);
        if (bodyEditedPassageiro.codigo === 1) {
          setSuccess(true);
        }
        setModalShow(true);
      } catch (error) {
        setIsLoading(false);
        setApiMessage(error);
        setModalShow(true);
      }
    }
    handlePassageiroEdit();
  }

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title={`Editar passageiro ${passageiro.nome}`}
          link="/passageiros"
        />
        <Card justifyContent="flex-start">
          <div className="info" style={{ width: '50%', borderRight: '2px solid rgba(108,108,108,0.8)' }}>
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

          <div className="editStatus">
            {passageiro.statusCad == 'Ativo' && (
              <SecondaryButton
                onClick={() => {
                  handleSelectedStatusChange({ ativado: false, provisorio: true });
                }}
                selected={!selectedStatus.ativado && selectedStatus.provisorio}
              >
                Inativar até...
              </SecondaryButton>
            )}

            {(passageiro.statusCad == 'Inativo' && !!passageiro.dataInativoAte) && (
            <>
              <SecondaryButton
                onClick={() => {
                  handleSelectedStatusChange({ ativado: true, provisorio: false });
                  removeError('passageiroInativo');
                }}
                selected={selectedStatus.ativado === true && selectedStatus.provisorio === false}
              >
                Reativar
              </SecondaryButton>
              <SecondaryButton
                onClick={() => {
                  handleSelectedStatusChange({ ativado: false, provisorio: true });
                  setError({ field: 'passageiroInativo', message: 'para habilitar o botao coloque uma data' });
                  setDataInativarAte('');
                }}
                selected={!selectedStatus.ativado && selectedStatus.provisorio}
              >
                Reagendar reativação
              </SecondaryButton>
            </>
            )}

            {selectedStatus.provisorio && (
              <input type="date" value={dataInativarAte} onChange={handleDataInativarAteChange} />
            )}

          </div>
        </Card>

        {((passageiro.statusCad != 'Ativo' && !!passageiro.dataInativoAte)
        || (passageiro.statusCad == 'Ativo')
        ) && (
        <ButtonContainer>
          <Button type="button" onClick={handleButtonClick} disabled={isButtonDisabled}>
            Confirmar alteração
          </Button>
        </ButtonContainer>
        )}

        <MyModal
          show={modalShow}
          title={success ? 'Status do passageiro alterado!' : 'Não foi possível alterar o status do passageiro'}
          closeButtonLabel="Fechar"
          modalBody={apiMessage}
          onClose={success ? () => {
            history.push('/passageiros');
          } : () => { setModalShow(false); }}
        />
      </Transitions>
    </>
  );
}
