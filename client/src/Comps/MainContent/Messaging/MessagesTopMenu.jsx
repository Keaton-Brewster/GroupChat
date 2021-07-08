import { useState, useEffect } from "react";
import { Nav } from "react-bootstrap";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaArrowLeft } from "react-icons/fa";
import { useContentContext } from "../../../utils/ContentProvider";
import { useViewport } from "../../../utils/ViewportProvider";

export default function MessagesTopMenu({ conversationName, containerRef }) {
  const { width, isMobile, setMobileDisplay } = useViewport();
  const [menuBarWidth, setMenuBarWidth] = useState("100%");
  const { activeContent, setActiveContent } = useContentContext();

  function openConversationInfo() {
    setActiveContent({
      conversationInfo: true,
    });
  }

  // To make the back button multipurpose, simply switch case the state of the current display
  // And then act accordingly
  function handleBackButton() {
    if (activeContent.messaging)
      return setMobileDisplay({
        menu: true,
        mainContent: false,
      });
    setActiveContent({ messaging: true });
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
      {isMobile || activeContent.conversationInfo ? (
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
        {conversationName ? conversationName : "Untitled Conversation"}
      </Nav.Item>
      <Nav.Item onClick={openConversationInfo}>
        <BsThreeDotsVertical id="conversationInfoButton" />
      </Nav.Item>
    </Nav>
  );
}
