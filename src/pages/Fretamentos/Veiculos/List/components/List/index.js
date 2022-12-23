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
import qrCode from '../../../../../../assets/images/icons/qrCode.svg';

export default function List({
  filteredVeiculos,
  roles,
  setVeiculoQrCodeBeingShow,
  setVeiculoBeingEdited,
  BodyReqVeiculosList,
  setVeiculoBeingDeleted,
}) {
  return (
    <Container>
      <Row xs={1} md={1} lg={2}>
        {filteredVeiculos?.map((veiculo) => (
          <Col key={veiculo.codVeiculoSis}>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: false }}
              transition={{ delay: 0.1, type: 'tween', stiffness: 10000 }}
            >
              <Card>
                <div className="info">
                  <div className="card-title">
                    <strong>{veiculo.codVeiculo}</strong>
                    {veiculo.tipoTransporte && (
                      roles[veiculo.tipoTransporte]
                    )}
                  </div>
                  <span>
                    {veiculo.marca}
                    {' '}
                    {veiculo.modelo}
                  </span>
                  <span>
                    {veiculo.capacidade}
                    {' '}
                    lugares
                  </span>
                  <span>
                    {veiculo.consumo}
                    {' '}
                    km/L
                  </span>
                </div>

                <div className="actions">

                  <Link
                    to="/veiculos/qrCode"
                    className="qrCodeLink"
                    onClick={() => {
                      setVeiculoQrCodeBeingShow({
                        qrCode: veiculo.qRCode,
                        codVeiculo: veiculo.codVeiculo,
                        empresa: BodyReqVeiculosList.empresa,
                      });
                    }}
                  >
                    <img src={qrCode} alt="edit" title="QR Code do veículo" />
                  </Link>

                  <Link
                    to="/veiculos/edit"
                    onClick={() => {
                      setVeiculoBeingEdited({
                        codVeiculoSis: veiculo.codVeiculoSis,
                        empresa: BodyReqVeiculosList.empresa,
                      });
                    }}
                  >
                    <img src={edit} alt="edit" title="Editar veículo" />
                  </Link>

                  <Link
                    to="/veiculos/delete"
                    onClick={() => {
                      setVeiculoBeingDeleted({
                        codVeiculoSis: veiculo.codVeiculoSis,
                        codVeiculo: veiculo.codVeiculo,
                        tipoTransporte: veiculo.tipoTransporte,
                        marca: veiculo.marca,
                        modelo: veiculo.modelo,
                        capacidade: veiculo.capacidade,
                        consumo: veiculo.consumo,
                      });
                    }}
                  >
                    <img src={trash} alt="edit" title="Excluir veículo" />
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
  filteredVeiculos: PropTypes.arrayOf(shape).isRequired,
  roles: PropTypes.shape.isRequired,
  setVeiculoQrCodeBeingShow: PropTypes.func.isRequired,
  setVeiculoBeingEdited: PropTypes.func.isRequired,
  BodyReqVeiculosList: PropTypes.shape.isRequired,
  setVeiculoBeingDeleted: PropTypes.func.isRequired,
};
