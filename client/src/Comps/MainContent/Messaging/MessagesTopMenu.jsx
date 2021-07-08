import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useMainContent } from "../../../utils/MainContentProvider";
import { useViewport } from "../../../utils/ViewportProvider";

export default function MessagesTopMenu({ conversationName, containerRef }) {
  const { width, mobileScreen, setShow } = useViewport();
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { activeContent, setActiveContent } = useMainContent();

  function openConversationInfo() {
    setActiveContent("conversation info");
  }

  // To make the back button multipurpose, simply switch case the state of the current display
  // And then act accordingly
  function handleBackButton() {
    switch (activeContent) {
      case "messaging":
        setShow({
          menu: true,
          mainContent: false,
        });
        break;
      case "conversation info":
        setActiveContent("messaging");
        break;
      default:
        setShow({
          menu: true,
          mainContent: false,
        });
    }
  }

  useEffect(() => {
    if (width >= 680) setMenuBarWidth(`${containerRef.current.offsetWidth}px`);
    else setMenuBarWidth("100%");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width]);

  return (
    <Nav
      id="messagesTopMenu"
      className="flex-row justify-content-end"
      style={{ width: menuBarWidth }}
    >
      {mobileScreen || activeContent === "conversation info" ? (
        <Nav.Item onClick={handleBackButton}>
          <FaArrowLeft className="backButton" />
        </Nav.Item>
      ) : null}
      <Nav.Item
        id="conversationName"
        style={{
          paddingLeft: `${
            activeContent === "messaging" && width > 680 ? "30px" : ""
          }`,
        }}
      >
        {conversationName ? conversationName : "Untitled Conversation"}
      </Nav.Item>
      <Nav.Item onClick={openConversationInfo}>
        <BsThreeDotsVertical id="conversationInfoButton" />
      </Nav.Item>
    </Nav>
  );
}
