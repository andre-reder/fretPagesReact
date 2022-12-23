/* eslint-disable max-len */
/* eslint-disable react/forbid-prop-types */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Card, MonthsGrid } from '../styles';

import NoData from '../../NoData';

import download from '../../../assets/images/icons/download.svg';
import calendar from '../../../assets/images/icons/calendar.svg';
import FilterRadioButton from '../../FilterRadioButtons';
import MyModal from '../../Modal';
import Loader from '../../Loader';
import { useAppContext } from '../../../contexts/auth';
import DashboardService from '../../../services/DashboardService';
import formatDate from '../../../utils/formatDate';
import ExportXlsx from '../../../utils/ExportXlsx';

export default function AdvertenciasCard({
  dashboardAdvertenciaData, selectedLocTrab, onFilteringByMonth,
}) {
  const currentDate = new Date().toJSON().slice(0, 10);
  const currentYear = currentDate.split('-')[0];
  const currentMonth = currentDate.split('-')[1];
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const monthsMap = {
    1: 'Janeiro',
    2: 'Fevereiro',
    3: 'Março',
    4: 'Abril',
    5: 'Maio',
    6: 'Junho',
    7: 'Julho',
    8: 'Agosto',
    9: 'Setembro',
    10: 'Outubro',
    11: 'Novembro',
    12: 'Dezembro',
  };
  const monthsAbvMap = {
    1: 'Jan',
    2: 'Fev',
    3: 'Mar',
    4: 'Abr',
    5: 'Mai',
    6: 'Jun',
    7: 'Jul',
    8: 'Ago',
    9: 'Set',
    10: 'Out',
    11: 'Nov',
    12: 'Dez',
  };
  const [modalShow, setModalShow] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [selectedYear, setSelectedYear] = useState(Number(currentYear));
  const [currentMonthBeingShow, setCurrentMonthBeingShow] = useState(currentMonth);
  const [currentYearBeingShow, setCurrentYearBeingShow] = useState(currentYear);
  const [isDownloadingRel, setIsDownloadingRel] = useState(false);

  const appContext = useAppContext();
  const appData = appContext.data;
  const { token, signOut } = useAppContext();
  const userData = appData.usuario;
  const { codUsu, perfilUsu } = userData;
  const codEmpresa = appData.selectedEmpresa.value;

  const downloadRel = useCallback(async () => {
    try {
      setIsDownloadingRel(true);
      const relData = await DashboardService.getRelsData({
        codUsu,
        perfilUsu,
        codEmpresa,
        token: encodeURIComponent(token),
        reqBody: JSON.stringify({
          codViagem: 0,
          codRelatorio: 5,
          dataViagens: currentDate,
          mes: currentMonthBeingShow,
          ano: currentYearBeingShow,
          dataPesquisa: currentDate,
        }),
      });
      if (!relData.validado) {
        setIsDownloadingRel(false);
        signOut();
        return;
      }
      if (relData.usuAdvertencia) {
        const usuAdvertenciaRelData = relData.usuAdvertencia.map((data) => ({
          'Local de trabalho': data.locTrab,
          CPF: data.cpf,
          Nome: data.nome,
          'Linha ida titular': data.linhaIda || 'Não possui titularidade em nenhuma linha',

          'Data ultimo embarque (linha ida titular)': (data.ultimoAcessoIda == '0001-01-01T00:00:00'
            ? 'Não foi identificado nenhum embarque'
            : formatDate(data.ultimoAcessoIda)),

          'Linha volta titular': data.linhaVolta || 'Não possui titularidade em nenhuma linha',

          'Data ultimo embarque (linha volta titular)': (data.ultimoAcessoVolta == '0001-01-01T00:00:00'
            ? 'Não foi identificado nenhum embarque'
            : formatDate(data.ultimoAcessoVolta)),

          'Tipo advertencia': data.adv,
        }));
        ExportXlsx({
          data: usuAdvertenciaRelData,
          filename: `Relatório de advertencias ${monthsAbvMap[currentMonthBeingShow]} - ${currentYearBeingShow}`,
        });
      }

      if (!relData.usuAdvertencia) {
        toast.error('Não há dados para serem baixados');
      }
    } catch (error) {
      toast.error(`Não foi possível baixar o relatório de de advertências (${error})`);
    } finally {
      setIsDownloadingRel(false);
    }
  }, [codEmpresa, codUsu, currentDate, perfilUsu, signOut, token, currentMonthBeingShow, currentYearBeingShow]);

  return (
    <>
      <Loader isLoading={isDownloadingRel} />
      <Card>
        <div className="card-title">
          <div>
            Advertências-
            {' '}
            <div>
              {monthsAbvMap[currentMonthBeingShow]}
              /
              {String(currentYearBeingShow)?.replace('20', '')}
            </div>
          </div>
          <div>
            <img
              src={calendar}
              alt="filtrarData"
              title="Filtrar por mês"
              onClick={() => setModalShow(true)}
            />
            <img src={download} alt="download" title="Baixar relatório excel" onClick={downloadRel} />
          </div>
        </div>

        {dashboardAdvertenciaData && (
        <>
          <div className="card-main">
            <div>
              {dashboardAdvertenciaData.qtdAdv}
            </div>
            <small>
              {(dashboardAdvertenciaData.qtdAdv > 1 ? 'Usuários' : 'Usuário')}
            </small>
          </div>

          <footer>
            {(!dashboardAdvertenciaData.AdvBaixou) && (
            <>
              <div className="porcentagem-negativa">
                +
                {' '}
                {dashboardAdvertenciaData.percAdv}
                %
              </div>
              <div>
                Em relação ao início da operação
              </div>
            </>
            )}
            {(dashboardAdvertenciaData.AdvBaixou) && (
            <>
              <div className="porcentagem-positiva">
                -
                {' '}
                {dashboardAdvertenciaData.percAdv}
                %
              </div>
              <div>
                Em relação à média do mês anterior
              </div>
            </>
            )}
          </footer>
        </>
        )}

        {(!dashboardAdvertenciaData) && (
        <NoData
          icon="emptyBox"
          label={(
            <>
              O local de trabalho
              {' '}
              <strong>{selectedLocTrab.label}</strong>
              {' '}
              não possui dados sobre as advertências.
            </>
                  )}
        />
        )}
      </Card>

      <MyModal
        show={modalShow}
        type="action"
        title="Filtrar advertências por mês"
        modalBody={(
          <div className="modal-body-centered">
            <div className="year-selection">
              <FilterRadioButton
                onClick={() => {
                  setSelectedYear(Number(currentYear - 1));
                  setSelectedMonth('');
                }}
                selected={selectedYear == Number(currentYear - 1)}
              >
                {String(Number(currentYear - 1))}
              </FilterRadioButton>
              <FilterRadioButton
                onClick={() => {
                  setSelectedYear(Number(currentYear));
                  setSelectedMonth('');
                }}
                selected={selectedYear == Number(currentYear)}
              >
                {currentYear}
              </FilterRadioButton>
            </div>
            <MonthsGrid>
              {months.map((month) => (
                <FilterRadioButton
                  key={month}
                  onClick={() => setSelectedMonth(month)}
                  selected={month == selectedMonth}
                  invisible={
                      Number(`${selectedYear}${month}`)
                      > Number(`${currentYear}${currentMonth}`)
                    }
                >
                  {monthsMap[month]}
                </FilterRadioButton>
              ))}
            </MonthsGrid>
          </div>
)}
        size="lg"
        onAction={async () => {
          await onFilteringByMonth({
            locTrab: selectedLocTrab.value,
            month: selectedMonth,
            year: selectedYear,
          });
          setCurrentMonthBeingShow(selectedMonth);
          setCurrentYearBeingShow(selectedYear);
          setModalShow(false);
        }}
        onClose={() => setModalShow(false)}
        actionButtonLabel="Aplicar filtro"
        closeButtonLabel="Cancelar"
      />
    </>
  );
}

AdvertenciasCard.propTypes = {
  dashboardAdvertenciaData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
  onFilteringByMonth: PropTypes.func.isRequired,
};
