import { useEffect, useState } from 'react';
import Iframe from 'react-iframe';
import LinhasService from '../../../../services/LinhasService';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import { MapaContainer } from './styles';
import { pathName } from '../../../../pathName';
import useLocalState from '../../../../hooks/useLocalState';
import { useAppContext } from '../../../../contexts/auth';
import AppHeader from '../../../../components/AppHeader';
import Loader from '../../../../components/Loader';

export default function LinhaMapa() {
  const [isLoading, setIsLoading] = useState(true);
  const { data, token, signOut } = useAppContext();
  const empresaData = data.selectedEmpresa;
  const userData = data.usuario;
  const codEmpresa = empresaData.value;
  const { codUsu, usuario, perfilUsu } = userData;

  const [linhaMapaBeingShow] = useLocalState('linhaMapaBeingShow');
  const { codLinha } = linhaMapaBeingShow;
  const { letreiro } = linhaMapaBeingShow;
  const { routeID } = linhaMapaBeingShow;

  useEffect(() => {
    async function getMapa() {
      try {
        setIsLoading(true);
        const bodyMapa = await LinhasService.getMapaShape({
          codUsu,
          perfilUsu,
          usuario,
          routeID: encodeURIComponent(routeID),
          codEmpresa,
          token: encodeURIComponent(token),
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
  }, [codEmpresa, codUsu, perfilUsu, routeID, signOut, token, usuario]);

  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Loader isLoading={isLoading} />
      <Transitions>
        <PageHeader
          title={`Mapa da linha ${codLinha} - ${letreiro}`}
          link="/linhas"
        />

        <MapaContainer>
          <Iframe
            url={`${pathName}/Mapas/index.html?codUsu=${codUsu}&usuario=${usuario}&routeID=${encodeURIComponent(routeID)}&codEmpresa=${codEmpresa}&perfilUsu=${perfilUsu}&tk=${encodeURIComponent(token)}&showAllEmployees`}
            width="100%"
            height={`${window.innerHeight / 1.4015}px`}
            position="relative"
          />
        </MapaContainer>

      </Transitions>
    </>
  );
}
