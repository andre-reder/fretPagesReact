/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/forbid-prop-types */
import { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { Card } from '../styles';

import NoData from '../../NoData';

import download from '../../../assets/images/icons/download.svg';
import DashboardService from '../../../services/DashboardService';
import formatDate from '../../../utils/formatDate';
import ExportXlsx from '../../../utils/ExportXlsx';
import { useAppContext } from '../../../contexts/auth';
import Loader from '../../Loader';

export default function UsamVtCard({ dashboardUsamVtData, selectedLocTrab }) {
  const currentDate = new Date().toJSON().slice(0, 10);
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
          codRelatorio: 6,
          dataViagens: currentDate,
          mes: currentDate.split('-')[1],
          ano: currentDate.split('-')[0],
          dataPesquisa: currentDate,
        }),
      });
      if (!relData.validado) {
        setIsDownloadingRel(false);
        signOut();
        return;
      }
      if (relData.usuVT) {
        const usuVtRelData = relData.usuVT.map((data) => ({
          'Local de trabalho': data.locTrab,
          CPF: data.cpf,
          Nome: data.nome,
          'Ultima linha ida embarcada': data.linhaIda || 'N??o foi identificado nenhum embarque',

          'Data ultimo embarque (linha ida)': (data.ultimoAcessoIda == '0001-01-01T00:00:00'
            ? 'N??o foi identificado nenhum embarque'
            : formatDate(data.ultimoAcessoIda)),

          'Ultima linha volta embarcada': data.linhaVolta || 'N??o foi identificado nenhum embarque',

          'Data ultimo embarque (linha volta)': (data.ultimoAcessoVolta == '0001-01-01T00:00:00'
            ? 'N??o foi identificado nenhum embarque'
            : formatDate(data.ultimoAcessoVolta)),

          'Valor VT': data.valorVT.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        }));
        ExportXlsx({
          data: usuVtRelData,
          filename: `Relat??rio usu??rios de VT ${formatDate(currentDate)}`,
        });
      }

      if (!relData.usuVT) {
        toast.error('N??o h?? dados para serem baixados');
      }
    } catch (error) {
      toast.error(`N??o foi poss??vel baixar o relat??rio de usu??rios de VT (${error})`);
    } finally {
      setIsDownloadingRel(false);
    }
  }, [codEmpresa, codUsu, currentDate, perfilUsu, signOut, token]);

  return (
    <>
      <Loader isLoading={isDownloadingRel} />
      <Card>
        <div className="card-title">
          <div>Usam VT</div>
          <img src={download} alt="download" title="Baixar relat??rio excel" onClick={downloadRel} />
        </div>

        {dashboardUsamVtData && (
        <>
          <div className="card-main">
            <div>
              {dashboardUsamVtData.percUsaVT}
              {' '}
              %
            </div>
            <small>
              {(dashboardUsamVtData.percUsaVT == 1 ? 'Usa VT' : 'Usam VT')}
            </small>
          </div>

          <footer>
            {(!dashboardUsamVtData.VTBaixou) && (
            <>
              <div className="porcentagem-negativa">
                +
                {' '}
                {dashboardUsamVtData.percVT}
                %
              </div>
              <div>
                Em rela????o ?? m??dia do m??s anterior
              </div>
            </>
            )}
            {(dashboardUsamVtData.VTBaixou) && (
            <>
              <div className="porcentagem-positiva">
                -
                {' '}
                {dashboardUsamVtData.percVT}
                %
              </div>
              <div>
                Em rela????o ?? m??dia do m??s anterior
              </div>
            </>
            )}
          </footer>
        </>
        )}

        {(!dashboardUsamVtData) && (
        <NoData
          icon="emptyBox"
          label={(
            <>
              O local de trabalho
              {' '}
              <strong>{selectedLocTrab.label}</strong>
              {' '}
              n??o possui dados sobre usu??rios de VT.
            </>
                  )}
        />
        )}
      </Card>
    </>
  );
}

UsamVtCard.propTypes = {
  dashboardUsamVtData: PropTypes.any.isRequired,
  selectedLocTrab: PropTypes.any.isRequired,
};
