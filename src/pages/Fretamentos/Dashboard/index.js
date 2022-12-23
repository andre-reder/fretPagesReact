/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-no-comment-textnodes */

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { motion } from 'framer-motion';

import Transitions from '../../../components/Transition';

import Sidebar from '../../../components/Sidebar';
import Loader from '../../../components/Loader';
import NoData from '../../../components/NoData';
import AppHeader from '../../../components/AppHeader';
import MyModal from '../../../components/Modal';

import LocTrabsRadioButtons from '../../../components/LocTrabsRadioButtons';
import OfertasCard from '../../../components/DashboardCards/OfertasCard';
import CustoUsuarioCard from '../../../components/DashboardCards/CustoUsuarioCard';
import LinhasCard from '../../../components/DashboardCards/LinhasCard';
import AdvertenciasCard from '../../../components/DashboardCards/AdvertenciasCard';
import UsamVtCard from '../../../components/DashboardCards/UsamVtCard';
import PerfilUsuCard from '../../../components/DashboardCards/PerfilUsuCard';
import EvolucaoVtFretaCard from '../../../components/DashboardCards/EvolucaoVtFretaCard';
import LinhasPerformanceCard from '../../../components/DashboardCards/LinhasPerformanceCard';

import useDashboard from './useDashboard';
import { SecondaryButton } from '../../../components/FilterRadioButtons/styles';
import FilterRadioButton from '../../../components/FilterRadioButtons';
import { MonthsGrid } from '../../../components/DashboardCards/styles';

export default function Dashboard() {
  const {
    isLoading,
    perfilUsu,
    codEmpresa,
    doesListLtExists,
    apiLtFetched,
    isLtLoading,
    handleLocTrabChange,
    handleTryGetLocTrabsAgain,
    locTrabs,
    selectedLocTrab,
    isAdvertenciasFilterLoading,
    isLinhasPerformanceFilterLoading,
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
    startDate,
    selectStartDateModalShow,
    setSelectedStartYear,
    setSelectedStartMonth,
    selectedStartYear,
    selectedStartMonth,
    chooseStartDate,
    setSelectStartDateModalShow,
  } = useDashboard();

  const isEmpresaSelected = !!codEmpresa;
  const isAnyLocTrabSelected = (!!selectedLocTrab || selectedLocTrab === 0)
  && (apiDashboardFetched && doesListLtExists && !isLoading);
  const isServiceAlredyStarted = (!!startDate.month && !!startDate.year);
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
  const isCaptaUser = (perfilUsu !== 10 && perfilUsu !== 11 && perfilUsu !== 12);

  return (
    <>
      <AppHeader isEmpresaSelectDisabled={!isCaptaUser} />
      <Sidebar active="Dashboard" />
      <Transitions>
        <Loader
          isLoading={
            isLoading || isAdvertenciasFilterLoading || isLinhasPerformanceFilterLoading
            }
        />

        {isEmpresaSelected && isServiceAlredyStarted && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.05, type: 'tween', stiffness: 10 }}
              className="dashboardHeader"
            >
              <LocTrabsRadioButtons
                isLoading={isLtLoading}
                doesListLtExists={doesListLtExists}
                apiLtFetched={apiLtFetched}
                handleLocTrabChange={handleLocTrabChange}
                handleTryGetLocTrabsAgain={handleTryGetLocTrabsAgain}
                selectedLocTrab={selectedLocTrab}
                locTrabs={locTrabs}
                showAllButton
              />
              <div>
                Serviço iniciado em
                {' '}
                {`${monthsMap[startDate.month]} de ${startDate.year}`}
              </div>
            </motion.div>

            {(isAnyLocTrabSelected && !isLoading) && (
            <Container>
              <Row xs={1} md={4} lg={5}>
                {/* oferta */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.15, type: 'tween', stiffness: 10000 }}
                  >
                    <OfertasCard
                      dashboardOfertaData={dashboardOfertaData}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>

                {/* custoUsuario */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, type: 'tween', stiffness: 10000 }}
                  >
                    <CustoUsuarioCard
                      dashboardCustoData={dashboardCustoData}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>

                {/* linhas */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.45, type: 'tween', stiffness: 10000 }}
                  >
                    <LinhasCard
                      dashboardLinhasData={dashboardLinhasData}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>

                {/* advertencias */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6, type: 'tween', stiffness: 10000 }}
                  >
                    <AdvertenciasCard
                      dashboardAdvertenciaData={dashboardAdvertenciaData}
                      selectedLocTrab={selectedLocTrab}
                      onFilteringByMonth={filterAdvertenciasByMonth}
                    />
                  </motion.div>
                </Col>

                {/* usam vt */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.75, type: 'tween', stiffness: 10000 }}
                  >
                    <UsamVtCard
                      dashboardUsamVtData={dashboardUsamVtData}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>
              </Row>

              <Row xs={1} md={2} lg={2}>
                {/* grafico pizza PERFIL USU */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.9, type: 'tween', stiffness: 10000 }}
                  >
                    <PerfilUsuCard
                      dashboardPerfilUsuData={dashboardPerfilUsuData}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>

                {/* grafico linhas EVOLUCAO VT X FRETA */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1.05, type: 'tween', stiffness: 10000 }}
                  >
                    <EvolucaoVtFretaCard
                      dashboardEvolucaoFretaData={dashboardEvolucaoFretaData}
                      dashboardEvolucaoVtData={dashboardEvolucaoVtData}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>
              </Row>

              <Row xs={1} md={1} lg={1}>
                {/* linhas performance */}
                <Col>
                  <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1, type: 'tween', stiffness: 10000 }}
                  >
                    <LinhasPerformanceCard
                      dashboardLinhasPerformanceData={dashboardLinhasPerformanceData}
                      onFilteringByDate={filterLinhasPerformanceByDate}
                      selectedLocTrab={selectedLocTrab}
                    />
                  </motion.div>
                </Col>
              </Row>
            </Container>
            )}
          </>
        )}

        {(!isEmpresaSelected) && (
        <NoData
          icon="companyInterrogation"
          label={(
            <>
              Selecione uma empresa para visualizar o dashboard.
            </>
        )}
        />
        )}

        {(isEmpresaSelected && !isServiceAlredyStarted && !isCaptaUser) && (
        <NoData
          icon="waitSettings"
          label={(
            <>
              O serviço ainda não foi configurado.
              Por favor, aguarde até que a configuração seja concluída pela Capta!
            </>
        )}
        />
        )}

        {(isEmpresaSelected && !isServiceAlredyStarted && isCaptaUser) && (
        <NoData
          icon="waitSettings"
          label={(
            <>
              <div>
                Informe a data de início do serviço de fretamento
                para exibir os dados do dashboard clicando no botão
              </div>
              <SecondaryButton onClick={() => setSelectStartDateModalShow(true)}>
                Informar data de início
              </SecondaryButton>
            </>
        )}
        />
        )}

        <MyModal
          show={selectStartDateModalShow}
          type="action"
          title="Selecionar data de início"
          modalBody={(
            <div className="modal-body-centered">
              <div className="year-selection">
                <FilterRadioButton
                  onClick={() => {
                    setSelectedStartYear(Number(currentYear - 1));
                    setSelectedStartMonth('');
                  }}
                  selected={selectedStartYear == Number(currentYear - 1)}
                >
                  {String(Number(currentYear - 1))}
                </FilterRadioButton>
                <FilterRadioButton
                  onClick={() => {
                    setSelectedStartYear(Number(currentYear));
                    setSelectedStartMonth('');
                  }}
                  selected={selectedStartYear == Number(currentYear)}
                >
                  {currentYear}
                </FilterRadioButton>
              </div>
              <MonthsGrid>
                {months.map((month) => (
                  <FilterRadioButton
                    key={month}
                    onClick={() => setSelectedStartMonth(month)}
                    selected={month == selectedStartMonth}
                    invisible={
                      Number(`${selectedStartYear}${month}`)
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
          onAction={chooseStartDate}
          onClose={() => setSelectStartDateModalShow(false)}
          isActionButtonDisabled={!selectedStartMonth || !selectedStartYear}
          actionButtonLabel="Definir data de início"
          closeButtonLabel="Cancelar"
        />

      </Transitions>
    </>
  );
}
