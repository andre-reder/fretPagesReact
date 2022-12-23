/* eslint-disable max-len */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable react/jsx-no-useless-fragment */
import {
  useState, useMemo, useEffect, useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import ExportXlsx from '../../../utils/ExportXlsx';

import DashboardService from '../../../services/DashboardService';
import { Card, Input, LinhasPerformanceCardStyled } from '../styles';

import NoData from '../../NoData';
import FilterRadioButton from '../../FilterRadioButtons';

import download from '../../../assets/images/icons/download.svg';
import maps from '../../../assets/images/icons/maps.svg';
import boarding from '../../../assets/images/icons/boarding.svg';
import useLocalState from '../../../hooks/useLocalState';
import Loader from '../../Loader';
import { useAppContext } from '../../../contexts/auth';

export default function LinhasPerformanceCard({
  dashboardLinhasPerformanceData,
  onFilteringByDate,
  selectedLocTrab,
}) {
  const currentDate = new Date().toJSON().slice(0, 10);

  const [isLinhasPerformanceFilterLoading, setIsLinhasPerformanceFilterLoading] = useState(false);
  const [isDownloadingRel, setIsDownloadingRel] = useState(false);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPontoEquilibrioStatus, setSelectedPontoEquilibrioStatus] = useState('');
  const [selectedDate, setSelectedDate] = useState(currentDate);
  const [currentDateBeingShow, setCurrentDateBeingShow] = useState(currentDate);

  const appContext = useAppContext();
  const appData = appContext.data;
  const { token, signOut } = useAppContext();
  const userData = appData.usuario;
  const { codUsu, perfilUsu } = userData;
  const codEmpresa = appData.selectedEmpresa.value;

  const [, setLinhaMapaFromDashboardBeingShow] = useLocalState('linhaMapaFromDashboardBeingShow');

  const formatedCurrentDateBeingShow = useMemo(() => {
    const day = currentDateBeingShow.split('-')[2];
    const month = currentDateBeingShow.split('-')[1];
    const year = currentDateBeingShow.split('-')[0];
    return `${day}/${month}/${year}`;
  }, [currentDateBeingShow]);

  const filteredLinhas = useMemo(() => dashboardLinhasPerformanceData?.filter((linha) => (
    (
      linha.letreiro.toLowerCase().includes(searchTerm.toLowerCase())
    || linha.routeID.split('+')[1].toLowerCase().includes(searchTerm.toLowerCase())
    )
    && (
      String(linha.corPercOcupacao).includes(selectedPontoEquilibrioStatus)
    )
  )), [dashboardLinhasPerformanceData, searchTerm, selectedPontoEquilibrioStatus]);

  const downloadUsersRel = useCallback(async (codViagem, codLinha) => {
    try {
      setIsDownloadingRel(true);
      const relData = await DashboardService.getRelsData({
        codUsu,
        perfilUsu,
        codEmpresa,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          codViagem,
          codRelatorio: 1,
          dataViagens: currentDate,
        }),
      });
      if (!relData.validado) {
        setIsDownloadingRel(false);
        signOut();
        return;
      }
      if (relData.usuEmbarcados) {
        const usersRelData = relData.usuEmbarcados.map((data) => {
          const dayEmbarque = data.dataEmb.split('T')[0].split('-')[2];
          const monthEmbarque = data.dataEmb.split('T')[0].split('-')[1];
          const yearEmbarque = data.dataEmb.split('T')[0].split('-')[0];
          return (
            {
              Linha: data.linha,
              'Usuario Embarcado': data.nome,
              'Sequência de embarque': data.seq,
              'Local de embarque': data.localEmb,
              'Dia do embarque': `${dayEmbarque}/${monthEmbarque}/${yearEmbarque}`,
              'Hora do embarque': data.dataEmb.split('T')[1].split('.')[0],
              'Titular | Avulso': data.statusUsu,
              'Linha titular': data.linhaOriginal,
              'Canal de registro': data.registro,

              'Valor VT/dia': data.valorVTDia.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
            }
          );
        });
        ExportXlsx({
          data: usersRelData,
          filename: `Embarcados na linha ${codLinha} em ${formatedCurrentDateBeingShow.replaceAll('/', '-')} emp${codEmpresa}`,
        });
      }

      if (!relData.usuEmbarcados) {
        toast.error('Não há dados para serem baixados');
      }
    } catch (error) {
      toast.error(`Não foi possível baixar o relatório (${error})`);
    } finally {
      setIsDownloadingRel(false);
    }
  }, [perfilUsu, codUsu, currentDate, codEmpresa, formatedCurrentDateBeingShow, signOut, token]);

  const downloadTripsRel = useCallback(async () => {
    try {
      setIsDownloadingRel(true);
      const relData = await DashboardService.getRelsData({
        codUsu,
        perfilUsu,
        codEmpresa,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          codViagem: 0,
          codRelatorio: 2,
          dataViagens: currentDateBeingShow,
        }),
      });
      if (!relData.validado) {
        setIsDownloadingRel(false);
        signOut();
        return;
      }
      if (relData.resumoLinha) {
        const tripsRelData = relData.resumoLinha.map((data) => ({
          Linha: data.linha,
          Capacidade: data.capacidade,
          Ocupação: data.ocupacao,
          Titulares: data.titulares,
          Avulsos: data.avulsos,
          'Usuários de VT': `${data.percUsuVT}%`,

          'Custo da linha': data.valLInha.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

          'Custo de VT': data.custoVT.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

          'Custo Fret+VT': data.custoVtFreta.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

          'Custo por usuário': data.custoUso.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        }));
        ExportXlsx({
          data: tripsRelData,
          filename: `Viagens do dia ${formatedCurrentDateBeingShow.replaceAll('/', '-')} emp${codEmpresa}`,
        });
      }

      if (!relData.resumoLinha) {
        toast.error('Não há dados para serem baixados');
      }
    } catch (error) {
      toast.error(`Não foi possível baixar o relatório (${error})`);
    } finally {
      setIsDownloadingRel(false);
    }
  }, [perfilUsu, codUsu, currentDateBeingShow, codEmpresa, formatedCurrentDateBeingShow, signOut, token]);

  function handleChangeSearchTerm(event) {
    setSearchTerm(event.target.value);
  }

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  useEffect(() => {
    setSelectedDate(currentDate);
    setCurrentDateBeingShow(currentDate);
  }, [currentDate]);

  return (
    <>
      <Loader isLoading={isDownloadingRel} />
      {(!isLinhasPerformanceFilterLoading) && (
      <Card justifyContent={dashboardLinhasPerformanceData ? 'space-between' : 'center'}>
        <div className="card-title-linhasP">
          <div>Linhas - Performance</div>
        </div>

        <div className="card-filter-linhasP">
          <div className="data-filter">
            Data:
            <input type="date" value={selectedDate} onChange={handleDateChange} />
            <button
              type="button"
              onClick={async () => {
                setIsLinhasPerformanceFilterLoading(true);
                await onFilteringByDate({
                  locTrab: selectedLocTrab.value,
                  date: selectedDate,
                });
                setIsLinhasPerformanceFilterLoading(false);
                setCurrentDateBeingShow(selectedDate);
              }}
            >
              Aplicar filtro
            </button>
          </div>

          {dashboardLinhasPerformanceData && (
          <>
            <div>
              <Input placeholder="Pesquisar Linha" onChange={handleChangeSearchTerm} />
            </div>
            <div className="radio-buttons">
              <FilterRadioButton
                onClick={() => setSelectedPontoEquilibrioStatus('')}
                selected={selectedPontoEquilibrioStatus === ''}
              >
                Todos
              </FilterRadioButton>
              <FilterRadioButton
                onClick={() => setSelectedPontoEquilibrioStatus('1')}
                selected={selectedPontoEquilibrioStatus === '1'}
              >
                Acima PE
              </FilterRadioButton>
              <FilterRadioButton
                onClick={() => setSelectedPontoEquilibrioStatus('3')}
                selected={selectedPontoEquilibrioStatus === '3'}
              >
                Abaixo PE
              </FilterRadioButton>
            </div>
            <div className="download">
              <img
                src={download}
                alt="download"
                title={`Relatório de todas as viagens do dia ${formatedCurrentDateBeingShow}`}
                onClick={() => downloadTripsRel()}
              />
            </div>
          </>
          )}
        </div>

        {dashboardLinhasPerformanceData && (
          <div className="card-main">
            {filteredLinhas.map((linha) => (
              <LinhasPerformanceCardStyled key={linha.routeID}>
                <div className="info-linhas">
                  {`${linha.routeID.split('+')[1]} (${linha.sentido})`}
                  <label>
                    {linha.letreiro.replace('.kml', '')}
                  </label>
                </div>

                <div className="info-linhas">
                  {linha.capacidade}
                  <label>
                    Lugares
                  </label>
                </div>

                <div className="info-linhas">
                  {linha.ocupacao}
                  <label>
                    Ocupação D1
                  </label>
                </div>

                <div className="info-linhas">
                  {linha.titulares}
                  <label>
                    {linha.titulares == 1 ? 'Titular' : 'Titulares'}
                  </label>
                </div>

                <div className="info-linhas">
                  {linha.avulsos}
                  <label>
                    {linha.avulsos == 1 ? 'Avulso' : 'Avulsos'}
                  </label>
                </div>

                <div className="actions">
                  <Link
                    to="/dashboard/linhaMapa"
                    onClick={() => {
                      setLinhaMapaFromDashboardBeingShow({
                        codLinha: linha.routeID.split('+')[1],
                        letreiro: linha.letreiro,
                        routeID: linha.routeID,
                        date: currentDateBeingShow,
                      });
                    }}
                  >
                    <img src={maps} alt="Maps" title="Mapa da linha e usuários" />
                  </Link>

                  <img
                    src={boarding}
                    alt="User"
                    title={`Relatório de embarcados da linha ${linha.routeID.split('+')[1]} no dia ${formatedCurrentDateBeingShow}`}
                    onClick={() => downloadUsersRel(linha.codviagem, linha.routeID.split('+')[1])}
                  />
                  {linha.corPercOcupacao == 1 && (
                    <div className="pe-green" title="Ponto de equilíbrio">
                      {`${linha.percPontoEq} %`}
                    </div>
                  )}
                  {linha.corPercOcupacao == 2 && (
                    <div className="pe-orange" title="Ponto de equilíbrio">
                      {`${linha.percPontoEq} %`}
                    </div>
                  )}
                  {linha.corPercOcupacao == 3 && (
                    <div className="pe-red" title="Ponto de equilíbrio">
                      {`${linha.percPontoEq} %`}
                    </div>
                  )}
                </div>
              </LinhasPerformanceCardStyled>
            ))}
          </div>
        )}

        {(!dashboardLinhasPerformanceData) && (
          <NoData
            icon="emptyBox"
            label={(
              <>
                Parece que não houve nenhuma viagem em
                {' '}
                <strong>{formatedCurrentDateBeingShow}</strong>
                {' '}
                No local de trabaho
                {' '}
                <strong>
                  {selectedLocTrab.label}
                  .
                </strong>
                <br />
                Tente alterar a data no campo acima, ou o local de trabalho selecionado
                e clicar no botão
                <br />
                <strong>Aplicar Filtro</strong>
              </>
            )}
          />
        )}

        {(dashboardLinhasPerformanceData && filteredLinhas.length === 0 && selectedPontoEquilibrioStatus === '1')
        && (
          <NoData
            icon="searchNotFound"
            label={(
              <>
                Não houve nenhuma viagem com status
                {' '}
                <strong>acima do ponto de equilíbrio</strong>
                {' '}
                no local de trabalho
                {' '}
                <strong>{selectedLocTrab.label}</strong>
                {' '}
                em
                {' '}
                <strong>{formatedCurrentDateBeingShow}</strong>
              </>
      )}
          />
        )}

        {(dashboardLinhasPerformanceData && filteredLinhas.length === 0 && selectedPontoEquilibrioStatus === '3')
        && (
          <NoData
            icon="searchNotFound"
            label={(
              <>
                Não houve nenhuma viagem com status
                {' '}
                <strong>abaixo do ponto de equilíbrio</strong>
                {' '}
                no local de trabalho
                {' '}
                <strong>{selectedLocTrab.label}</strong>
                {' '}
                em
                {' '}
                <strong>{formatedCurrentDateBeingShow}</strong>
              </>
      )}
          />
        )}

        {(dashboardLinhasPerformanceData && filteredLinhas.length === 0 && selectedPontoEquilibrioStatus === '')
        && (
          <NoData
            icon="searchNotFound"
            label={(
              <>
                Nenhum resultado foi encontrado para
                {' '}
                <strong>{searchTerm}</strong>
              </>
      )}
          />
        )}
      </Card>
      )}
    </>
  );
}

LinhasPerformanceCard.propTypes = {
  dashboardLinhasPerformanceData: PropTypes.any.isRequired,
  onFilteringByDate: PropTypes.func.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
