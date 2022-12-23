import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import LinhasService from '../../../../services/LinhasService';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';

export default function useDeleteLinha() {
  const { data, token, signOut } = useAppContext();
  const userData = data.usuario;
  const codEmpresa = data.selectedEmpresa.value;
  const [linhaBeingDeleted] = useLocalState('linhaBeingDeleted');
  const history = useHistory();
  const { codUsu, perfilUsu, usuario } = userData;
  const { codLinhaSis } = linhaBeingDeleted;
  const { routeId } = linhaBeingDeleted;
  const { codLinhaF } = linhaBeingDeleted;
  const { sentido } = linhaBeingDeleted;
  const { letreiro } = linhaBeingDeleted;
  const { horaSaida } = linhaBeingDeleted;
  const { horaChegada } = linhaBeingDeleted;
  const { capacidade } = linhaBeingDeleted;
  const { descrLocTrab } = linhaBeingDeleted;

  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const roles = {
    0: '',
    1: <small>Ida</small>,
    2: <small className="orange">Volta</small>,
  };

  function handleButtonClick() {
    async function handleLinhaDelete() {
      try {
        setIsLoading(true);

        const bodyDeletedLinha = await LinhasService.deleteLinha(
          {
            codUsu,
            perfilUsu,
            usuario,
            codEmpresa,
            token: encodeURIComponent(token),
            codLinhaSis,
            routeId: encodeURIComponent(routeId),
          },
        );
        setIsLoading(false);
        if (!bodyDeletedLinha.validado) {
          signOut();
          return;
        }
        setApiMessage(bodyDeletedLinha.msg);
        if (bodyDeletedLinha.codigo === 1) {
          setSuccess(true);
        }
        setModalShow(true);
      } catch (error) {
        setIsLoading(false);
        setApiMessage(error);
        setModalShow(true);
      }
    }
    handleLinhaDelete();
  }

  return {
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
  };
}
