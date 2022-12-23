import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ModalStyles } from './styles';

export default function MyModal({
  title,
  closeButtonLabel,
  actionButtonLabel,
  isActionButtonDisabled,
  modalBody,
  onClose,
  onAction,
  show,
  type,
  size,
  grid,
  centeredBody,
}) {
  return (
    <Modal
      show={show}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <ModalStyles centeredBody={centeredBody}>
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className={grid && ('show-grid')}>
          {modalBody}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>{closeButtonLabel}</Button>
          {type === 'action' && (
            <Button onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
          {type === 'deleteAction' && (
            <Button variant="danger" onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
          {type === 'suspendAction' && (
            <Button variant="warning" onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
          {type === 'activateAction' && (
            <Button variant="success" onClick={onAction} disabled={isActionButtonDisabled}>
              {actionButtonLabel}
            </Button>
          )}
        </Modal.Footer>
      </ModalStyles>
    </Modal>
  );
}

MyModal.propTypes = {
  show: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  modalBody: PropTypes.node.isRequired,
  closeButtonLabel: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
  actionButtonLabel: PropTypes.string,
  onAction: PropTypes.func,
  type: PropTypes.oneOf(['info', 'action', 'deleteAction', 'suspendAction', 'activateAction']),
  size: PropTypes.oneOf(['sm', 'lg', 'xl', 'md']),
  grid: PropTypes.bool,
  centeredBody: PropTypes.bool,
  isActionButtonDisabled: PropTypes.bool,
};

MyModal.defaultProps = {
  type: 'info',
  onAction: () => {},
  actionButtonLabel: '',
  size: 'lg',
  grid: false,
  centeredBody: false,
  isActionButtonDisabled: false,
};
