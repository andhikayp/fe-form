import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalLayout(props) {
  const {
    show, handleClose, handleConfirm, closeText, confirmText, content,
    title, variant, fullscreen = false, isShowFooter = true
  } = props;

  const renderFooter = () => (
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        {closeText}
      </Button>
      <Button variant={variant} onClick={handleConfirm}>
        {confirmText}
      </Button>
    </Modal.Footer>
  );

  return (
    <Modal show={show} onHide={handleClose} fullscreen={fullscreen}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content()}
      </Modal.Body>
      {isShowFooter && renderFooter()}
    </Modal>
  );
}

export default ModalLayout;
