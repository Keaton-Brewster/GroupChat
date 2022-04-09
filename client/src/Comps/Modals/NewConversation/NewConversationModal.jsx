import { useEffect, useState, useRef } from "react";
import { Modal, Button, ListGroup } from "react-bootstrap";
import { useContactContext } from "../../../utils/ContactProvider";
import Recipient from "./Recipient";

export default function NewConversationModal({
  //PROPS
  //================================================================================
  show,
  hide,
  setNewConversationRecipients,
}) {
  //STATES
  //================================================================================
  const { contacts, setSearchValue } = useContactContext();
  // Added a contact for development
  const [recipients, setRecipients] = useState([]);
  const [loading, setLoading] = useState(true);

  //REFS
  //================================================================================
  const searchRef = useRef();

  //FUNCTIONS
  //================================================================================
  function selectContact(contact) {
    setRecipients((recipients) => {
      return recipients.includes(contact)
        ? recipients
        : [...recipients, contact];
    });
  }

  function handleInputChange(event) {
    event.preventDefault();
    setSearchValue(searchRef.current.textContent);
  }

  function removeRecipient(userInfo) {
    setRecipients((recipients) => {
      return recipients.filter((recipient) => recipient._id !== userInfo._id);
    });
  }

  function passUpConversationMembers(event) {
    event.preventDefault();
    setNewConversationRecipients(recipients);
    setRecipients([]);
    hide();
  }
  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!contacts) return;
    setLoading(false);
  }, [contacts]);

  //COMPONENT
  //================================================================================
  return (
    <Modal
      show={show}
      onHide={() => {
        setRecipients([]);
        hide();
      }}
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
      <Modal.Header>
        <p>Recipients:</p>
        {recipients ? (
          <>
            {recipients.map((userInfo, i) => {
              return (
                <Recipient
                  userInfo={userInfo}
                  key={i}
                  removeRecipient={() => removeRecipient(userInfo)}
                />
              );
            })}
          </>
        ) : null}
      </Modal.Header>
      <Modal.Body>
        <ListGroup.Item
          contentEditable
          ref={searchRef}
          className="textarea"
          id="searchBox"
          onInput={handleInputChange}
        />
        <ListGroup>
          {contacts ? (
            contacts.map((contact, index) => {
              return (
                <ListGroup.Item
                  className="LGItem"
                  onClick={() => selectContact(contact)}
                  key={index}
                >
                  {contact.givenName + " " + contact.familyName}
                </ListGroup.Item>
              );
            })
          ) : (
            <div>
              <p>No Contacts here!</p>
            </div>
          )}
        </ListGroup>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="success" onClick={passUpConversationMembers}>
          Start Conversation
        </Button>
      </Modal.Footer>
    </Modal>
  );
}