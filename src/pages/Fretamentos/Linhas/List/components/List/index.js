import PropTypes, { shape } from 'prop-types';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Card,
} from '../../../../../../components/Lists';
import edit from '../../../../../../assets/images/icons/edit.svg';
import trash from '../../../../../../assets/images/icons/trash.svg';
import maps from '../../../../../../assets/images/icons/maps.svg';
import shapePost from '../../../../../../assets/images/icons/shapePost.svg';

export default function List({
  filteredLinhas,
  roles,
  setLinhaMapaBeingShow,
  setLinhaBeingPostedShape,
  setLinhaBeingEdited,
  setLinhaBeingDeleted,
}) {
  return (
    <Container>
      <Row xs={1} md={1} lg={2}>
        {filteredLinhas?.map((linha) => (
          <Col key={linha.codLinhaSis}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1, type: 'tween', stiffness: 10000 }}
            >
              <Card>
                <div className="info">
                  <div className="card-title">
                    <strong>{linha.codLinhaF}</strong>
                    {!!linha.sentido && (
                      roles[linha.sentido]
                    )}
                  </div>
                  <span>{linha.letreiro.replace('.kml', '')}</span>
                  <span>
                    {linha.horaSaida}
                    {' '}
                    -
                    {' '}
                    {linha.horaChegada}
                  </span>
                  <span>
                    {linha.capacidade}
                    {' '}
                    lugares
                  </span>
                  <span>{linha.descrLocTrab}</span>
                </div>

                <div className="actions">
                  {linha.arqKml === 'S' && (
                  <Link
                    to="/linhas/mapa"
                    onClick={() => {
                      setLinhaMapaBeingShow({
                        routeID: linha.routeID,
                        codLinha: linha.codLinhaF,
                        letreiro: linha.letreiro,
                      });
                    }}
                  >
                    <img src={maps} alt="maps" title="Mapa da linha com passageiros" />
                  </Link>
                  )}

                  <Link
                    to="/linhas/shape"
                    onClick={() => {
                      setLinhaBeingPostedShape({
                        routeID: linha.routeID,
                        letreiro: linha.letreiro,
                        codLinhaF: linha.codLinhaF,
                      });
                    }}
                  >
                    <img src={shapePost} alt="shapePost" title="Vincular KML à linha" />
                  </Link>

                  <Link
                    to="/linhas/edit"
                    onClick={() => setLinhaBeingEdited(linha.codLinhaSis)}
                  >
                    <img src={edit} alt="edit" title="Editar linha" />
                  </Link>

                  <Link
                    to="/linhas/delete"
                    onClick={() => {
                      setLinhaBeingDeleted({
                        routeID: linha.routeID,
                        codLinhaSis: linha.codLinhaSis,
                        codLinhaF: linha.codLinhaF,
                        sentido: linha.sentido,
                        letreiro: linha.letreiro,
                        horaSaida: linha.horaSaida,
                        horaChegada: linha.horaChegada,
                        capacidade: linha.capacidade,
                        descrLocTrab: linha.descrLocTrab,
                      });
                    }}
                  >
                    <img src={trash} alt="trash" title="Excluir linha" />
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
  filteredLinhas: PropTypes.arrayOf(shape).isRequired,
  roles: PropTypes.shape.isRequired,
  setLinhaMapaBeingShow: PropTypes.func.isRequired,
  setLinhaBeingPostedShape: PropTypes.func.isRequired,
  setLinhaBeingEdited: PropTypes.func.isRequired,
  setLinhaBeingDeleted: PropTypes.func.isRequired,
};
