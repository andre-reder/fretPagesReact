import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import VeiculosService from '../../../../services/VeiculosService';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';

export default function useDeleteVeiculo() {
  const { data, token, signOut } = useAppContext();
  const [veiculoBeingDeleted] = useLocalState('veiculoBeingDeleted');
  const userData = data.usuario;
  const codEmpresa = data.selectedEmpresa.value;
  const { codUsu, perfilUsu, usuario } = userData;

  const { codVeiculoSis } = veiculoBeingDeleted;
  const { codVeiculo } = veiculoBeingDeleted;
  const { tipoTransporte } = veiculoBeingDeleted;
  const { marca } = veiculoBeingDeleted;
  const { modelo } = veiculoBeingDeleted;
  const { capacidade } = veiculoBeingDeleted;
  const { consumo } = veiculoBeingDeleted;

  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const roles = {
    Ônibus: <small>Ônibus</small>,
    Van: <small className="green">Van</small>,
    Micro: <small className="orange">Micro</small>,
    Outros: <small className="gray">Outros</small>,
  };

  const history = useHistory();

  function handleButtonClick() {
    async function handleVeiculoDelete() {
      try {
        setIsLoading(true);

        const bodyDeletedVeiculo = await VeiculosService.deleteVeiculo(
          {
            codUsu,
            perfilUsu,
            usuario,
            codVeiculoSis,
            codEmpresa,
            token: encodeURIComponent(token),
          },
        );
        setIsLoading(false);
        if (!bodyDeletedVeiculo.validado) {
          signOut();
          return;
        }
        setApiMessage(bodyDeletedVeiculo.msg);
        if (bodyDeletedVeiculo.codigo === 1) {
          setSuccess(true);
        }
        setModalShow(true);
      } catch (error) {
        setIsLoading(false);
        setApiMessage(error);
        setModalShow(true);
      }
    }
    handleVeiculoDelete();
  }

  return {
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
    history,
    setModalShow,
  };
}
