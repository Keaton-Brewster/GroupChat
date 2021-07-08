import { useState } from "react";
import { Modal, Button } from "react-bootstrap";

export default function NewConversationModal({
  show,
  hide,
  createConversation,
}) {
  const [recipient, setRecipients] = useState([]);

  function createRecipientCard() {}

  return (
    <Modal
      show={show}
      onHide={hide}
      centered
      backdrop="static"
      aria-labelledby="contained-modal-title-vcenter"
      keyboard={false}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          <h4>Start a new conversation</h4>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <small>recipients</small>
        <div></div>
        <form>
          <label htmlFor="number"></label>
          <input id="" placeholder="+1 000-000-0000" />
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="success"
          onClick={() => {
            createConversation();
          }}
        >
          Start Conversation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
