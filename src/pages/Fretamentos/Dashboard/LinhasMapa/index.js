import { useMemo, useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import DashboardService from '../../../../services/DashboardService';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import { MapaContainer } from './styles';
import { pathName } from '../../../../pathName';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';
import Loader from '../../../../components/Loader';
import AppHeader from '../../../../components/AppHeader';

export default function LinhaMapaFromDashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const { data, token, signOut } = useAppContext();
  const userData = data.usuario;
  const codEmpresa = data.selectedEmpresa.value;
  const [linhaMapaFromDashboardBeingShow] = useLocalState('linhaMapaFromDashboardBeingShow');
  const { codUsu, usuario, perfilUsu } = userData;
  const { codLinha } = linhaMapaFromDashboardBeingShow;
  const { letreiro } = linhaMapaFromDashboardBeingShow;
  const { routeID } = linhaMapaFromDashboardBeingShow;
  const { date } = linhaMapaFromDashboardBeingShow;

  const formatedDate = useMemo(() => {
    const day = date.split('-')[2];
    const month = date.split('-')[1];
    const year = date.split('-')[0];
    return `${day}/${month}/${year}`;
  }, [date]);

  useEffect(() => {
    async function getMapa() {
      try {
        setIsLoading(true);
        const bodyMapa = await DashboardService.getMapaShape({
          codUsu,
          perfilUsu,
          usuario,
          codEmpresa,
          token: encodeURIComponent(token),
          reqBody: JSON.stringify({
            routeID,
            dataViagem: date,
          }),
        });
        if (!bodyMapa.validado) {
          setIsLoading(false);
          signOut();
          return;
        }
      } catch {
        setIsLoading(false);
        signOut();
      } finally {
        setIsLoading(false);
      }
    }
    getMapa();
  }, [codEmpresa, codUsu, perfilUsu, routeID, signOut, token, usuario, date]);

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Dashboard" />
      <Transitions>
        <Loader isLoading={isLoading} />
        <PageHeader
          title={`Mapa da viagem ${codLinha} - ${letreiro.replace('.kml', '')} (${formatedDate})`}
          link="/dashboard"
        />

        <MapaContainer>
          <Iframe
            url={`${pathName}/Mapas/index.html?codUsu=${codUsu}&usuario=${usuario}&routeID=${encodeURIComponent(routeID)}&date=${date}&tk=${encodeURIComponent(token)}&perfilUsu=${perfilUsu}&codEmpresa=${codEmpresa}&showAllEmployees`}
            width="100%"
            height={`${window.innerHeight / 1.4015}px`}
            position="relative"
          />
        </MapaContainer>

      </Transitions>
    </>
  );
}
