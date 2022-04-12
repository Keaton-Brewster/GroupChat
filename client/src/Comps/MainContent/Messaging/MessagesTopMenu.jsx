import { useState, useEffect } from "react";
import styled from "styled-components";
import { Nav } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useUIContext } from "../../../utils/UIProvider";
import { useConversations } from "../../../utils/ConversationProvider";
import { useViewport } from "../../../utils/ViewportProvider";

function _MessagesTopMenu({ containerRef }) {
  //STATE
  //================================================================================
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { width, isMobile } = useViewport();
  const { selectedConversation } = useConversations();
  const { activeContent, setActiveContent, setDisplay } = useUIContext();

  //FUNCTIONS
  //================================================================================
  function openConversationInfo() {
    if (activeContent.conversationInfo) return handleBackButton();
    setActiveContent({
      conversationInfo: true,
    });
  }

  // To make the back button multipurpose, simply switch case the state of the current display
  // And then act accordingly
  function handleBackButton() {
    if (isMobile && !activeContent.conversationInfo)
      return setDisplay({
        menu: true,
        mainContent: false,
      });

    setActiveContent({ conversations: true });
    // Set timeout to allow convo info animtaion to take it offscreen before messages come back
    setActiveContent({ conversationInfo: false });
    setTimeout(() => {
      setActiveContent({ conversations: true });
    }, 590);
  }

  //EFFECTS
  //================================================================================
  useEffect(() => {
    return setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  //COMPONENT
  //================================================================================
  return (
    <Nav
      // id="messagesTopMenu"
      className="flex-row justify-content-center"
      style={{ width: menuBarWidth }}
    >
      {isMobile || !activeContent.conversations ? (
        <Nav.Item onClick={handleBackButton}>
          <FaArrowLeft className="backButton" />
        </Nav.Item>
      ) : null}
      <Nav.Item
        id="conversationName"
        style={{
          paddingLeft: `${
            !isMobile && activeContent.conversations ? "30px" : ""
          }`,
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

const MessagesTopMenu = styled(_MessagesTopMenu)`
  background-color: ${({ theme }) => theme.headers};
  position: fixed;
  top: 0px;
  padding: 10px;
  z-index: 20;
  & > * {
    background-color: ${({ theme }) => theme.headers};
  }
`;

export default MessagesTopMenu;
