import Iframe from 'react-iframe';
import Sidebar from '../../../../components/Sidebar';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import { RotContainer } from './styles';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';
import { useAppContext } from '../../../../contexts/auth';

export default function RoteirizacaoPassageiro() {
  const { data } = useAppContext();
  const empresaData = data.selectedEmpresa;
  const [passageiroRotBeingShow] = useLocalState('passageiroRotBeingShow');
  const codEmpresa = empresaData.value;
  const { codConsulta } = passageiroRotBeingShow;
  const { codFuncionario } = passageiroRotBeingShow;
  const { nome } = passageiroRotBeingShow;
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Passageiros" />
      <Transitions>
        <PageHeader
          title={`Roteirização do passageiro ${nome}`}
          link="/passageiros"
        />

        <RotContainer>
          <Iframe
            url={`http://rotaslink.captatec.com.br/ProjetoMyLink/paginaInicial.html?codEmpresa=${codEmpresa}&codConsulta=${codConsulta}&codFuncionario=${codFuncionario}`}
            width="100%"
            height={window.innerHeight}
            position="relative"
          />
        </RotContainer>

      </Transitions>
    </>
  );
}
