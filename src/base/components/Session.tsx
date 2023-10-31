import { useContext } from "react";
import Table from 'react-bootstrap/Table';

import { SessionContext } from "../contexts/SessionContext";
import { Container } from "react-bootstrap";

function Session() {

  const { session } = useContext(SessionContext);

  return (
    <main>
      <Container>
        <h2>Session</h2>
        <Table>
          <thead>
            <tr>
              <th>Parameter</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {
            Object.keys(session)
              .map(key => (<tr key={key}><td>{key}</td><td>{
                typeof session[key] !== 'object' ? session[key] : JSON.stringify(session[key])
              }</td></tr>))
            }
          </tbody>
        </Table>
      </Container>
    </main>
  )
}

export default Session;
