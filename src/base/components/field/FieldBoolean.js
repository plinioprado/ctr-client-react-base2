import { Col, Form } from 'react-bootstrap';

const FieldBoolean = ({
    fieldChangeValue,
    fieldDisabled,
    fieldError,
    fieldLabel,
    fieldMd,
    fieldName,
    fieldValue
  }) => {

  const onChange = (e) => {
    const value = (e.target.value === 'true')
    fieldChangeValue(fieldName, value)
  }

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        as="select"
        className={fieldError && "border-danger"}
        disabled={fieldDisabled}
        value={fieldValue}
        onChange={onChange}
        key={fieldName}
      >
      <option value="true">Yes</option>
      <option value="false">No</option>
    </Form.Control>
    <Form.Text className="text-error">{fieldError}</Form.Text>
  </Form.Group>
  );
}

export default FieldBoolean;
