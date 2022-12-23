import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import UsuariosService from '../../../services/UsuariosService';
import useLocalState from '../../../hooks/useLocalState';
import { useAppContext } from '../../../contexts/auth';

export default function useDeleteUsuario() {
  const [userBeingDeleted] = useLocalState('userBeingDeleted');
  const { data, signOut, token } = useAppContext();
  const userData = data.usuario;
  const empresaData = data.selectedEmpresa;
  const codEmpresa = empresaData.value;
  const { codUsu, perfilUsu, usuario } = userData;
  const { codUsuAcesso } = userBeingDeleted;
  const history = useHistory();
  const nome = userBeingDeleted.name;
  const perfilUsuCad = userBeingDeleted.userType;
  const { cpf } = userBeingDeleted;
  const { email } = userBeingDeleted;

  const [isLoading, setIsLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [success, setSuccess] = useState(false);
  const [apiMessage, setApiMessage] = useState('');

  const roles = {
    0: '',
    1: <small>Admin</small>,
    2: <small className="green">Padrão</small>,
    3: <small className="orange">Motorista</small>,
  };

  function handleButtonClick() {
    async function handleUserDelete() {
      try {
        setIsLoading(true);

        const bodyDeletedUser = await UsuariosService.deleteUsuario(
          {
            codUsu,
            perfilUsu,
            usuario,
            reqBody: JSON.stringify({
              codEmpresa,
              codUsuAcesso,
              tk: token,
            }),
          },
        );
        setIsLoading(false);
        setApiMessage(bodyDeletedUser.msg);
        if (bodyDeletedUser.codigo === 1) {
          setSuccess(true);
        }
        if (!bodyDeletedUser.validado) {
          signOut();
        }
        setModalShow(true);
      } catch (error) {
        setIsLoading(false);
        setApiMessage(error);
        setModalShow(true);
      }
    }
    handleUserDelete();
  }

  return {
    isLoading,
    nome,
    perfilUsuCad,
    roles,
    cpf,
    email,
    handleButtonClick,
    modalShow,
    success,
    apiMessage,
    history,
    setModalShow,
  };
}
