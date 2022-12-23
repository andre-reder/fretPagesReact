/* eslint-disable no-nested-ternary */
import PropTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Card,
} from '../../../../../../components/Lists';
import edit from '../../../../../../assets/images/icons/edit.svg';
import trash from '../../../../../../assets/images/icons/trash.svg';
import maps from '../../../../../../assets/images/icons/maps.svg';
import check from '../../../../../../assets/images/icons/check.svg';
import exclamation from '../../../../../../assets/images/icons/exclamation.svg';
import exclamationYellow from '../../../../../../assets/images/icons/exclamationYellow.svg';

export default function List({
  filteredPassageiros,
  setPassageiroRotBeingShow,
  setCurrentLocTrabAtPassageirosPage,
  setPassageiroBeingEdited,
  setPassageiroBeingDeleted,
  selectedLocTrab,
}) {
  return (
    <Container>
      <Row xs={1} md={1} lg={2}>
        {filteredPassageiros?.map((passageiro) => (
          <Col key={passageiro.codFuncionario}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1, type: 'tween', stiffness: 10000 }}
            >
              <Card>
                <div className="info">
                  <div className="card-title">
                    <strong>{passageiro.nome}</strong>
                    {passageiro.statusCad === 'Ativo'
                      ? <small className="green">Ativo</small>
                      : (
                        <small className="orange">
                          {passageiro.dataInativoAte
                            ? `Inativo até ${new Date(passageiro.dataInativoAte.replace(/-/g, '\/')).toLocaleDateString()}`
                            : 'Inativo'}
                        </small>
                      )}
                  </div>
                  <span>
                    {passageiro.valorVT === 0
                      ? <>Não usa VT</>
                      : passageiro.valorVT.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </span>
                  <span>
                    <div>
                      <strong>Ida:</strong>
                      {' '}
                      {passageiro.linhaIda.replace('.kml', '').toLowerCase()}
                    </div>
                    {passageiro.StatusLinIda === 'Titular'
                      ? <img src={check} alt="titular" title="Titular na linha" />
                      : (
                        passageiro.StatusLinIda === 'Avulso'
                          ? <img src={exclamationYellow} alt="Avulso na linha" title="Avulso na linha" />
                          : <img src={exclamation} alt="perdeu titularidade" title="Perdeu titularidade na linha" />
                      )}
                  </span>
                  <span>
                    <div>
                      <strong>Volta:</strong>
                      {' '}
                      {passageiro.linhaVolta.replace('.kml', '').toLowerCase()}
                    </div>
                    {passageiro.StatusLinVolta === 'Titular'
                      ? <img src={check} alt="titular" title="Titular na linha" />
                      : (
                        passageiro.StatusLinIda === 'Avulso'
                          ? <img src={exclamationYellow} alt="Avulso na linha" title="Avulso na linha" />
                          : <img src={exclamation} alt="perdeu titularidade" title="Perdeu titularidade na linha" />
                      )}
                  </span>
                </div>

                <div className="actions">
                  <Link
                    to="/passageiros/roteirizacao"
                    onClick={() => {
                      setPassageiroRotBeingShow({
                        codFuncionario: passageiro.codFuncionario,
                        codConsulta: passageiro.codConsulta,
                        nome: passageiro.nome,
                      });
                      setCurrentLocTrabAtPassageirosPage(selectedLocTrab.value);
                    }}
                  >
                    <img src={maps} alt="maps" title="Roteirização do passageiro" />
                  </Link>

                  <Link
                    to="/passageiros/edit"
                    onClick={() => {
                      setPassageiroBeingEdited({
                        codFuncionario: passageiro.codFuncionario,
                        nome: passageiro.nome,
                        cpf: passageiro.cpf,
                        matricula: passageiro.matricula,
                        statusCad: passageiro.statusCad,
                        cep: passageiro.cep,
                        logradouro: passageiro.logradouro,
                        numero: passageiro.numero,
                        bairro: passageiro.bairro,
                        cidade: passageiro.cidade,
                        uf: passageiro.uf,
                        horaEntrada: passageiro.horaEntrada,
                        horaSaida: passageiro.horaSaida,
                        dataInativoAte: passageiro.dataInativoAte,
                        valorVT: passageiro.valorVT,
                        StatusLinIda: passageiro.StatusLinIda,
                        linhaIda: passageiro.linhaIda,
                        StatusLinVolta: passageiro.StatusLinVolta,
                        linhaVolta: passageiro.linhaVolta,
                      });
                      setCurrentLocTrabAtPassageirosPage(selectedLocTrab.value);
                    }}
                  >
                    <img src={edit} alt="edit" title="Editar status do passageiro" />
                  </Link>

                  <Link
                    to="/passageiros/delete"
                    onClick={() => {
                      setPassageiroBeingDeleted({
                        codFuncionario: passageiro.codFuncionario,
                        nome: passageiro.nome,
                        cpf: passageiro.cpf,
                        matricula: passageiro.matricula,
                        statusCad: passageiro.statusCad,
                        cep: passageiro.cep,
                        logradouro: passageiro.logradouro,
                        numero: passageiro.numero,
                        bairro: passageiro.bairro,
                        cidade: passageiro.cidade,
                        uf: passageiro.uf,
                        horaEntrada: passageiro.horaEntrada,
                        horaSaida: passageiro.horaSaida,
                        dataInativoAte: passageiro.dataInativoAte,
                        valorVT: passageiro.valorVT,
                        StatusLinIda: passageiro.StatusLinIda,
                        linhaIda: passageiro.linhaIda,
                        StatusLinVolta: passageiro.StatusLinVolta,
                        linhaVolta: passageiro.linhaVolta,
                      });
                      setCurrentLocTrabAtPassageirosPage(selectedLocTrab.value);
                    }}
                  >
                    <img src={trash} alt="trash" title="Excluir / demitir passageiro" />
                  </Link>
                </div>

              </Card>
            </motion.div>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

List.propTypes = {
  filteredPassageiros: PropTypes.arrayOf(shape).isRequired,
  setPassageiroRotBeingShow: PropTypes.shape.isRequired,
  setCurrentLocTrabAtPassageirosPage: PropTypes.number.isRequired,
  setPassageiroBeingEdited: PropTypes.shape.isRequired,
  setPassageiroBeingDeleted: PropTypes.shape.isRequired,
  selectedLocTrab: PropTypes.number.isRequired,
};
