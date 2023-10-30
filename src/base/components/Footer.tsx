import { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";

import { SessionContext } from "../contexts/SessionContext";

function Footer() {
  const { session } = useContext(SessionContext);

  return (
    <footer>
      <Container>
        <Row style={{ width: "100%" }}>
          <Col md={6}>{session.user_name}</Col>
          <Col md={6} style={{ textAlign: "right" }}>
            {session.tenant_name}
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
