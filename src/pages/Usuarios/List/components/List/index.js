import PropTypes, { shape } from 'prop-types';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {
  Card,
} from '../../../../../components/Lists';
import edit from '../../../../../assets/images/icons/edit.svg';
import trash from '../../../../../assets/images/icons/trash.svg';

export default function List({
  filteredUsuarios,
  roles,
  setUserBeingEdited,
  roles2,
  setUserBeingDeleted,
}) {
  return (
    <Container>
      <Row xs={1} md={1} lg={2}>
        {filteredUsuarios?.map((usuario) => (
          <Col key={usuario.codUsuAcesso}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1, type: 'tween', stiffness: 10000 }}
            >
              <Card>
                <div className="info">
                  <div className="card-title">
                    <strong>{usuario.nome}</strong>
                    {!!usuario.perfilUsuCad && (
                      roles[usuario.perfilUsuCad]
                    )}
                  </div>
                  <span>
                    CPF:
                    {' '}
                    {usuario.cpf}
                  </span>
                  <span>{usuario.email}</span>
                </div>

                <div className="actions">
                  <Link
                    to="/usuarios/edit"
                    onClick={() => {
                      setUserBeingEdited({
                        codUsuAcesso: usuario.codUsuAcesso,
                        userType: roles2[usuario.perfilUsuCad],
                      });
                    }}
                  >
                    <img src={edit} alt="edit" title="Editar usuário" />
                  </Link>

                  <Link
                    to="/usuarios/delete"
                    onClick={() => {
                      setUserBeingDeleted({
                        codUsuAcesso: usuario.codUsuAcesso,
                        name: usuario.nome,
                        userType: usuario.perfilUsuCad,
                        cpf: usuario.cpf,
                        email: usuario.email,
                      });
                    }}
                  >
                    <img src={trash} alt="trash" title="Excluir usuário" />
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
  filteredUsuarios: PropTypes.arrayOf(shape).isRequired,
  roles: PropTypes.shape.isRequired,
  setUserBeingEdited: PropTypes.shape.isRequired,
  roles2: PropTypes.shape.isRequired,
  setUserBeingDeleted: PropTypes.shape.isRequired,
};
