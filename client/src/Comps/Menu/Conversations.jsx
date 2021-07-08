import { useState } from "react";
import { ListGroup } from "react-bootstrap";
import { AiFillPlusCircle } from "react-icons/ai";
import { useConversations } from "../../utils/ConversationProvider";
import { useMainContent } from "../../utils/MainContentProvider";
import { useViewport } from "../../utils/ViewportProvider";
import NewConversationModal from "../Modals/NewConversationModal";

export default function Conversations() {
  const { setActiveContent } = useMainContent();
  const { conversations, selectedConversation, selectConversationIndex } =
    useConversations();
  const { mobileScreen, setShow } = useViewport();
  const [newConvoModal, setNewConvoModal] = useState(false);

  function createConversation(event) {}

  return (
    <>
      <ListGroup variant="flush">
        <ListGroup.Item
          className="convoBox"
          onClick={(e) => {
            e.preventDefault();
            setNewConvoModal(true);
          }}
        >
          New Conversation <AiFillPlusCircle />
        </ListGroup.Item>
        {conversations?.map((convo, index) => {
          return (
            <ListGroup.Item
              key={index}
              className={`convoBox ${
                convo._id === selectedConversation._id && !mobileScreen
                  ? "activeConvo"
                  : ""
              }`}
              onClick={(event) => {
                event.preventDefault();
                selectConversationIndex(index);
                if (mobileScreen) {
                  setShow({
                    menu: false,
                    mainContent: true,
                  });
                } else {
                  setActiveContent("messaging");
                }
              }}
            >
              {convo.name || "Untitled Conversation"}
            </ListGroup.Item>
          );
        })}
      </ListGroup>

      <NewConversationModal
        show={newConvoModal}
        hide={() => setNewConvoModal(false)}
        createConversation={createConversation}
      />
    </>
  );
}
