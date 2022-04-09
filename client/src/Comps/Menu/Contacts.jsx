import { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import NewContactModal from "../Modals/NewContactModal";
import API from "../../utils/API";
import { useContactContext } from "../../utils/ContactProvider";
import { useUserContext } from "../../utils/UserProvider";
import { useUIContext } from "../../utils/UIProvider";

export default function Contacts() {
  //STATE
  //================================================================================
  const { contacts, selectedContact, setSelectedContact } = useContactContext();
  const { user, setUser } = useUserContext();
  const { isMobile } = useUIContext();
  const [newContactModal, setNewContactModal] = useState(false);
  const [loading, setLoading] = useState(true);

  //FUNCTIONS
  //================================================================================
  function showNewContactModal(event) {
    event.preventDefault();
    setNewContactModal(true);
  }

  function selectContact(contact) {
    setSelectedContact(contact);
  }

  function addContact(phoneNum) {
    // I will need to make sure to add a case here that will prevent
    // a user from adding themselves as a contact. This would just
    // be to avoid any weird errors that could occur by having your
    // id appear in two places throughout the application
    API.addContact(
      user._id,
      phoneNum,
      (updatedUser) => {
        // need to call to update the user in the local storage
        if (!updatedUser) return alert("You already have that contact!");
        setUser(updatedUser);
        setNewContactModal(false);
      },
      (err) => {
        console.log("contacts.jsx", err);
      }
    );
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    if (!contacts) return;
    setLoading(false);
  }, [contacts]);

  useEffect(() => {
    return () => {
      setSelectedContact(null);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //COMPONENT
  //================================================================================
  return loading ? (
    <Spinner className="absoluteCenter" animation="border" />
  ) : (
    <>
      <NewContactModal
        show={newContactModal}
        hide={() => setNewContactModal(false)}
        addContact={addContact}
      />

      <ListGroup>
        <ListGroup.Item className="LGItem" onClick={showNewContactModal}>
          <AiFillPlusCircle id="addButton" />
          Add Contact
        </ListGroup.Item>
        {contacts ? (
          contacts.map((contact, index) => {
            return (
              <ListGroup.Item
                className={`LGItem ${
                  selectedContact
                    ? contact._id === selectedContact._id && !isMobile
                      ? "LGActive"
                      : ""
                    : ""
                }`}
                onClick={(e) => {
                  e.preventDefault();
                  selectContact(contact);
                }}
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
    </>
  );
}
