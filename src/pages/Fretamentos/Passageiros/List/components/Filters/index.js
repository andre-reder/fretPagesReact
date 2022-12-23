import PropTypes from 'prop-types';
import Input from '../../../../../../components/Input';
import { InputGroup, Container, InputsContainer } from './styles';
import search from '../../../../../../assets/images/icons/search.svg';

export default function Filters({
  searchNomeTerm,
  handleChangeSearchNomeTerm,
  searchCpfTerm,
  handleChangeSearchCpfTerm,
  searchConsultaTerm,
  handleChangeSearchConsultaTerm,
  searchLinhaIdaTerm,
  handleChangeSearchLinhaIdaTerm,
  searchLinhaVoltaTerm,
  handleChangeSearchLinhaVoltaTerm,
  searchStatusTerm,
  handleChangeSearchStatusTerm,
}) {
  return (
    <Container>
      <header>
        <img src={search} alt="search" />
        Pesquise através dos filtros abaixo
      </header>
      <InputsContainer>
        <InputGroup>
          <span htmlFor="codLinha">Nome</span>
          <Input
            placeholder="Nome"
            value={searchNomeTerm}
            onChange={handleChangeSearchNomeTerm}
          />
        </InputGroup>
        <InputGroup>
          <span htmlFor="codLinha">CPF</span>
          <Input
            placeholder="CPF (somente números)"
            value={searchCpfTerm}
            onChange={handleChangeSearchCpfTerm}
          />
        </InputGroup>
        <InputGroup>
          <span htmlFor="codLinha">Consulta</span>
          <Input
            placeholder="Consulta"
            value={searchConsultaTerm}
            onChange={handleChangeSearchConsultaTerm}
          />
        </InputGroup>
        <InputGroup>
          <span htmlFor="codLinha">Linha ida</span>
          <Input
            placeholder="Linha ida"
            value={searchLinhaIdaTerm}
            onChange={handleChangeSearchLinhaIdaTerm}
          />
        </InputGroup>
        <InputGroup>
          <span htmlFor="codLinha">Linha volta</span>
          <Input
            placeholder="Linha volta"
            value={searchLinhaVoltaTerm}
            onChange={handleChangeSearchLinhaVoltaTerm}
          />
        </InputGroup>
        <InputGroup>
          <span htmlFor="codLinha">Status</span>
          <Input
            placeholder="Status"
            value={searchStatusTerm}
            onChange={handleChangeSearchStatusTerm}
          />
        </InputGroup>
      </InputsContainer>
    </Container>
  );
}

Filters.propTypes = {
  searchNomeTerm: PropTypes.string.isRequired,
  handleChangeSearchNomeTerm: PropTypes.func.isRequired,
  searchCpfTerm: PropTypes.string.isRequired,
  handleChangeSearchCpfTerm: PropTypes.func.isRequired,
  searchConsultaTerm: PropTypes.string.isRequired,
  handleChangeSearchConsultaTerm: PropTypes.func.isRequired,
  searchLinhaIdaTerm: PropTypes.string.isRequired,
  handleChangeSearchLinhaIdaTerm: PropTypes.func.isRequired,
  searchLinhaVoltaTerm: PropTypes.string.isRequired,
  handleChangeSearchLinhaVoltaTerm: PropTypes.func.isRequired,
  searchStatusTerm: PropTypes.string.isRequired,
  handleChangeSearchStatusTerm: PropTypes.func.isRequired,
};
