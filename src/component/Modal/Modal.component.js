import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function ModalLayout(props) {
  const {
    show, handleClose, handleConfirm, closeText, confirmText, content,
    title, variant
  } = props;

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {content}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          {closeText}
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalLayout;
