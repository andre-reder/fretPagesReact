import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import UsuariosService from '../../../services/UsuariosService';
import useLocalState from '../../../hooks/useLocalState';
import { useAppContext } from '../../../contexts/auth';

export default function useUsuariosList() {
  const [Usuarios, setUsuarios] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [apiFetched, setApiFetched] = useState(true);

  const [, setUserBeingEdited] = useLocalState('userBeingEdited');
  const [, setUserBeingDeleted] = useLocalState('userBeingDeleted');
  const {
    data, token, signOut,
  } = useAppContext();
  const codEmpresa = data.selectedEmpresa.value;
  const { codUsu, perfilUsu } = data.usuario;

  const filteredUsuarios = useMemo(() => Usuarios?.filter((usuario) => (
    usuario.nome.toLowerCase().includes(searchTerm.toLowerCase())
    || usuario.cpf.toLowerCase().includes(searchTerm.toLowerCase())
  )), [Usuarios, searchTerm]);

  const loadUsuarios = useCallback(async () => {
    try {
      setIsLoading(true);

      const BodyUsuariosList = await UsuariosService.listUsuarios(
        {
          codEmpresa,
          codUsu,
          perfilUsu,
          tk: encodeURIComponent(token),
        },
      );
      const GetUsuariosList = await BodyUsuariosList.usuarios;
      setApiFetched(true);
      if (!BodyUsuariosList.validado) {
        signOut();
        return;
      }
      setUsuarios(GetUsuariosList);
    } catch (error) {
      setApiFetched(false);
    } finally {
      setIsLoading(false);
    }
  }, [codUsu, perfilUsu, token, codEmpresa, signOut]);

  function handleTryAgain() {
    loadUsuarios();
  }

  useEffect(() => {
    loadUsuarios();
  }, [loadUsuarios, codEmpresa]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const roles = {
    0: '',
    1: <small>Administrador</small>,
    2: <small className="green">Padrão</small>,
    3: <small className="orange">Motorista</small>,
  };

  const roles2 = {
    0: 'Não definido',
    1: 'Administrador',
    2: 'Padrão',
    3: 'Motorista',
  };

  return {
    perfilUsu,
    isLoading,
    codEmpresa,
    Usuarios,
    apiFetched,
    searchTerm,
    handleChangeSearchTerm,
    filteredUsuarios,
    setUserBeingEdited,
    roles2,
    setUserBeingDeleted,
    handleTryAgain,
    roles,
  };
}
