/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Card } from '../styles';

import NoData from '../../NoData';
import MyModal from '../../Modal';
import download from '../../../assets/images/icons/download.svg';
import { useAppContext } from '../../../contexts/auth';
import DashboardService from '../../../services/DashboardService';
import Loader from '../../Loader';
import formatDate from '../../../utils/formatDate';
import ExportXlsx from '../../../utils/ExportXlsx';

export default function CustoUsuarioCard({ dashboardCustoData, selectedLocTrab }) {
  const today = new Date();
  today.setHours(today.getHours() - 3);
  const todayFormatted = today.toJSON().slice(0, 10);

  const appContext = useAppContext();
  const appData = appContext.data;
  const { token, signOut } = useAppContext();
  const userData = appData.usuario;
  const { codUsu, perfilUsu } = userData;
  const codEmpresa = appData.selectedEmpresa.value;

  const [selectedDate, setSelectedDate] = useState(todayFormatted);
  const [selectDateModalShow, setSelectDateModalShow] = useState(false);
  const [isDownloadingRel, setIsDownloadingRel] = useState(false);

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
          codRelatorio: 3,
          dataViagens: selectedDate,
          mes: todayFormatted.split('-')[1],
          ano: todayFormatted.split('-')[0],
          dataPesquisa: todayFormatted,
        }),
      });
      if (!relData.validado) {
        setIsDownloadingRel(false);
        signOut();
        return;
      }
      if (relData.custoUsuario) {
        const custoUsuarioRelData = relData.custoUsuario.map((data) => ({
          'Local | Turno': data.localDescr,
          Linha: data.linha,
          Capacidade: data.capacidade,
          Ocupa????o: data.ocupacao,
          'Valor mensal': data.valorMesLin.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

          'Custo ideal (com ocupa????o m??xima)': data.custoTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

          'Custo real (com ocupa????o atual)': data.custoEfetivo.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),

          'Porcentagem de ocupa????o': `${data.percOcupacao} %`,
        }));
        ExportXlsx({
          data: custoUsuarioRelData,
          filename: `Relat??rio custo usu??rio ${formatDate(selectedDate)}`,
        });
      }

      if (!relData.custoUsuario) {
        toast.error('N??o h?? dados para serem baixados');
      }
    } catch (error) {
      toast.error(`N??o foi poss??vel baixar o relat??rio de usu??rios de VT (${error})`);
    } finally {
      setIsDownloadingRel(false);
    }
  }, [codEmpresa, codUsu, selectedDate, perfilUsu, signOut, token, todayFormatted]);

  function handleDateChange(event) {
    setSelectedDate(event.target.value);
  }

  return (
    <>
      <Loader isLoading={isDownloadingRel} />
      <Card>
        <div className="card-title">
          <div>Custo/usu??rio</div>
          <img
            src={download}
            alt="download"
            title="Baixar relat??rio excel"
            onClick={() => setSelectDateModalShow(true)}
          />
        </div>

        {dashboardCustoData && (
        <>
          <div className="card-main">
            <div>
              R$
              {' '}
              {dashboardCustoData.custoFunc}
            </div>
            <small>
              Por usu??rio
            </small>
          </div>

          <footer>
            {(!dashboardCustoData.custoBaixou) && (
            <>
              <div className="porcentagem-negativa">
                +
                {' '}
                {dashboardCustoData.percCusto}
                %
              </div>
              <div>
                Em rela????o ao in??cio da opera????o
              </div>
            </>
            )}
            {(dashboardCustoData.custoBaixou) && (
            <>
              <div className="porcentagem-positiva">
                -
                {' '}
                {dashboardCustoData.percCusto}
                %
              </div>
              <div>
                Em rela????o ao in??cio da opera????o
              </div>
            </>
            )}
          </footer>
        </>
        )}

        {(!dashboardCustoData) && (
        <NoData
          icon="emptyBox"
          label={(
            <>
              O local de trabalho
              {' '}
              <strong>{selectedLocTrab.label}</strong>
              {' '}
              n??o possui dados de custo/usu??rio.
            </>
                  )}
        />
        )}
      </Card>

      <MyModal
        show={selectDateModalShow}
        title="Escolha uma data"
        modalBody={(
          <input type="date" value={selectedDate} onChange={handleDateChange} />
)}
        closeButtonLabel="Fechar"
        actionButtonLabel="Baixar relat??rio"
        onClose={() => setSelectDateModalShow(false)}
        onAction={() => {
          downloadRel();
          setSelectDateModalShow(false);
        }}
        type="action"
        size="sm"
      />
    </>
  );
}

CustoUsuarioCard.propTypes = {
  dashboardCustoData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
