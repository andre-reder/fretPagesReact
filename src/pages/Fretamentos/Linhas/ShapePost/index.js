import Sidebar from '../../../../components/Sidebar';
import LinhaShapeForm from '../../../../components/LinhaShapeForm';
import Transitions from '../../../../components/Transition';
import PageHeader from '../../../../components/PageHeader';
import useLocalState from '../../../../hooks/useLocalState';
import AppHeader from '../../../../components/AppHeader';

export default function ShapePost() {
  const [linhaBeingPostedShape] = useLocalState('linhaBeingPostedShape');
  const { routeID } = linhaBeingPostedShape;
  const { codLinhaF } = linhaBeingPostedShape;
  const { letreiro } = linhaBeingPostedShape;
  return (
    <>
      <AppHeader isEmpresaSelectDisabled />
      <Sidebar active="Linhas" />
      <Transitions>
        <PageHeader
          title={`Vincular shape à linha ${codLinhaF} - ${letreiro}`}
          link="/linhas"
        />
        <LinhaShapeForm buttonLabel="Vincular arquivo" routeId={routeID} />
      </Transitions>
    </>
  );
}
