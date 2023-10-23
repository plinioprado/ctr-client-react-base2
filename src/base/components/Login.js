import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import { BaseContext } from "../BaseContext";
import FieldEmail from "./field/FieldEmail";
import FieldPassword from './field/FieldPassword';
import FieldSelect from "./field/FieldSelect";

import config from "../config.json";

function Login() {

  const [fields, setFields] = useState({
    email: '',
    pass: '',
    tenant: ''
  });

  const format = {
    email: {
      getError: (value) =>
        (value.trim() === '') ? 'required'
        : (!(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value))) ? 'invalid'
        : ''
    },
    pass: {
      getError: (value) =>
        value.trim() === '' ? 'required'
        : value.trim().length  < 5 ? 'less than 5 characters'
        : ''
    },
    tenant: {
      options: config.tenants,
      getError: (value) =>
        value.trim() === '' ? 'required'
        : ''
    }
  };

  const errorMessages = {
    email: format.email.getError(fields.email),
    pass: format.pass.getError(fields.pass),
    tenant: format.tenant.getError(fields.tenant)
  }

  const hasError = Object.keys(errorMessages).reduce((acc, val) => (acc || errorMessages[val] !== '') ? true : false, false);

  const { login } = useContext(BaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const logged = await login(fields.email, fields.pass, fields.tenant);
      if (logged) navigate('/');
    };

  const fieldChange = (name, value) => {
      setFields({
        ...fields,
        [name]: value
      })
    };

  return (
    <main className="login">
      <Container className='login'>
        <Form>
          <FieldEmail
            fieldAutoComplete="username"
            fieldChangeValue={fieldChange}
            fieldError={errorMessages.email}
            fieldLabel="Email"
            fieldMd="12"
            fieldName="email"
            fieldRequired
            fieldValue={fields.email.value}
          />
          <FieldPassword
            fieldChangeValue={fieldChange}
            fieldError={errorMessages.pass}
            fieldLabel="Password"
            fieldMd="12"
            fieldName="pass"
            fieldRequired
            fieldValue={fields.email.pass}
          />
          <FieldSelect
            fieldChangeValue={fieldChange}
            fieldLabel="Tenant"
            fieldError={errorMessages.tenant}
            fieldMd="12"
            fieldName="tenant"
            fieldOptions={format.tenant.options}
            fieldRequired
            fieldValue={fields.tenant.value}
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
  )
}

export default Login;
