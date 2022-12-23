import {
  useCallback, useEffect, useState, useMemo,
} from 'react';
import PassageirosService from '../../../../services/PassageirosService';
import VeiculosService from '../../../../services/VeiculosService';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';

export default function usePassageirosList() {
  const [isLoading, setIsLoading] = useState(true);
  const [locTrabs, setLocTrabs] = useState([{}]);
  const [passageirosList, setPassageirosList] = useState([{}]);
  const [selectedLocTrab, setSelectedLocTrab] = useState(false);
  const [doesListLtExists, setDoesListLtExists] = useState(false);
  const [doesPassageirosListExists, setDoesPassageirosListExists] = useState(false);
  const [apiLtFetched, setApiLtFetched] = useState(false);
  const [apiPassageirosFetched, setApiPassageirosFetched] = useState(false);

  const [searchNomeTerm, setSearchNomeTerm] = useState('');
  const [searchCpfTerm, setSearchCpfTerm] = useState('');
  const [searchConsultaTerm, setSearchConsultaTerm] = useState('');
  const [searchLinhaIdaTerm, setSearchLinhaIdaTerm] = useState('');
  const [searchLinhaVoltaTerm, setSearchLinhaVoltaTerm] = useState('');
  const [searchStatusTerm, setSearchStatusTerm] = useState('');

  const { data, token, signOut } = useAppContext();
  const empresaData = data.selectedEmpresa;
  const userData = data.usuario;

  const [currentLocTrabAtPassageirosPage, setCurrentLocTrabAtPassageirosPage] = useLocalState('currentLocTrabAtPassageirosPage');
  const [, setPassageiroRotBeingShow] = useLocalState('passageiroRotBeingShow');
  const [, setPassageiroBeingEdited] = useLocalState('passageiroBeingEdited');
  const [, setPassageiroBeingDeleted] = useLocalState('passageiroBeingDeleted');

  const codEmpresa = empresaData.value;
  const { codUsu, perfilUsu } = userData;

  const filteredPassageiros = useMemo(() => passageirosList?.filter((passageiro) => (
    passageiro?.nome?.toLowerCase().startsWith(searchNomeTerm.toLowerCase())
    && passageiro?.linhaIda?.toLowerCase().startsWith(searchLinhaIdaTerm.toLowerCase())
    && passageiro?.linhaVolta?.toLowerCase().startsWith(searchLinhaVoltaTerm.toLowerCase())
    && passageiro?.statusCad?.toLowerCase().startsWith(searchStatusTerm.toLowerCase())
    && passageiro?.cpf?.toLowerCase().replace('.', '').replace('-', '').startsWith(searchCpfTerm.toLowerCase())
    && String(passageiro?.codConsulta)?.startsWith(searchConsultaTerm.toLowerCase())
  )), [
    passageirosList,
    searchNomeTerm,
    searchLinhaIdaTerm,
    searchLinhaVoltaTerm,
    searchStatusTerm,
    searchCpfTerm,
    searchConsultaTerm]);

  const getLocTrab = useCallback(async () => {
    try {
      setIsLoading(true);
      const bodyLocTrabs = await VeiculosService.getLocTrab({
        codEmpresa,
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
      });
      if (!bodyLocTrabs.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      const locTrabsData = await bodyLocTrabs.locaisTrabalho;
      const ltOptions = await locTrabsData?.map((lt) => (
        { value: lt.codLocTrab, label: lt.descrLocTrab }
      ));
      setLocTrabs(ltOptions);
      setDoesListLtExists(bodyLocTrabs.listaLT);
      setApiLtFetched(true);
    } catch (error) {
      setApiLtFetched(false);
    }
    setIsLoading(false);
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  const getPassageiros = useCallback(async (codLocTrab) => {
    try {
      setIsLoading(true);
      const bodyPassageirosList = await PassageirosService.listPassageiros({
        codEmpresa,
        codLocTrab,
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
      });
      if (!bodyPassageirosList.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      const passageirosData = bodyPassageirosList?.usuariosLinhasFreta;
      setPassageirosList(passageirosData);
      setDoesPassageirosListExists(bodyPassageirosList.listaUsu);
      setApiPassageirosFetched(true);
    } catch {
      setApiPassageirosFetched(false);
    }
    setIsLoading(false);
  }, [codEmpresa, perfilUsu, codUsu, token, signOut]);

  const handleLocTrabChange = ({ value, label }) => {
    setSelectedLocTrab({ value, label });
    getPassageiros(value);
  };

  useEffect(() => {
    getLocTrab();
  }, [getLocTrab]);

  useEffect(() => {
    if (currentLocTrabAtPassageirosPage) {
      setSelectedLocTrab({ value: currentLocTrabAtPassageirosPage });
      getPassageiros(currentLocTrabAtPassageirosPage);
    }
  }, [currentLocTrabAtPassageirosPage, getPassageiros]);

  function handleChangeSearchNomeTerm(event) {
    setSearchNomeTerm(event.target.value);
  }

  function handleChangeSearchCpfTerm(event) {
    setSearchCpfTerm(event.target.value);
  }

  function handleChangeSearchConsultaTerm(event) {
    setSearchConsultaTerm(event.target.value);
  }

  function handleChangeSearchLinhaIdaTerm(event) {
    setSearchLinhaIdaTerm(event.target.value);
  }

  function handleChangeSearchLinhaVoltaTerm(event) {
    setSearchLinhaVoltaTerm(event.target.value);
  }

  function handleChangeSearchStatusTerm(event) {
    setSearchStatusTerm(event.target.value);
  }

  function handleTryGetLocTrabsAgain() {
    getLocTrab();
  }

  function handleTryGetPassageirosAgain(value) {
    getPassageiros(value);
  }

  return {
    isLoading,
    locTrabs,
    selectedLocTrab,
    doesListLtExists,
    doesPassageirosListExists,
    apiLtFetched,
    apiPassageirosFetched,
    setCurrentLocTrabAtPassageirosPage,
    setPassageiroRotBeingShow,
    setPassageiroBeingEdited,
    setPassageiroBeingDeleted,
    filteredPassageiros,
    handleLocTrabChange,
    handleChangeSearchNomeTerm,
    handleChangeSearchCpfTerm,
    handleChangeSearchConsultaTerm,
    handleChangeSearchLinhaIdaTerm,
    handleChangeSearchLinhaVoltaTerm,
    handleChangeSearchStatusTerm,
    handleTryGetLocTrabsAgain,
    handleTryGetPassageirosAgain,
    perfilUsu,
    codEmpresa,
    searchNomeTerm,
    searchCpfTerm,
    searchConsultaTerm,
    searchLinhaIdaTerm,
    searchLinhaVoltaTerm,
    searchStatusTerm,
  };
}
