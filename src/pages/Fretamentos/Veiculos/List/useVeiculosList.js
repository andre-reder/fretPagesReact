import {
  useEffect, useState, useMemo, useCallback,
} from 'react';
import VeiulosService from '../../../../services/VeiculosService';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';

export default function useVeiculosList() {
  const {
    data, token, signOut,
  } = useAppContext();
  const [Veiculos, setVeiculos] = useState([]);
  const [BodyReqVeiculosList, setBodyReqVeiculosList] = useState({});
  const [apiFetched, setApiFetched] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [modalShow, setModalShow] = useState(false);

  const [, setVeiculoQrCodeBeingShow] = useLocalState('veiculoQrCodeBeingShow');
  const [, setVeiculoBeingEdited] = useLocalState('veiculoBeingEdited');
  const [, setVeiculoBeingDeleted] = useLocalState('veiculoBeingDeleted');

  const codEmpresa = data.selectedEmpresa.value;
  const { codUsu, perfilUsu } = data.usuario;

  const filteredVeiculos = useMemo(() => Veiculos?.filter((veiculo) => (
    veiculo.codVeiculo.toLowerCase().includes(searchTerm.toLowerCase())
  )), [Veiculos, searchTerm]);

  const roles = {
    Ônibus: <small>Ônibus</small>,
    Van: <small className="green">Van</small>,
    Micro: <small className="orange">Micro</small>,
    Outros: <small className="gray">Outros</small>,
  };

  const loadVeiculos = useCallback(async () => {
    try {
      setIsLoading(true);

      const BodyVeiculosList = await VeiulosService.listVeiculos(
        {
          codEmpresa,
          codUsu,
          perfilUsu,
          token: encodeURIComponent(token),
        },
      );
      if (!BodyVeiculosList.validado) {
        signOut();
        return;
      }
      const GetVeiculosList = await BodyVeiculosList.veiculos;
      setApiFetched(true);

      setVeiculos(GetVeiculosList);
      setBodyReqVeiculosList(BodyVeiculosList);
    } catch (error) {
      setApiFetched(false);
    } finally {
      setIsLoading(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  useEffect(() => {
    loadVeiculos();
  }, [loadVeiculos]);

  function handleTryAgain() {
    loadVeiculos();
  }

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  return {
    perfilUsu,
    isLoading,
    codEmpresa,
    Veiculos,
    apiFetched,
    searchTerm,
    handleChangeSearchTerm,
    filteredVeiculos,
    setModalShow,
    handleTryAgain,
    modalShow,
    BodyReqVeiculosList,
    setIsLoading,
    setVeiculoQrCodeBeingShow,
    setVeiculoBeingEdited,
    setVeiculoBeingDeleted,
    roles,
  };
}
