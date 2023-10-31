import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Form, Button } from "react-bootstrap";

import { SessionContext } from "../contexts/SessionContext";

import FieldEmail from "./field/FieldEmail";
import FieldPassword from "./field/FieldPassword";
import FieldSelect from "./field/FieldSelect";

import config from "../config.json";

function Login() {
  const [fields, setFields] = useState({
    email: "",
    pass: "",
    tenant: "",
  });

  const format = {
    email: {
      getError: (value: string) =>
        value.trim() === ""
          ? "required"
          : !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
          ? "invalid"
          : "",
    },
    pass: {
      getError: (value: string) =>
        value.trim() === ""
          ? "required"
          : value.trim().length < 5
          ? "less than 5 characters"
          : "",
    },
    tenant: {
      options: config.tenants,
      getError: (value: string) => (value.trim() === "" ? "required" : ""),
    },
  };

  const errorMessages = {
    email: format.email.getError(fields.email),
    pass: format.pass.getError(fields.pass),
    tenant: format.tenant.getError(fields.tenant),
  };

  const hasError =
    format.email.getError(fields.email) !== "" ||
    format.pass.getError(fields.pass) !== "" ||
    format.tenant.getError(fields.tenant) !== "";

  const { login } = useContext(SessionContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const logged = await login(fields.email, fields.pass, fields.tenant);
    if (logged) navigate("/");
  };

  const fieldChange = (name: string, value: string) => {
    setFields({
      ...fields,
      [name]: value,
    });
  };

  return (
    <main className="login">
      <Container className="login">
        <Form>
          <FieldEmail
            fieldAutoComplete="username"
            fieldChangeValue={fieldChange}
            fieldDisabled={false}
            fieldError={errorMessages.email}
            fieldLabel="Email"
            fieldMd="12"
            fieldName="email"
            fieldValue={fields.email}
          />
          <FieldPassword
            fieldChangeValue={fieldChange}
            fieldDisabled={false}
            fieldError={errorMessages.pass}
            fieldLabel="Password"
            fieldMaxLength={30}
            fieldMd="12"
            fieldName="pass"
            fieldPlaceHolder=""
            fieldValue={fields.pass}
          />
          <FieldSelect
            fieldChangeValue={fieldChange}
            fieldDisabled={false}
            fieldError={errorMessages.tenant}
            fieldLabel="Tenant"
            fieldMd="12"
            fieldName="tenant"
            fieldOptions={format.tenant.options}
            fieldValue={fields.tenant}
          />
          <Button
            variant="primary"
            type="submit"
            className="float-end"
            onClick={handleSubmit}
            disabled={hasError}
          >
            Submit
          </Button>
        </Form>
      </Container>
    </main>
  );
}

export default Login;
