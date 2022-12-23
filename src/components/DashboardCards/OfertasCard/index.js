/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/forbid-prop-types */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Card } from '../styles';

import NoData from '../../NoData';
import download from '../../../assets/images/icons/download.svg';
import { useAppContext } from '../../../contexts/auth';
import DashboardService from '../../../services/DashboardService';
import Loader from '../../Loader';
import ExportXlsx from '../../../utils/ExportXlsx';
import formatDate from '../../../utils/formatDate';

export default function OfertasCard({ dashboardOfertaData, selectedLocTrab }) {
  const today = new Date();
  today.setHours(today.getHours() - 3);
  const todayFormatted = today.toJSON().slice(0, 10);

  const appContext = useAppContext();
  const appData = appContext.data;
  const { token, signOut } = useAppContext();
  const userData = appData.usuario;
  const { codUsu, perfilUsu } = userData;
  const codEmpresa = appData.selectedEmpresa.value;

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
          codRelatorio: 4,
          dataViagens: todayFormatted,
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
      if (relData.oferta) {
        const ofertaRelData = relData.oferta.map((data) => ({
          'Local | Turno': data.localDescr,
          CPF: data.cpf,
          Nome: data.nome,
          'Linha ida titular': data.linhaIda || 'Não foi identificada nenhuma linha',

          'Data ultimo embarque (linha ida)': (data.ultimoAcessoIda == '0001-01-01T00:00:00'
            ? 'Não foi identificado nenhum embarque'
            : formatDate(data.ultimoAcessoIda)),

          'Linha volta titular': data.linhaVolta || 'Não foi identificada nenhuma linha',

          'Data ultimo embarque (linha volta)': (data.ultimoAcessoVolta == '0001-01-01T00:00:00'
            ? 'Não foi identificado nenhum embarque'
            : formatDate(data.ultimoAcessoVolta)),
        }));
        ExportXlsx({
          data: ofertaRelData,
          filename: `Relatório oferta titulares ${formatDate(todayFormatted)}`,
        });
      }

      if (!relData.oferta) {
        toast.error('Não há dados para serem baixados');
      }
    } catch (error) {
      toast.error(`Não foi possível baixar o relatório de usuários de VT (${error})`);
    } finally {
      setIsDownloadingRel(false);
    }
  }, [codEmpresa, codUsu, perfilUsu, signOut, token, todayFormatted]);

  return (
    <>
      <Loader isLoading={isDownloadingRel} />
      <Card>
        <div className="card-title">
          <div>Oferta</div>
          <img src={download} alt="download" title="Baixar relatório excel" onClick={downloadRel} />
        </div>

        {dashboardOfertaData && (
        <>
          <div className="card-main">
            <div>
              {dashboardOfertaData.totFuncs}
              {' '}
              /
              {' '}
              {dashboardOfertaData.totLugares}
            </div>
            <small>
              {(dashboardOfertaData.totFuncs > 1 ? 'Lugares ocupados' : 'Lugar ocupado')}
            </small>
          </div>

          <footer>
            {(dashboardOfertaData.percentual > 0) && (
            <>
              <div className="porcentagem-positiva">
                +
                {' '}
                {dashboardOfertaData.percentual}
                %
              </div>
              <div>
                Em relação ao início da operação
              </div>
            </>
            )}
            {(dashboardOfertaData.percentual < 0) && (
            <>
              <div className="porcentagem-negativa">
                -
                {' '}
                {dashboardOfertaData.percentual}
                %
              </div>
              <div>
                Em relação ao início da operação
              </div>
            </>
            )}
          </footer>
        </>
        )}

        {(!dashboardOfertaData) && (
        <NoData
          icon="emptyBox"
          label={(
            <>
              O local de trabalho
              {' '}
              <strong>{selectedLocTrab.label}</strong>
              {' '}
              não possui dados de oferta.
            </>
                    )}
        />
        )}
      </Card>
    </>
  );
}

OfertasCard.propTypes = {
  dashboardOfertaData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
