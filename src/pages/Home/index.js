import { PageHeader } from './styles';
import Sidebar from '../../components/Sidebar';
import Transitions from '../../components/Transition';
import { useAppContext } from '../../contexts/auth';

export default function Home() {
  const { data } = useAppContext();
  const userData = data.usuario;
  const { usuario } = userData;
  return (
    <>
      <Sidebar active="Home" />
      <Transitions>
        <PageHeader>
          <h1>{`Olá, ${usuario || ''}! Bem vindo ao sistema de fretamento.`}</h1>
          <span>Esta página está em produção, acesse as demais páginas no menu ao lado!</span>
        </PageHeader>
      </Transitions>
    </>
  );
}
