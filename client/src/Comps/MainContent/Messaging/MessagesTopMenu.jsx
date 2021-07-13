import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useContentContext } from "../../../utils/ContentProvider";
import { useConversations } from "../../../utils/ConversationProvider";
import { useViewport } from "../../../utils/ViewportProvider";

export default function MessagesTopMenu({ containerRef }) {
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { width, isMobile } = useViewport();
  const { selectedConversation } = useConversations();
  const { activeContent, setActiveContent, setDisplay } = useContentContext();

  function openConversationInfo() {
    if (activeContent.conversationInfo) return handleBackButton();
    setActiveContent({
      conversationInfo: true,
    });
  }

  // To make the back button multipurpose, simply switch case the state of the current display
  // And then act accordingly
  function handleBackButton() {
    if (activeContent.messaging)
      return setDisplay({
        menu: true,
        mainContent: false,
      });

    // Set timeout to allow convo info animtaion to take it offscreen before messages come back
    setActiveContent({ conversationInfo: false });
    setTimeout(() => {
      setActiveContent({ messaging: true });
    }, 590);
  }

  useEffect(() => {
    return setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <Nav
      id="messagesTopMenu"
      className="flex-row justify-content-center"
      style={{ width: menuBarWidth }}
    >
      {isMobile || !activeContent.messaging ? (
        <Nav.Item onClick={handleBackButton}>
          <FaArrowLeft className="backButton" />
        </Nav.Item>
      ) : null}
      <Nav.Item
        id="conversationName"
        style={{
          paddingLeft: `${!isMobile && activeContent.messaging ? "30px" : ""}`,
        }}
      >
        {selectedConversation.name || "Untitled Conversation"}
      </Nav.Item>
      <Nav.Item onClick={openConversationInfo}>
        <BsThreeDotsVertical id="conversationInfoButton" />
      </Nav.Item>
    </Nav>
  );
}
