import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import LinhasService from '../../../../services/LinhasService';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';

export default function useLinhasList() {
  const [linhas, setLinhas] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [apiFetched, setApiFetched] = useState(true);

  const { data, token, signOut } = useAppContext();
  const userData = data.usuario;
  const empresaData = data.selectedEmpresa;

  const [, setLinhaMapaBeingShow] = useLocalState('linhaMapaBeingShow');
  const [, setLinhaBeingDeleted] = useLocalState('linhaBeingDeleted');
  const [, setLinhaBeingEdited] = useLocalState('linhaBeingEdited');
  const [, setLinhaBeingPostedShape] = useLocalState('linhaBeingPostedShape');

  const codEmpresa = empresaData.value;
  const { codUsu, perfilUsu } = userData;

  const filteredLinhas = useMemo(() => linhas?.filter((linha) => (
    linha.codLinhaF.toLowerCase().includes(searchTerm.toLowerCase())
    || linha.letreiro.toLowerCase().includes(searchTerm.toLowerCase())
    || linha.descrLocTrab.toLowerCase().includes(searchTerm.toLowerCase())
  )), [linhas, searchTerm]);

  const loadLinhas = useCallback(async () => {
    try {
      setIsLoading(true);

      const BodyLinhasList = await LinhasService.listLinhas(
        {
          codEmpresa,
          codUsu,
          perfilUsu,
          token: encodeURIComponent(token),
        },
      );
      if (!BodyLinhasList.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      const GetLinhasList = await BodyLinhasList.linhasFretado;
      setApiFetched(true);
      setLinhas(GetLinhasList);
    } catch (error) {
      setApiFetched(false);
    } finally {
      setIsLoading(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  useEffect(() => {
    loadLinhas();
  }, [loadLinhas]);

  function handleTryAgain() {
    loadLinhas();
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  const roles = {
    0: '',
    1: <small>Ida</small>,
    2: <small className="orange">Volta</small>,
  };

  return {
    perfilUsu,
    isLoading,
    codEmpresa,
    linhas,
    apiFetched,
    searchTerm,
    handleChangeSearchTerm,
    filteredLinhas,
    roles,
    setLinhaMapaBeingShow,
    setLinhaBeingPostedShape,
    setLinhaBeingEdited,
    setLinhaBeingDeleted,
    handleTryAgain,
  };
}
