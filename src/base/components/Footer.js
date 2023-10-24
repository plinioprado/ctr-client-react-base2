import { Col, Container } from "react-bootstrap";
import { useContext } from "react";

import { BaseContext } from "../BaseContext";

function Footer() {

  const shop = useContext(BaseContext);

  return (
    <footer>
      <Container>
          <Col md={6}>{ shop.session && shop.session.user_name }</Col>
          <Col md={6} style={{ textAlign: 'right'}}>{ shop.session && shop.session.tenant_name }</Col>
      </Container>
    </footer>
  )
}

export default Footer;
