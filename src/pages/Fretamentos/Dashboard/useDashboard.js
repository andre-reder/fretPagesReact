import {
  useCallback, useEffect, useState,
} from 'react';
import { toast } from 'react-toastify';
import DashboardService from '../../../services/DashboardService';
import { useAppContext } from '../../../contexts/auth';

export default function useDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLtLoading, setIsLtLoading] = useState(true);
  const [isAdvertenciasFilterLoading, setIsAdvertenciasFilterLoading] = useState(false);
  const [isLinhasPerformanceFilterLoading, setIsLinhasPerformanceFilterLoading] = useState(false);
  const [locTrabs, setLocTrabs] = useState([{}]);
  const [selectedLocTrab, setSelectedLocTrab] = useState({ value: 0, label: 'Todos' });
  const [doesListLtExists, setDoesListLtExists] = useState(false);
  const [apiLtFetched, setApiLtFetched] = useState(false);
  const [apiDashboardFetched, setApiDashboardFetched] = useState(false);

  const [startDate, setStartDate] = useState({});
  const [selectedStartMonth, setSelectedStartMonth] = useState('');
  const [selectedStartYear, setSelectedStartYear] = useState('');
  const [selectStartDateModalShow, setSelectStartDateModalShow] = useState(false);

  const [dashboardOfertaData, setDashboardOfertaData] = useState({});
  const [dashboardCustoData, setDashboardCustoData] = useState({});
  const [dashboardLinhasData, setDashboardLinhasData] = useState({});
  const [dashboardPerfilUsuData, setDashboardPerfilUsuData] = useState({});
  const [dashboardAdvertenciaData, setDashboardAdvertenciaData] = useState({});
  const [dashboardUsamVtData, setDashboardUsamVtData] = useState({});
  const [dashboardEvolucaoVtData, setDashboardEvolucaoVtData] = useState([]);
  const [dashboardEvolucaoFretaData, setDashboardEvolucaoFretaData] = useState([]);
  const [dashboardLinhasPerformanceData, setDashboardLinhasPerformanceData] = useState([]);

  const { data, token, signOut } = useAppContext();
  const empresaData = data.selectedEmpresa;
  const userData = data.usuario;
  const codEmpresa = empresaData.value;
  const { codUsu, perfilUsu } = userData;

  const getLocTrab = useCallback(async () => {
    try {
      setIsLtLoading(true);
      const bodyLocTrabs = await DashboardService.getLocTrab({
        codEmpresa,
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
      });
      if (!bodyLocTrabs.validado) {
        setIsLtLoading(false);
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
    setIsLtLoading(false);
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  const getDashboardData = useCallback(async (codLocTrab) => {
    try {
      setIsLoading(true);
      const bodyDashboardData = await DashboardService.getDashboardData({
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          codEmpresa,
          codLocTrab,
          tipoResultado: 0,
          dataPesquisaIni: new Date().toJSON().slice(0, 10),
          mes: 0,
          ano: 0,
        }),
      });
      if (!bodyDashboardData.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      setDashboardOfertaData(bodyDashboardData?.oferta);
      setDashboardCustoData(bodyDashboardData?.custo);
      setDashboardLinhasData(bodyDashboardData?.linhas);
      setDashboardPerfilUsuData(bodyDashboardData?.perfilUsu);
      setDashboardAdvertenciaData(bodyDashboardData?.advertencia);
      setDashboardUsamVtData(bodyDashboardData?.usamVT);
      setDashboardEvolucaoVtData(bodyDashboardData?.evolucaoVT);
      setDashboardEvolucaoFretaData(bodyDashboardData?.evolucaoFreta);
      setDashboardLinhasPerformanceData(bodyDashboardData?.linhasPerform);
      setApiDashboardFetched(true);
    } catch {
      setApiDashboardFetched(false);
    } finally {
      setIsLoading(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  const filterAdvertenciasByMonth = useCallback(async ({
    locTrab,
    month,
    year,
  }) => {
    try {
      setIsAdvertenciasFilterLoading(true);
      const bodyFilteredAdvertenciasData = await DashboardService.getDashboardData({
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          codEmpresa,
          codLocTrab: locTrab,
          tipoResultado: 2,
          dataPesquisaIni: new Date().toJSON().slice(0, 10),
          mes: month,
          ano: year,
        }),
      });
      if (!bodyFilteredAdvertenciasData.validado) {
        setIsAdvertenciasFilterLoading(false);
        signOut();
        return;
      }
      setDashboardAdvertenciaData(bodyFilteredAdvertenciasData?.advertencia);
      setApiDashboardFetched(true);
    } catch {
      setApiDashboardFetched(false);
    } finally {
      setIsAdvertenciasFilterLoading(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  const filterLinhasPerformanceByDate = useCallback(async ({
    locTrab,
    date,
  }) => {
    try {
      setIsLinhasPerformanceFilterLoading(true);
      const bodyFilteredLinhasPerformanceData = await DashboardService.getDashboardData({
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          codEmpresa,
          codLocTrab: locTrab,
          tipoResultado: 1,
          dataPesquisaIni: date,
          mes: 0,
          ano: 0,
        }),
      });
      if (!bodyFilteredLinhasPerformanceData.validado) {
        setIsLinhasPerformanceFilterLoading(false);
        signOut();
        return;
      }
      setDashboardLinhasPerformanceData(bodyFilteredLinhasPerformanceData?.linhasPerform);
      setApiDashboardFetched(true);
    } catch {
      setApiDashboardFetched(false);
    } finally {
      setIsLinhasPerformanceFilterLoading(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  const getStartDate = useCallback(async () => {
    try {
      setIsLoading(true);
      const bodyStartDate = await DashboardService.getStartDate({
        codEmpresa,
        codUsu,
        perfilUsu,
        token: encodeURIComponent(token),
      });
      if (!bodyStartDate.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      setStartDate({
        month: bodyStartDate.mesInicioServ,
        year: bodyStartDate.anoInicioServ,
      });
    } catch (error) {
      if (codEmpresa) {
        toast.error(`Não foi possível recuperar a data de início do serviço (${error})`);
      }
    } finally {
      setIsLoading(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token]);

  const loadDashboard = useCallback(async () => {
    setIsLoading(true);
    await getLocTrab();
    await getStartDate();
    await getDashboardData(selectedLocTrab?.value || 0);
    setIsLoading(false);
  }, [getLocTrab, getStartDate, getDashboardData, selectedLocTrab.value]);

  const chooseStartDate = useCallback(async () => {
    try {
      setSelectStartDateModalShow(false);
      setIsLoading(true);
      const bodyChoosedStartDate = await DashboardService.chooseStartDate({
        codUsu,
        perfilUsu,
        codEmpresa,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          servico: 16,
          mes: selectedStartMonth,
          ano: selectedStartYear,
        }),
      });
      if (!bodyChoosedStartDate.validado) {
        setIsLoading(false);
        signOut();
        return;
      }
      if (bodyChoosedStartDate.codigo) {
        loadDashboard();
        toast.success('Data de início definida com sucesso');
        return;
      }
      toast.error(`Não foi possível configurar a data de início (${bodyChoosedStartDate.msg})`);
    } catch (error) {
      toast.error(`Não foi possível configurar a data de início (${error})`);
    } finally {
      setIsLoading(false);
    }
  }, [loadDashboard,
    codEmpresa,
    codUsu,
    perfilUsu,
    signOut,
    token,
    selectedStartMonth,
    selectedStartYear]);

  const handleLocTrabChange = ({ value, label }) => {
    setSelectedLocTrab({ value, label });
    getDashboardData(value);
  };

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  function handleTryGetLocTrabsAgain() {
    getLocTrab();
  }

  return {
    perfilUsu,
    codEmpresa,
    doesListLtExists,
    apiLtFetched,
    isLoading,
    selectedLocTrab,
    apiDashboardFetched,
    dashboardOfertaData,
    dashboardCustoData,
    dashboardLinhasData,
    dashboardAdvertenciaData,
    filterAdvertenciasByMonth,
    dashboardUsamVtData,
    dashboardPerfilUsuData,
    dashboardEvolucaoFretaData,
    dashboardEvolucaoVtData,
    dashboardLinhasPerformanceData,
    filterLinhasPerformanceByDate,
    isAdvertenciasFilterLoading,
    isLinhasPerformanceFilterLoading,
    locTrabs,
    handleLocTrabChange,
    handleTryGetLocTrabsAgain,
    setSelectedLocTrab,
    isLtLoading,
    setIsLtLoading,
    startDate,
    selectStartDateModalShow,
    setSelectedStartYear,
    setSelectedStartMonth,
    selectedStartYear,
    selectedStartMonth,
    chooseStartDate,
    setSelectStartDateModalShow,
  };
}
