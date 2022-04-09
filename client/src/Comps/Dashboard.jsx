import { useState, useEffect } from "react";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { BrowserView, MobileView } from "react-device-detect";
import { useUIContext } from "../utils/UIProvider";
import Menu from "./Menu";
import MainContent from "./MainContent";
import "./animations.sass";
import { useAppRendering } from "../utils/Reducer";
import { useConversations } from "../utils/ConversationProvider";

export default function Dashboard() {
  //STATE
  //================================================================================
  const { display } = useUIContext();
  const [loading, setLoading] = useState(true);
  const [state, dispatch] = useAppRendering();
  const dashboard = state.mainContent;
  const { conversations } = useConversations();

  //FUNCTIONS
  //================================================================================
  function renderMobile() {
    if (display.menu) return <Menu />;
    if (display.mainContent) return <MainContent />;
  }

  function cleanLocalStorage() {
    localStorage.removeItem("epr_ru");
  }

  //EFFECTS
  //================================================================================
  // useEffect(() => {
    
  // }, [store.profile]);

  useEffect(() => {
    if (!conversations) return;
    setLoading(false);
  }, [conversations]);

  // apparently the emoji keyboard thing is storing things in local storage
  // So to stop that from piling up, we will regularly clean it out
  useEffect(() => {
    return () => {
      cleanLocalStorage();
    };
  });

  //COMPONENT
  //================================================================================
  return (
    <>
      {
        //!   THERE HAS TO BE A BETTER WAY TO RENDER THE HOME SCREEN BEFORE ANY CONVERSATIONS HAVE STARTED.
        //!   THIS WILL BE INTEGRAL FOR USER EXPERIENCE
      }
      {loading ? (
        <Spinner className="absoluteCenter" animation="border" />
      ) : (
        <>
          <BrowserView>
            <Container fluid>
              <Row style={{ marginRight: "0px !important" }}>
                <Col sm={4} style={{ paddingRight: "0px" }}>
                  <Menu />
                </Col>
                <Col sm={8} id="messageBox">
                  <MainContent />
                </Col>
              </Row>
            </Container>
          </BrowserView>

          <MobileView>
            <Container fluid>{renderMobile()}</Container>
            {/* <Container fluid>{dashboard}</Container> */}
          </MobileView>
        </>
      )}
    </>
  );
}
