import { Container, Row, Col, Spinner } from "react-bootstrap";
import { useViewport } from "../utils/ViewportProvider";
import { useConversations } from "../utils/ConversationProvider";
import MainContentProvider from "../utils/MainContentProvider";
import Menu from "./Menu";
import MainContent from "./MainContent";

export default function Dashboard() {
  const { mobileScreen } = useViewport();
  const { selectedConversation } = useConversations();

  return (
    <MainContentProvider>
      {!selectedConversation ? (
        <Spinner id="spinner" />
      ) : !mobileScreen ? (
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
      ) : (
        <Container fluid>
          <Menu />
          <MainContent />
        </Container>
      )}
    </MainContentProvider>
  );
}
